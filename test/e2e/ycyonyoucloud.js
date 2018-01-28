var conf = require('../../nightwatch.conf.js');
var page1 = conf.urlprefix + '/cpu-portal-fe/portalcas.html#/pages/buyoffer/buyofferlist'
var title = {
  selector: 'input[name="subject"]'
}
var modify = {
  selector: '.table-warp table span[title="修改"]'
}
    module.exports = {
      'getSnapShot': function (browser) {
        browser.resizeWindow(1400, 800);
        // browser.login('public01', 'a1111111')
        browser.login('public01', 'a1111111')
        browser.url(page1)
          .waitForElementVisible(modify.selector);
        browser.click(modify.selector);
        browser.waitForElementVisible(title.selector);
        browser.clearValue(title.selector);
        browser.setValue(title.selector, '12345678');
        browser.click('#qtSaveBtn');
        browser.waitForElementNotPresent('#qtSaveBtn');
        browser.end();
      }
    }