---
title: "hugo tutorial"
date: "2020-05-17T00:00:00+08:00"
draft: false
tags:
- hugo
categories: 
- blog
---

```shell
hugo new theme zik-theme
```

可以创建一个新的主题。自己的主题就是从这里开始。

然后看看hugo官网对这些baseof.html、index.html里面语法的介绍吧

Variable和Function都是用两个大括号括起来`{{ }}`

```html
{{ partial "header.html" . }}
```

这会添加`layouts/partials/header.html` 这个文件到目标文件。

访问预定义的变量（感觉就是config.yaml文件里定义的变量）用dot，访问和定义普通变量用$

```html
<title>{{ .Title }}</title>
{{ $address := "123 Main St." }}
{{ $address }}
```

if-else，记住最后要有一个end

```html
{{ if (isset .Params "description") }}
    {{ index .Params "description" }}
{{ else }}
    {{ .Summary }}
{{ end }}
```

布局上需要注意的：`<div>   {{ .Title }} </div>`会输出：

```
<div>
  Hello, World!
</div>
```

而`<div>   {{- .Title -}} </div>`会输出：

```
<div>Hello, World!</div>
```

HTML 注释

```html
{{ printf "<!-- Our website is named: %s -->" .Site.Title | safeHTML }}
```

文件目录都是做什么的？

```shell
├── _default
│   ├── baseof.html
│   ├── list.html
│   └── single.html
└── index.html
```

- baseof.html是在single.html和index.html都没有的时候发挥作用。作为post和首页的模板。
- list.html是post中的所有md的list
- single.html是post里面的单一页面。也就是我在post里面的md都会根据baseof.html改成html页面

