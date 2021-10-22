# qiankun-share-common

qiankun 主子应用共享 common 的示例

父子组件都用了 common 的 Rate 组件，common 的 Rate 组件则导出 antd 的 Rate 组件

由下图可知

![主应用](./assets/main.png)

![子应用](./assets/sub.png)

主子应用虽然都用了 common 的代码，但是最终用的是自己 node_modules 的 antd。

## 一、简介

公共文件 common 存放于 main 和 sub 的同级目录中，此时项目结构扁平。main 和 sub 的打包配置独立，common 的依赖由各自应用的依赖版本控制

## 二、运行

```shell
cd main && npm run dev
cd sub/app && npm run dev
```

## 三、具体步骤

### 1、设置 common 为本地包

common 包依赖 antd，需要新建一份 package.json。然后在 main 和 sub 的 package.json 中将其设置为本地包

```json
{
  "common": "file:../../common"
}
```

### 2、修改 symlinks

设置为本地包后，在 main 中 install，common 就会被 link 到 main 的 node_modules 中。

但是 link 过去后有个问题，webpack 在解析文件时，仍然用的是真实的路径，即 project/common/Rate，这样仍然找不到 antd 的依赖。所以还需要修改 webpack 解析的路径，需要将 symlinks 设置为 false。这样 webpack 解析时，就会以 project/main/node_modules/common/Rate 去解析，就能够找到 main 的 antd 依赖。

### 3、修改 loader

修改 symlinks 为 false 后，common 的文件的路径会带上 node_modules，因此若 babel-loader 之前有配置`exclude: /node_modules/`，则会漏掉对组件的编译。因此，此时需要修改 exclude，改为`/node_modules([\\]+|\/)+(?!common)/`
