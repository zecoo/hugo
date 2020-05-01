---
title: "Microk8s 国内安装总结"
date: 2020-04-09T11:37:07+08:00
draft: true
---

# Microk8s 国内安装总结

Ubuntu18本身自带snap，可以在microk8s的[官网](https://microk8s.io/docs/)找到安装方法。

注意k8s的运行条件只要满足以下

1. Linux kernel在3.1以上，很多小的openZV的服务器，都是2.6的核儿
2. Memory要在2G或以上。

我在国外买的xs vps就emmm。再附自己检查kernel的过程

```shell
$ uname -r (check linux kernel)
$ dpkg --print-architecture (check linux architecture amd64/arm64)
```

按照官网的方法，安装成功的话输入`sudo kubectl version`应该能看到client和server信息。



但是现在的microk8s还需要安装一些add-on，装这些add-on的时候就会有问题了。

`sudo mircok8s enable dns dashboard`

这里开启microk8s的dns和dashboard服务，但是尝试一下会发现dashboard并不能使用。如果server装了ss可以翻wall，应该不会有这个问题。如果没有ss，用这个命令检查一下namespace为kube-system的pod的情况。

` sudo microk8s.kubectl get pods --all-namespaces`

你会看到以下信息：

```bash
NAMESPACE            NAME                                              READY   STATUS             RESTARTS   AGE
container-registry   registry-7cf58dcdcc-rlfdq                         1/1     Running            1          18h
default              hello-node                                        0/1     ImagePullBackOff   0          16h
kube-system          coredns-588fd544bf-nmnnl                          1/1     Creating            1          19h
kube-system          dashboard-metrics-scraper-db65b9c6f-46lrb         1/1     Creating           1          19h
kube-system          heapster-v1.5.2-58fdbb6f4d-pmgvc                  4/4     Creating            4          19h
kube-system          hostpath-provisioner-75fdc8fccd-5vvfv             1/1     Creating            1          18h
kube-system          kubernetes-dashboard-67765b55f5-lwrms             1/1     Creating            1          19h
kube-system          monitoring-influxdb-grafana-v4-6dc675bf8c-lf8nr   2/2     Creating            2          19h
```

所有namespace为kube-system的pod都是creating的状态。这是一个不可用的状态。再使用这个命令：

`sudo microk8s kubectl describe pods --all-namespaces`

具体查看一下pod的状态，可以看到以下信息；

```shell
pull k8s.grc.io/pause:3.1 timeout(具体是什么我忘记提前记录了，总之就是镜像pull不到)
```

这里又埋下了一个坑。因为k8s.grc.io是Google的私有库，国内访问不到。有两个解决方法：

1. 翻wall，上面提到了，如果你可以，那你大概率不会遇到这个问题。
2. 使用国内镜像pull下来这几个镜像然后重新打tag

我选择硬刚第二种方法。

[国内镜像源](https://www.cnblogs.com/kcxg/p/11457209.html)可用的我看了一下，大概有阿里云、中科院和Azure.cn这三个。

先记录一个pull image然后打tag的过程吧。

```
docker pull gcr.mirrors.ustc.edu.cn/google-containers/pause:3.1
docker tag gcr.mirrors.ustc.edu.cn/google-containers/pause:3.1 k8s.grc.io/pause:3.1
```

讲道理，到这里应该已经成了，但是microk8s不认刚装上的docker怎么办？我想这里应该也有两个解决方法

1. 让k8s和docker公用一个registry，打通他们之间的通道
2. microk8s自己也有docker，把pull下来的image注射进去

第一个方法我懒得找了，用的第二种方法。在这里还要说一下microk8s的一个坑：最新的版本（我用的是1.18.0）是不能直接用`microk8s.docker`操作docker的，好像版本1.13之前的可以。这样就可以直接用microk8s的docker拉取镜像然后重新打tag就好了。新版本想要使用docker，具体的注射方法是这样的：

```
docker save k8s.grc.io/pause:3.1 > pause.tar
```

然后ls一下可以看到目录下面多了一个pause.tar，先压缩然后再注入到microk8s中

```
sudo microk8s.ctr image import pause.tar
```

这个命令让俺搜了很长时间。更要命是不管是baidu还是bing上关于microk8s.ctr的内容都几乎没有。然后我看了下ctr image的help，里面有一个check命令可以查看ctr中的image，相当于docker images命令。

```
sudo microk8s.ctr image check
```

就可以看到刚刚的k8s.grc.io/pause:3.1已经import进去了。

然鹅，因为墙的问题需要import的镜像还有好多呢。一个一个import进去，疯了。然后就看到了批量import镜像的bash脚本。贴在下面：

```bash
#!/bin/bash
images=(
k8s.gcr.io/pause:3.1=gcr.azk8s.cn/google-containers/pause:3.1
gcr.io/google_containers/defaultbackend-amd64:1.4=gcr.azk8s.cn/google-containers/defaultbackend-amd6
4:1.4
k8s.gcr.io/kubernetes-dashboard-amd64:v1.10.1=registry.cn-hangzhou.aliyuncs.com/google_containers/ku
bernetes-dashboard-amd64:v1.10.1
k8s.gcr.io/heapster-influxdb-amd64:v1.3.3=registry.cn-hangzhou.aliyuncs.com/google_containers/heapst
er-influxdb-amd64:v1.3.3
k8s.gcr.io/heapster-amd64:v1.5.2=registry.cn-hangzhou.aliyuncs.com/google_containers/heapster-amd64:
v1.5.2
k8s.gcr.io/heapster-grafana-amd64:v4.4.3=registry.cn-hangzhou.aliyuncs.com/google_containers/heapste
r-grafana-amd64:v4.4.3
)

OIFS=$IFS; # ?~]?~X?~W??~@?

for image in ${images[@]};do
            IFS='='
                set $image
                    docker pull $2
                        docker tag  $2 $1
                            docker rmi  $2
                                docker save $1 > 1.tar && microk8s.ctr image import 1.tar && rm 1.ta
r
                                    IFS=$OIFS; # ?~X?~N~_?~W??~@?
                            done

```

 先用`microk8s.ctr image check`检查一下是不是都注入进去了。

然后重新启动microk8s，再次检查namespace为kube-system的pod的状态，应该可以看到状态从一直Creating变成了ready。到这里应该可以说安装算是结束了。

最后总结一下吧，核心其实就是k8s需要Google私有库的image支持，但是因为网络原因获取不到，需要用其他方法把这些image装到k8s里。以上所有的内容都是在踩坑。md浪费了老子好多时间。



---

参考：

https://zhuanlan.zhihu.com/p/81648464

https://www.cnblogs.com/xiao987334176/p/10931290.html （镜像源）

https://segmentfault.com/a/1190000019534913?utm_source=tag-newest

https://www.bayun.org/article/11 （脚本批量import镜像）

https://blog.csdn.net/championzgj/article/details/93299777 （曲线救国）

https://www.dazhuanlan.com/2019/12/12/5df13665d9eee/ （microk8s基本命令）

https://blog.csdn.net/shykevin/article/details/90703428