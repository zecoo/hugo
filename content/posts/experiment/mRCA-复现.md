---
title: "mRCA 复现"
date: "2020-XX-XXT00:00:00+08:00"
tags: 
categories: 
draft: false
---



```shell
histogram_quantile(0.50, sum(irate(istio_request_duration_seconds_bucket{reporter="source", destination_workload_namespace="sock-shop"}[1m])) by (destination_workload, source_workload, le))
```



```json
[{'metric': {'destination_workload': 'orders-db', 'source_workload': 'orders'}, 'value': [1594888889.714, '0.03426666666666667']}, 
```



记录一个大致的过程

- locust GET请求没有问题
- POST请求如果参数合理也没有问题
- 卡在了login上面



1. login 在client.js里写了有一个xhr.setHttpRequest的东西，需要验证base64加密过的header
2. 是这样啊，那我的locust加密header送过去了但是无法正常返回
3. 那我就去看了sock-shop的源码，在user/api/trasport.go 文件里看到了basicAuth的过程



至此为止也就卡住了



[官网说明确实header的用法没错](https://docs.locust.io/en/stable/changelog.html#improved-http-client)