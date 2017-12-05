<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-xiangzuo1" v-if="back" @click="goBack"></i>
  </div>
</template>
<style scoped lang="less">
  .header {
    position: fixed;
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fafafa;
    i {
      position: absolute;
      left: 10px;
      font-size: 20px;
    }
  }
</style>
<script>
  export default {
    props: {
      back: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    },
    computed: {},
    components: {}
  }
</script>
