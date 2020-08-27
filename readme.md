# 如何获取所有分支

该仓库有很多的分支，可以通过下面的做法获取所有分支

1. 克隆仓库

```shell
git clone https://github.com/DuYi-Edu/DuYi-Node.git
```

2. 获取所有远程分支并映射到本地

```shell
git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
```

3. 查看目前所有的分支

此时，你已经可以看到所有的分支了

```shell
git branch
``` 