<template>
  <div>
    <MHeader :back="true">增加</MHeader>
    <div class="content">
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
      <button class="btn" @click="add">增加</button>
    </div>
  </div>
</template>
<style scoped lang="less">
  .content {
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
  import {addBook} from '../api';

  export default {
    data() {
      return {
        book: {
          bookCover: '',
          bookName: '',
          bookInfo: '',
          bookPrice: null
        }
      }
    },
    methods: {
      async add() {
        await addBook(this.book);
        this.$router.push('/list');
      }
    },
    computed: {},
    components: {
      MHeader
    }
  }
</script>
