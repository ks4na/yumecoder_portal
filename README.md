# 码梦人(YumeCoder) - 在线 IT 练习平台

## 介绍

由原先的 standalone javaweb app 改为前后端分离项目，此项目为 webapp 端，使用 react 技术栈重新编写。  
主要目的是练习前端技术（React 相关）以及 docker, shell, git 等技术。

## 练习范围概览

### 基础

- `react`, `react-dom`, `react-router-dom`
  - 基础 react 框架
- `typescript`
  - 使用 typescript 语法编写
  - `babel-typescript`
    - 使用 babel 编译 typescript 代码，提升开发体验
- `material-ui`
  - react 组件库
- `redux`
  - 全局状态管理
  - `redux-saga`
    - 处理副作用
- `axios`
  - ajax 请求库
  - `mockjs`
    - mock 请求数据

### 额外

- `react-intl`
  - 国际化支持
- `react-loadable`
  - 组件级别懒加载
  - import()
    - 手动懒加载
- `token auth`
  - token 认证机制
- `third-party account login`
  - 三方登录支持
  - `QQ`
    - 支持使用 QQ 号登录

### 规范

- `husky`, `lint-staged`
  - precommit 代码检查
- `eslint`
  - js/ts 代码检查
- `stylelint`
  - 样式代码检查
- `prettier`
  - 规范代码书写风格

### 测试

- `jest`
  - 代码测试
  - `enzyme`, `@testing-library/react-hooks`
    - react 组件测试

### 构建/部署

- `webpack`
  - 打包工具
  - 手动配置 webpack 开发、发布环境
- `Github Actions`
  - 持续集成支持
  - `docker`, `ECS`, `shell`
    - 使用 docker 容器部署应用
