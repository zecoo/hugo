---
title: "PromQL理解"
date: "2020-05-08T00:00:00+08:00"
draft: false
tags: ["prom"]
categories: ["prom"]

---

## 期待数据

10min内的请求数（sum）

```shell
istio_requests_total{destination_service_name="productpage"}
```

10min内的请求数增长率（rate）

```shell
rate(istio_requests_total{destination_app="productpage"}[10m])
```

10min内的响应时间P90（quantile）

```shell
histogram_quantile(0.90, sum(rate(istio_request_duration_milliseconds_bucket{destination_app="productpage"}[10m])) by(le))
```

10min内的响应时间增长率（rate）

```shell
rate(istio_request_duration_milliseconds_bucket{destination_app="productpage"}[10m])
```

## 参考

---

https://www.zhihu.com/question/380615839 （Prom时区UTC没法改）