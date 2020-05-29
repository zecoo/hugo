---
title: "Service Dependecy Graph Building"
date: "2020-05-26T00:00:00+08:00"
tags: ["trace", "ing"]
categories: ["istio"]
draft: false
---

kiali是trace的一个可视化工具，那么我怎么才能拿到trace的原始数据呢？

istio的数据也都是prom给的，prom的metric之前已经看过了。怎么从prom的metric构造一个trace处理呢？

Istio中Jaeger的数据是临时存在内存里的。

Envoy的日志可以收集到，我又可以了。

```shell
root@1201:istio-1.4.3 $ kubectl logs -l app=productpage -c istio-proxy
[2020-05-28T09:17:49.996Z] "GET /static/bootstrap/js/bootstrap.min.js HTTP/1.1" 200 - "-" "-" 0 37045 241 240 "10.244.0.1" "Mozilla/5.0 (apple-x86_64-darwin19.0.0) Siege/4.0.4" "11bc5f08-0c8e-4a16-b0a5-b2c3f8900a4f" "39.100.0.61:30681" "127.0.0.1:9080" inbound|9080|http|productpage.default.svc.cluster.local - 10.244.0.160:9080 10.244.0.1:0 - default
[2020-05-28T09:17:48.036Z] "GET /productpage HTTP/1.1" 200 - "-" "-" 0 5179 2201 2201 "10.244.0.1" "Mozilla/5.0 (apple-x86_64-darwin19.0.0) Siege/4.0.4" "55cf1e7f-c6f7-41b0-9295-e3f72ecf5282" "39.100.0.61:30681" "127.0.0.1:9080" inbound|9080|http|productpage.default.svc.cluster.local - 10.244.0.160:9080 10.244.0.1:0 - default
```



## 参考

https://blog.csdn.net/qq_42038407/article/details/103510066 （深入istio源码查看kiali的数据来源）

https://www.cnblogs.com/loveis715/p/5277051.html （neo4j介绍好文）

https://juejin.im/entry/5b0aa414f265da0ddf04a894 (nodeport可以用来画图)

https://pjw.io/articles/2018/05/18/jaeger-tutorial/ （Jaeger好文）

https://yq.aliyun.com/articles/514488?utm_content=m_43347 （理解jaeger极好的图）

https://packyzbq.gitee.io/jaeger-istio.html （Istio中Jaeger的数据存储）

https://github.com/IgaguriMK/envoy-dummy-stats/blob/master/sample/envoy-stats.txt （帮助理解envoy的奇怪PromQL）