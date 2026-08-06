---
title: "ASL复现"
date: "2020-05-29T00:00:00+08:00"
tags: ["ASL"]
categories: ["paper"]
draft: false
---

## 贝叶斯优化扩容

记录下实验过程

一开始发现无论我用多大的并发去压测productpage，都是在压测的瞬间P90和P50陡增，但是不用任何扩容的操作，P90和P50都能立马降下来。如下图

![first try](http://89.33.194.100:8888/images/2020/05/29/Screen-Shot-2020-05-29-at-4.45.08-PM.md.jpg)

可以看到每一次峰值就是我增加一个压测后立马出现的情况。但是不做任何操作立马回落到正常。

一开始考虑要么让物理机的CPU和Mem限制住，但是觉得这样开销太大了。要不试试把pod的CPU和Mem限制住？立即开干。查到了限制pod资源的方法：

```yaml
spec:
  containers:
  - image: gcr.io/google_containers/serve_hostname
    imagePullPolicy: Always
    name: kubernetes-serve-hostname
    resources:
      limits:
        cpu: "1"             #限制pod申请最大的cpu数量为1个cpu
        memory: 512Mi        #申请内存最大值
      requests:
        cpu: "0.5"           #pod申请的cpu数量为0.5个cpu
        memory: 400Mi        #申请内存的最小值
```

调整限制的大小，发现cpu给0.1，mem给100m是比较合适的。继续尝试实验，如下图

![2nd try](http://89.33.194.100:8888/images/2020/05/29/Screen-Shot-2020-05-29-at-5.54.46-PM.jpg)

仔细解说一下哈：

17:41分的时候，我开了两个并发为200的压测，指标立马上去了。BO这时候在后台跑着呢，记录一下几次迭代的结果：

```shell
|   iter    |  target   |     x     |
time : 2020-05-29 17:41:44
|  2        | -55.71    |  1.441    |
Pod Count Set to: 1
|  3        |  8.421    |  0.000228 |
Pod Count Set to: 1
|  4        | -70.0     |  0.6047   |
Pod Count Set to: 1
|  5        | -99.0     |  0.2935   |
Pod Count Set to: 2
|  6        | -38.55    |  1.112    |
Pod Count Set to: 3
time : 2020-05-29 17:43:21
|  7        |  6.02     |  2.0      |
Pod Count Set to: 2
```

pod_count稳定在2，指标就恢复稳定了。一直到17:47分，BO迭代结束，关闭一个压测，仅保留一个。重新开启BO，BO初始值立马给我从2调整为1，可以看到这里指标又飙上去了，BO第二次迭代调整为2，但是几次迭代之后又稳定在1，一直延续到17:55分。

```shell
集群大小： 2
开始缩容，时间： 2020-05-29 17:46:56
|   iter    |  target   |     x     |
-------------------------------------
Pod Count Set to: 1
|  1        |  16.03    |  0.834    |
Pod Count Set to: 2
|  2        | -42.68    |  1.441    |
Pod Count Set to: 1
|  3        |  4.267    |  0.000228 |
Pod Count Set to: 1
```

可以看出有一个问题，BO每次迭代都能得到一个值，有时候一丢丢的不稳定就会造成扩容数量的增大或者减小，这就是几篇扩容相关论文里提到的震荡的问题。

## 参考

https://blog.csdn.net/ljx1528/article/details/82867115 （限制pod资源讲解）