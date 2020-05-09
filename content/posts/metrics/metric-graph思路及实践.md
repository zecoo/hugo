---
title: "Metric to Graph思路及实践"
date: "2020-05-08T00:17:00+08:00"
draft: false
---

## 整体思路

### 01 查看Prom的metric：

写好PromQL获得自己想要的metric，这时候只是文本的形式。而且又臭又长。

```json
"metric": {
                    "__name__": "istio_requests_total",
                    "connection_security_policy": "unknown",
                    "destination_app": "productpage",
                    "destination_canonical_revision": "v1",
                    "destination_canonical_service": "productpage",
                    "destination_principal": "spiffe://cluster.local/ns/default/sa/bookinfo-productpage",
                    "destination_service": "productpage.default.svc.cluster.local",
                    "destination_service_name": "productpage",
                    "destination_service_namespace": "default",
                    "destination_version": "v1",
                    "destination_workload": "productpage-v1",
                    "destination_workload_namespace": "default",
                    "instance": "10.244.0.61:15090",
                    "job": "envoy-stats",
                    "namespace": "istio-system",
                    "pod_name": "istio-ingressgateway-6489d9556d-ws6cg",
                    "reporter": "source",
                    "request_protocol": "http",
                    "response_code": "200",
                    "response_flags": "-",
                    "source_app": "istio-ingressgateway",
                    "source_canonical_revision": "1.5",
                    "source_canonical_service": "istio-ingressgateway",
                    "source_principal": "spiffe://cluster.local/ns/istio-system/sa/istio-ingressgateway-service-account",
                    "source_version": "unknown",
                    "source_workload": "istio-ingressgateway",
                    "source_workload_namespace": "istio-system"
                },
                "value": [
                    1588918429.726,
                    "5148"
                ]
}
```

### 02 提取metric

用代码或者在浏览器中用Prom提供的HTTP API访问提取metrics。请不要用curl，这个坑在另一个博客里已经提到了。

```shell
http://prom_url/api/v1/query?query=req_total{destination_app="x"}
```

### 03 可视化metric

最简单的方法：Grafana，我是瞎猫碰到死耗子找到的。版本v6.5.2点Explore，可以输入PromQL直接生成漂亮的graph，但是做论文的图的话可能还是要用plot画图。