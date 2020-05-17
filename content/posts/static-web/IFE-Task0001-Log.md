---
title: "IFE Task0001 Log"
date: 2020-03-01T17:39:45+08:00
draft: true
tags: ["css", "ife"]
categories: ["css"]
---



我记录一下ife其他几个页面。一共这么几个页面 

* [index.html](../task0001/index.html)
* [post.html](../task0001/post.html)
* [archive.html](../task0001/gallery.html)
* [about.html](../task0001/about.html)

如果自己写的话，除了index.html，其他几个页面都有或多多少的问题我写不出来。
一个一个说吧。  

## Index.html

1. banner有三个部分，一个是logo，一个是站内其他链接，最后一个是git的logo。这三个部分要显示在水平的一行，这里其实是运用到了float，只要把三个部分都设置为float，就可以变成一行了。感觉有点像把div改成了块内元素一样，也就是变成了span。
1. 一般banner的链接都是用list改成水平，改成水平的方法有两个，一个是float，另一个是display inline-block
1. 我想让这三部分，随着页面的改变，位置不要定死，原来margin-left之类的也可以用百分比来表示，就很舒服了。
1. center是一个大的bg，bg上面有一个透明度的方形显示文字，放bg的时候遇到了以前就遇到的问题，比如默认是重复的，而且不能充满div。这两个问题代码很好解决。
1. 至于透明度的方形，彻底让我对position这个元素有了一定的理解。absolute、fixed、relative分别代表什么。
1. box部分是三个卡片，卡片里有图片和文字。三个卡片并列其实也挺好写，好像用inline-block就可以实现，水平垂直居中什么的也都是现成的，不过写好了之后再看要求里面有一个是卡片的高度随文字内容自适应。
1. 遂百度之，发现用display table可以解决这个问题，但是table是占满整个div的，不过也好解决，用一大一小div就解决了。
1. 圆形的头像，这个做起来也好简单啊，图片的radius改一下就可以了。
1. intro部分其实不用display来写，比较常规。如果需要居中之类的工作，用display明显是要方便很多的。
1. 最后一点，如果用flex来布局，flex里面的每个元素的宽度都是以最宽的那个为标准。这时候想要居中的话可以考虑用text-align center解决。这是最后那个小logo的居中问题。


## Post.html

在开始写post.html之前我在GitHub上down了几个其他人的ife作业，然后发现我这个代码真的是稀烂…最基本的有这么几个问题：

1. 文件的结构，ife里强调了，但是我没有遵守。
2. div的命名方式。navbar，navbar-menu、profile之类的
3. class和id的区别
4. nav和footer是html的元素，可以不用div写
5. html的基本框架应该是navbar、banner、content、footer

然后我找到了一个极佳的对比例子。就是DIYgod，当我看到他就是RSSHub的发起者的时候，我懵逼了。他也就大我三届而已，而且还是武理的，我简直太菜了。。酸归酸，看DIYgod大神的前端页面。能学到很多东西：

1. html的其他默认元素：header、section、article、nav的使用
3. 日历写起来其实就是一个table view
4. tag-graph就更简单了，字体设几个不同的大小就可以
5. 一个简单的单词，换一个字体就能变成logo一般的存在

然后记录一下写 blog.html的时候遇到的坑

1. blog应该是一个简单的双列布局。双列布局的形式有哪些来着？我是用百分比的形式来布局的。要求用980px，我不太喜欢
4. table设置了宽高之后，cell变大，那么cell里面字的间距自然就大了
5. 有时候会遇到给div里面子元素加padding之后，div的宽度哪怕设好了，还是会超出来。这个时候要设置一下`box-sizing=border-content`
6. a写在div外面，就把整个div变成了链接。
7. 我现在使用自适应的方法太简陋了，@media (maxwidth=980) {.div { display=none} }

## Archive.html

这个页面我被卡住了。本来一个瀑布流我可以百度，用flex或者用column来解决，但是ife的作业的瀑布流里偏偏有一个比较大的块，是一个这样的结构  
	[ + ][ ][ ]  
	[ ][ ][ ][ ]   
	[ ][ ][ ][ ]  
就比较棘手。不能直接用简单的瀑布流，最后是划成3个部分，1⃣️是 [ + ] 2⃣️是其下面的部分，3⃣️是右边两排。然后让2⃣️和3⃣️变成瀑布流。然后细细碎碎的一些对齐问题啊、宽度计算的问题啊，浪费了我挺多时间。  

然后更吊诡的是，我连一个简单的3个div并排在一排都写不出来。好像用inline-block就能写出来。不过我还要再整理一下思路。  

## About.html

不得不说ife作业的设置真的很好，about.html暴露出来我的另一个问题，其实什么position的我根本没有搞清楚，稍微复杂一点的定位我就搞不定了。  

- [ ] relative和absolute的依据是什么？
- [ ] 如果加上了flex布局又会受什么影响？
