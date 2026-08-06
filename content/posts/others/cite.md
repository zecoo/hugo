---
title: "Cite"
date: 2021-09-23T14:33:25+08:00
draft: true
---

大致的ref类型有：

* Havard
* APA
* ALA
* IEEE

这里仅记录IEEE的格式怎么来统一

有两个在线工具先记录下来：

1. [BibTex Online Converter](https://bibtex.online)
2. [Online BibTex to IEEE](https://www.bibtex.com/c/bibtex-to-ieee-converter/)

基本上所有的论文都可以直接Bing搜索找到出处，如IEEE或者ACM或者Springer，然后从出处找到BibTex，这是一篇文章引用最全的数据。

一个BibTex的例子：

```json
@ARTICLE{8826375,  author={Cinque, Marcello and Della Corte, Raffaele and Pecchia, Antonio},  journal={IEEE Transactions on Services Computing},   title={Microservices Monitoring with Event Logs and Black Box Execution Tracing},   year={2019},  volume={},  number={},  pages={1-1},  doi={10.1109/TSC.2019.2940009}}
```

通过这个数据可以在用上面两个工具转换成任意类型的ref。

有一个特殊的情况是APA、ALA、Havard等对于人名的处理都是姓在前，名在后。而在IEEE格式里面姓在后，名在前。好嘛，继续调整，手工调整太慢了，随便写个简陋的python代码快速改改还是很方便的。
