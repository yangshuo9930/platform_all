module.exports = {
  ignores: [(commit) => commit.includes('ignore')], // 忽略一些提交信息
  extends: ['@commitlint/config-conventional'],
  // 以下时我们自定义的规则
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'], // 不允许空信息
    'type-empty': [2, 'never'], // 不允许类型+ 空信息
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修补bug
        'perf', // 优化相关, 提升性能等
        'style', // 格式, 样式, 不影响功能运行
        'docs', // 文档
        'test', // 添加测试
        'refactor', // 重构, (不是新功能, 也不是修改bug)
        'build', // 编译相关改动
        'ci', // 持续性集成修改
        'chore', // 构建过程或辅助工具改动
        'revert', // 回滚版本
        'wip', // 开发中
        'workflow', // 工作流改进
        'merge',
        'types' // 类型
      ]
    ]
  }
}
