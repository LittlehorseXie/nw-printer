## 1. 搭建 Nw.js环境

### 1.1 Mac

1. 下载skd版nw.js（方便调试） [v0.33.4下载链接](https://nwjs.io/blog/v0.33.4/)

2. 下载好了之后解压文件，进入解压后的文件夹，再将nw.app文件复制到Appalication文件夹，操作如下：
```shell
cd nwjs-sdk-v0.33.4-osx-x64
cp -r ./nwjs.app /Applications/
```

3. 打开`bash_profile`文件
```shell
vi ~/.bash_profile
```

在后面添加
```shell
alias nw="/Applications/nwjs.app/Contents/MacOS/nwjs" 
```

保存后运行
```shell
source ~/.bash_profile
```

4. 命令行输出nw 测试是否打开了nwjs.

### 1.2 Win

1. 下载skd版nw.js（方便调试） [v0.33.4下载链接](https://nwjs.io/blog/v0.33.4/)

2. 下载好了之后解压文件，将解压之后的文件夹路径添加到本机的Path中

3. 命令行输出nw 测试是否打开了nwjs.

## 2. 本地运行项目

`无需再npm i`，在文件夹下执行
nw .

## 3. 打包

使用 `nwjs-builder-phoenix` 打包，目前只能生成windows版本


## 4. 目录结构
```
|-- assets ---------- logo文件
|-- node_modules ---- 依赖包，除了npm install之外，还对printer做了特殊处理
|-- command.js ------ esc/pos常用指令集
|-- index.html ------ 主文件
|-- package.lock.json
|-- package.json
```

## 5. 整个项目心得体会

1. nw 环境配置



2. printer 环境配置 及 使用


3. 技术难点

- 打印汉字
  问题原因：node的buffer不支持gbk编码
  解决方案：使用iconv-lite进行bgk编码

- 多列布局
  问题原因：不知道什么方式实现类似flex布局
  解决方案：使用sprint-js，一个神奇的补空格实现布局的方案

- 分割线
  问题原因：没有分割线指令
  解决方案：结合sprint-js，用一行带下划线的空格来模拟
