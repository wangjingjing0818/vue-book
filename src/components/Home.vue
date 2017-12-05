<template>
  <div>
    <MHeader :back="false">首页</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul class="hotBookList">
            <router-link v-for="(book,index) in hotBooks" :to="{name:'detail',params:{bid:book.bookId}}" :key="index"
                         tag="li">
              <img v-lazy="book.bookCover" alt="">
              <p>{{book.bookName}}</p>
            </router-link>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="less">
  .container {
    width: 90%;
    margin: 10px auto;
    .hotBookList {
      width: 100%;
      &:before {
        content: ' ';
        font-size: 0;
      }
      &:after {
        content: ' ';
        font-size: 0;
        clear: both;
      }
      li {
        width: 46%;
        height: 210px;
        float: left;
        border: 1px solid rgb(210, 210, 210);
        box-shadow: 0 3px 3px 0 rgb(210, 210, 210);
        border-radius: 2px;
        margin-bottom: 3%;;
        margin-right: 3%;
        &:first-child, &:nth-child(2) {
          margin-top: 3%;;
        }
        img {
          width: 100%;

        }
        p {
          margin-left: 2%;
          margin-top: 2%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:last-child {
            margin-bottom: 2%;
          }
        }
      }
    }
  }

</style>
<script>
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import Loading from '../base/Loading.vue';
  import {getAll} from '../api'; //文件名叫index，可省略

  export default {
    data() {
      return {
        sliders: [],
        hotBooks: [],
        loading: true
      }
    },
    methods: {
      async getData() {
        let [sliders, hotBooks] = await getAll(); //[sliders,books]
        this.sliders = sliders;
        this.hotBooks = hotBooks;
        //...轮播图和热门图书已经获取完成
        this.loading = false;
      }
    },
    computed: {},
    components: {
      MHeader,
      Swiper,
      Loading
    },
    created() {
      this.getData();
    }
  }
</script>
