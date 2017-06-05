var express = require('express');
var cheerio = require('cheerio');
//使用superagent-charse解决爬取网页编码设置成gbk和GB2312，爬取中文出现的问题
var superagent = require('superagent-charset');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('http://news.qq.com/')
  	.charset('gbk')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.Q-tpList .linkto').each(function (idx, element) {
        items.push({
          title: $(this).text(),
          href: $(this).attr('href')
        });
      });
      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});