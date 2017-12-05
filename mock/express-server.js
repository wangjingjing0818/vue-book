const fs = require('fs');
const express = require('express');
const app = express();
app.listen(1206, () => {
  console.log('Start, port: 1206');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname));

//获取轮播图 /sliders
const sliders = require('./sliders');
const pageSize = 5;

let read = (cb) => {
  fs.readFile('./book.json', 'utf8', (err, data) => {
    if (err || data.length === 0) {
      console.log(err);
      cb && cb([]);
    } else {
      cb && cb(JSON.parse(data));
    }
  });
};

let write = (content, cb) => {
  fs.writeFile('./book.json', JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      cb && cb();
    }
  });
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});
jishu
app.get('/page', (req, res) => {
  let offset = parseInt(req.query.offset) || 0;
  read(books => {
    //每次偏移量 在偏移的基础上增加5条
    let result = books.reverse().slice(offset, offset + pageSize); //数据倒序
    let hasMore = true;
    if (books.length <= offset + pageSize) { //已经显示的大于总数
      hasMore = false;
    }
    if (offset === 0) {
      setTimeout(() => {
        res.json({hasMore, books: result});
      }, 1000);
    } else {
      res.json({hasMore, books: result});
    }
  });
});

app.get('/sliders', (req, res) => {
  res.json(sliders);
});

app.get('/hot', (req, res) => {
  read((books) => {
    let hot = books.reverse().slice(0, 6);
    setTimeout(() => {
      res.json(hot);
    }, 1000);
  });
});

app.get('/book', (req, res) => {
  let id = parseInt(req.query.id);
  if (!isNaN(id)) { //获取一本书籍
    read((books) => {
      let book = books.find(item => item.bookId === id);
      if (book) {
        res.json(book);
      } else {
        res.end({});
      }
    });
  } else { //获取所有书籍
    read((books) => {
      setTimeout(() => {
        res.json(books.reverse());
      }, 1000);
    });
  }
});

app.post('/book', (req, res) => {
  let book = req.body;
  read((books) => {
    book.bookId = books.length > 0 ? parseInt(books[books.length - 1].bookId) + 1 : 1;
    books.push(book);
    write(books, () => {
      res.json(book);
    });
  });
});

app.put('/book', (req, res) => {
  let id = parseInt(req.query.id);
  let book = req.body;
  read((books) => {
    books = books.map(item => {
      if (item.bookId === id) {
        return book;
      }
      return item;
    });
    write(books, () => {
      res.json(book);
    });
  });
});

app.delete('/book', (req, res) => {
  let id = parseInt(req.query.id);
  if (!isNaN(id)) {
    read((data) => {
      data = data.filter(item => item.bookId !== id);
      write(data, () => {
        console.log('写入成功');
      });
      res.json({});
    })
  }
});

app.all('*', (req, res) => {
  res.sendFile('./index.html', {root: __dirname});
});
