---
title: "Data Structure Review"
date: 2021-09-13T19:15:57+08:00
draft: true
---

[toc]

# 常见数据结构

队列、栈、数组、指针、链表、树、哈希表、图

## 1 栈和队列

- 栈：先进后出
- 队列：先进先出

想进一步理解栈和队列，就做一下经典题目：用两个栈实现队列。

## 2 数组和链表

- 数组是栈分配的连续空间，查找比较方便，但是插入和删除比较复杂
- 链表是堆分配的空间，有两个属性：value和指向下一个元素的pointer指针。链表插入和删除非常方便，适合动态拓展。

# 树

## 二叉树遍历

![tree](https://img2018.cnblogs.com/blog/1590962/201903/1590962-20190306194614674-1602895543.png)

- 前序遍历：**GDAFEMHZ**
- 中序遍历：**ADEFGHMZ**
- 后序遍历：**AEFDHZMG**

代码如果用递归的方式来写：

- 前序遍历：根节点、前序左子树、前序右子树
- 中序遍历：中序左子树、根节点、中序右子树
- 后序遍历：后序左子树、后序右子树、根节点

# 图

## BFS和DFS

![BFS&DFS](https://img-blog.csdnimg.cn/20200330172130481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FjaGVubWluZzEzMTQ=,size_16,color_FFFFFF,t_70#pic_center)

- BFS：ABFCIGEDH
- DFS：ABCDEFGHI

# 排序

手撕：冒泡排序、快速排序

复杂度：

稳定性：

# 查找

哈希表

如何解决哈希冲突

1. 拉链法
2. 开放地址法
3. 二次哈希

# 参考

https://blog.csdn.net/achenming1314/article/details/105203878 （图的遍历）
