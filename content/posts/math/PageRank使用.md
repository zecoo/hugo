---
title: "从PageRank谈几篇RCA论文"
date: "2020-06-09T00:00:00+08:00"
tags: 
categories: 
- paper
draft: true
---



## 从论文说起

先来看看几篇核心方法类似的论文：

1. Root Cause Detection in a Service-Oriented Architecture （SIGMETRICS 2013）
2. MS-Rank: Multi-Metric and Self-Adaptive Root Cause Diagnosis for Microservice Applications （ICWS 2019）
3. Root Cause Analysis of Latency Problems with End-to-End Tracing in Microservice Environments （ICWS 2020）

第一篇论文是早的，后面两篇论文都参考了这个论文。最诡异的是ICWS2020这篇，连算法和公式都没有改就敢直接投？这赤裸裸的抄袭好吧，就是把SOA的概念换成了ms的概念。

吐槽还没完，聊聊具体的方法吧。

### 找Anomaly的方法

其中都提到了PageRank，而且要注意不是不同的PageRank，而是Personalized PageRank（PPR）其实也就是Weighted PageRank（WPR）

### 其中的问题

RCD SOA这篇论文里写得很清楚了，如果某一个区域的PR值保持很低，那么surfer会停留在此区域，陷入僵局。那么就需要往后传递surfer，于是就有了backward edge。

而到了后面两篇论文这里就走了样，变成了forward transformation、backward transformation和self transformation。让人难以理解。

### 

## PageRank

用一个东西，抓住输入和输出。

### 输入

DAG的matrix，如果有n个节点，那么就是一个n*n的矩阵。nij表示节点i和节点j的连接关系。在PageRank中，如果一个节点i链接到节点j，那么nij=1。

以上这个输入不对。

基于随机游走的PageRank算法的输入应该是第一个节点。然后是节点和节点之间的相关度。

### 输出

n个节点的PageRank排序PR，范围是0-10，值越高表示重要性越高。

## Weighted PageRank

传统的PR跳转到页面中提到的链接或者重新输入一个链接是通过设定一个固定概率。显然在已知关系度的网络里不太适用。所以把节点与节点之间的边作为权重的WPR就被提出来了。

而RCD SOA这篇论文里的backward，其实就是增强反向传递surfer的概率。也就是加强了反向边的权重。

至此，关于这几篇论文的方法是大致有一个了解了，实现起来emmm。感觉就凭我的代码水平，是块硬骨头，不知道现在该不该啃。

## 参考

https://www.jianshu.com/p/6af90342c3ba （简单代码讲解）

https://blog.csdn.net/u012892510/article/details/86743800 （PR中surfer的概念）

https://blog.csdn.net/hguisu/article/details/7996185 （提到了论文里的转移矩阵）