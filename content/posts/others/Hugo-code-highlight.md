---
title: "Hugo添加代码高亮"
date: "2020-05-09T00:00:00+08:00"
draft: false
tags: ["hugo", "highlight"]
categories: ["hugo"]
---

方法：用hightlight.js做高亮。

针对不同的Hugo主题，应该有不同的思路。但是基本思路还是：

1. head里添加css
2. body中添加两个“script“元素第一个是js文件，第二个是loadjs

我用的是Hugo的contrast主题，打开文件夹theme - layout，找到博文的base.html，打开在里面添加基本思路中的文件。我仿照代码里本来有的目录，简单修改一下就可以了。（第二行是我添加的highlight css文件）

```html
<link rel="stylesheet" href="{{ .Site.BaseURL }}css/index.css">
<link rel="stylesheet" href="{{ .Site.BaseURL }}css/github.css">
```

css的选择可以到GitHub上hightlight.js的src/style下面找。

js文件，用官网上的cdn就可以。或者直接下载下来。

## 参考

https://orianna-zzo.github.io/sci-tech/2018-01/blog养成记3-hugo的语法高亮配置/#使用highlight-shortcode进行高亮