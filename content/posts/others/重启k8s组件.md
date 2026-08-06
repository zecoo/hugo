---
title: "重启k8s组件"
date: "2021-01-27T00:00:00+08:00"
tags: k8s
categories: k8s
draft: true
---

我的`kube-controller-manager`挂了，然后我一个`delete pod`把这个pod给删掉了。没想到这个pod管理pod的pod，懂我意思吗？`get pods`这个操作就等于挂了，我怎么把`kube-controller-manager`继续装回来呢？

搜索了一圈都没有合适的答案，所以才想着记录一下。

我不能reboot，因为1201这台机子上还有其他人在用。我想着能不能找到`kube-controller-manager`的那个yaml文件，apply一下说不定就好了。然后还真让我找到了。在安装kubeadm的时候需要输入三行估计是conf之类的东西：

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

这就暗示了k8s是安装在`/etc/kubernetes/`这个目录下的，然后还真让我在manifest这个文件夹里面找到了`kube-controller-manager`的yaml文件，apply之，`kube-controller-manager`就重启了。之后`get pods`这个操作也就正常了。问题解决。



但是我现在在咖啡馆学习，每一分钟都很值钱，让我花钱在k8s的debug上，我觉得很不值。

