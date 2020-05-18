---
title: "Istio 安装回顾"
date: 2020-04-29T11:37:07+08:00
draft: true
tags: ["istio", "hello-world"]
categories: ["istio"]
---

如果是Microk8s安装，很简单就一步：

```
microk8s.enable istio
```

好像pull istio镜像的过程特别漫长。由于用的是力的2g服务器，到这里内存爆炸，用不了了。

然后转战华为云15天4g服务器试用。

用Kubeadm安装k8s，过程呢，在另一篇博客中。

这里主要回顾Kubeadm安装istio以及各种可视化插件的过程。

全程请把精力集中在istio的官网上。每个教程都很详细。

下载tar包，然后解压得到istio-15.2目录。这个目录里包含需要部署的yaml文件以及bookinfo的实例。

然后按照istio官方的教程去安装就OK了。

重点呢，是各种可视化插件的部署。如果istio部署顺利的话，各种插件的svc已经启动了，可以get svc查看一下。但是到目前为止还是只能在集群内访问。访问的入口是istio-ingressgateway。然后按照istio官方给出的远程访问方式去部署就好了。这里唯一一个和官方给出的教程不同的地方是，以Prometheus为例，官方给出的访问地址是：

- Prometheus: `http://<IP ADDRESS OF CLUSTER INGRESS>:15030/`

这里的ingressip要改为

[服务器地址] + [svc istioingressgateway对于15030暴露的端口]

然后就可以用上面的地址访问到Prometheus了。

当然我还搜到了另外一种方式访问，把Prometheus用另一个svc包裹起来，相当于多了一个nodeport svc的中介。输入这个命令即可：

```shell
kubectl expose service prometheus --type=NodePort \
    --name=prometheus-svc --namespace istio-system
```

然后就会多出来一个名为prometheus-svc的nodeport形式的服务。调用这个服务暴露出来的地址就可以访问Prometheus，只是我觉得这个方法可能不太安全，就没有用。



## 参考

https://www.jianshu.com/p/b72c1e06b140 （安装指南）

https://www.cnblogs.com/assion/p/11326088.html （修改istiogateway的LB为nodeport）

https://www.jianshu.com/p/b72c1e06b140 （用hello-node做示例）

https://www.cnblogs.com/davidwang456/articles/9311470.html （SLA和SLO的关系）

https://www.jianshu.com/p/fd90d4914505 （istio的良好实践）

https://www.jianshu.com/p/bed143a1c886 （估计也是个研究生大神，给王老师演示这个就可以了）

https://www.cnblogs.com/CCE-SWR/p/10286404.html （也是演示之用）

https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0.3/manage_cluster/istio.html （另一种暴露Prometheus的方式）