---
title: "hugo上传博客脚本"
date: "2020-05-18T00:00:00+08:00"
tags: ["hugo", "bash"]
categories: ["hugo"]
draft: false
---

我很傻的，每次更新博客之后都要手动输入

```shell
hugo -D
git add .
git commit -m "xxx"
git push origin master
```

又不想下载git客户端一键push，写个脚本咯

```bash
hugo -D
git add .
read -p "input commit info:\n" commit 	
git commit -m "$commit"
git push origin master
```



## 参考

https://www.cnblogs.com/gossip/p/5948398.html （shell接收键盘输入）