---
title: "K8s + Istio 概念"
date: 2020-04-30T10:37:07+08:00
draft: true
tags: ["istio"]
categories: ["istio"]
---

环境都搭好了，不知道里面的原理那可不行。

我也不会系统写，想到哪里就写到哪里吧。

### istio是如何做到无侵入就能控制流量转发？

Sidecar还有Envoy是这里的核心。

![image-sidecar](../../../docs/imgs/sidecar.md.png)

这个图就很好得说明了sidecar中流量的走向。这部分在华为的书《云原声服务网格istio》中关于sidecar的介绍写得很清楚。也就是说Envoy通过iptables拦截了进来的流量，然后强迫流量走自己的通道，相当于一个收保护费的。

那么iptables为什么这么屌，能把流量给拦截下来？其实iptables改名叫netfilter更形象一些。先不深究iptables是如何做转发的，形象理解iptables为何这么屌，其实是它作为一个内核设置的功能，可以把网卡接受到的流量先通过自己过滤，然后再发送给web应用。

那么也就是，我从Safari发起对`http://serverip:port/productpage`访问，首先流量通过我的网卡，经过计算机网络传到server的网卡，然后server的网卡把这条流量先交给iptables过滤一下，然后再发给productpage代表的微服务。

iptables我好像把它关了，但是我的istio依然能够工作？这又是为什么呢…

### k8s如何调度微服务节点的

搞清楚这样几个概念：pod、deployment、service、node

* 一个pod上跑k个容器，这k个容器组成一个app（微服务）
* deployment，其实叫replica controller更合适。顾名思义，就是扩缩pod
* service就是app对外的一个访问入口。一个svc中可能有n个replica
* node就是部署service的节点

那么到这里我有一个小问题，有如果有n个replica，那么流量进来了会被分配到哪个pod里呢？

### kubelet是什么

kubelet是node的proxy。

### k8s的DNS是什么

给每个svc可用地址。

（以上两个百度结果都不太好，姑且这么理解吧）

## 参考

http://www.zsythink.net/archives/1199/ （讲iptables的好文）