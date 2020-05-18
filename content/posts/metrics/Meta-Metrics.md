---
title: "Meta Metrics"
date: "2020-05-07T00:00:00+08:00"
draft: false
tags: ["istio", "prom"]
categories: ["istio"]

---

siege一分钟压测最后给出的统计数据：

```shell
Lifting the server siege...
Transactions:		         439 hits
Availability:		       51.83 %
Elapsed time:		       59.33 secs
Data transferred:	        8.47 MB
Response time:		        9.88 secs
Transaction rate:	        7.40 trans/sec
Throughput:		        0.14 MB/sec
Concurrency:		       73.10
Successful transactions:         439
Failed transactions:	         408
Longest transaction:	       56.69
Shortest transaction:	        0.13
```

istio Envoy的access log：

```shell
【START_TIME】[2020-05-06T09:32:24.488Z] 
【METHOD】"GET 
【PATH】/flasgger_static/swagger-ui-bundle.js 
【PROTOCOL】HTTP/1.1" 
【REPONSE CODE】200 - "-" "-" 0 1048149 261 225 
【FORWARD_FOR】"-" 
【AGENT】"Mozilla/5.0 (pc-x86_64-linux-gnu) Siege/4.0.5" 
【REQUEST_ID】"51b45953-9ede-9390-b8b5-162247165a5b" 
【AUTHORITY】"10.108.208.232:8000" 
【HOST】"127.0.0.1:80" 
【SERVICE】inbound|8000|http|httpbin.default.svc.cluster.local
【CLUSTER_IP】127.0.0.1:43000 10.244.0.67:80 10.244.0.1:10504 - 
【APP】default
```

Prom关于duration的metric：

```shell
"metric":{
	"__name__":"istio_request_duration_milliseconds_bucket",
	"connection_security_policy":"unknown",
	"destination_app":"productpage",
	"destination_canonical_revision":"v1",
	"destination_canonical_service":"productpage",
	"destination_service":"productpage.default.svc.cluster.local",
	"destination_service_name":"productpage",
	"destination_service_namespace":"default",
	"destination_version":"v1",
	"destination_workload":"productpage-v1",
	"destination_workload_namespace":"default",
	"instance":"10.244.0.14:15090",
	"job":"envoy-stats",
	"le":"6000",
	"namespace":"default",
	"pod_name":"ratings-v1-6f855c5fff-wsqpx",
	"reporter":"source",
	"request_protocol":"http",
	"response_code":"200",
	"response_flags":"-",a
	"source_app":"ratings",
	"source_canonical_revision":"v1",
	"source_canonical_service":"ratings",
	"source_principal":"spiffe://cluster.local/ns/default/sa/bookinfo-ratings",
	"source_version":"v1",
	"source_workload":"ratings-v1",
	"source_workload_namespace":"default"},
	"values":[[1588835634.769,"2"],[1588835649.769,"2"],[1588835664.769,"2"],[1588835679.769,"2"]]
},

```

## 参考

https://prometheus.io/docs/prometheus/latest/querying/api/ （curl query获取metric）