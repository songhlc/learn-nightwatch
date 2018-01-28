var conf = require('../../nightwatch.conf.js');

module.exports = {
  'Demo test yonyoucloud': function (browser) {
    browser.maximizeWindow();
    browser
      .url('https://yc.yonyoucloud.com/yuncai/mobile/login.html?r=/home')   // visit the url
      .waitForElementVisible('body'); // wait for the body to be rendered
    // check if we are seeing the Mobile Version of GitHub
    // part two:
    browser
      .saveScreenshot(conf.imgpath(browser) + 'ycyonyoucloud.png')
      .end();
  }
};





//
// var conf = require('../nightwatch.conf.js');
// module.exports = {
//   'Demo test yonyoucloud': function (browser) {
//     // browser.maximizeWindow();
//     browser
//       .url('https://yc.yonyoucloud.com/yuncai/mobile/login.html?r=/home')   // visit the url
//       .waitForElementVisible('body'); // wait for the body to be rendered
//     browser// assert body contains text
//       .clearValue('#name')
//       .setValue('#name', 'ys_cgs')
//       .clearValue('#pwd')
//       .setValue('#pwd', 'a1111111');
//     // part two:
//     browser.click('#submit');
//     browser.saveScreenshot(conf.imgpath(browser) + 'ycyonyoucloud.png').end();
//   }
// };