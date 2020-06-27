# 码梦人(YumeCoder) - 在线 IT 练习平台

## 介绍

由原先的 standalone javaweb app 改为前后端分离项目，此项目为 webapp 端，使用 react 技术栈重新编写。  
主要目的是练习前端技术（React 相关）以及 docker, shell, git 等技术。

## 练习范围概览

### 基础

- 基础框架 : `react(with hooks)`, `react-dom`, `react-router-dom`
- 开发语言 : `typescript`
  - `babel-typescript`: 使用 babel 编译 typescript 代码，提升开发体验
- UI 组件库 : `Material-UI`
- 状态管理 : `redux`
  - `redux-saga` : 处理副作用

### 额外

- `axios` : ajax 请求库
  - 使用拦截器实现 token 无痛刷新
  - `mockjs` : 拦截请求，模拟数据
- `token auth` : token 认证机制
- `oauth login` : 第三方 Oauth 登录
  - `QQ` 账号登录
  - `Github` 账号登录
- `react-intl` : 国际化
- `@loadable/component` : 代码分割
  - 通过 `import()` 语法实现组件懒加载
- `react-spring` : 实现部分组件的动画效果

### 代码规范

- `husky`, `lint-staged`
  - git precommit 代码检查
- `eslint`
  - js/ts 代码检查
- `stylelint`
  - 样式代码检查
- `prettier`
  - 规范代码书写风格

### 测试

- `jest` : 代码测试
  - `enzyme`, `@testing-library/react-hooks` : react 组件测试

### 构建/部署

- `webpack` : 打包工具
  - 手动配置 webpack 开发、发布环境
- `Github Actions` : 持续集成
  - `docker`, `VPS`, `shell` : 使用 docker 容器部署应用
