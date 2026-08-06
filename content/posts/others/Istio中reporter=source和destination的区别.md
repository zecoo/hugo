---
title: "Istio中reporter=source和destination的区别"
date: "2020-12-22T00:00:00+08:00"
tags: ["istio"]
categories: ["istio"] 
draft: false
---

以下是istio官网给出的区别：

> **Reporter**：这是请求报告者的标识符。报告从服务端 Istio 代理而来时设置为 `destination`，从客户端 Istio 代理而来时设置为 `source`。

但是显然没有说人话。然后我又在Bing上面找了几个版本：

1. `reporter="source"` ：metric 报告来源，源服务（source）是 [envoy](https://www.colabug.com/goto/aHR0cHM6Ly9pc3Rpby5pby96aC9oZWxwL2dsb3NzYXJ5LyNlbnZveQ==) 代理的下游客户端。在 [服务网格](https://www.colabug.com/goto/aHR0cHM6Ly9pc3Rpby5pby96aC9oZWxwL2dsb3NzYXJ5LyMlRTYlOUMlOEQlRTUlOEElQTElRTclQkQlOTElRTYlQTAlQkM=) 里，一个源服务通常是一个 [工作负载](https://www.colabug.com/goto/aHR0cHM6Ly9pc3Rpby5pby96aC9oZWxwL2dsb3NzYXJ5LyMlRTUlQjclQTUlRTQlQkQlOUMlRTglQjQlOUYlRTglQkQlQkQ=) ，但是入口流量的源服务有可能包含其他客户端，例如浏览器，或者一个移动应用。
2. reporter=source就是来自于源Envoy，reporter=destination就是目标Envoy



甚至连例子都有了：

```shell
{destination_app="sauron-seo-app",reporter="destination",source_app="consumer-gateway"} 58
```

这代表过去 24 小时里，从 `consumer-gateway` 到 `sauron-seo-app` 的请求中有 58 个出了问题，得到了 `503UC` 的结果，这一情况是由 `sauron-seo-app` 的 Envoy 汇报而来。



直到最后我突然想到探究一下响应时间究竟是个什么玩意儿，然后我就找到了这个：

> 响应时间=网络传输时间（请求）+服务器处理时间（一层或是多层）+网络传输时间（响应）+页面前段解析时间

![img](https://images2015.cnblogs.com/blog/974318/201706/974318-20170614100706071-172222311.png)

那我一直讨论的其实就是数据从server返回的时间/数据从client发送的时间。在图里就是下面箭头表示的时间/上面箭头表示的时间。这个比值比较大的话，反映的其实是server处理数据的时间比较长。这…感觉我这个工作就太简单了啊。

结合istio官网给出的“从服务端 Istio 代理而来时设置为 `destination`，从客户端 Istio 代理而来时设置为 `source`。”似乎就能说得通了。



附上收集数据的PromQL：

```shell
histogram_quantile(0.50, sum(irate(istio_request_duration_seconds_bucket{reporter="destination", destination_workload_namespace="sock-shop"}[1m])) by (destination_workload, source_workload, le))'
```



## 参考

https://istio.io/latest/zh/docs/reference/config/policy-and-telemetry/metrics/ （官网）

https://blog.csdn.net/lyj0629/article/details/80207598 （响应时间包括）

https://www.cnblogs.com/bell1991/p/7007463.html （响应时间组成）

https://cloud.tencent.com/developer/article/1471457

https://jimmysong.io/blog/envoy-sidecar-injection-in-istio-service-mesh-deep-dive/ （JimmySong永远滴神）