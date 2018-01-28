var load_speed = 5000;
var conf = require('../../nightwatch.conf.js');
// 跳转到一个错误的地址就可以用确保location不变
var local_login_url = conf.urlprefix + "/yuncai/mobile/login.html?r=/home'";

exports.command = function(username, password) {
  this
    .url(local_login_url)
    .waitForElementVisible('body')
    .clearValue('#name')
    .setValue('#name', username)
    .clearValue('#pwd')
    .setValue('#pwd', password)
    .click('#submit')
    .pause(1000)
  return this;
};