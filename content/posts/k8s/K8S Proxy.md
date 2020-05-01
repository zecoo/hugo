---
title: "K8S Proxy"
date: 2020-04-21T11:37:07+08:00
draft: true
---

上一节讲到现在可以在vps上访问到hello-world了。

然而我想把访问操作放在我的电脑上。我没有想到NodePort这么容易就能做到了。修改一下service.yaml里面port的type，从ClusterIP改为NodePort就可以了。

到这里我已经很满足了，但是手痒痒想要看看dashboard的情况。首先嘛，得先把dashboard服务给启动起来对不对？不幸的是，在之前装microk8s的时候，我使用了这样一行命令添加了dns和dashboard这两个add-on

```shell
kubectl enable dns dashboard
```

结果就是，dashboard其实已经启动了，只是我一直使用的命令

```shell
kubectl get svc
```

只能显示namespace为default的service，就看不到dashboard也已经启动了。

如果想要查看所有的svc还是添加`--all-namespaces`选项。

```shell
ubuntu@VM-0-12-ubuntu:~$ sudo kubectl get svc --all-namespaces
NAMESPACE            NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                  AGE
container-registry   registry                    NodePort    10.152.183.11    <none>        5000:32000/TCP           13d
default              hello-node                  NodePort    10.152.183.14    <none>        8080:31908/TCP           4d4h
default              kubernetes                  ClusterIP   10.152.183.1     <none>        443/TCP                  13d
kube-system          dashboard-metrics-scraper   ClusterIP   10.152.183.247   <none>        8000/TCP                 13d
kube-system          heapster                    ClusterIP   10.152.183.227   <none>        80/TCP                   13d
kube-system          kube-dns                    ClusterIP   10.152.183.10    <none>        53/UDP,53/TCP,9153/TCP   13d
kube-system          kubernetes-dashboard        NodePort    10.152.183.31    <none>        443:32570/TCP            13d
kube-system          monitoring-grafana          ClusterIP   10.152.183.21    <none>        80/TCP                   13d
kube-system          monitoring-influxdb         ClusterIP   10.152.183.102   <none>        8083/TCP,8086/TCP        13d
```

但是我发现一个bug，如果我想要删除非default命名空间下的svc，会返回没有这个svc，就很迷幻。估计是不希望用户随便删除系统的svc。所以如果想删除某个非default命名空间下的svc，请用这个命令。以dashboard为例：

```shell
kubectl delete svc -n kube-system kubernetes-dashboard
```

用NodePort暴露出来之后，发现并不能像hello-world那样，通过`vas-ip:NodePort`访问到dashboard。会返回错误。

> This connection is Not Private
>
> This website maybe impersionating 'vps-ip' to steal your personcal or financial information. You should go back to the previous page.

后面知道这是关于身份验证的问题。那我又搜索了一番，NodePort的方法行不通，试试github k8s官网给的proxy的方法

```shell
kubectl proxy --address=0.0.0.0 --disable-filter=true
```

使用proxy之后，会在localhost:8001端口监听dashboard请求。这个时候当前的bash就不能使用了：

```shell
ubuntu@VM-0-12-ubuntu:~$ sudo kubectl proxy --address=0.0.0.0 --disable-filter=true
W0421 16:42:30.534218   23241 proxy.go:167] Request filter disabled, your proxy is vulnerable to XSRF attacks, please be cautious
Starting to serve on [::]:8001
```

然后访问以下网址：

http://148.70.35.123:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#/login

就可以看到久违一抹dashboard蓝色。到这里我是很兴奋的。然而……这时候login dashboard需要身份验证。UI上也提示了两种验证方式，一种是local file，另一种是Token。我想Token方便一些吧，然后搜索了一下获取Token的方法：

```shell
sudo microk8s.kubectl -n kube-system get secret
NAME                                             TYPE                                  DATA   AGE
kubernetes-dashboard-certs                       Opaque                                0      13d
kubernetes-dashboard-csrf                        Opaque                                1      13d
kubernetes-dashboard-key-holder                  Opaque                                2      13d
kubernetes-dashboard-token-42mpd                 kubernetes.io/service-account-token   3      13d
```

Microk8s给出的参考，指向到GitHub k8s的官网对Access Control的介绍，用最下面的kubernetes-dashboard-token-42mpd的Token作为login的密钥。

查看Token的具体内容用命令

```shell
sudo microk8s.kubectl -n kube-system describe secret kubernetes-dashboard-token-42mpd
```

就可以看到Token的内容如下：

```shell
ubuntu@VM-0-12-ubuntu:~/zecoo$ sudo kubectl -n kube-system describe secret $token
Name:         default-token-nwqdh
Namespace:    kube-system
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: default
              kubernetes.io/service-account.uid: 20eca024-76ea-4ca7-8fdb-c36594100de8

Type:  kubernetes.io/service-account-token

Data
====
namespace:  11 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IkdlQmtINEEwWmtSVXhsUDA0U000ckJ1alBzZndiNDl5TTNiRml3SWRxeHMifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJkZWZhdWx0LXRva2VuLW53cWRoIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImRlZmF1bHQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIyMGVjYTAyNC03NmVhLTRjYTctOGZkYi1jMzY1OTQxMDBkZTgiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06ZGVmYXVsdCJ9.rhSKv7FnCZMXOJrAJie6xNVnQHDxiCdEC1fVLcdEBfPALhvg7vhnNXuyWJjxE_GaLsK3KoUle5cJCXkpbvcAyOeG14b1pRw_V3LoQsdTwEOrpxZ2VIEI9AC09HL4pEX2b9XSERJMUd1Oua-CJu9rScy1yzKJvdp93MfFDQG0WB6RjuDR_o2imsgfWuERgWX1kkLef1hIIXPtLpA5YrFEhTl40NVS9LBaOlNez49hRq1cd2I6Elc9EY3VuQ5GlVgNAtLht_MAPrrpNuzkxpnLvFYJLCbcqYFpexLF0XarQT5JuCD9F8JNWZanZKPv_hd9uk4pfuZ9XVYU5W2yy7GMvg
ca.crt:     1103 bytes
```

然鹅，我在dashboard UI输入了这串Token，点击login没有任何反应。也不告诉我这串Token是不是出问题了，就是一点反应没有。vps终端倒是有点反应：

```shell
2020/04/21 19:03:42 http: proxy error: context canceled
```

搜索了一下午，果然用Yandex之后搜索效率高了好多。结果就是：目前为止没有方法可以远程访问k8s的dashboard：[][][讨论1](https://github.com/ubuntu/microk8s/issues/292)、[讨论2](https://www.edureka.co/community/31115/kubernetes-dashboard-token-login-issue)、[讨论3](https://www.edureka.co/community/31282/is-accessing-kubernetes-dashboard-remotely-possible)

但是好像还有另一种方法：--enable-skip-login选项可以在dashboard UI中增加一个Skip按钮，跳过login环节。不过这个环节有可能遭到中间人MITM攻击。我担心把力的vps给搞崩了，先不折腾这个了。[详情1](https://www.jianshu.com/p/2903966c7693)、[详情2](https://www.cnblogs.com/itzgr/p/11106364.html)

## 参考

---

https://www.jianshu.com/p/6f42ac331d8a  （RBAC介绍）

https://github.com/kubernetes/dashboard/blob/master/docs/user/accessing-dashboard/1.7.x-and-above.md （k8s官方dashboard介绍）

https://microk8s.io/docs/addon-dashboard （microk8s的dashboard介绍）

https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/README.md#admin-privileges （microk8s指向的k8s access官网）

