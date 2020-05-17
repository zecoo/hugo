---
title: "istio envoy log type"
date: "2020-05-06T00:00:00+08:00"
draft: false
tags: ["istio"]
categories: ["istio"]
---

基本数据这样

```shell
【START_TIME】[2020-05-06T09:32:24.488Z] 
【METHOD】"GET 【PATH】/flasgger_static/swagger-ui-bundle.js 【PROTOCOL】HTTP/1.1" 
【REPONSE CODE】200 - "-" "-" 0 1048149 261 225 
【FORWARD_FOR】"-" 
【AGENT】"Mozilla/5.0 (pc-x86_64-linux-gnu) Siege/4.0.5"
【REQUEST_ID】"51b45953-9ede-9390-b8b5-162247165a5b"
【AUTHORITY】"10.108.208.232:8000" 
【HOST】"127.0.0.1:80" 
inbound|8000|http|httpbin.default.svc.cluster.local 127.0.0.1:43000 10.244.0.67:80 10.244.0.1:10504 - default
```

```basic
0 135 1 1            (/status/418)
0 9593 73 73         (http/1.1)
0 1428809 1 1        (swagger-ui.bundle.js)
0 85578 1 0          (jquery.min.js)
0 0 118 -            (DC ResponseCode:0)
0 1048149 261 225    (swagger-ui.bundle.js)
```

那么这4串数字分别代表什么呢？根据Envoy官方给出的对应关系，由于HTTP_FLAGS一般都是比较特别的，而我得到的都是"-"，可以得到对应关系：

```shell
[1]BYTES_RECEIVED [2]BYTES_SENT [3]DURATION [4]ENVOY-UPSTREAM-SERVICE-TIME
```

istio bookinfo示例中给出的log是这样（官方给出的，我现在不想折腾Mixer，得不到这个数据）

```shell
{"level":"warn","time":"2018-09-15T20:46:35.982761Z","instance":"newlog.xxxxx.istio-system","destination":"productpage","latency":"968.030256ms","responseCode":200,"responseSize":4415,"source":"istio-ingressgateway","user":"unknown"}
```

区别的重点在于 samples/bookinfo/telemetry/log-entry.yaml 这个文件。

但是如果要log的话，要用到Mixer这个组件，然而Mixer已经被官方弃用了，怎么官方文档还是要这玩意儿？

中文文档更新得好慢啊，Envoy获取log已经不在英文的文档里了…

## 参考

---

https://github.com/istio/istio/tree/master/mixer （Mixer被弃用）

https://istio-releases.github.io/v0.1/docs/tasks/installing-istio.html （安装Mixer）

https://www.envoyproxy.cn/configurationreference/accesslogging （envoy access log format 中文文档）

https://blog.csdn.net/luo15242208310/article/details/98745143 （用彩色区分了不同的log部分）