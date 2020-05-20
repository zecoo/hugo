---
title: "Monitoring with log and trace"
date: "2020-XX-XXT00:00:00+08:00"
tags: [""]
categories: [""]
draft: false
---

Microservices Monitoring with Event Logs and Black Box Execution Tracing

TSC 2019

## Chaper1

理解log一般需要专家，文章提出一个novel的方式帮助troubleshooting的决策
Clearwater IP Multimedia Subsystem 和 hipster差不多，都是有十多个微服务的玩意儿
嗯，微服务decomposed，非常适合monitoring，同时也有挑战
indirect monitoring 检测cpu之类的什么东西，direct monitoring可以直接在代码里插入log function进行monitoring。event log属于direct monitoring
现有的log management tool应该用的是正则和关键词查找的方式做分析，但是好像不是特别适合微服务。毕竟不同的系统，分析规则是不一样的
吹一波作者的monitoring工具MetroFunnel，不需要改变现有的微服务，也不需要对现有的系统有特别深刻的了解。

## Chapter2

介绍indirect monitoring和direct monitoring，了解一下即可。Zipkin就是direct monitoring的方法

## Chapter3 给了很多例子

第一个例子的错误是clearwater客户尝试拨打语音电话发生错误
ClearWater IP Multimedia Subsystem IMS IP多媒体子系统 安装
bono是IMS的一个微服务，负责客户端。同时发现sprout和bono接近，也是间接和客户端有关。又转向另一个微服务homestead，在这个里面找到了error，但是也没有说为什么就找到了homestead。这一章就讲了在不同的微服务里debug，结果还没说清楚微服务是怎么进行选择的。fk
有用的log比较少，在ms里情况更甚。

## Chapter4 Goals

tracing tech应该第一，不会产生新的服务；第二，不会对代码有影响；第三，没有很重的配置文件。
还有一些non-goals作者讲得很清楚。

## Chapter5 感觉内容挺多？

因为微服务一般都是用REST形式的api，就可以通过抓包的形式，也就是passive tracing的方式来进行monitoring，但这在之前的一些论文中已经有体现了。

### Format of trace

trace是代表微服务调用结果的记录序列。一般包含很多信息，比如时间戳、地址、ip、response code等，文章都有列出来

### Tracing algorithm

Tracing Algorithm有两个要点，

第一个是capture packets。简单判断一下就可以，正常的发送是GET /test/users/1这样的。接收到的是这样的HTTP/1.1 200 OK

第二个是timeout cheker
pending list：requests to be decisioned
expiration of a request：插入后等待的时间过长，就expire
termination of a request：request来了等待的时间过长，就terminate

## Chapter6

Clearwater的每个组件也介绍了。bono代表连接成功，cassandra是数据库。
Clearwater这个实验环境的搭建我还不能彻底理解，可以多看两遍
然后介绍了k8s，最后实验环境里还是要用到k8s作balancer

## Chpater7

讲的是一些具体的case，比如一开始提到的502错误，MetroFunnel能直接给出结果。另外还有overload问题，

## Chapter8

第八章，实验证明第一，MF不会对Clearwater的性能有影响，Kubernetes的影响也很小。第二，能显著减少log file的大小。