**注：仅支持`windows`系统**

## 1. 本地运行项目

使用 `npm install` 安装package.json中除了print之外的其他安装包

执行 `npm start`，首次运行会比较慢
```
npm install
npm start
```

## 2. 打包

使用 `nwjs-builder-phoenix` 打包，目前只生成windows版本
```
npm run dist
```

## 3. 自动更新

需要在服务器上上传新的package.json和zip包


## 4. 目录结构
```
|-- assets ------------- logo文件
|-- node_modules ------- 依赖包，除了普通的npm install之外，对printer做了特殊处理
|-- auto-update.js ----- 自动更新相关代码
|-- command.js --------- esc/pos常用指令集
|-- escpos.js ---------- 常用打印函数的封装
|-- example.js --------- 调用打印小票样例
|-- index.html --------- 主文件
|-- printer.js --------- 打印机函数的封装
|-- package.json
```

## 5. 整个项目遇到的难点、问题

### 1. `打包`相关
使用`nwjs-builder-phoenix`

#### 问题：打开app巨慢
- 原因：package.json中build:packed字段写成了true，打包时会将应用文件打包到exe中，导致每次运行exe文件都需要先解压再运行
- 解决：改成false，将文件释放到exe并行目录中


### 2. `自动更新`相关

> 1. 从现在运行的程序（旧版本）中检查版本清单
> 2. 如果有高版本，将新包的zip文件下载到临时目录
> 3. 解压zip包
> 4. 在临时目录中运行新app并杀掉旧app进程
> 5. 新app将会将自己复制到原始文件夹, 覆盖旧的应用程序
> 6. 新应用程序将从原始文件夹中运行并退出进程

#### 问题：使用中文名的productName，解压缩包时会中文乱码

- 原因：`nwjs-autoupdater`可能对中文支持不友好
- 解决：使用`node-webkit-updater`来自动更新

#### 问题：使用`node-webkit-updater`官方例子自动更新时，在执行到替换旧版本时会报错 `EBUSY: resource busy or locked`

- 原因：在运行安装程序时的步骤4中, 它的 cwd 默认为当前进程的 cwd, 可能是旧应用程序的目录。所以, 无法删除、覆盖安装目标目录, 因为正在使用它。
- 解决：在源代码中添加 const newAppDir = path.dirname(newAppPath)，再将 upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{}) 改为 upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()], {cwd: newAppDir} )


### 3. `打印`相关

#### 问题：printer环境配置

- 原因：printer本质属于c++插件，需要特殊配置
- 解决：安装python2.7版本，执行下面命令
```bash
npm install printer --target_arch=x64
cd node_modules/printer
nw-gyp configure --target=${nw-version}
nw-gyp rebuild --target=${nw-version}
```


#### 问题：不能打印汉字

- 原因：node的buffer不支持gbk编码
- 解决：使用iconv-lite进行bgk编码

#### 问题：多列布局实现

- 原因：不知道什么方式实现类似flex布局
- 解决：使用sprint-js，一个神奇的补空格实现布局的方案

#### 问题：分割线实现

- 原因：没有分割线指令
- 解决：结合sprint-js，用一行带下划线的空格来模拟

#### 问题：切纸

- 原因：一开始尝试的全切，当连续多张打印时，前面的纸会卡住后面的纸
- 解决：改用留点半切


参考文献 

[微型热敏打印机指令集](https://wenku.baidu.com/view/6de8b8fec281e53a5902ff98#1?qq-pf-to=pcqq.c2c)