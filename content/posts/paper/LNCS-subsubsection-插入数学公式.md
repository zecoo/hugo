---
title: "LNCS subsubsection 插入数学公式"
date: "2020-07-06T00:00:00+08:00"
tags: 
categories: 
draft: false
---

记一个在LNCS里用latex遇到的坑。

插入数学公式的时候遇到这样的报错：

```shell
Math formula deleted: Insufficient symbol fonts.
```

我查了一下，从这几个角度排查问题

- 可能是导包的时候`\usepackage{xxx}`不支持数学公式
- 是不是`$$`和`\begin{equation}`的区别

查了半天都没有结果，还是在控制变量的情况下发现，subsubsection后面是无法插入数学公式。section和subsection就是可以的。原因是LNCS里的subsubsection是一个整体，而不是类似于paragraph的那种。如果有换行，而且是以段落的形式来体现subsubsection就可以插入数学公式。

那怎么调整LNCS里subsubsection的格式呢？参考[这篇文章](http://blog.sina.com.cn/s/blog_7851bb8501017zbm.html)



## 参考

http://blog.sina.com.cn/s/blog_7851bb8501017zbm.html （subsubsection格式）

