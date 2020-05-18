---
title: "PromQL query in http API"
date: "2020-05-08T00:00:00+08:00"
draft: false
tags: ["prom"]
categories: ["prom"]
---

Prom官网给出http API例如获取2015年7月1号某天的数据这样写：（我获得了istio_requests_total的所有metric）

```shell
curl 'http://localhost:9090/api/v1/query?query=istio_requests_total&time=2015-07-01T20:10:51.781Z'
```

我想用PromQL，类似Prom的UI针对repose_code对query进行过滤

```
query?istio_requsets_total{response_code=200}
```

按照普通的思路我试着这样修改curl地址如下：

```shell
curl 'http://localhost:9090/api/v1/query?query=istio_requsets_total{response_code=200}&time=2020-05-07T20:10:51.781Z'
```

失败。花了很长时间找资料，找不到。

最后用浏览器试一下，在`http://localhost:9090/api/v1/query?query=`之后把PromQL直接粘贴在后面就可以访问到。浏览器这边帮忙做了处理，最后的地址形式是这样的；

```
http://121.37.159.247:30040/api/v1/query?query=istio_requests_total{response_code=%22200%22}
```

把引号`"`处理成了`%22`。

## 参考

https://prometheus.io/docs/prometheus/latest/querying/api/ （官方http API用法）