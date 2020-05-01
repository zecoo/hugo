---
title: "Bayesian Optimization 直观理解"
date: 2020-04-21T11:37:07+08:00
draft: true
---

# Bayesian Optimization 直观理解

## 目标

最小(大)化一个没有具体表达式的函数。

## 举个例子

给定一个函数
$$
f(x,y) = -x^2 - (y-1)^2 +1
$$


BO通过几次迭代找到能让 *f(x,y)* 最小的x和y的值。

## 吐槽一下

中文的科普环境能不能再差一点？都尼玛是秀智商的。

一个简单的东西讲得巨鸡儿复杂，还觉得自己抖机灵挺可爱的。说得就是这篇[博客](https://zhuanlan.zhihu.com/p/76269142)。

幸好让我遇到了还算可以的[另一篇博客](https://zhuanlan.zhihu.com/p/119442817)。

当然都不及老外的[blog](https://mlconf.com/blog/lets-talk-bayesian-optimization/)。

我真的不是崇洋媚外。就是在讲一个事实。科学的范畴，中文优秀博客少得可怜。至少百度出来的是这样。