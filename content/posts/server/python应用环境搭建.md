---
title: "python应用环境搭建"
date: "2020-06-05T00:00:00+08:00"
tags: 
- python
categories: 
- server
draft: false
---

## 安装python3

首先下载python3安装包，在csdn上下载可能更快一点。

如果是在服务器上安python3，那可能需要修改镜像源。

## app依赖

由于代码里需要import很多依赖，如果直接跑`python app.py`就会报各种依赖不存在的错误，所以需要先安装所有的依赖：`pip install -r requirements.txt`



## 参考

https://www.cnblogs.com/Simple-Small/p/12221135.html （安装python3）

https://github.com/shiniao/mini_sms_classify （python应用需要import的依赖）

https://blog.csdn.net/timtian008/article/details/81186356 （国内python下载太慢了）