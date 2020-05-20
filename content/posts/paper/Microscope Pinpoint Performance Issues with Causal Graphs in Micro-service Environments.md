---
title: "Microscope"
date: "2020-05-20T00:00:00+08:00"
tags: ["RCA"]
categories: ["paper"]
draft: false
---

Microscope: Pinpoint Performance Issues with Causal Graphs in Micro-service Environments

ICSOC 2018

## Abstruct

错误定位的论文。通过服务调用关系构建DAG定位错误。

## Introduction

定位有88%的准确性，2020的icws有一篇错误定位论文跟该论文进行过比较。

benchmark用的是sock shop

## System Overview

三个步骤

1. data collection 收集的是两个服务之间的网络连接和SLO metric（应该和SLA差不多）
2. casual graph building 用收集到的数据构建一个casual graph（服务调用关系图？）
3. rank cause inference 根据graph，列出所有root cause候选并排序

### System design

#### data collection

需要从“127.0.0.1:port -> 172.80.12.98:port”的调用关系map到“Service A instance1 -> Service B instance 1”

SLO可以从服务监控软件中获取到服务响应时间

#### casual graph building

如果是Service A到Service B的错误定位，1中已经提到了。

还有一种情况是Service内部instance和instance之间的关系，如果有一个instance占据了所有的cpu利用率，同一个service内的其他instance就不能和其他服务进行通信。本文采用PC-Algorithm构建DAG，一种用概率的方式来解决该问题。（细节需要去看PC-Algorithm的论文）

#### rank cause inference

通过一个异常的节点（前端报出的异常节点），遍历该节点下的所有子节点，然后把所有的异常子节点都加入到候选集中。

那么如何判断一个节点是否是异常节点？

3sigma interval规则，即正态分布的3sigma，如果一个node的metric落在了99.7%的范围之外，就认为其是abnormal。3sigma interval是多少呢？（后面提了一嘴：“The sample interval in service request latency metrics is 1s.”）不知道是否可以理解为一个node的响应时间超过1*99.7%秒就认定其为异常节点。

用皮尔逊相关系数来做rank，将候选集中的节点和初始的前端异常进行相关度计算，相关度最高的rank最高。

## Experiment

4台物理机，64G Memory Ubuntu16

数据收集部分，先把数据存成log，然后用了两个工具：Filebeat集中日志，elasticsearch保存Filebeat收集到的数据。这应该是ELTK那一套。

用Prometheus工具获取service的request latency metrics

sock-shop支持模拟大规模用户请求，这里QPS（Query Per Seconds）可以模拟到5k

Sock-Shop还有istio、Prometheus都要摸熟

### Fault Injection

模拟错误，3种类型：

1. CPU满载

2. Traffic Jam，用linux工具模拟

3. Container Pause

实验做得相当饱满

1. Sock-Shop不同的服务对上面提到的3种错误模拟的敏感程度

2. 对比其他方法7种方法的precision

3. Rank X能命中错误？对比各种方法的Rank1-10的准确率

4. Scalability：如果instance从36个增加到120个，对准确率有影响吗？仅有7%的降低。