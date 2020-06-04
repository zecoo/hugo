---
title: "istio envoy log type"
date: "2020-05-06T00:00:00+08:00"
draft: false
tags: ["istio"]
categories: ["istio"]
---

## Envoy log type

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

### 获取相应时间数据

特别得，我想知道响应时间，但是好像没有具体列出来。不过每个envoy log都有4个数字特别可疑：

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

于是响应时间duration其实就可以拿到了。

### 具体例子

Envoy对productpage的日志也可以收集到：

```shell
root@1201:istio-1.4.3 $ kubectl logs -l app=productpage -c istio-proxy
[2020-05-28T09:17:49.996Z] "GET /static/bootstrap/js/bootstrap.min.js HTTP/1.1" 200 - "-" "-" 0 37045 241 240 "10.244.0.1" "Mozilla/5.0 (apple-x86_64-darwin19.0.0) Siege/4.0.4" "11bc5f08-0c8e-4a16-b0a5-b2c3f8900a4f" "39.100.0.61:30681" "127.0.0.1:9080" inbound|9080|http|productpage.default.svc.cluster.local - 10.244.0.160:9080 10.244.0.1:0 - default
[2020-05-28T09:17:48.036Z] "GET /productpage HTTP/1.1" 200 - "-" "-" 0 5179 2201 2201 "10.244.0.1" "Mozilla/5.0 (apple-x86_64-darwin19.0.0) Siege/4.0.4" "55cf1e7f-c6f7-41b0-9295-e3f72ecf5282" "39.100.0.61:30681" "127.0.0.1:9080" inbound|9080|http|productpage.default.svc.cluster.local - 10.244.0.160:9080 10.244.0.1:0 - default
```

## 关于Mixer

istio bookinfo示例中给出的log是这样，latency是直接给出来的，也太好了吧。（官方给出的，我现在不想折腾Mixer，得不到这个数据）

```shell
{"level":"warn","time":"2018-09-15T20:46:35.982761Z","instance":"newlog.xxxxx.istio-system","destination":"productpage","latency":"968.030256ms","responseCode":200,"responseSize":4415,"source":"istio-ingressgateway","user":"unknown"}
```

区别的重点在于 samples/bookinfo/telemetry/log-entry.yaml 这个文件。

但是如果要log的话，要用到Mixer这个组件，然而Mixer已经被官方弃用了，怎么官方文档还是要这玩意儿？

中文文档更新得好慢啊，Mixer获取log已经不在英文的文档里了…



## 参考

https://github.com/istio/istio/tree/master/mixer （Mixer被弃用）

https://istio-releases.github.io/v0.1/docs/tasks/installing-istio.html （安装Mixer）

https://www.envoyproxy.cn/configurationreference/accesslogging （envoy access log format 中文文档）

https://blog.csdn.net/luo15242208310/article/details/98745143 （用彩色区分了不同的log部分）