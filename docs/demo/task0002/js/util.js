// typeof can only detect type Object
// 判断arr是否为一个数组，返回一个bool值

function isArray(arr) {
    // your implement
    return Object.prototype.toString.call(arr) == '[object Array]';
}

// var ary = [1, 2, 3];
// console.log("Array test: " + isArray(ary));

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // your implement
    return Object.prototype.toString.call(fn) == '[object Function]'
}

function foo() {
    return 'foo';
}
// console.log("Function test: " + isFunction(foo));

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

function cloneObject(src) {
    var copy = src;
    if (src instanceof Date) {
        copy = new Date(src.getDate());
        return copy;
    }
    if (src instanceof Array) {
        copy = [];
        for (var i in src) {
            copy[i] = cloneObject(src[i]);
        }
        return copy;
    }
    if (src instanceof Object) {
        copy = {};
        for (var i in src) {
            copy[i] = cloneObject(src[i]);
        }
        return copy;
    }
    return copy;
}

// 测试用例：
// var srcObj = {
//     a: 1,
//     b: {
//         b1: ["hello", "hi"],
//         b2: "JavaScript"
//     }
// };
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);

// srcObj.a = 2;
// srcObj.b.b1[0] = "Hello clone";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var uniArr = [];
    for (var i in arr) {
        if (uniArr.indexOf(arr[i]) == -1) {
            uniArr.push(arr[i]);
        }
    }
    return uniArr;
}

// 使用示例
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    function isEmpty(c){
        return /\s/.test(c);
    }
    var len = str.length;
    for (var i=0; i<len && isEmpty(str[i]); i++);
    for (var j=len; j>0 && isEmpty(str[j-1]); j--);
    return str.substring(i, j);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    // https://www.cnblogs.com/zhangnan35/p/8635059.html
    return str.replace(/^(\s+)|(\s+$)\g/, '');
}

// 使用示例
// var str = '   hi!  ';
// // str = simpleTrim(str);
// // str = trim(str);
// console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    for (var i=0; i<arr.length; i++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item)
// }
// each(arr, output);  // java, c, php, html

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item)
// }
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var element = 0;
    for (var item in obj) {
        element++;
    }
    return element;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
// console.log(getObjectLength(obj)); // 3

/*
    讲正则表达式的blog：https://www.jianshu.com/p/488d60349325
*/
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    var reg = /^\w+@\w+(\.[a-z]+)+$/;

    return reg.test(emailStr);
}

// console.log(isEmail('233@qq.com'));     // true
// console.log(isEmail('233qq.com'));      // false
// console.log(isEmail('233@whu.edu.cn'));     //true
// var str5="pomelott@163.com";
// var str6="pomelo163.com";
// var str7="pomelo@163com";
// console.log(isEmail(str5));      //true
// console.log(isEmail(str6));      //false
// console.log(isEmail(str7));      //false

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    var reg = /^1[34578]\d{9}$/;
    return reg.test(phone);
}

// console.log(isMobilePhone('13016464648'))
// console.log(isMobilePhone('12301646448'))

// 3.1 我都不知道任务是做什么
// https://segmentfault.com/a/1190000004205443
// 看了一个博客我才大概懂是要做什么了
// 为element增加一个样式名为newClassName的新样式

function hasClass(element, className){
    var value = element.className;

    return value.match(new RegExp('/\s|^/' + className + '/\s|$/'));
}

function addClass(element, newClassName) {
    // your implement
    if (! hasClass(element, newClassName)) {
        var value = element.className;
        element.className = value + '' + newClassName;
    }  
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    if (! hasClass(element, oldClassName)) {
        var value = element.className;
        element.className = value.replace(oldClassName, '');
    }   
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
// emmm 没有现成的api接口嘛
// 他们为什么都知道有个 scroll 距离呀
/*
    看了一下有两种思路
    1. 通过遍历所有父元素，得到相对于窗口左上角的绝对位置；然后考虑滚动条的情况，这里要减去滚动条的移动（为什么是减请自行脑补）
    2. 通过this.getBoundingClientRect().left直接获得相对浏览器窗口的相对位置（阮老师说Safari不支持？）
*/
function getPosition(element) {
    // your implement
    var x = 0;
    var y = 0;
    var current = element;
    while (current != null) {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    }

    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

    x -= scrollLeft;
    y -= scrollTop;

    return {
        x : x,
        y : y
    }
}
// your implement


// 实现一个简单的Query
function $(selector) {
    // 获取html文本
    // 获取你妹啊，这就一个方法你想啥呢，自己写个document.getElementBy…()出来？你是不是疯了
    // 组合查询没有写
    var element = null;
    var prefix = selector.charAt(0);
    switch (prefix) {
        case '#':
            element = document.getElementById(selector.replace('#', ''));
            break;
        case '.':
            element = document.getElementsByClassName(selector.replace('.', ''));
            break;
        default:
            element = document.getElementsByTagName(selector);
    }
    return element;
}

// 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象

// // 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象

// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象

// // 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象

// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// // 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


// Task 4.1
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element.addEventListener(event, listener);
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element.removeEventListener(event, listener);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 例如：
//addEvent($("#doma"), "click", a);


// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function(e) {
        var keyCode = e.keyCode;
        if (keyCode == 13){
            listener.call(element, event);
        }
    })
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.enter = addEnterEvent;
$.click = addClickEvent;

// 讲道理，ife 这个 task 给的例子并不好，没有task1好 特别是到了DOM相关的内容，让人弄起来没有头绪。可以找找其他的教程和练习


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    // 看了别人的博客，ActiveXObject 是 ie 专属
    if (window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    // cookie : name=value; expires=..; path=
    // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // document.cookie = 
    var d = new Date();
    d.setTime(d.getTime() + (expiredays * 24 * 60 * 60 * 1000)); // ms
    var expire = 'expires=' + d.toUTCString();
    document.cookie = cookieName + '=' + cookieValue + '; expires' + expire + '; path=/;';
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    // decode cookie
    // cname='xxx' 给切出来
    var reg = new RegExp(cookieName + '/=(.*?)($|;)/');
    return reg.exec(document.cookie)[1] || null;
}


function ajax(url, options) {
    // your implement
    // ajax包括以下四步： 1. 创建ajax对象 2. 数据通过http传到服务器 3. 接收http返回的数据 4. 更新部分页面
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        // ie:
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp.readyState == 4 && xmlhttp.state == 200){
        options.onsuccess();
    } else {
        
        //options.onfail();
    }
    type = options.type || 'get';
    // open
    xmlhttp.open(type, url, true);
    if (type == 'get'){
        xmlhttp.send();
    } else {
        // post
        xmlhttp.send(options.data)
    }
}

// 使用示例：
// ajax(
//     'http://localhost:8080/server/ajaxtest', 
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );