## 项目用到less
```
npm install less less-loader --save-dev
npm install axios vuex bootstrap
```

- mock 模拟数据
- api 所有的接口
- base 基础组件
- components 页面级组件

## 热门图书馆的功能
- 先写服务器
- 增加api方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件要用这些数据，在使用这个组件的父级中调用这个方法，将数据传递给基础组件
- 写一个基础组件
  - 1.创建一个.vue文件
  - 2.在需要使用这个组件的父级中引用这个组件
  - 3.在组件中注册
  - 4.以标签的形式引入

## 路由元信息
- 默认每次给5条，前端告诉后台，现在要从第几条开始给我
- /page?offset=5
- 后台返回还要告诉前端是否有更多数据 hasMore:false

## 代码分割
