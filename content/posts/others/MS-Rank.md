---
title: "MS-Rank"
date: "2020-05-19T00:00:00+08:00"
tags: ["icws"]
categories: ["paper"]
draft: false
---

MS-Rank: Multi-Metric and Self-Adaptive Root Cause Diagnosis for Microservice Applications

ICWS 2019

## 主要贡献：

1. 根据一系列的metrics，构建一个调用图

2. 基于随机游走算法提出了根因定位算法

3. 为了提高定位的准确性，用一种自适应的方法调整metrics的权重

## 2 RW

提到了Microscope和Sieve

论文里居然还提到了SRE…hh

## 3 Solution

### 3A Framwork

针对不同的情景，选择的metric也不一样。UI相关的，一般更在意latency；计算相关的比如hadoop，更在意cpu负载。文章把微服务系统看成是一个黑盒，那么metric的权重这样的概念就出来了。

### 3B Metric

latency适合短连接服务，但不适合长连接服务。

常见的metric：latency、throughput、CPU、MEM、disk、I/O，power。power = throughput / latency

Gradient相关重要的metric：

Gradient(t) = Mj,i(t) - Mji(t-1)

Gradient ratio(t) = Gradient(t) / Mj,i(t)

还有两个没列出来

### 3C Graph Construction

基于PC算法，依旧是一个DAG。额，这部分看得我一头雾水

### 3D Random Walk Diagnosis

一个最直观也是最常用的根因定位方法是计算某个服务的metric和Anomaly服务的metric的相似度。我看的其他论文里也大致是这个思想

同样这篇论文用皮尔逊相似度，不过添加了权重的部分。可以得到vi和vj的关系（相似度）

Transition（游走）：向前（遇到高相似度）、向内（前后都是低相似度，则停留在自身）、向后（遇到低相似度）

### 3E Weight Update

P(M) Precision Function，计算定位结果的准确性。还有更新权重，都是一个公式带过。

### 3F Example

收集了2小时（7200s）的数据，每5s一次收集，对于每个metric都有1440个记录。

示例的这个图画得挺好的，体现出了不同的metric在trace中的表现。但是这图看不懂原理啊

## 4 Evaluation

### 4.1 Benchmark

有两个小问题：1. 没有考虑数据库 2. 并不是真正意义上的ms，是把一个api视为一个ms。所以没有用到k8s等

Benchmark：TBAC、MonitorRank、NetMedic和Gestalt我只听说过MR

在一台16G Windows Server上进行实验

比较了Precision、Adaptability和domain knowledge（领域知识能增强准确性）

最后还有不同的参数对实验的影响。

## 5 Final

他们和Pengfei Chen是一个圈子里的啊，中山大学和清华深研院应该有交易的hh。我感觉我们不在这个圈子里啊。

 