import axios from 'axios';

//增加默认的请求路径
axios.defaults.baseURL = 'http://localhost:1206';
axios.interceptors.response.use(res => {
  return res.data; //在这里同意拦截结果，把结果处理成res.data
});

//获取轮播图数据，返回一个promise实例
export let getSliders = () => {
  return axios.get('/sliders');
};

//获取热销书籍
export let getHotBooks = () => {
  return axios.get('/hot');
};

//获取全部书籍
export let getAllBooks = () => {
  return axios.get('/book');
};

//删除一本图书
export let removeBook = id => {
  return axios.delete(`/book?id=${id}`);
};

//获取一本书
export let getOneBook = id => {
  return axios.get(`/book?id=${id}`);
};

//修改图书
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
};

//增加一本图书
export let addBook = data => {
  return axios.post('/book', data);
};

//整合
export let getAll = () => {
  return axios.all([getSliders(), getHotBooks()])
};


export let pagination = offset => {
  return axios.get(`/page?offset=${offset}`);
};
