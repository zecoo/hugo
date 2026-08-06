---
title: "Demo: flask+vue+mysql"
date: "2020-06-05T00:00:00+08:00"
tags: 
categories:
- server 
draft: false
---

## 从本科软工教学谈起

这样一套前后端都打通的demo，才算是真的接触到软件工程的皮毛吧？

今天在想本科的教学，根本不管学生的水平差距，只让学生分几个组，做一个高大上的东西出来。于是就出现了疯狂抱大腿的现象，并不是说这样不好。我们可以说那些混子你怎么自己不努力呀，只想着抱大腿？我经历过所以我知道那个时候的自己还没有成熟，不知道什么是对自己好的，什么是不好的。抱大腿做一个fancy的项目出来意味着高分数，意味着高GPA，意味着可能拿奖学金、保研。

但是选择了抱大腿，就可能去做一些边缘的东西，比如美工、比如前端、比如产品。对于一个基本的产品全貌是没有办法掌握的。

而且本科学Java、学数据库、学计算机网络等等，我不知道自己为什么学，只知道专业里有这么几门课程，而且要拿高分。就成了为了学而学，不管我为什么要学。我觉得如果让我大一的时候就接触前后端加数据库的最小demo，哪怕是一个hello world，我也会对整个框架有一定的概念，带着兴趣和疑问去听课。

怪自己，也怪老师们不了解学生水平。浪费了本科的大好时光，也就渐渐离程序员这个职业选择越来越远。

## Hello World

### 回顾基础

- Vue把后台的数据渲染到html里，就能实现动态网页
- Flask处理数据，就是一些乱七八糟的后台逻辑
- Mysql把数据存储起来，不然老是放内存里丢了怎么办。

### 

### 环境配置

#### 安装Vue环境

按照参考文章安装即可。

在心动实习的时候接触过Vue，当时用Electron做app，感觉运行过程特别缓慢。因为`npm install`要安装一大堆的module，整个项目就变得巨大。

#### 安装Flask

Flask如果想直接`flask run`运行的话，文件的命名方式必须为`app.py`，不然会提示先设置FLASK_PATH。

#### axios

Vue里的模块，这个小东西类似Ajax，用于获取后台数据。

#### CORS

Flask里的模块，如果没有它就不会把数据暴露出去。反正我没有暴露接口的话会报500错误。详细的等想起来了或者需要了再去研究。

### 运行流程

先用flask把接口暴露出来

```python
@app.route('/getMsg')
def get_msg():
	response = {
		'msg': 'hello python'
	}
	return jsonify(response)
```

然后axios获取数据

```js
const path = 'http://127.0.0.1:5000/getMsg';
axios.get(path).then(function(response){
        var msg = response.data.msg;
        console.log(msg);
        that.serverResponse = msg;
      })
```

连接mysql是python的事情，Flask拿数据就好了。

```python
from pymysql import connect
def conn_mysql():
	conn = connect(host='localhost', port=3306, user='root', password='pwd', database='test')
	cur = conn.cursor()
	return conn,cur
```



## 参考

https://www.jianshu.com/p/ead7317d01ec （本文主要参考，很详细）

https://www.cnblogs.com/dashenisme/p/10282811.html （flask写入mysql）