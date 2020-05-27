---
title: "Service Dependecy Graph Building"
date: "2020-05-26T00:00:00+08:00"
tags: ["trace", "ing"]
categories: ["istio"]
draft: false
---

kiali是trace的一个可视化工具，那么我怎么才能拿到trace的原始数据呢？

istio的数据也都是prom给的，prom的metric之前已经看过了。怎么从prom的metric构造一个trace处理呢？



## 参考

https://blog.csdn.net/qq_42038407/article/details/103510066 （深入istio源码查看kiali的数据来源）

https://www.jianshu.com/p/82853ed9bc4a （jaeger、prom、grafana截图）

https://www.cnblogs.com/loveis715/p/5277051.html （neo4j介绍好文）