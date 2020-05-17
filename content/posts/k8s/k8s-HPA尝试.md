---
title: "k8s HPA尝试"
date: "2020-05-04T00:00:00+08:00"
draft: false
tags: ["k8s"]
categories: ["k8s", "HPA"]
---



先提一个题外话：如何销毁已经创建的部署？答：

有`kubectl create -f ./metrics-server`就有`kubectl delete -f ./metrics-server`

按照主要参考，大部分都可以实现。但是有几个坑需要注意

* autoscaling的版本分为v1beta1、v2beta1、v2beta2。用法不同
* `deployment: extension/v1beta1`这样的用法我改为`apps/v1beta1`创建HPA才能成功

HPA的重点是hpa.yaml里面的cpu和mem的指定。

Prometheus + HPA的重点是如何将Prom的数据改为metrics server可以使用的数据。这里的方法应该是config-map中构建的一系列rule。先拿来用，暂时不去深究。

## 参考

---

https://blog.csdn.net/yevvzi/article/details/79561150 （本文主要参考）

https://blog.csdn.net/xktxoo/article/details/87909432 （jq介绍）

https://cloud.tencent.com/developer/article/1394657 （selector问题）

https://q.cnblogs.com/q/125354/ （target问题）

https://blog.51cto.com/13740724/2368066 （新版本该这么用）

https://www.cnblogs.com/yunqishequ/p/10006896.html （不同版本autoscaling）

https://stackoverflow.com/questions/43163625/when-i-use-deployment-in-kubernetes-whats-the-differences-between-apps-v1beta1 （deployment version）