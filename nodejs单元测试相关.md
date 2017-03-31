---
title: nodejs单元测试相关
date: 2017-03-31 09:39:19
categories: 
- 笔记
tags: 
- nodejs
- 测试
reference:
- http://taobaofed.org/blog/2015/12/10/nodejs-unit-tests/
- http://wwsun.github.io/posts/testing-node.js-with-mocha-and-chai.html
- https://github.com/alsotang/node-lessons/tree/master/lesson6
description: nodejs单元测试相关

---

## 单元测试类型
单元测试氛围两种：`TDD`（测试驱动开发）和`BDD`(行为驱动开发)  
`TDD`：用户注册时，应用程序应当接收POST请求，检查字段是否有效，然后将数据库中的用户数量递增1  
`BDD`：作为一个用户，当我成功注册时，我应该看到“感谢注册”
```
// TDD
suite('Array', function() {
  setup(function() {
  });

  test('equal -1 when index beyond array length', function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });
});

// BDD
describe('Array', function() {
  before(function() {
  });

  it('should return -1 when no such index', function() {
    [1,2,3].indexOf(4).should.equal(-1);
  });
});

```
## 编写可测试代码
* 单一职责：让你的代码逻辑尽可能的单一，分离不同的功能，这样可以让代码更容易被测试
* 接口抽象：目标是针对接口进行测试，而具体代码实现的变化不影响为接口编写的单元测试
* 层次分离：代码分层，可以进行逐层测试

## 单元测试框架
单元测试框架有`Mocha`和`jasmine `等，以``Mocha`为例
例子:  
```
var User = require('./models/user');

describe('models/user',function(){

before(function(done){
    User.new({name:"小明"},done);
});

after(function(done){
    User.delete({name:'小明'},done);
});

it('shoule return an Object when find by name="小明",function(done){
    User.find({name:'小明'},function(err,user){
        if(err){
            return done(err);
        }
        user.should.be.an.Object();
        user.name.should.equal('小明');
        done();
    })
})
});
```
如上示例：首先在执行单测前通过 Mocha 的 before hook 向数据库里添加了一条测试数据，然后测试了 User.find 方法，最后通过 after hook 将这条测试数据删除。这里展示了 Mocha 的 hook 以及测试异步方法。  

###   示例程序
安装：
``` bash
npm install mocha --save-dev   //npm install mocha -g
npm install chai
```
官方示例程序
```
// test.js

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
```
然后，在`package.json`中的`scripts`属性中添加`"test":"mocha test.js"`。如果全局安装Mocha，只需在命令行中执行`mocha`命令，建议使用`npm run test`命令进行测试

### Mocha关键方法
```bash
describe(moduleName,callback)
```
描述一句测试用例是否正确。首先`describe`是可以嵌套的，多个`describe`嵌套的使用用于描述模块下的子模块的关系， 上面的代码的意思就是测试`Array`这个类下面的`#indexOf()`方法, `moduleName`是可以随便定义的，即是是中文也可以。 `“#”`的使用也是一般约定，不喜欢你也会换个或不用也可以。

```bash
it(info, callback)
```
真正的测试语句是在`it`函数的回调里面，`info`也是一句描述性的说明，看得懂就行。 `callback`里面的断言决定这条测试是否正确。如果失败的话控制台会把log打印出来。 一个`it`对应一个测试用例，里面可以有多条断言或一条断言。

### 异步代码测试
上面的代码是同步代码，异步测试完成的时候调用回调即可。
```
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) throw err;
        done(); // 通过使用 done() 回调的方法来表示测试完成
      });
    });
  });
});
```
其中`user.save()`是一个需要连接数据库的异步操作。和前面代码不同的是，这里使用了`done`作为回调函数（通常都这么命名）， 作为约定，Mocha会等到其执行完毕。为了简化问题，回调函数done()能够接收错误，代码可以简化为:
```
it('should save without error',function(done){
    var user = new User('Luna');
    user.save(done);
});
```
### 使用promise
```
// 在每次单元测试前执行
beforeEach(function() {
  return db.clear()
    .then(function() {
      return db.save([tobi, loki, jane]);
    });
});

describe('#find()', function() {
  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});
```
### 钩子
Mocha提供的钩子包括`before()`,`after()`,`beforeEach()`,`afterEach()`。
```
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});
```
对于钩子，可以提供描述信息
```
befortEach('some description',function(){
// befoteEach:some description
});
```
### 待处理测试（pending tests）
在it里面的function留空，mocha默认会pass这条测试
```
describe('Array',function(){
    describe('#indexOf()',function(){
        it('should return -1 when the value is not present');
    })
})
```

## 断言库
常见的断言库有：Should.js、expect.js、chai.js和assert(node内置)
断言库提供一套API帮助开发者在单元测试中判断某个值是否符合预期，例如：
```
//以should.js 为例
value.should.equal(1);
value.should.be.an.Object();
value.should.startWith('http://');
```
Mocha默认不提供断言库，几种厂用断言库语法：
```
// assert
assert.equal(value,1);

// should
valule.should.equal(1);
valule.should.be.a.Number();

// expect
expect(1).to.equal(1);
expect(value).to.be.a('number');
```

## 覆盖率
衡量单元测试覆盖了那些功能代码  
包括：[istanbul](https://github.com/gotwarlost/istanbul)
```bash
istanbul cover _mocha 
```
//windows不可用 可用`istanbul cover node_modules/mocha/bin/_mocha`替代