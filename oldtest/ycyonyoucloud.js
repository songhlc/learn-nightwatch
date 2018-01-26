var conf = require('../nightwatch.conf.js');
module.exports = {
  'Demo test yonyoucloud': function (browser) {
    browser.resizeWindow(1400, 800);
    browser
      .url('https://yc.yonyoucloud.com/yuncai/mobile/login.html?r=/home')   // visit the url
      .waitForElementVisible('body'); // wait for the body to be rendered
    // check if we are seeing the Mobile Version of GitHub
    // part two:
    browser// assert body contains text
      .clearValue('#name')
      .setValue('#name', 'ys_cgs')
      .clearValue('#pwd')
      .setValue('#pwd', 'a1111111');
    // part two:
    browser.click('#submit');
    browser.saveScreenshot(conf.imgpath(browser) + 'ycyonyoucloud.png').end();
    // browser.click('#enter-workbench').waitForElementVisible('body'); // wait for the body to be rendered
    // browser.element("css selector", '.dashboard', function(result) {
    //   if(result.status != -1) { //Element exists, do something
    //     browser.saveScreenshot(config.imgpath(browser) + 'ycyonyoucloud.png').end(); // wait for the body to be rendered
    //   }
    // });
  }
};