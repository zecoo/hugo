---
title: "jq in terminal for json"
date: "2020-05-08T00:00:00+08:00"
draft: false
tags: ["server", "jq"]
categories: ["server"]
---

Prom返回的json格式没有reindent，看起来很费眼睛。

```json
{"metric":{"__name__":"istio_requests_total","destination_app":"productpage","destination_service":"productpage","value":[1588929523.247,"10523"]}]}}
```

在命令行，想让其用缩进好的json展示出来，就要用到jq。

```shell
curl http://test.json | jq
```

只需要在后面加上jq，就可以看到漂亮的json格式数据

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
```

## 参考

https://stedolan.github.io/jq/manual/#example6 （jq官方手册）

https://jqplay.org （jq playground）

