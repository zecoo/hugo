---
title: "istio envoy log type"
date: "2020-05-06T00:00:00+08:00"
draft: false
---

基本数据这样

```
[2020-05-06T03:45:16.417Z] "GET /status/418 HTTP/1.1" 418 - "-" "-" 0 135 1 1 "-" "curl/7.64.0" "37e43f05-46f5-4354-ac62-bab3106d1c46" "httpbin:8000" "127.0.0.1:80" inbound|8000|http|httpbin.default.svc.cluster.local 127.0.0.1:38718 10.244.0.49:80 10.244.0.47:36120 outbound_.8000_._.httpbin.default.svc.cluster.local default
[2020-05-06T03:46:22.487Z] "GET /status/418 HTTP/1.1" 418 - "-" "-" 0 135 1 1 "-" "curl/7.64.0" "c9473b7e-82af-458a-9846-1b4ec1169f22" "httpbin:8000" "127.0.0.1:80" inbound|8000|http|httpbin.default.svc.cluster.local 127.0.0.1:39824 10.244.0.49:80 10.244.0.47:37226 outbound_.8000_._.httpbin.default.svc.cluster.local default
```

istio bookinfo示例中给出的log是这样



区别的重点在于 samples/bookinfo/telemetry/log-entry.yaml 这个文件。