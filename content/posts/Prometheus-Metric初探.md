---
title: "Prometheus Metric初探"
date: "2020-05-03T00:00:00+08:00"
draft: false
---

## Prom的四种基本metric类型

1. counter：从0开始计数的，比如http_req_total
2. gauge：有浮动的指标，比如cpu、mem
3. histogram：统计数据，比如P90
4. summary：和histogram类似

## 几个示例

### P90的获取方法

> The φ-quantile is the observation value that ranks at number φ*N among the N observations. Examples for φ-quantiles: The 0.5-quantile is known as the median. The 0.95-quantile is the 95th percentile.

官方示例：10分钟内请求持续时间的90%，以PromQL的形式给出：

```shell
histogram_quantile(0.9, rate(http_request_duration_seconds_bucket[10m]))
```

### le="0.3"

5分钟内响应时间在300ms以下的请求（le="0.3" means requests within 300ms）

```shell
sum(rate(http_request_duration_seconds_bucket{le="0.3"}[5m])) by (job)
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

最后的灵魂一问：如何知道Prom有哪些可用的metrics呢？

## 参考

---

https://www.v2ex.com/t/606786 （中文讲Prom metrics最详细的文章了吧）

https://www.jianshu.com/p/15f929160f38 （四种metric类型介绍得很棒）

https://prometheus.io/docs/concepts/metric_types/ （官方解释metrics type）

https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile （P90官方说明）

https://github.com/prometheus/client_python#histogram （python埋点方法）

https://www.cnblogs.com/YaoDD/p/11391316.html （go埋点获取metrics详解）

https://prometheus.io/docs/practices/histograms/ （histogram官方介绍）