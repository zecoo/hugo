---
title: "Kubectl client 和 server version 差距错误"
date: 2020-04-28T11:37:07+08:00
draft: true
---



每天捣鼓k8s就是各种填坑。不过在查问题解决办法的时候有个人说

> 遇到坑不要怕，百度谷歌就是了。填完了坑，再踩两脚，以后走起来就平了。

说得真好。爆炸的心态慢慢也就平复了。



回归正题，坑长这个样子：

```shell
kubectl -f apply any.yaml
```

都会报错：

```shell
Error from server (NotFound): the server could not find the requested resource
```

一开始我以为是apiserver的问题，但是apiserver是正常运行的。搜索了很长时间，还是在yandex上搜索到可能是Kubectl cli和server的版本差距过大造成的问题。

看一下我的两个版本：kubectl version

```
Client Version: version.Info{Major:"1", Minor:"9", GitVersion:"v1.9.3", GitCommit:"5fa2db2bd46ac79e5e00a4e6ed24191080aa463b", GitTreeState:"clean", BuildDate:"2018-01-18T21:12:46Z", GoVersion:"go1.9.2", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"16", GitVersion:"v1.17.5", GitCommit:"72c30166b2105cd7d3350f2c28a219e6abcd79eb", GitTreeState:"clean", BuildDate:"2020-01-18T23:23:21Z", GoVersion:"go1.13.5", Compiler:"gc", Platform:"linux/amd64"}
```

可以看到cli的版本是v1.9.3，而server的版本是1.17.5。差的太多了。

继续搜索如何升级kubectl cli之，百度就别想能找到答案了。在k8s官网找到了安装kubectl的方法，重新安装了一下，kubectl cli的版本就升级到最新v1.18.5了。

这下再试一下

```shell
kubectl apply -f anyfile.yaml
```

终于可以运行yaml文件了。



## 参考

---

https://kubernetes.io/docs/tasks/tools/install-kubectl/#before-you-begin （升级kubectl cli）

https://devops.stackexchange.com/questions/2956/how-do-i-get-kubernetes-to-work-when-i-get-an-error-the-server-could-not-find-t （坑出现的原因1）

https://www.digitalocean.com/community/questions/kubectl-apply-f-deployment-yml-the-server-could-not-find-the-requested-resource （坑出现的原因2）