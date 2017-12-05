<template>
  <div>
    <MHeader :back="true">详情</MHeader>
    <div class="content add">
      <div class="cover">
        <img :src="book.bookCover">
      </div>
      <form>
        <label for="bookCover">封面：</label>
        <br>
        <input type="text" id="bookCover" v-model="book.bookCover">
      </form>
      <form>
        <label for="bookName">书名：</label>
        <br>
        <input type="text" id="bookName" v-model="book.bookName">
      </form>
      <form>
        <label for="bookInfo">信息：</label>
        <br>
        <textarea id="bookInfo" v-model="book.bookInfo"></textarea>
      </form>
      <form>
        <label for="bookPrice">价格：</label>
        <br>
        <input type="text" id="bookPrice" v-model.number="book.bookPrice">
      </form>
      <button class="btn" @click="update">修改</button>
    </div>
  </div>
</template>
<style scoped lang="less">
  .content.add {
    position: fixed;
    width: 100%;
    top: 40px;
    overflow: auto;
    bottom: 0;
    background-color: #fff;
    z-index: 111;
    div.cover {
      height: 200px;
      width: 200px;
      margin: 10px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    form {
      width: 90%;
      display: block;
      margin: 10px auto;
      label {
        font-size: 20px;
        font-weight: bold;
      }
      input {
        width: 95%;
        margin: 10px 0;
        height: 30px;
        padding-left: 10px;
        font-size: 16px;
      }
      &:nth-of-type(3) {
        textarea {
          width: 95%;
          margin: 10px 0;
          padding-left: 10px;
          height: 240px;
          line-height: 30px;
          font-size: 16px;
          font-family: "Adobe 黑体 Std R";
        }
      }
    }
    button.btn {
      margin: 20px 25px 50px;
      display: block;
      height: 50px;
      width: 100px;
      background-color: #2aabd2;
      color: #fff;
      font-weight: bold;
      border: none;
      border-radius: 10px;
      outline: none;
      font-size: 20px;
    }
  }
</style>
<script>
  import MHeader from '../base/MHeader.vue';
  import {getOneBook, updateBook} from '../api';

  export default {
    data() {
      return {
        book: {}
      }
    },
    methods: {
      async findOneBook() {
        this.book = await getOneBook(this.$route.params.bid);
        //如果是空对象，跳转回列表页
        Object.keys(this.book).length > 0 ? void(0) : this.$router.push('/list');
      },
      async update() {
        await updateBook(this.$route.params.bid, this.book);
        this.$router.push('/list'); //修改完成后跳转页面
      }
    },
    computed: {},
    watch: {
      $route() {
        this.findOneBook();
      }
    },
    components: {
      MHeader
    },
    created() { //页面加载 根据id 发送请求
      this.findOneBook();
    }
  }
</script>
