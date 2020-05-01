# Hugo

部署hugo到github pages注意这样几点：

第一，设置docs文件夹的方法：

config.yaml文件中添加这样一行代码：`publishDir: "docs"`

第二，hugo部署的时候用命令`hugo -D`，请不要用`hugo`

第三，如果要修改一些css，请从theme中修改。`hugo -D`的时候会自动生成模板。