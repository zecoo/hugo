---
title: "ALL in ONE"
date: "2020-07-03T00:00:00+08:00"
tags: 
categories: 
draft: false
---



## RCA

一些例子：

比如接口成功率下降了，发现北京的接口成功率的曲线和接口成功率最相似，那将“北京的接口成功率”定位为根因。

KPI anomaly

当某个总指标（如总流量）发生异常时，需要快速准确地定位到是哪个交叉维度的细粒度指标（如“省份=北京 & 运营商=联通”的流量）的异常导致的，以便尽快做进一步的修复止损操作。

对于网络运维中多数的关键性能指标（KPI，CPU利用率、某页面点击量等），对其应用实时的异常检测算法，即可快速发现异常状况

Fault Injection方式：

- 对一个container进行CPU消耗
- 网络包延迟（具体delay到某个微服务还是？）
- Container Pause



MS-Rank就根本没提什么是微服务系统的Root Cause，但是在RW里提到了两类：

1. Network traffic analysis
2. web service anomaly detection

MS-Rank评价Microscope是基于单指标，也就是Latency



Anomaly Detection和Root Cause Analysis又有什么关系？



### 回应的问题

Q1: 选择的metric是什么，他们之间有权重吗

A1: 目前论文里看到的是没有的，MircoScope是用latency单指标，MS-Rank是用多指标，但是没有说明指标之前的权重，icws2020也是用latency单指标。

Q2: Root Cause 检测的anomaly是个什么异常？

A2: 看Fault Injection方式，也就是说1. 一个或多个微服务停机 2. 一个或多个微服务的网络延迟高



### 为什么实验表明和论文里的有出入

感觉不是forward、selfward和backward的问题。因为这是解决不能向兄弟节点random walk的问题。而不是整个调用链latency相似的问题。





docker 格式化查看 container

```shell
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"
```



其中Reviews有3个版本：

- v1只提供评论
- v2同时提供评论和评分，评分以黑色星星展现
- v3同时提供评论和评分，评分以红色星星展现