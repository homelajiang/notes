---
title: nodejs模板handlerbar使用
date: 时间
categories: 
- 笔记
tags: 
- nodejs
- handlerbars
reference:
- https://cnodejs.org/topic/56a2e8b1cd415452622eed2d
- http://www.tuicool.com/articles/aiaqMn
- http://www.cnblogs.com/qieguo/p/5811988.html
description: nodejs模板引擎handlerbars相关
---

## 介绍与配置
## partial
## helper
### 默认helper
* if else
* unless
* each
* with
* lookup
### 自定义helper
* 行级helper
* 块级helper
* 自定义helper
* 其他
### 其他
* 调用Handlerbars.unregisterHelper('list');即可销毁一个helper
* 一次注册多个helper
```javascript
handlerbars.registerHelper({
    foo:function(){},
    bar:function(){}
})
```
## 