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


## 3. 目录结构
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


参考文献 

[微型热敏打印机指令集](https://wenku.baidu.com/view/6de8b8fec281e53a5902ff98#1?qq-pf-to=pcqq.c2c)