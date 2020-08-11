---
title: "microRCA 复现"
date: "2020-07-18T00:00:00+08:00"
tags: 
- RCA
categories: 
- paper
draft: false
---

检测流量是否进入的promQL：

```shell
histogram_quantile(0.50, sum(irate(istio_request_duration_seconds_bucket{reporter="source", destination_workload_namespace="sock-shop"}[1m])) by (destination_workload, source_workload, le))
```

复现工作终于取得了第一阶段的胜利，`.scv`文件的来源都弄清楚了。这就花了我快一周的时间。记录一下踩的坑：

## Locust和Siege

Locust的压测比较灵活，我用siege压测的话，单单压一个页面可能还可以满足，但是如果要压多个http接口，甚至还有带header的post，get请求之类的，siege就不能胜任了。

## 前期填坑过程

### 坑一：版本问题

Sock-shop本来自带压测的代码，用的就是Locust。但是由于版本问题，第一，locust的版本是老版本；第二，base64的版本也是老版本，导致basic-auth的header直接不能生成。这就…很难受了。新版本自己看着啃吧。

Locust也有很多坑，首先是版本的问题，我在网上搜到的资料大多都是1.0版本之前的，而1.0相对于对于之前的版本有很大的变化。我只能根据官网的document硬啃，特别是header的使用。这个坑着实让我填的心塞。

既然版本有问题，那我换回老版本行不行呢？换了locust的0.14.6版本，依旧是401错误。这就是debug的痛苦吧。

### 坑二：Basic-Auth的header

login 在sock-shop的client.js里写了有一个xhr.setHttpRequest的东西，需要验证base64加密过的header。

```js
beforeSend: function (xhr) {
  xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
}
```

使用排除法缩小debug的范围。我用python原生的request来模拟登录，继续搜索相关内容，然后找到了`request.get(url, auth={"username","password"})`的方法可以通过basic-auth，试了一下果然可以。

事实证明可能是locust出了问题，我用python自带的request来模拟用户登录是可以成功的。代码如下：

```python
import requests

url = 'http://39.100.0.61:30001/login'
response = requests.get(url, auth=('b','b'))
print(response.text)
```

返回值200，内容是：Cookie is set。

这说明什么问题，说明是我的base64加密出了问题。就出在basic-auth这个header上面，排除了sock-shop的bug。继续搜索之，于是就有了正解：

### Locust模拟带Basic-Auth的header

base64旧版本的basic-auth是这样构造的：

```python
base64string = base64.encodestring('%s:%s' % ('user', 'password')).replace('\n', '')
```

因为版本问题惨遭抛弃。

base64新版本靠我自己摸索，这里花费的时间是最多的，现在想想主要是因为自己没有查看两个内容：第一，basic-auth的格式要求，最好是能看个示例；第二，base64的新版本的用法也没有看官方介绍，故而格式一直是错误的。

正确的base64新版本的auth方法是这样的：

```python
string = string.encode()
base64string = base64.b64encode(string).decode()
```

最重要的是最后还有一个decode的过程。那么没有encode和decode到底有多大差别？

### Encode和Decode

encode呢，主要是base64的API只接受byte类型的输入，那么就必须encode成二进制的格式。base64的输出也是二进制的格式，代码里输出看一下是这样的：`b'Yjpi`（'b','b'的base64加密结果），而我一开始错就错在直接把这个输出的内容丢进了header里。然鹅header里需要的不是二进制的内容，而是一个string类型的加密结果。也就是说要decode一下。把`b'Yjpi`的结果decode之后是`Yjpi`看起来好像没太大差别，但对于电脑来说就是天壤之别。

到这里呢，debug取得了重大突破，我开心得甚至想跳起来。然而，又有新的坑着我

### 坑三：Sock-Shop登录出大问题

下订单order的过程，需要先填写address和card信息。但是怪就怪在一旦我把card信息填写之后，订单是可以下了，但是登录就出现密码错误的情况。这找谁说理去？这个坑我没心思去细看了，可能是机子抽风，我把card全填写成数字，bug没有出现，我简直烧高香了。

到这里，你以为坑结束了吗？哈哈哈，还没有。现在想想我真的太强了，debug能力一流。就是心态不太好。

### 坑四：PromQL的query和query_range

microRCA源代码里用的是query，我得到的`.scv`文件只有最后一个时刻的数据。这不对呀，150s的时间，每隔5s取一次数据，应该有30个时刻的数据才对呀。故搜索之，发现需要用的是query_range这个API，用于获取一段时间间隔内的数据，而query这个API是获取某个时刻的数据。看看区别吧：

```shell
prom_url = 'http://39.100.0.61:32685/api/v1/query_range'
prom_url = 'http://39.100.0.61:32685/api/v1/query'
```

用query得到的，就是value（下面的示例）；用query_range得到的，就是values

```json
[{'metric': {'destination_workload': 'orders-db', 'source_workload': 'orders'}, 'value': [1594888889.714, '0.03426666666666667']}, 
```

## 后期填坑过程

坑还没填完呢宝贝儿

### 坑五：获取 cpu、mem 等硬件指标

我在Prom里输入了node_cpu这样的硬件指标，返回的是no data。然后我在`http://prom_url/metrics`看看metric里提供的东西，发现并没有node_cpu这样的东西，说明默认的Prom是收集不到硬件指标的。

根据论文里提到的，Node Exporter可以获取硬件指标。安装Node Exporter很简单，根据参考文章就可以做到。

Prom获取Node Exporter提供的数据，网上给的方法很简单，在`prometheus.yaml`文件里找到`scrape_configs`的配置，加入这样一些信息，就可以收集到硬件指标了。

```yml
scrape_configs:
  # 采集node exporter监控数据
  - job_name: 'node'
    static_configs:
      # 后期证明localhost是不行的，要用实际地址
      - targets: ['localhost:9100'] 
```

坑就坑在istio里的prom的yaml文件找不到。我尝试过在istio-1.4.3文件夹里用find命令把所有和prom相关的yaml都查看过一遍，没有一个是真正影响prom部署的。气死我了。

然后我去GitHub上一搜istio，看看repository里能不能找到prom相关的。结果看到新版本的istio，可能是1.6.5版本的，在samples/addon文件夹里直接就有一个prometheus.yaml文件，里面就有我需要的scrape.configs部分。

好，那安装1.6.5版本吧。

西吧，GitHub下载速度2-3k真的感人，40m左右的tar.gz文件，我可能要下一整天。这怎么行，然后我就在国外那台服务器上下，下载速度2M/s。然后用scp传到服务器，速度是快了一点，10k左右，下几个小时，那和一整天没啥大区别。我只能在mac上先用aria2下载，速度又稍微快一点点，十几k，我下了整整一个小时。疯了！！！！

好，终于算是下载下来了。

结果阿西吧，安装istio-1.6.5的时候又遇到bug，卡在istiod这个pod的启动，查看这个pod的坑、log，发现这个bug：

```verilog
Failed to list *v1beta1.Ingress: the server could not find the requested resource
```

搜不到结果，我死马当活马医，既然有ingress，我的服务器上又没有安装ingress，是不是我ingress安装好了是不是就OK了呢？

好，安装ingress。

西吧，Ingress安装，GitHub和官网给出来的，只有aws、azure、GKE、cloud等选项的部署文件。我这普普通通的服务器，怎么个安法？那就全试一遍吧，西吧。都装不上，期间还要忍受我delete depoly.yaml文件的过程中，可能删除需要一些时间，还提示我这段时间里不能部署。不知道我最宝贵的就是时间吗！！！好的，最后好不容易发现cloud可能有安装上的可能，结果卡在pod的pull image上面。这次这个image的地址，我惊了：

```shell
pulling image "us.gcr.io/k8s-artifacts-prod/ingress-nginx/controller:v0.34.1
```

我知道grc.io，你这个us.grc.io是个什么鬼。连镜像都让我搜不到吗？？？我不放弃，继续搜相关的image，终于让我搜到了一个网站，可以下载0.34.1的ingress压缩镜像。听起来不错吧？结果西吧，下载速度继续十几k，下了一个小时，继续用scp传到服务器，用docker load解压缩。西八西八西八，告诉我解压出问题，里面有个一个文件找不到MMP。

到这里我已经疯了。老子对debug，特别是de版本问题的bug，厌恶到极点了。

又回到最初的起点，我试着去看看istio+prom+config的组合搜索能搜出来什么。还真让我搜出来一个类似的，可以查看到istio老版本的prom配置文件：

```shell
kubectl get cm prometheus -n istio-system
```

秃顶聪明的我，试着把get换成edit，真的能edit，我，，，激动到差点落泪。然后问题又来了，我edit之后，怎么重启生效呢？如果重启istio，那肯定写进去的config都给我抹掉了。这可怎么办？秃顶的我，又想到k8s如果delete一个pod，会给我开一个新的pod，那我把prom这个pod重启，会不会生效呢？结果一试，哈哈哈哈，真的可以！！！！！我尼玛，太开心了。



## Fault Injection

tc是针对某个网络的延迟，放在container里感觉不太合适。我就找到了istio的延迟注入方法，官网给出的bookinfo的介绍性太少了，直接移植到sock-shop上没有更多文档的话不好弄。好在我在网上搜到了其他人的介绍，还有一些介绍。这里面最重要的是host这个字段，我大致看了一下，其实用prom获取到destination-svc就可以看到sock-shop中各个服务的host，例如catalogue这个服务的host就是：`catalogue.sock-shop.svc.cluster.local`，整体的yaml文件是这样：

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: catalogue-delay
spec:
  hosts:
  - catalogue.sock-shop.svc.cluster.local
  http:
  - fault:
      delay:
        percentage:
          value: 100
        fixedDelay: 5s
    route:
    - destination:
        host: catalogue.sock-shop.svc.cluster.local
```





## 最后

太尴尬了，给microRCA的作者刚提一个issue，bug就让我解决了。枉我还认认真真给作者提了个issue：

```markdown
tag: help wanted

Hello, congratulation for your great work on microRCA. I'am a master student in Wuhan China, who is also interested in RCA. It's lucky for me to read about your paper and I tried to run microRCA on my server. The input of microRCA are the ".scv" files generated by the "Fault Injection" part. However, I've met with some issues about the fault injection.

I was wondering if you had met the same issues as I did, if not, hoping the github issue won't waste much of your time. I will try another way to simulate the fault injection. Here are my steps:

1. I download the "load-test" module of sock-shop from github
2. Locust 0.4.16 is also downloaded
3. In the downloaded "load-test" folder, I ran "locust" in the terminal.
4. Then turn to localhost:8098, input the user number and the request number, starting the fault injection.
5. All fault injections were succeed except the "get /login" and the "post /order" method.

The return of locust shown that the login request is unauthorized.
But I've already registered a user on my server for sock-shop, then encoded the username and password with base64 for header authorization.

Have you met the same issue? Hoping for your reply. Thank you.
```



## 参考

https://blog.csdn.net/wuzhong8809/article/details/98072206 （python auth）

https://docs.locust.io/en/stable/changelog.html#improved-http-client （Locust官网header介绍）

https://ctolib.com/article/releases/122210 （ingrees-0.34.1镜像下载）