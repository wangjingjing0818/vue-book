<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-caidan"></i>
      <span>列表</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-biaoxingfill"></i>
      <span>收藏</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-jiahao"></i>
      <span>添加</span>
    </router-link>
  </div>
</template>
<!--
  display:flex
  flex-direction:row/column
  justify-content:center 垂直居中
  align-items:center 水平居中
  flex:1

  /home /home/a
  router-link-exact-active router-link-active
-->
<style scoped lang="less">
  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    display: flex;
    border-top: 1px solid #d9d9d9;
    background-color: #fafafa;
    a {
      color: #333;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      align-items: center;
      i{
        font-size: 20px;
      }
      span{
        font-size: 12px;
      }
    }
    a.router-link-active {
      color: red;
    }
  }
</style>
