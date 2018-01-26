# 学会 Nightwatch: 初级教程


_让你的**验收测试**在**真实浏览器**中**自动化**运行_!

![nightwatch-logo-with-slogan](https://cloud.githubusercontent.com/assets/194400/16045809/099207e2-3242-11e6-99d4-99b227d7a38a.png)

## _为什么_?

测试网站的界面和和交互的响应是构建网站过程中最重要的一个环节.
你可能高效可扩展可复用的代码，响应极快的后端服务和无可挑剔的UI界面。但如果因为一个最简单的bug而导致用户无法使用你的网站，
那用户就会觉得它就是一坨屎。

![dilbert-internet-full](https://cloud.githubusercontent.com/assets/194400/16302737/b0bb3486-3944-11e6-9875-6e691587ccd0.png)

_使用Nightwatch (_Selenium_)这样的工具进行**验收测试**_ (**UAT**)，可以让你通过脚本的方式在真实的浏览器中验证你的网站，
这无疑会提高你对于你的产品在特定设备/浏览器下正常运行的信心。

## _用什么_?

_使用**真实的浏览器** 进行 **验收测试**_.

Nightwatch 是一个设置快速，并且测试脚本极易编写的一个工具。
> 我们 _尽可能_ 的通读了所有关于Nightwatch的教程、博客、文档（包含 mailing list 和 StackOverflow上的问答）
并把我们所掌握的内容浓缩成了一份开发指南。我希望你们觉得它对您有所帮助，并决定使用它测试您的应用的网站。
如果遇到困难可以通过issue给我们 [_**反馈**_](https://github.com/dwyl/learn-nightwatch/issues)

#### 相关链接

+ Nightwatch 官网: http://nightwatchjs.org/
+ Github: https://github.com/nightwatchjs/nightwatch
+ 指南/文档: https://github.com/nightwatchjs/nightwatch-docs
+ 文件配置: http://nightwatchjs.org/guide#settings-file

## _谁来使用_?

谁应该学习并使用 Nightwatch?

+ **开发者** - 想要通过自动化测试手段验证自己缩写代码的开发者.
+ **QA** - 需要手工测试网站的QA人员.
+ **测试人员** - 如果你是网站的测试人员，想要一种更好的编写自动化测试脚本的工具，使用它吧

## _如何使用_?

### _快速开始 (5分钟)_

_**尝试一下**_ 通过以下三个简单的步骤进行你的测试:


### 1. 克隆工程

通过以下的代码，在命令行中克隆以上工程

```sh
git clone https://github.com/dwyl/learn-nightwatch.git && cd learn-nightwatch && cp sample.env .env
```

> Note: if you're _curious_ what that last part is, see: https://github.com/dwyl/env2

### 2. 安装依赖<sup>1</sup>

通过命令安装Selenium服务器和chrome驱动程序：

```sh
yarn
```


### 3. 运行 (_测试集_)<sup>2</sup>

运行预置的Nightwatch 测试脚本:

```sh
yarn test
```


你预计会看到:  
![learn-nightwatch-console-output-success](https://cloud.githubusercontent.com/assets/194400/16376918/f2d9f8c0-3c5a-11e6-96c4-88e0bdb44638.png)

当你看到一堆测试用例通过，则说明你已配置成功可以开始使用Nightwatch进行测试了


<sup>1</sup><small>执行以上的操作之前 _请确保_ 您已经安装了nodejs.
如果没有请访问, https://nodejs.org/en/download/ </small>  
<sup>2</sup><small>Selenium 需要本机安装 Java/JDK 参见: [Java Installation section](https://github.com/dwyl/learn-nightwatch#installing-java-runtime-environment-jre)</small>

<br />


## *按照E2E测试教程，测试你的工程*

现在你已经试过使用Nightwatch运行测试用例了
让我们按照如下步骤把nightwatch集成到你的工程之中
let's walk through each of the steps to get this working in **_your_ project**.

### 安装 (_in detail_)

#### 1) 确保已经安装了Java环境

#### 2) 运行 `cd` 进入你的工程

#### 3) 安装 `nightwatch`


```sh
yarn add nightwatch
```

#### 4) 安装 `selenium-server`
```sh
yarn add selenium-server
```

#### 5) 配置

当你决定使用`nightwatch`之后,你需要创建一个对应的配置文件. 
 
建议您把它命名为 `nightwatch.conf.js`. 并保存到你的项目中.
你也可以拷贝我工程里的默认配置文件 nightwatch.conf.BASIC.js: [`nightwatch.conf.BASIC.js`](https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.BASIC.js)
或者拷贝下面的代码段并粘贴到 nightwatch.conf.BASIC.js之中

```js
require('env2')('.env'); // optionally store your Evironment Variables in .env
const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const SCREENSHOT_PATH = "./screenshots/";

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  "src_folders": [
    "test/e2e"// Where you are storing your Nightwatch e2e tests
  ],
  "output_folder": "./reports", // reports (test outcome) output by nightwatch
  "selenium": {
    "start_process": true, // tells nightwatch to start/stop the selenium process
    "server_path": seleniumServer.path,
    "host": "127.0.0.1",
    "port": 4444, // standard selenium port
    "cli_args": {
      "webdriver.chrome.driver" : chromedriver.path
    }
  },
  "test_settings": {
    "default": {
      "screenshots": {
        "enabled": true, // if you want to keep screenshots
        "path": SCREENSHOT_PATH // save screenshots here
      },
      "globals": {
        "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
      },
      "desiredCapabilities": { // use Chrome as the default browser for tests
        "browserName": "chrome"
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true // turn off to test progressive enhancement
      }
    }
  }
}

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath (browser) {
  var a = browser.options.desiredCapabilities;
  var meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
```

> One of our _favourite_ things about using a `.js` file
is the ability to add _comments_ in the file.  
This makes it _much_ easier for new people to
_understand_ what's going on.  
We have a slightly more _evolved_ `nightwatch.conf.js` (_with Saucelabs_) see:
[github.com/dwyl/learn-nightwatch/**nightwatch.conf.js**](https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.js)


#### 6) 运行配置文件

你需要运行以下命令，以安装相应的依赖

```sh
node nightwatch.conf.BASIC.js
```

#### 7) 创建你的 Nightwatch 测试用例

Nightwatch 会默认查找所有 `/test` 目录下的文件;
你可以任意设置，我们默认设置指向了`test/e2e`文件夹.

下面是一个_最简单_ 的测试用例.

假设你们的目录和我项目中的一致, 在test/e2e下创建一个名为 `guineaPig.js`的文件，并粘贴以下代码:

```js
var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Guinea Pig Assert Title': function(browser) {
    browser
      .url('https://saucelabs.com/test/guinea-pig')
      .waitForElementVisible('body')
      .assert.title('I am a page title - Sauce Labs')
      .saveScreenshot('guinea-pig-test.png')
      .end();
  }
};
```

> 参见: [github.com/dwyl/learn-nightwatch/**test/e2e**](https://github.com/dwyl/learn-nightwatch/tree/master/test/e2e)

#### 8) 运行你的测试

在工程的package.json中添加如下代码：
```sh
"scripts": {
    "test": "./node_modules/.bin/nightwatch --env local"
}
```

```sh
node_modules/.bin/nightwatch --config nightwatch.conf.BASIC.js
```

The camelCase filename ("guineaPig") is used to display the test's name in the console as in:

`Running:  Guinea Pig Assert Title`

We add an entry in our `package.json` `"scripts"` section
to _not_ have to type all that each time. e.g:

```js
"scripts": {
  "e2e": "nightwatch --config nightwatch.conf.BASIC.js"
}
```

Then _run_  your tests as:

```js
npm run e2e
```

If you called your config file `nightwatch.conf.js`
you can run your tests without specifying the config file, i.e.

```sh
node_modules/.bin/nightwatch
```

If you see the following message while trying to run the tests:
![learn-nightwatch-java-not-installed](https://cloud.githubusercontent.com/assets/194400/16425985/0e2a9e5e-3d5f-11e6-9bf0-d2eebcd97c2b.png)

Then return to step 2 to install Java

## _Optional_ (_Level Up_)

### Saucelabs

Most people _building_ web apps/sites don't have _easy_ access
to _several_ devices/browsers to test their output, if you
need to test in a _range_ of browsers/devices Saucelabs is a great option.

![browser logos](https://cloud.githubusercontent.com/assets/194400/16362868/8c29b448-3bb1-11e6-83f1-380edd462fb1.png)

In our [`nightwatch.conf.js`](https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.js)
we have defined _saucelabs_ as our `"default"` setting.

We _run_ our tests on saucelabs by running the following npm script/command:

```sh
npm run sauce
```

Which corresponds to the following _complete_ command:

```js
./node_modules/.bin/nightwatch -e chrome,ie11,android_s4_emulator,iphone_6_simulator
```

> This just means "_Run Nightwatch using the default configuration
(Saucelabs in our case) and execute all tests in this list of browsers_."

**Note**: you will need to have the following _**environment variables**_
exported for Saucelabs to run your test:
```sh
export SAUCE_USERNAME=your-username
export SAUCE_ACCESS_KEY=your-key
```

> If you're _new_ to Saucelabs, checkout:
[github.com/dwyl/**learn-saucelabs**](https://github.com/dwyl/learn-saucelabs)

### Upload Screenshots to S3

If you decide to use Saucelabs to run your tests (_in several devices/browsers_),
it will take screenshots for you and keep them inside Saucelabs.
That's _nice_ for people who are _used_ to using Saucelabs, but what about the
_other_ stakeholders?

We decided to upload our screenshots to S3 and created a _super-simple_ `.html`
file which shows a slideshow of the images.

> Example: https://isearch-ui.s3-eu-west-1.amazonaws.com/1.0.21/index.html

If you want the screenshots of tests to be uploaded to S3,
you will need to have the following environment variables declared:
```sh
export AWS_S3_BUCKET=yourbucket
export AWS_REGION=eu-west-1
export AWS_ACCESS_KEY_ID=IDHERE
export AWS_SECRET_ACCESS_KEY=YOURKEY
```
The _script_ we wrote to perform the uploading is:
[github.com/dwyl/learn-nightwatch/test/e2e/upload_screenshots_to_s3.js](https://github.com/dwyl/learn-nightwatch/blob/master/test/e2e/upload_screenshots_to_s3.js)

The screenshots taken on Saucelabs browsers/devices are saved _locally_
and uploaded to S3 when tests succeed.

<br />


### Running your Nightwatch tests on your application being served locally
- Before the test can run you have to set up sauce connect, there are many way to do this [docs here](https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect). The simplest way I have found is to use Sauce Connect launcher, which is an addon for firefox.
- Sauce Connect is sets up a tunnel to allow Sauce labs access to your local host, this means you can test whatever is being served from your local.
- To run the tests you must make sure the application is being served in one terminal and that the tunnel is open(this can be checked from the saucelabs dashboard), you then run your e2e test command in another terminal window.

### Running your Nightwatch tests on your _Continuous Integration_ (CI)

#### Running your Nightwatch tests on CI is easy on CodeShip.
We usually set the required (_minimum_) node version in our
`package.json` e.g:
```js
"engines": {
  "node": "4.4.6"
},
```
Once you have the desired version of node installed.

Setup Commands:
```js
# install dependencies:
npm install
```
Test Command:
```js
# run tests
npm test
```
That's it.

#### Running your Nightwatch tests on Travis-CI with sauce connect
Since we are testing on the localhost we have to make sure that the server is started before the tests are run and closes after the tests finish. So we need to boot up a server to serve our content. Travis makes this easy enough via a before_script task. In the task we will just start a python simple server and give it a few seconds to boot. The ampersand at the end of the python line tells travis to run the process in the background instead of blocking the execution thread, allowing us to run tasks at the same time.

```yml
language: node_js
before_script:
  - python -m SimpleHTTPServer &
  - sleep 2
node_js:
    - "6.0"
```

One other way to run a server before running a test is to use the `before` and `after` methods present in nightwatch.

```js
module.exports = {
  before: function (browser, done) {
  	server = require('../server')(done) // done is a callback that executes when the server is started
  },

  after: function () {
  	server.close()
  },

  'Demo test': function (browser) {
    browser
      .url('localhost:3000')   // visit the local url
      .waitForElementVisible('body'); // wait for the body to be rendered

    browser
      .assert.containsText('body','hello') // assert contains
      .saveScreenshot(conf.imgpath(browser) + 'dwyl.png')
      .end()
  }
}
```

The `server.js` can be a simple express server.

```js
function makeServer(done) {
  var express = require('express');
  var path = require('path');
  var app = express();

  app.get('/', function (req, res) {
  	res.status(200).sendFile(`index.html`, {root: path.resolve()});
  });
  var server = app.listen(3000, function () {
  	var port = server.address().port;
  	done()
  });
  return server;
}
module.exports = makeServer;
```
**Note** : In the above example you can see that the port is fixed. It will run fine if you are running tests on a single device. If you are running tests on multiple devices on saucelabs, this will give you an error that the port is already in use, as all the devices try to start the server on the same port (in our current approach). So we need to dynamically allot available ports to prevent this error. You can use [get-port](https://github.com/sindresorhus/get-port) for this.

This is all we need to run a test on browser/s. Now we have set up saucelabs on travis.

To run the test on Travis-CI and use sauce connect you need to add a addon to your .travis.yml
```
addons:
  sauce_connect: true
```

The `username` and `access_key` can be optionally stored in `.travis.yml` or can be stored on travis-ci website as environment variables. There are various methods of storing the `username` and `access_key` of saucelabs and you can read more about them [here](https://docs.travis-ci.com/user/sauce-connect/). In our case we have preferred to save it on travis website so that our `.travis.yml` is simple.

Now you have to make some changes in `nightwatch.conf.js`

```js
const TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER;
// in test_settings.default:
default: {
  launch_url: 'http://ondemand.saucelabs.com:80',

  username : process.env.SAUCE_USERNAME,     
  access_key : process.env.SAUCE_ACCESS_KEY,
  ...
  desiredCapabilities: {
    build: `build-${TRAVIS_JOB_NUMBER}`,
    'tunnel-identifier': TRAVIS_JOB_NUMBER,
  },
}
```
See the modified final config [here](./nightwatch.conf.TRAVIS.js)
You can run multiple test commands i.e.
```
- npm run test:unit; npm run test:e2e
```
You can see the working code [here](https://github.com/ritz078/embed.js/pull/228/files) and the corresponding test on travis [here](https://travis-ci.org/ritz078/embed.js/builds/211089816)

**Note-1**: Tests on the PRs of _forked repos_ will fail as the secured environment variables are not accessible to them on travis. You will receive authentication error in that case.

**Note-2**: Running tests on IE still seems tricky. Will have to explore more. Any help is appreciated.

**Note-3**: If you are receiving timeout error, maybe you are running tests on many devices. Try to adjust the time or decrease the number of devices.


#### Running your Nightwatch tests on CircleCi.
To run the test on circle ci you need to make some adjustments to your circle.yml
Here is an Example from the circle ci [docs](https://circleci.com/docs/browser-testing-with-sauce-labs/)
```
dependencies:
  post:
    - wget https://saucelabs.com/downloads/sc-latest-linux.tar.gz
    - tar -xzf sc-latest-linux.tar.gz

test:
  override:
    - cd sc-*-linux && ./bin/sc --user $SAUCE_USERNAME --api-key $SAUCE_ACCESS_KEY --readyfile ~/sauce_is_ready:
        background: true
    #Wait for tunnel to be ready
    - while [ ! -e ~/sauce_is_ready ]; do sleep 1; done
    - npm start
        background: true
    # Wait for app to be ready
    - curl --retry 10 --retry-delay 2 -v http://localhost:5000
    # Run selenium tests
    - npm run test:e2e
  post:
    - killall --wait sc  # wait for Sauce Connect to close the tunnel
```
The test override starts the selenium server for you. Once it is ready the application is started in the
 background. Finally when ready, the tests are started.
You can run multiple test commands i.e.
```
- npm run test:unit; npm run test:e2e
```
 just like in the package.json


<br /> <br />

#### Running a single nightwatch test
Nightwatch tests can be quite time-consuming so sometimes you may just want to run one test at a time

This can be done by giving each test a tag by adding `tags: [ 'tagname' ]` to the beginning of your exported test scenario. You can then run the individual test (in this case with tag 'test1') with the script:
` "node_modules/.bin/nightwatch --tag test1"`

If you want to dynamically choose which test to run using the command line, you could create another script in your package.json
e.g.
`"e2etag": "./node_modules/.bin/nightwatch --env local --tag"`

and then in your command line you can just run
`npm run e2etag -- test1`
# tl;dr

> More detail than you will _probably_ need ... _but we're keeping for completeness_.

## Background

### Why Nightwatch instead of `xyz`...?

We _first_ looked at [`NightmareJS`](https://github.com/segmentio/nightmare),
and even though it _looks_ really good (_fast_), we saw the _reaction_
non-technical people had when we mentioned it and did not want to have to _explain_
the _name_ to people/clients every time, so instead opted for _night**watch**_.
If _night**mare**_ ever change their name, we _could re-consider_ it.


### Research

+ Basic intro: http://juristr.com/blog/2014/02/nightwatch-test-automation/
+ Page Object Pattern: http://martinfowler.com/bliki/PageObject.html
+ Nightwatch with React: https://www.syncano.io/blog/testing-syncano/
+ How to run a _single_ Nightwatch test: http://stackoverflow.com/questions/28308990/how-to-run-a-single-test-in-nightwatch/29701199#29701199
+ Custom Commands: http://nightwatchjs.org/guide#writing-custom-commands
+ Nightwatch Global Variables:
http://stackoverflow.com/questions/25067391/how-to-make-a-globally-accessible-variable/
+ Travis with Saucelabs: http://samsaccone.com/posts/testing-with-travis-and-sauce-labs.html
+ Selenium Status:
http://stackoverflow.com/questions/6517501/selenium-2-how-to-check-that-server-is-running-and-stop-the-server
+ Silence Selenium on Travis:
http://andrew.yurisich.com/work/2014/08/30/silence-noisy-selenium-server-output-in-travis-ci/
+ Intro by @mikberg: https://medium.com/@mikaelberg/zero-to-hero-with-end-to-end-tests-using-nightwatch-saucelabs-and-travis-e932c8deb695
+ Intro (Angular-focussed): http://g00glen00b.be/e2e-testing-nightwatch-js/
+ Nightwatchjs: how to check if element exists without creating an error/failure/exception
http://stackoverflow.com/questions/31687027/nightwatchjs-how-to-check-if-element-exists-without-creating-an-error-failure-e
+ Can I create reusable test steps in nightwatch.js?
http://stackoverflow.com/questions/31388280/can-i-create-reusable-test-steps-in-nightwatch-js
+ Nightwatch on ***Saucelabs***: https://github.com/saucelabs-sample-test-frameworks/JS-Nightwatch.js

<br />

### Setup (*Detail*)

#### Manual Selenium Install

If you prefer to install it _manually_ that's an option.

> Visit: http://www.seleniumhq.org/download/ and download the latest version.

When downloading the `selenium-server-standalone-2.53.0.jar`
you _may_ see a _warning_ in your browser:  
![download-selenium-chrome-warning](https://cloud.githubusercontent.com/assets/194400/16004469/b865583a-3159-11e6-9b6a-40bd754ef209.png)  
Click on "keep" to save the file.
Once you have it, put it in the `bin` directory of your project
and re-name it to `selenium.jar` (_without the version number_).


### StackOverflow Questions

Remind me to Respond to these:
> + [x] http://stackoverflow.com/questions/24314040/getting-started-with-nightwatch-js
> + [ ] http://stackoverflow.com/questions/37699036/is-it-possible-to-start-a-selenium-server-inside-travis
> + [ ] http://stackoverflow.com/questions/25919673/file-upload-testing-in-nightwatch-js
> + [ ] http://stackoverflow.com/questions/31388280/can-i-create-reusable-test-steps-in-nightwatch-js/31393249#31393249
> + [ ] use saucelabs with nightwatch? http://stackoverflow.com/questions/36137270/how-to-use-saucelabs-with-nightwatch
> + [x] keypress: http://stackoverflow.com/questions/31812935/nightwatch-testing-sendkeys-and-keys-not-sending-key-clicks ... [*answer*](http://stackoverflow.com/questions/31812935/nightwatch-testing-sendkeys-and-keys-not-sending-key-clicks/37950264#37950264)
> + [x] Run Selenium as child process: http://stackoverflow.com/questions/27408864/cant-launch-selenium-phantomjs-ghostdriver-as-child-processes
> + [x] Current running browser: http://stackoverflow.com/questions/38102543/when-running-nightwatch-js-test-how-can-i-get-the-name-of-browser-currently-runn

## Cons (_of using Nightwatch_)

+ Selenium is not the fastest way to run tests.
