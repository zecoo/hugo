---
title: "K8S hello-world 回顾"
date: 2020-04-17T11:37:07+08:00
draft: true
tags: ["k8s"]
categories: ["k8s", "hello-world"]
---

没错这部分也花了我很长时间，而且把我心态还搞崩了。

k8s安装主要是镜像是国外私有库，pull下来比较麻烦。

而k8s第一个hello-world难在理解pod、deployment、service之间的关系，以及各种奇奇怪怪的端口映射。我想这是计算机网络基础没有打好埋的坑吧。

### 镜像&Pod

首先是创建pod，这里也需要把本地docker创建的image给注射到microk8s.ctr里面。我根据参考1给出的方法构建了hello-node:v1镜像。然后注入到k8s里面。

image创建成功之后，就可以构建pod了。用以下命令

```shell
kubectl run hello-node --image=hello-node:v1 --port=8080 --image-pull-policy=Never
```

创建了一个pod，可以用命令

```shell
kubectl get pods
```

查看pod的创建。如果创建不成功，可以具体查看pod的详细情况。

```shell
kubectl describe pod hello-node
```

### 创建Deployment

pod创建成功了，考虑构建deployment，dep是pod的无状态体现。deployment可以控制pod的replica数量。创建方法我没有找到命令行的方式，k8s官网给出的也是推荐使用yaml构建。以下是deployment.yaml文件：

```yaml
apiVersion: apps/v1 # for versions before 1.9.0 use apps/v1beta2
kind: Deployment
metadata:
        name: hello-node
spec:
        selector:
                matchLabels:
                        name: hello-node
        replicas: 1 # tells deployment to run 2 pods matching the template
        template:
                metadata:
                        labels:
                                name: hello-node
                spec:
                        containers:
                        - name: hello-node
                          image: hello-node:v1
                          ports:
                          - containerPort: 8080
```

有了yaml文件，然后用以下命令可以创建deployment

```shell
kubectl apply -f deployment.yaml
```

deployment创建成功之后，类似pod，可以用get、describe命令查看指定deployment的情况。

### 暴露服务

到目前为止还是不能访问app。因为现在只能在k8s集群内部访问app。我们需要将app变成service才能访问。可以用命令行的方法，也可以用yaml文件的方式。参考中使用的是命令行的方式：

```shell
kubectl expose deployment hello-node --port=8080 --target-port=8080
```

然后查看service：`kubectl get svc hello-node`就可以看到service的情况：

```shell
ubuntu@VM-0-12-ubuntu:~$ sudo kubectl get svc
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-node   NodePort    10.152.183.14   <none>        8080:31908/TCP   33m
kubernetes   ClusterIP   10.152.183.1    <none>        443/TCP          8d
```

到这里，app就可以在vps中访问了。

```shell
ubuntu@VM-0-12-ubuntu:~$ curl 10.152.183.14:8080
Hello World!
```

但是，仅仅是能在vps中访问。我如果用自己的macbook访问，还需要做其他的代理工作，可能又是一个新的坑等我去补。

### 网络端口请补补

最后还有个天坑，等我慢慢补

本来参考教程可以轻轻松松完成一个k8s的hello-world，但是我自作聪明地把8080端口改成了8081端口。一方面是我怕力会用到这个端口，另一方面是我想8080不是tomcat默认端口嘛，可能会被占用掉。结果就是8081端口让我鼓捣了一整天，pod、deployment、service都是ready状态但就是通过`curl 10.152.183.14:8081`访问不到。气得我半死。

也就是说，端口方面的知识还要好好补补。

还有一个命令，查看端口信息：

```shell
buntu@VM-0-12-ubuntu:~$ sudo netstat -tlpn
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 127.0.0.1:44047         0.0.0.0:*               LISTEN      17662/containerd    
tcp        0      0 127.0.0.1:10256         0.0.0.0:*               LISTEN      17538/kube-proxy        
tcp6       0      0 :::80                   :::*                    LISTEN      1276/nginx: master   
tcp6       0      0 :::7000                 :::*                    LISTEN      1237/frps           
```

虽然这和k8s的demo没有太大关系，还是po出来看看吧。可以看到80端口是力在用的nginx，7000端口是力在用的frps。

然后我还有想说的：国内Blog质量真的差劲！！！！！我已经不是第一次有这样的感觉了。百度出来的基本上都是垃圾，能解决问题的极少，只会让自己心态崩上加崩。老老实实看官方文档，是效率最高的方式！！！！！

### 参考

https://www.cnblogs.com/bforever/p/10601169.html （k8s hello-world）