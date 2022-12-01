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

4. 安装 @typescript-eslint/eslint-plugin 一个 ESLint 插件，为 TypeScript 代码库提供 lint 规则
  pnpm add @typescript-eslint/eslint-plugin  -D -w 

  配置elintrc.js 
  extends: [
    ++  'plugin:@typescript-eslint/recommended', 
  ],

4. 安装prettier和相关插件
  pnpm  add prettier eslint-config-prettier eslint-plugin-prettier  -D -w

  eslint-config-prettier:
  解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
  eslint-plugin-prettier：
  将prettier作为ESLint规范来使用, 简单的说就是错误统一来源是eslint

5. 新建prettier.config.js文件来配置格式化

6. 接着修改.eslintrc.js文件，引入prettier：
  extends: [
    'plugin:@typescript-eslint/recommended',
    ++ 'plugin:prettier/recommended' 
  ],

7. 安装 husky. husky作用就是简单调用git的hooks钩子, 方便你运行一些脚本命令.
  常用的git钩子https://juejin.cn/post/6982192362583752741
  注意安装的版本 6版本以上发生破坏性更改

  1. 安装 pnpm add husky -D -w
  2. 在package.json 中新建脚本命名  "prepare": "husky install" 
     或者执行 npm set-script prepare "husky install" 命令 自动新增该脚本
  3. 执行 npmp run prepare 生成 .husky 文件
  4. husky 准备好之后，我们接着来安装其他的用于规范，检查代码的依赖。
    pnpm add lint-staged -D -w
  5. 在package.json中新增
    "lint-staged": {
      "src/**/*.{js,jsx,ts,tsx,json}": [
        "prettier --write",
        "eslint",
        "git add"
      ]
  }
  

8. 安装 @commitlint/cli @commitlint/config-conventional commitlint相关依赖，用来帮助我们在多人开发时，遵守 git 提交约定

9. 执行 echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js在根目录创建 commitlint.config.js 文件（当然也可以手动创建此文件)

10. 执行yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'之后，会看到在根目录的.husky文件夹下多了一个 commit-msg 文件 用于提示提交报错信息
  执行 git add .husky/commit-msg 将上一步添加的钩子添加到git中去

11. 执行yarn husky add .husky/pre-commit 'yarn lint-staged --allow-empty "$1"'之后，会看到在根目录的.husky文件夹下多了一个 pre-commit 文件

  同样的，我们需要将上一步添加的钩子添加到git中去，执行

12. 接下来提交校验一下刚刚的提交信息配置

