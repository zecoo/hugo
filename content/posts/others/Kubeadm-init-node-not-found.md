---
title: "Kubeadm init node not found"
date: "2020-05-16T00:00:00+08:00"
draft: false
tags: ["k8s", "kubeadm"]
categories: ["k8s"]

---

新坑哦～

5天都没有解决的新坑哦～

## 环境：

- 华为云学生机2c4g
- 鲲鹏通用计算增强型 | kc1.large.2 | 2vCPUs | 4GB

## 错误

kubeadm init 后卡在：

```shell
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s
[kubelet-check] Initial timeout of 40s passed.
```

然后按照提示查看kubelet的日志，显示“node xxx not found”

```shell
node "ecs-kc1-large-2-linux-20200511105949" not found
Container "408a5e9f9958dd3919cecf4a944a25ce30582bc638d657fc065fec8c56579f2a" not found in pod's containers
k8s.io/kubernetes/pkg/kubelet/kubelet.go:453: Failed to list *v1.Node: Get https://192.168.0.214:6443/api/v1/nodes?fieldSelector=metadata.name%3Decs-kc1-large-2-linux-20200511105949&limit=500&resourceVersion=0: dial tcp 192.168.0.214:6443: connect: connection refused
```

看到最关键的了吗？`dial tcp 192.168.0.214:6443: connect: connection refused`，这个问题很关键，但是网上没有合适的解答。connection refused，其实就是“node not found”

再看看docker容器的运行情况，发现k8s所有组件的容器都创建失败，处于Exited状态。kubelet就这样创建失败继续创建，陷入循环当中。

```shell
k8s_POD_etcd	Exited (1) Less than a second ago
k8s_POD_kube-controller-manager	Exited (1) Less than a second ago
k8s_POD_kube-scheduler	Exited (1) Less than a second ago
k8s_POD_etcd	Exited (1) Less than a second ago
k8s_POD_kube-controller-manager	Exited (1) 1 second ago
```

## 售后

给华为售后也提了工单，最后得到的结果是华为鲲鹏服务器是arm架构，并且华为在上面做了自研，底层架构和amd差别还是挺大的。所以对于一些大型应用可能还没有适配。暗示k8s适配还要很久。

这坑就不填了。俺换台服务器就是了。

不过整体的体验还是挺好的，从提售后工单到售后邮件回复、电话回访都做得挺好的。打客服电话退订也很热心告诉我到哪里退订。

我用了10天左右吧，手续费20，费用是5块。最后能退给我175块。还算OK，损失不大。



