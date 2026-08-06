# 个人主页（Hugo）

网站地址：https://zecoo.github.io/hugo/

## 目录说明

- `content/`：网站正文与文章源文件；新增行业报告请放在 `content/posts/industry-report/`。
- `data/`：首页展示的结构化资料，如投资方向、论文和专利。
- `layouts/`、`themes/hustrap/`：页面模板与样式。
- `static/`：原样发布的静态资源，例如报告 PDF。
- `docs/`：Hugo 自动生成的 GitHub Pages 发布目录，请勿手动编辑。

## 发布

```powershell
hugo --minify --cleanDestinationDir
git add .
git commit -m "Update site"
git push origin master
```
