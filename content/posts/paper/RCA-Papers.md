---
title: "RCA Papers"
date: "2020-05-19T00:00:00+08:00"
tags: ["RCA"]
categories: ["paper"]
draft: false
---

# Literature Survey: Root Cause Analysis in Microservice System

## 摘要

微服务系统在最近几年迅速发展，微服务系统由多个独立部署并相互协作的微服务组成，大型的微服务系统可能包含几十个微服务，使得他们之间的调用链非常复杂。当某个微服务节点发生异常，可能会影响整个微服务调用链。为了保证Qos，定位发生异常的微服务节点显得尤为重要。目前RCA的过程大致可以分为服务调用链构建、筛选候选异常节点、排序异常节点这三个部分。这篇论文，我们将对比近几年RCA的发展以及常见的错误定位方法及这些方法之间的对比。基于以上讨论，得出对RCA的总结。

Microservice systems have developed rapidly in recent years. Microservice systems consist of multiple microservices which are independently deployed and co- ordinated . A large microservice system may contain dozens of microservices, making the call chain among these microservices very complicated. When an anomaly occurs in a microservice node, it may affect the entire call chain. In order to ensure Qos(Qunatity of service) and SLA(Service Level Assurance), it is particularly important to locate the abnormal microservice nodes. The anomaly detection process is called root cause analysis. At present, the process of root cause analysis can be roughly divided into three parts: service call graph construction, listing of candidate abnormal nodes, and ranking abnormal nodes to find out the anomaly. In this paper, we will discuss the development of root cause analysis in recent years, as well as common anomaly localization methods and the comparison between these methods. Finally, based on the above discussion, we will give a breif summry about root cause analysis.

关键词：root cause， microservice，anomaly detection

Intro

PROBLEM DEFINITION AND CHALLENGES

RCA

APPLICATION ARCHITECTURES

SCALING INDICATORS



## Ref

- [x] Microscope: Pinpoint Performance Issues with Causal Graphs in Micro-service Environments （ICSOC 2018）
- [x] MS-Rank: Multi-Metric and Self-Adaptive Root Cause Diagnosis for Microservice Applications （ICWS 2019）
- [x] Graph-based root cause analysis for service-oriented and microservice architectures （JSS 2020）
- [x] Microservices Monitoring with Event Logs and Black Box Execution Tracing （TSC 2019）
- [x] Fault Analysis and Debugging of Microservice Systems: Industrial Survey, Benchmark System, and Empirical Study （TSE 2018）
- [x] Root Cause Analysis of Anomalies of Multitier Services in Public Clouds （TON 2018）
- [ ] Ranking Causal Anomalies by Modeling Local Propagations on Networked Systems （ICDM 2017）





