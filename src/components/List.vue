<template>
  <div>
    <MHeader :back="true">列表</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <ul class="bookList">
          <router-link v-for="(book,index) in books" :to="{name:'detail',params:{bid:book.bookId}}" :key="index"
                       tag="li">
            <div class="left">
              <img v-lazy="book.bookCover" alt="">
            </div>
            <div class="right">
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <span>￥{{book.bookPrice}}</span>
              <button class="btn" @click.stop="remove(book.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
        <div @click="more" v-if="hasMore" class="loading">加载更多</div>
      </template>

    </div>
  </div>
</template>
<style scoped lang="less">
  .bookList {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    li {
      height: 200px;
      width: 95%;
      margin: 10px auto;
      border: 1px solid rgb(210, 210, 210);
      box-shadow: 0 3px 3px 0 rgb(210, 210, 210);
      border-radius: 2px;
      display: flex;
      div.left {
        width: 200px;
        img {
          width: 100%;
        }
      }
      div.right {
        position: relative;
        margin-left: 1%;
        h4 {
          margin-top: 15%;
          width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          margin-top: 10%;
          width: 180px;
          display: -webkit-box; /*弹性盒模型*/
          -webkit-box-orient: vertical; /*文字垂直显示*/
          -webkit-line-clamp: 3; /*文字显示的行数*/
          overflow: hidden; /*溢出隐藏*/
        }
        span {
          display: inline-block;
          position: absolute;
          bottom: 15%;
        }
        button.btn {
          position: absolute;
          bottom: 12%;
          right: 10%;
          display: block;
          height: 30px;
          width: 60px;
          background-color: red;
          color: #fff;
          font-weight: bold;
          border: none;
          border-radius: 10px;
          outline: none;
        }
      }
    }
  }

  .loading {
    width: 95%;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    border: 1px solid #d9d9d9;
    font-size: 18px;
    border-radius: 3px;
    box-shadow: 0 3px 3px 0 rgb(210, 210, 210);
    text-align: center;
  }
</style>
<script>
  import MHeader from '../base/MHeader.vue';
  import Loading from '../base/Loading.vue';
  import {getAllBooks, removeBook, pagination} from '../api';

  export default {
    data() {
      return {
        books: [],
        loading: true, //Loading组件用
        offset: 0,
        hasMore: true,
        isLoading: false //下拉刷新用
      }
    },
    methods: {
      async getBooks() {
        if (this.hasMore && !this.isLoading) {
          this.isLoading = true;
          let {hasMore, books} = await pagination(this.offset);
          this.books = [...this.books, ...books];
          this.hasMore = hasMore;
          this.offset = this.books.length; //维护偏移量 就是总数的长度
          this.loading = false;
          this.isLoading = false;
        }
      },
      async remove(id) {
        await removeBook(id);
        this.books = this.books.filter(item => item.bookId !== id);
      },
      more() {
        this.getBooks();
      },
      loadMore() {
        //触发scroll事件可能触发多次，先进来开一个定时器，下次触发时，将上一次定时器清除掉
        clearTimeout(this.timer); //节流
        this.timer = setTimeout(() => {
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          if (scrollTop + clientHeight + 20 >= scrollHeight) {
            this.getBooks();
          }
        }, 15);
      }
    },
    computed: {},
    components: {
      MHeader,
      Loading
    },
    created() {
      this.getBooks();
    },
    mounted() {
      let scroll = this.$refs.scroll;
      let top = scroll.offsetTop;
      let distance = 0;
      scroll.addEventListener('touchstart', (e) => {
        //滚动条在最顶端时，并且当前盒子在顶端时候，才继续走
        if (scroll.scrollTop !== 0 || scroll.offsetTop !== top) return;
        let start = e.touches[0].pageY; //手指点击的开始
        let move = (e) => {
          let current = e.touches[0].pageY;
          distance = current - start; //求拉动的距离 负的不需要
          if (distance > 0) {
            if (distance <= 50) {
              scroll.style.top = distance + top + 'px';
            } else {
              distance = 50;
              scroll.style.top = top + 50 + 'px';
            }
          } else {
            //如果不在考虑范围内，移除move和end方法
            scroll.removeEventListener('touchmove', move);
            scroll.removeEventListener('touchend', end);
          }
        };
        let end = (e) => {
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {
            if (distance <= 0) {
              clearInterval(this.timer1);
              distance = 0;
              scroll.style.top = top + 'px';
              scroll.removeEventListener('touchmove', move);
              scroll.removeEventListener('touchend', end);
              this.books = []; //清除数据
              this.offset = 0;
              this.hasMore = true;
              this.getBooks();
              return;
            }
            distance -= 1;
            scroll.style.top = top + distance + 'px';
          }, 1);
        };
        scroll.addEventListener('touchmove', move);
        scroll.addEventListener('touchend', end);
      }, false);
    }
  }
</script>
