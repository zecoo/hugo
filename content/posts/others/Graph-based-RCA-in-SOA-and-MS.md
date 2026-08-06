---
title: "Graph-based RCA in SOA and MS"
date: "2020-05-20T00:00:00+08:00"
tags: ["RCA"]
categories: ["paper"]
draft: false
---

Graph-based root cause analysis for service-oriented and microservice architectures

JSS 2020

## 2 RW

RCA方法有以下大致分类

1. model-based的RCA方法
2. Spectrum（也可以称之为Classification）方法。有人用ML来做
3. 图的方法

2017年的Sieve，MS-Rank也提到了这篇论文。

## 3 Graph-based RCA

举一个Wordpress的例子，如果不做loadbalance，HAProxy的运行缓慢可能是其中某一个服务器负载过大。

### Graph Modules

Node：

Edge：网络连接的对象，例如一次TCP连接的双方

Attribute：收集到的信息，比如Anomaly、metric和log

系统有以下几个modules：

#### anomalous region module

Extractor从system graph（系统的什么图？）中抽取一个子图，也就是anomalous region的子图。对于计算型的资源，选择异常节点周围2跳的所有节点作为子图，见图4。其他情况没提到233

#### pattern module

已经被标记为异常的节点，会作为计算相似度的模板。目的是为了对经常出现的异常做一个初始的集合，来避免冷启动的问题。（这里的冷启动是指异常区域没有可以对比相似度的对象）

#### similarity module

输入：1. 异常区域（anomaly region） 2. 异常模版（pattern）

输出：1. 相似度得分 2. 节点对应图（见图5）

## 4 Graph Similarity 

都是自定义的相似度计算方法，包括两个图的相似度、两个节点的相似度、节点的属性相似度。

## 5 Monitoring and Building Graphs

Prom做监控，cadvisor和node expoter作为监控agent。

构建图的过程其实是节点和节点连接的过程，TCP连接就可以构建一个边，由此创建调用图。

## 6 Evaluation

### 场景

不同的场景有不同的异常注入方式

- 面向服务的场景
- 负载均衡场景
- Kafka集群场景
- Spark&HDFS场景

### 异常注入方式

- stress做cpu、mem压力异常
- 连接异常（带宽限制）
- 负载均衡异常
- 高并发异常

### Precision

Training set的构建方式：异常注入的情况可以得到一些region啊，比如我用stress做异常测试，得到微服务m1出现异常，然后把m1周围2跳的节点抽取出来作为region。这就是一个新的pattern。

threshold是控制不同pattern的参数，threshold设为0.9表示和训练集中已有的pattern的相似度小于90%的region设为一个新的pattern。

实验做两次，第一次不做参数调整，第二次做参数调整。

好好看一下table2，挺有意思的。拿第一列来说，Kafka场景下，比如我用CPU做异常注入，不做参数调整得到的CPU pattern的相似度是0.43，和Disk、Band、Heap pattern的相似度分别是0.18、0.03、0.34。但是用参数调整得到的CPU相似度是0.87。

那么参数调整具体怎么做的呢？

一是领域专家做调整，二是根据节点自身附带的其他信息，比如这个节点本身是cpu联系性较高的，那就把CPU pattern的参数调高。

图15表示计算region和pattern之间相似度的时间会随着节点的增多而变大。