const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

//获取轮播图 /sliders
const sliders = require('./sliders');

let read = (cb) => {
  fs.readFile('./book.json', 'utf8', (err, data) => {
    if (err || data.length === 0) { //如果有错误，或者没长度，就是空数组
      console.log(err);
      cb && cb([]);
    } else {
      cb && cb(JSON.parse(data)); //将读出来的内容转化成对象
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

const pageSize = 5; //每页显示五个

http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By", ' 3.2.1');
  if (req.method === "OPTIONS") return res.end();
  /*让options请求快速返回*/

  let {pathname, query} = url.parse(req.url, true);

  /*接口部分*/

  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0; //拿到当前前端传递的值
    read(books => {
      //每次偏移量 在偏移的基础上增加5条
      let result = books.reverse().slice(offset, offset + pageSize); //数据倒序
      let hasMore = true;
      if (books.length <= offset + pageSize) { //已经显示的大于总数
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      if (offset === 0) {
        setTimeout(() => {
          res.end(JSON.stringify({hasMore, books: result}));
        }, 1000);
      } else {
        res.end(JSON.stringify({hasMore, books: result}));
      }
    });
    return;
  }

  if (pathname === '/sliders') {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(sliders));
    return;
  }

  if (pathname === '/hot') {
    read((books) => {
      let hot = books.reverse().slice(0, 6);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      setTimeout(() => {
        res.end(JSON.stringify(hot));
      }, 1000);
    });
    return;
  }

  if (pathname === '/book') {
    let id = parseInt(query.id); //取出的时字符串
    switch (req.method) { //?id=1
      case 'GET':
        if (!isNaN(id)) { //获取一本书籍
          read((books) => {
            let book = books.find(item => item.bookId === id);
            if (book) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify(book));
            } else {
              res.end(JSON.stringify({}));
            }
          });
        } else { //获取所有书籍
          read((books) => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            setTimeout(() => {
              res.end(JSON.stringify(books.reverse()));
            }, 1000);
          });
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', chunk => {
          str += chunk;
        });
        req.on('end', () => {
          let book = JSON.parse(str);
          read((books) => {
            book.bookId = books.length > 0 ? parseInt(books[books.length - 1].bookId) + 1 : 1;
            books.push(book);
            write(books, () => {
              res.end(JSON.stringify(book));
            });
          });
        });
        break;
      case 'PUT':
        if (!isNaN(id)) {
          let str = '';
          req.on('data', chunk => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str);
            read((books) => {
              books = books.map(item => {
                if (item.bookId === id) {
                  return book;
                }
                return item;
              });
              write(books, () => {
                res.end(JSON.stringify(book));
              });
            });
          });
        }
        break;
      case 'DELETE':
        if (!isNaN(id)) {
          read((data) => {
            data = data.filter(item => item.bookId !== id);
            write(data, () => {
              console.log('写入成功');
            });
            res.end(JSON.stringify({}));
          })
        }
        break;
    }
    return;
  }

  /*访问静态资源*/
  fs.stat('.' + pathname, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
    } else { //如果是目录，会报错
      if (stats.isDirectory()) {
        let p = path.join('.' + pathname, './index.html');
        res.setHeader('Content-Type', `${mime.lookup(p)}; charset=utf-8`);
        fs.createReadStream(p).pipe(res);
      } else {
        res.setHeader('Content-Type', `${mime.lookup(pathname)}; charset=utf-8`);
        fs.createReadStream('.' + pathname).pipe(res);
      }
    }
  })

}).listen(1206, () => {
  console.log('服务已启动，端口：1206');
});
