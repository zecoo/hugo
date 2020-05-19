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
#!/bin/bash
hugo -D
git add .
echo "input commit info:"
read -t 5 commit_info
commit_info=${commit_info:-"update blog"}
git commit -m "$commit_info"
git push origin master
```

read提供一个默认值“update blog”，这样既可以修改commit info，5s后忘记输入的话也不用担心。

记得最后把sh文件权限给足：`chmod 777 update.sh`

## 参考

https://www.cnblogs.com/lottu/p/3962921.html （shell接收键盘输入）

https://blog.csdn.net/u010339879/article/details/77938911 （read添加默认值）