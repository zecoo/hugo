---
title: "Prometheus Metric形式"
date: "2020-05-03T00:00:00+08:00"
draft: false
tags: ["prom"]
categories: ["prom"]
---

## Prom的四种基本metric类型

1. counter：从0开始计数的，比如http_req_total
2. gauge：有浮动的指标，比如cpu、mem
3. histogram：统计数据，比如P90
4. summary：和histogram类似

## 几个示例

### P90

> The φ-quantile is the observation value that ranks at number φ*N among the N observations. Examples for φ-quantiles: The 0.5-quantile is known as the median. The 0.95-quantile is the 95th percentile.

分位点的概念。官方示例：10分钟内请求持续时间的90%，以PromQL的形式给出：

```shell
histogram_quantile(0.9, rate(http_request_duration_seconds_bucket[10m]))
```

以下数据是通过 curl http://121.37.159.247:30040/metrics 获取的，截取部分。

```shell
# HELP prometheus_tsdb_wal_fsync_duration_seconds Duration of WAL fsync.
# TYPE prometheus_tsdb_wal_fsync_duration_seconds summary
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.5"} 0.012352463
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.9"} 0.014458005
prometheus_tsdb_wal_fsync_duration_seconds{quantile="0.99"} 0.017316173
prometheus_tsdb_wal_fsync_duration_seconds_sum 2.888716127000002
prometheus_tsdb_wal_fsync_duration_seconds_count 216
```

“从上面的样本中可以得知当前Prometheus Server进行wal_fsync操作的总次数为216次，耗时2.888716127000002s。其中中位数（quantile=0.5）的耗时为0.012352463，9分位数（quantile=0.9）的耗时为0.014458005s，90%的数据都小于等于0.014458005s。”

### le="0.3"

le即level，我现在只有在官网看到对le的简单解释，而且理解起来就是duration<level。

5分钟内响应时间在300ms以下的请求（le="0.3" means requests within 300ms）

```shell
sum(rate(http_request_duration_seconds_bucket{le="0.3"}[5m])) by (job)
```

请详细介绍`request_duration_seconds_bucket`所代表的含义：

request durations in seconds（请求响应时间用单位秒表示），bucket表示所有采样点的数量。结合`le="0.3"`表示"响应时间小于300ms的采样点的数量。

更直观理解桶？可以看参考中的博客。

### rate

增长率。1分钟内的cpu使用率：

```
rate(process_cpu_seconds_total[1m])* 100
```

## key/value的metrics形式

例如：

```shell
process_max_fds 65535
```

表示当前采集的最大文件句柄数是65535。

## 埋点Prom

看着真的很简单啊，参考python的埋点方法：

```python
from prometheus_client import start_http_server, Summary
import random
import time

# Create a metric to track time spent and requests made.
REQUEST_TIME = Summary('request_processing_seconds', 'Time spent processing request')

# Decorate function with metric.
@REQUEST_TIME.time()
def process_request(t):
    """A dummy function that takes some time."""
    time.sleep(t)

if __name__ == '__main__':
    # Start up the server to expose the metrics.
    start_http_server(8000)
    # Generate some requests.
    while True:
        process_request(random.random())
```

然后就可以在localhost:8000看到prom metrics了。

自定义的metric，别人能做成这样：

![img](http://dockone.io/uploads/article/20190904/70439c252c34c63ae504f17c852863e6.png)

最后的灵魂一问：如何知道Prom有哪些可用的metrics呢？

## 参考

https://www.v2ex.com/t/606786 （中文讲Prom metrics最详细的文章了吧）

https://www.jianshu.com/p/15f929160f38 （四种metric类型介绍得很棒）

https://prometheus.io/docs/concepts/metric_types/ （官方解释metrics type）

https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile （P90官方说明）

https://github.com/prometheus/client_python#histogram （python埋点方法）

https://www.cnblogs.com/YaoDD/p/11391316.html （go埋点获取metrics详解）

https://prometheus.io/docs/practices/histograms/ （histogram官方介绍）

https://www.cnblogs.com/arloblog/p/12162858.html （这才是介绍Prom metric最详细的文章，其实是官网翻译哈哈，但是翻译的好～）

http://blog.itpub.net/28218939/viewspace-2658770/ （埋点自定义metric并grafana化）

https://www.jianshu.com/p/8a6d3eff31e7 （直观理解bucket 唯一一个讲解清楚的博客）