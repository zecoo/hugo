---
title: "Istio 可视化插件概览"
date: 2020-04-30T10:35:07+08:00
draft: true
tags: ["istio", "prom"]
categories: ["istio"]
---

## Prometheus

基本的metrics监测插件。

通过query查询不同的信息，例如以下信息就是`istio_requests_total`这条query查询到的n条数据中的一条。（不全，删除了部分我不关注的信息）

```shell
istio_requests_total{destination_app="productpage",destination_principal="spiffe://cluster.local/ns/default/sa/bookinfo-productpage",destination_service="productpage.default.svc.cluster.local",destination_service_name="productpage",destination_service_namespace="default",destination_version="v1",destination_workload="productpage-v1",instance="10.244.0.24:15090",job="envoy-stats",namespace="istio-system",pod_name="istio-ingressgateway-6489d9556d-bc48z",response_code="503",source_workload="istio-ingressgateway",source_workload_namespace="istio-system"}
```

## Grafana

Metrics可视化插件。

Request Volume代表什么？

Request Duration中的P50、P90分别代表什么？

## Jaegar

主要显示调用了哪些微服务，调用顺序是什么样的，响应时间是多少。

## Kiali

链路追踪可视化插件。可以看出有几个微服务，调用关系是什么样的。

里面也有P50、P90。说明这个很关键啊。

P90=100ms，就是说90%的请求其响应时间在100ms以内，剩余10%的响应时间大于100ms。

## Siege

压测工具。来看看压测结果

```shell
$ siege -d 10 -c 200 -t 2 http://121.37.159.247:32753/productpage
Lifting the server siege...
Transactions:		         519 hits
Availability:		       99.24 %
Elapsed time:		      119.34 secs
Data transferred:	       20.14 MB
Response time:		        9.01 secs
Transaction rate:	        4.35 trans/sec
Throughput:		        0.17 MB/sec
Concurrency:		       39.17
Successful transactions:         519
Failed transactions:	           4
Longest transaction:	      110.01
Shortest transaction:	        0.08
```

模拟200个用户，每间隔10ms发送一次请求，持续2分钟。

## 参考

---

https://blog.dianduidian.com/post/percentile-百分位数/（p50、p90讲解）