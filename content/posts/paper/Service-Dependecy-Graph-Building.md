---
title: "Service Dependecy Graph Building"
date: "2020-06-04T00:00:00+08:00"
tags: ["trace", "istio"]
categories: ["paper"]
draft: false
---

## 开始之前

正式开始之前我问自己这样几个问题

1. *kiali是trace的一个可视化工具，那么我怎么才能拿到trace的原始数据呢？*
2. *istio的数据也都是prom给的，prom的metric之前已经看过了。怎么从prom的metric构造一个trace处理呢？*

终于在今天得到了想要的答案：

首先，Prometheus和tracing没有关系。其次，trace的原始数据是jaeger提供的，具体是opentracing标准的链路追踪手段。

OK，继续深入吧。

## Jaeger数据存储

![jaeger](https://upload-images.jianshu.io/upload_images/6338598-43e67ff8256f3ec7.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200)

关于agent怎么上报span，collector如何管理span我先不关心。我现在立刻马上想要拿到trace的原始数据，最起码是能让我能二次开发的那种数据。

数据一般呢，是存在数据库里的，而我的pod里并没有数据库相关的，那数据存在哪里呢？然后我就搜到了这样一个信息：

> Istio中Jaeger的数据临时存在内存中

既然这样，Jaeger UI又是怎么抽取数据并graph展示的？会不会有Prometheus类似的api接口暴露出来？果然功夫不负有心人，让我找到了Jaeger的API：

## Jaeger trace info

### Trace API

先提下Jaeger提供的接口，因为这个东西我曾经上Jaeger官网，告诉我`/traces`这个接口是获取trace信息的API。看看原文怎么说的哈：

> Jaeger UI communicates with Jaeger Query Service via JSON API. For example, a trace can be retrieved via GET request to `https://jaeger-query:16686/api/traces/{trace-id-hex-string}`. This JSON API is intentionally undocumented and subject to change.

但是我只顾着一个劲撞南墙，基础概念都没有打好就老想着找捷径。恰好今天静下心来好好想了一下一个trace是什么，拿istio的productpage来说，一次访问网址`http://istio-gateway:port/productpage`的过程，其实就是一个完整的trace。

回到官网提供的API，也就是说我知道了trace-id，那么trace的信息就能得到了呀。而trace-id在UI里已经提供了。

### Trace meta data

回到Jaeger UI，点进一个trace，查看JSON格式的数据，其实就是我需要的数据。详细来看看这个json数据里的span都有哪些内容：

```json
{
  "data": [
    {
      "traceID": "aeb825de4ba82901d71fecb349727885",
      "spans": [
        {
          "traceID": "aeb825de4ba82901d71fecb349727885",
          "spanID": "22958c27bcc7f900",
          "operationName": "details.default.svc.cluster.local:9080/*",
          "references": [
            {
              "refType": "CHILD_OF",
              "traceID": "aeb825de4ba82901d71fecb349727885",
              "spanID": "3a4e71ebf338bd17"
            }
          ],
          "startTime": 1591240276462724,
          "duration": 40881,
          "tags": [],
          "logs": [],
          "processID": "p3",
          "warnings": null
        }
      ],
  ],
}
```

其中我最关系的是“references”里面的“refType”，CHILD_OF这种关系代表span和span之间的从属关系。举个例子：意味着我访问productpage，会连带访问detail和review两个微服务，也就是说后面两个是前者的child，那么微服务之间的调用关系图就可以构建出来了。

[这篇文章](https://github.com/opentracing-contrib/opentracing-specification-zh/blob/master/specification.md)对span讲得很好，给了我巨大的启发。特别是“特别说明，一条**Trace**（调用链）可以被认为是一个由多个**Span**组成的有向无环图（DAG图）， **Span**与**Span**的关系被命名为**References**”这一句，联系到RCA论文中的DAG，我瞬间有种想落泪的感觉。

### DAG构建

有了span和span之间的ref，对应起来画个图就OK了。

## 参考

https://blog.csdn.net/qq_42038407/article/details/103510066 （深入istio源码查看kiali的数据来源）

https://www.cnblogs.com/loveis715/p/5277051.html （neo4j介绍好文）

https://juejin.im/entry/5b0aa414f265da0ddf04a894 (nodeport可以用来画图)

https://pjw.io/articles/2018/05/18/jaeger-tutorial/ （Jaeger好文）

https://yq.aliyun.com/articles/514488?utm_content=m_43347 （理解jaeger极好的图）

https://packyzbq.gitee.io/jaeger-istio.html （Istio中Jaeger的数据存储）

https://github.com/IgaguriMK/envoy-dummy-stats/blob/master/sample/envoy-stats.txt （帮助理解envoy的奇怪PromQL）

https://www.jianshu.com/p/bd11294cf83e （让俺找到span之间的关系）