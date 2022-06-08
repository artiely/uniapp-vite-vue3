## 参数

### name 请选择要打包的小程序

音乐派对/sing/weapp
伴伴音乐派对/sing/qq
伴伴陪玩/banban/weapp
伴伴交友/banban2/qq
陪你1314/banban4/weapp
派对/banban5/weapp
恋恋CP/voice/weapp/--ci todo
恋爱CP/voice/qq/--ci todo
你画我猜组局/guess/weapp
一起画一画/guess/qq
谁是凶手/who/weapp/--ci todo
谁是凶手/who/qq
是不是/shibushi/weapp
海龟汤/shibushi/qq
扩列交友旅行/expand/qq
剧本杀工具/juben/weapp
皮队友/teammate/weapp
皮队友/teammate/qq

### env 请选择环境

api
alpha
dev

### branch 请设置分支名

master

### subBranch 请设置base分支名

master

## 脚本内容

```shell
#!/bin/bash

# 变量声明

## 版本号
version=1.0.0

arrIN=(${name//// })

## 产品
appName=${arrIN[1]}

## 平台
platform=${arrIN[2]}

# 进入小程序源码目录
cd /home/webroot/mini/banban_mini

# 更新代码
git fetch -p
git checkout $branch
git pull

cd src/base
git checkout $subBranch
git pull

cd ../..

# 安装依赖
cd ci
yarn
cd ..
yarn

# 运行
yarn run build --fromArgv --appName $appName --platform $platform --env $env

# Todo. 版本号更新

# echo "yarn run build --fromArgv --appName $appName --platform $platform --env $env --v $version"
```
