---
title: "初试Nginx部署静态网页"
date: 2020-04-09T11:37:07+08:00
draft: false
tags: ["nginx"]
categories: ["server"]
---

在ife上也写了几个网页了，但是如果一直用github-pages的话，感觉有点麻烦，自己有一个服务器干嘛不直接用呢？

安装Nginx及其简单：

`apt install nginx`

这个时候如果发现终端不动了，没啥反应，其实是Nginx已经启动了，浏览器输入地址看看是不是能看到nginx欢迎页。

下一步给nginx设置自己的主页

按照参考博客给出的思路，先建立一个文件夹作为nginx访问目录。比如/www/static-web

然后给自己的目的设置一个nginx配置文件，配置文件地址

`cd /etc/nginx/conf.d/`

然后新建一个static-hello.conf

写进以下内容：

```json
server {
	server_name = 89.33.194.100; // 你自己的地址或者域名
	root /root/www/static-web; // nginx访问目录
	index index.html;
	location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt){
		root /root/www/static-web/;
	}
}
```

然后重启nginx

`nginx -s reload`

我在浏览器访问了一下自己的地址，发现403 Forbidden。故排查之。

查看nginx错误信息

`cat /var/log/nginx/error.log`

得到这样的信息

```
2020/04/08 23:43:58 [notice] 1390#1390: signal process started
2020/04/08 23:44:10 [error] 1391#1391: *4 "/root/www/static-web/index.html" is forbidden (13: Permission denied), client: 171.41.91.51, server: =, request: "GET / HTTP/1.1", host: "89.33.194.100"
```

说明权限不够，故搜索[解决方案](https://www.liangjucai.com/article/224)

找到编辑nginx配置文件（一般是/etc/nginx/nginx.conf）。然后我在开头就找到问题了

```
root@zecoo:/etc/nginx# cat nginx.conf 
user www-data;
worker_processes auto;
pid /run/nginx.pid;
```

user 是www-data不是root，更改之后重启，就能看到指定目录下的index.html了。



---

参考：
https://segmentfault.com/a/1190000010487262?utm_source=tag-newest

https://www.liangjucai.com/article/224