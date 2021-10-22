# qiankun-share-common

qiankun 主子应用共享 common 的示例

## 分支简介

### common-in-main

公共文件 common 和子应用 sub 均存放于主应用中。此时 common、sub 的文件的三方包依赖均从 main 中查找。

缺点：
子应用的依赖依靠主应用，无法独立维护和升级

### common-out-main

公共文件 common 存放于 main 和 sub 的同级目录中，此时项目结构扁平。

## 备注

微前端处理公共依赖的方式有很多种，这里只是提供一种解决思路。较适合现在已经是 common-in-main 格式的微前端项目向 common-out-main 的方式转变。
