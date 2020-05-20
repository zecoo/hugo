---
title: "RCA in multitier service"
date: "2020-05-20T00:00:00+08:00"
tags: ["RCA"]
categories: ["paper"]
draft: false

---

Root Cause Analysis of Anomalies of Multitier Services in Public Clouds

TON 2018

读完感觉不像是A类的期刊，Chinglish的情况很严重，相似度的计算实在是不优美，最后baseline挑的也很奇怪。

## IBR

这篇文章里用了一个很贴切的词：tenant，RCA用另一种解释其实就是tenant，也就是之前网易的面试官跟我说的profiling，是因为一个节点Root出现故障，导致和该节点有关的所有节点都变慢了。

这篇也是在前面会议论文的基础上加了一些内容投的期刊。

## System Arch

### Anomaly Type

内在因素：服务调用过程中出现的异常

外在因素：在同一个物理机上的异常导致该物理机上不同的VM的异常

### System

两部分，第一部分构建异常传播图（也是一个DAG），第二部分计算相似度Rank异常节点。

## Graph

VCG（VM Communication Graph）用工具PreciseTracer可以获得。

APG（Anomaly Propagation Graph）

## Root Cause Location

这里面定义的相关度和其他不太一样，Sim(VMi, Rj)，是计算某个VM和某个请求之间的相关度。

### Data Collection

1. 服务响应时间，这里的计算方式是将所有参与一次响应的相关组件的响应时间相加
2. Utilization，比如CPU、mem等

都是老生常谈了

### Similarity Calculation

依旧是皮尔逊相关系数，不过这个相关度也太复杂了吧？

R(i, M, R(r), ts, te) = cov(Mte(M,i),Tte (R(r))􏲊 / σMte (M,i)σTte (R(r))

### Random Walk

依旧是Forward、Backward和Self，就是随机游走哪一套

## Evaluation

### Baseline

- RS：Random Select，普通人用排列组合的方式选择
- SC：Sudden Change，比较当前metric和一个时间窗口之前的metric的变化，变化最大的那个视为Anomaly
- DBR：Distance Based Rank，选择最优传播路径，找传播过程花费距离最短的

Evaluation Metric

- PR@K（Precision at TOP K）TOP K的准确性。比如K=5，能有90%的准确性Root Cause在里面
- MAP（Mean Average Precision）