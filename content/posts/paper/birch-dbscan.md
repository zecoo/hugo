---
title: "Birch Dbscan"
date: 2021-09-08T15:32:30+08:00
draft: true
---

# BIRCH

## 参数

三个参数：

1. n(cf)
2. n(leaf)
3. R

其中， n(cf)表示一个簇集中最大的元素个数；n(leaf)和BIRCH构造的CF Tree有关，表示CF Tree的叶子结点；最后R半径表示距离在R以内的点可以组成一个簇集。

在MicroRCA这个项目里：n(cf)是不设定的，通过BIRCH自己决定聚成什么样的几个簇集；n(leaf)=50；R=0.045。

## 特点

BIRCH的特点总结有下面几点：

1. 适合数据量大、类别多的聚类
2. 支持数据流的聚类，也就是不需要一次性把所有的数据都给足了才开始聚类

# DBSCAN

## 参数

1. MinPts（半径内的数据点个数）
2. Eps（半径）

## 特点

1. 不同的参数组合对最后的聚类结果影响较大
2. 可以在聚类的同时发现异常点

# 对比

简单对比一下，BIRCH和DBSCAN都需要提前设定半径，但是BIRCH更适合我这个例子的一点是不需要提前设定一个簇集内的元素个数。

# 参考

https://www.biaodianfu.com/birch.html （这篇对BIRCH讲得是真好啊）

https://blog.csdn.net/haveanybody/article/details/112476926 （这篇也有BIRCH的例子）

https://blog.csdn.net/The_dream1/article/details/119209196 （这里面有几个聚类过程的动画太牛了）

https://blog.csdn.net/zhixiting5325/article/details/90021024 （还有HDBSCAN？？）

https://www.biaodianfu.com/dbscan.html （DBSCAN讲解，绘图代码也有）
