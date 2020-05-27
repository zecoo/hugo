---
title: "scss tutorial"
date: "2020-05-05T00:00:00+08:00"
draft: false
tags: ["css", "scss"]
categories: ["css"]
---

SCSS：Sassy CSS

SASS比SCSS更简洁啊，感觉更像现代编程语言，跟yaml一样。

我咋还在scss的环境上踩到坑了呢？

先是给我报错

```shell
bad interpreter: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: no such file or directory
```

一查是sass环境没装上……我以为mac自带ruby不用管呢

```shell
sudo gem install -n /usr/local/bin sass --pre   
```

安装之。然后发现ruby的源用不了，原来是 https://gems.ruby-china.org 改成了 https://gems.ruby-china.com ，害。

编译css的项目目录也需要更改，默认是编译到scss相同的目录。

```json
{
	"cmd": [ "sass", "--update", "$file:${file_path}/../css/${file_base_name}.css", "--stop-on-error", "--no-cache"],
	"osx": 
	{
		"path": "/usr/local/bin:$PATH"
	}
}
```

最后sublime再装一个插件"sublimeBuildOnSave"自动编译sass，不要每次都cmd+B一下。

## 参考

https://www.jianshu.com/p/f8cbe91498dc （ruby china换源了）

https://www.sass.hk/install/ （ruby 安装sass）

https://blog.logrocket.com/getting-started-with-bootstrapvue-2d8bf907ef11/ （bootVue blog）

https://bootstrap-vue.org/docs （bootVue官网）