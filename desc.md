1. 使用monorepo方式管理此仓库

使用pnpm安装依赖
1. 全局安装pnpm 
  npm -g pnpm
2. 安装全部项目通用依赖
  pnpm i typescript -D -w
3. 安装项目局部依赖. 项目名称最好是 @命名空间/项目名称 形式 
  pnpm add axios --filter @monorepo/http
  或 cd 到具体文件夹直接
  pnpm add axios


配置全局eslint/perttier等 https://developer.aliyun.com/article/950988#slide-0

1. 安装 eslint
  pnpm add eslint -D -w

2. 生产eslint配置文件
  npx eslint --init

3. 安装 @typescript-eslint/parser ESLint 默认使用Espree作为其解析器, 但是由于我们项目是 ts 文件
  pnpm add @typescript-eslint/parser -D -w 

4. 安装prettier和相关插件
  pnpm  add prettier eslint-config-prettier eslint-plugin-prettier  -D -w

  eslint-config-prettier:
  解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
  eslint-plugin-prettier：
  将prettier作为ESLint规范来使用, 简单的说就是错误统一来源是eslint

5. 新建prettier.config.js文件来配置格式化

6. 接着修改.eslintrc.js文件，引入prettier：