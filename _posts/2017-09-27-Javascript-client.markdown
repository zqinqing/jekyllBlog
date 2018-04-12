---
date: 2017-09-27 19:00:31+00:00
layout: post
title: 1.2、javascript客户端
categories: 日志
tags: javascript
---

javascript语言核心部分的内容中的只是点交叉引用比较多，且只是点的层次感并不分明而在客户端javascript部分的内容排版方式有了较大改变.该章介绍如何让javascript在web浏览器中运行起来，从该章学到的最重要的内容是，javascript代码可以通过javascript标签内嵌入html文本中:

```js
    // javascript中的一些重要的全局函数:
    function moveon(){
        // 通过弹出一个对话框来询问用户一个问题
        var answer = confirm('准备好了吗?');
        if(answer)window.location = 'http://www.zqinqing.com';
    }
    // 在一分钟(6万毫秒)后执行定义的整个函数
    setTimeout(moveon,6000);
```

#### 通过脚本操纵html文档内容

这章内容将展示如何选取特定的html元素，然后给选中的html设置属性，修改元素内容,以及如何给文档添加新节点，这里的示列函数展示了如何查找和修改基本文档的内容。

    
```js
    // 在document中的一个指定的区域输出调试消息,如果document不存在这样一个区域,则创建一个
    function debug(msg){
        // 通过查看html元素id属性来查找文档的调试部分
        var log = document.getElementById('debuglog');
        if(!log){
            var log = document.createElement('div');        // 创建一个新的div 元素
            log.id = 'debuglog';                            // 给这个元素的html id赋值
            log.innerHTML = 'h1>Debug Log /h1>';            // 定义初始内容
            document.body.appendChild(log);                 // 将其添加到文档的末尾
        }

        var pre = document.createElement('pre');            // 创建pre标签
        var text = document.createTextNode(msg);            // 将msg包装在一个文本节点里面
        pre.appendChild(text);                              // 将文本添加至(pre)
        log.appendChild(pre);                               // 将(pre)添加至log
    }

    debug('新增文本');                                       // 调用函数
```

如何实用javascript来进行css样式操作，css样式定义内容的展示方式，这通常会实用到html元素的style和class属性

```js
    function hide(e, reflow){           // 通过javascript操纵样式来隐藏元素e
        if(reflow){                     // 如果第二个参数是true
            e.style.display = 'none';   // 隐藏这个元素,其所占的空间也随之消失
        }
        else {                              // 否则
            e.style.visibility = 'hidden';  // 将e隐藏,但是保留其所占的空间
        }
    }
    function highlight(e) {             // 通过设置css类来高亮显示
        // 简单定义或追加html属性
        // 这里假设css样式表中已经有'hilite'类的定义
        if(!e.className) e.className = 'hilite';
        else e.className += 'hilite';
    }
```
    
可以通过javascript来操控WEB浏览器中的HTML内容和文档的CSS样式，同样，也可以通过 事件处理程序(event handler)来定义文档的行为,事件处理程序是一个在浏览器中心注册的javascript函数，当特定的类型的时间发生时，浏览器便调用这个函数。通常我们关心的时间类型是鼠标点击事件和键盘按键事件,(在智能手机中则是各种触碰事件)。或者,当浏览器完成文档的加载当用户改变窗口大小或当用户向html表单元素中输入数据时便会触发一个事件.

定义事件处理程序最简单的方法是，给html的以'on'为前缀的属性绑定一个回调.当写一些简单的测试程序时,最实用的方法就是给'onclick'处理程序绑定回调。假定已经将上文的debug(),和hide();两个函数保存至名为debug.js和hide.js的文件中,那么就可以写一个简单的html测试文件,来给button元素的onclick属性指定一个事件处理程序,

下面这些客户端javascript代码用到了事件，它给一个很重要的事件 => load事件注册了已一个事件处理程序,同时,也展示了注册'click'事件处理函数更高级的一种方法

```js
    // 'load'事件只有在文档加载完成后才会触发
    // 通常需要等待load事件发生或才开始执行javascript代码
    window.onload = function (){    // 当文档加载完成时执行这里的代码
        // 找到文档中所有的img 标签
        var images = document.getElementsByTagName('img');
        // 遍历 images,给每个节点的'click'事件添加事件处理程序
        // 在点击图片时将图片隐藏
        for(var i = 0; i < images.length; i++){
            var image = images[i];
            if(image.addEventListener){                     // 注册事件处理程序的另一种方法
                image.addEventListener('click',hide,false); // 兼容：firefox、chrome、IE、safari、opera；不兼容IE7、IE8
            }else {
                image.attachEvent('onclick',hide);          // 兼容：IE7、IE8；不兼容firefox、chrome、IE9、IE10、IE11、safari、opera
            }
        }
        function hide(event) {
            event.target.style.visibility = 'hidden';
        }
    }
```


第15~17章讲诉了如何实用JavaScrit来操控网页的内容(html)、样式(css),以及行为(事件处理)。但是有兼容性的问题，所以很多客户端会采用jq库

```js
    // jQuery的代码非常易于识别,因为它充分利用了一个名为$()的函数,这里用jQuery重写了上文提到debug()函数
    function debug(msg){
        var log = $('.debuglog');                       // 找到要显示的msg元素
        if(!log){                                       // 如果不存在则创建之
            log = $('<div id="debuglog"><h1></h1></div>')
            log.appendTo(document.body);                // 并将其追加到body里
        }
        log.append($('pre').text(msg));                // 将msg包装在 pre 中,再追加log里
    }
```

目前所提到的第二部分的4章都是围绕网页展开讨论的。后续的4章将着眼转向WEB应用，这几章的内容并不是讨论如何通过编写操控内筒、样式和行为的脚本使用WEB浏览器来渲染文档而是讲解如何将WEB浏览器当做应用平台，并描述了用以支持更复杂精细的客户端WEB应用的现在浏览器API，第十八章讲解如何使用Javascript来发起http请求，第二十章买搜数据存储的机制以及客户端应用中的会话状态的保持，第21章涵盖基于html的canvas标签的客户端api，用来进行任意的图形的绘制，最后第22章讲解 h5 所提供的新一代web应用api，网络存储，图形:这些都是web浏览器提供的操作系统级的服务，他们定义了全新的跨平台的应用环境，如果你正在进行基于那些支持这些新api的浏览器的开发，这将是作为客户端javascript程序员最激动人心的时刻.

#### 示例:一个JavaScript贷款计算器

本章最后展示一个例子，这个例子集中使用了诸多技术，展示了真是环境下的客户端javascript(包括html和css)编程，这个例子展示了诸多javascript语言的核心特性，同样展示了重要的客户端javascript技术。

-  [x] 如何在文档中查找元素
-  [x] 如何通过表单input元素来获取用户的输入数据
-  [x] 如何听过文档元素来设置html内容
-  [x] 如何将数据存储在浏览器中
-  [x] 如何使用脚本发起http请求
-  [ ] 如何利用canvas元素绘图

css
```css
    .output {
        font-weight: bold;              // 粗体
    }
    #payment {
        text-decoration: underline;      // 下划线
    }
    #graph {
        border: 1px solid block;        // 1像素边框
    }
    th, td {
        vertical-align: top;            // 表格单元对其方式为顶端对齐
    }
```

这是一个HTML表格,其中包含了`<input>`表单可以用来输出数据，程序将在`<span>`标签中显示计算结果，这些元素都聚有类似`interset` 和 `years` 的id这些id 将在表格下面的javascript代码中用到。其中事件使用了 onclick 以及 onchange 触发程序，以便用户在输入数据或者点击 input 时执行指定的javascript代码段

html
```html
    <table>
        <tr>
            <th>输入贷款资料:</th>
            <td></td>
            <th>贷款余额，累积权益和利息支出</th>
        </tr>
        <tr><td>贷款金额($):</td>
            <td><input id="amount" onchange="calculate();"></td>
            <td rowspan=8>
                <canvas id="graph" width="400" height="250"></canvas>
            </td>
        </tr>
        <tr>
            <td>年利率(%):</td>
            <td><input id="apr" onchange="calculate();"></td>
        </tr>
        <tr>
            <td>还款期 (年):</td>
            <td><input id="years" onchange="calculate();"></td>
        </tr>
        <tr>
            <td>邮政编码 (寻找贷方):</td>
            <td><input id="zipcode" onchange="calculate();"></td>
        </tr>
        <tr>
            <th>大致付款:</th>
            <td><button onclick="calculate();">计算</button></td>
        </tr>
        <tr>
            <td>每月支付:</td>
            <td>$<span class="output" id="payment"></span></td>
        </tr>
        <tr>
            <td>总付款:</td>
            <td>$<span class="output" id="total"></span></td>
        </tr>
        <tr>
            <td>总利息:</td>
            <td>$<span class="output" id="totalinterest"></span></td>
        </tr>
        <tr>
            <th>主办单位:</th>
            <td colspan=2>用这些罚款贷款人之一申请贷款:<div id="lenders"></div></td>
        </tr>
    </table>
```

这段js代码,定义了一个caculate()函数，在html代码中绑定时间处理程序时会调用它，这个函数从`<input>`表单中获取数据，从而计算贷款赔付信息，并将结果显示在`<span>`标签，同样，也同时保存了用户数据，展示了放贷款人连接并绘制出了canvas图标

javascript
```js
    <script>
    "use strict"; // 如果浏览器支持的话,则开启ECMAscrpt 5的严格模式
    function calculate() {
        // 查找文档中用于输入输出的元素
        var amount = document.getElementById("amount");
        var apr = document.getElementById("apr");
        var years = document.getElementById("years");
        var zipcode = document.getElementById("zipcode");
        var payment = document.getElementById("payment");
        var total = document.getElementById("total");
        var totalinterest = document.getElementById("totalinterest");

        // 假设所有的输入都是合法的，将从input元素中获取输入数据
        // 将百分百格式转黄伟小数格式，并从年利率转换为月利率
        // 将年度赔付转换为月度赔付
        var principal = parseFloat(amount.value);
        var interest = parseFloat(apr.value) / 100 / 12;
        var payments = parseFloat(years.value) * 12;

        // 现在技术月度赔付的数据
        var x = Math.pow(1 + interest, payments);   // Math.pow() computes powers
        var monthly = (principal*x*interest)/(x-1);

        // 如果结果没有超过javascript能表示的数字范围，且用户的输入也正确
        // 这里展示的结果就是合法的
        if (isFinite(monthly)) {
            // 将数据填充至输出字段的位置，四舍五入到小数点后的两位数字
            payment.innerHTML = monthly.toFixed(2);
            total.innerHTML = (monthly * payments).toFixed(2);
            totalinterest.innerHTML = ((monthly*payments)-principal).toFixed(2);

            // 将用户的输入数据保存下来，这样在下次访问时也能获取数据
            save(amount.value, apr.value, years.value, zipcode.value);

            // 找到并展示本地放贷人，但忽略网络错误
            try {      // 捕捉这段代码抛出的所有异常
                getLenders(amount.value, apr.value, years.value, zipcode.value);
            }
            catch(e) { /* 忽略这段代码抛出的所有异常 */ }

            // 最后，用图表展示贷款余额，利息和资产收益
            chart(principal, interest, monthly, payments);
        }
        else {
            // 计算结果不是数字或者无穷大，意味着输入数据是非法或不完整的
            // 清空之前的数据
            payment.innerHTML = "";        // 清空元素的文本内容
            total.innerHTML = ""
            totalinterest.innerHTML = "";
            chart();                       // 不传参数的话就是清楚图表
        }
    }

    // 将用户的输入保存至localStorage对象的属性中
    // 这些属性在再次访问时还会继续保持在原位置
    // 如果你在浏览器中按照file://URL的方式直接打开本地文件
    // 而通过某些浏览器中使用存储功能(比如FireFox)
    function save(amount, apr, years, zipcode) {
        if (window.localStorage) {  // 只有在浏览器支持的时候才运行这里的代码
            localStorage.loan_amount = amount;
            localStorage.loan_apr = apr;
            localStorage.loan_years = years;
            localStorage.loan_zipcode = zipcode;
        }
    }

    // 在文档首次加载时，将会尝试还原输入字段
    window.onload = function() {
        // 如果浏览器支持本地存储并且上次保存的值是存在的
        if (window.localStorage && localStorage.loan_amount) {
            document.getElementById("amount").value = localStorage.loan_amount;
            document.getElementById("apr").value = localStorage.loan_apr;
            document.getElementById("years").value = localStorage.loan_years;
            document.getElementById("zipcode").value = localStorage.loan_zipcode;
        }
    };

    // 将用户的输入发送至服务器端脚本，(理论上)将
    // 返回一个本地放贷人的链接列表，在这个例子中并没有实现这种查找放贷人的服务
    // 但如果该服务存在，该函数会使用它
    function getLenders(amount, apr, years, zipcode) {
        // 如果浏览器不支持XMLHttpRequest对象,则退出
        if (!window.XMLHttpRequest) return;

        // 找到要显示放贷人列表的元素
        var ad = document.getElementById("lenders");
        if (!ad) return;                            // 如果返回为空,则退出

        // 将用户输入的输入进行URL编码,并且作为查询参数附加在URL里
        var url = "getLenders.php" +                // 处理数据的URL地址
            "?amt=" + encodeURIComponent(amount) +  // 使用查询串中的数据
            "&apr=" + encodeURIComponent(apr) +
            "&yrs=" + encodeURIComponent(years) +
            "&zip=" + encodeURIComponent(zipcode);

        // 通过XMLHttpRequest对象来提取返回数据
        var req = new XMLHttpRequest();        // 发起一个新的请求
        req.open("GET", url);                  // 通过URL发起一个HTTP get请求
        req.send(null);                        // 不带任何正文发送这个请求

        // 再返回数据之前，注册了一个事件处理函数，这个处理函数
        // 将会在服务器的响应返回至客户端的时候调用
        // 这种异步变成模型在客户端javascript中是非常常见的
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                // 如果代码运行到这里，说明我们得到了一个合法且完整的http相应
                var response = req.responseText;     // HTTP响应是以字符串的形式呈现的
                var lenders = JSON.parse(response);  // 将其解析为js数组

                // 数组中的放贷人对象转换为html字符串形式
                var list = "";
                for(var i = 0; i < lenders.length; i++) {
                    list += "<li><a href='" + lenders[i].url + "'>" +
                        lenders[i].name + "</a>";
                }

                // 将数据在html元素中呈现出现
                ad.innerHTML = "<ul>" + list + "</ul>";
            }
        }
    }

    // 在html<canvas>元素中用图表展示月度贷款余额，利息和资产收益
    // 如果不传入参数，则清空之前的图表数据
    function chart(principal, interest, monthly, payments) {
        var graph = document.getElementById("graph"); // 得到canvas标签
        graph.width = graph.width;  // 用一种巧妙地手法清楚并重置画布

        // 如果不传入参数，或者浏览器不支持话，则直接返回
        if (arguments.length == 0 || !graph.getContext) return;

        // 获得画布元素的"context" 对象，这个对象定义了一组绘画api
        var g = graph.getContext("2d"); // 所有绘画操作都将基于这个对象
        var width = graph.width, height = graph.height; // 获得画布大小

        // 这里的函数作用是将付款数字和美元数据转换为像素
        function paymentToX(n) { return n * width/payments; }
        function amountToY(a) { return height-(a * height/(monthly*payments*1.05));}

        // 付款数据时一条从 (0,0) to (payments, monthly*payments)的直线
        g.moveTo(paymentToX(0), amountToY(0));         // 从左下方开始
        g.lineTo(paymentToX(payments),                 // 绘至右上方
                 amountToY(monthly*payments));
        g.lineTo(paymentToX(payments), amountToY(0));  // 再至右下方
        g.closePath();                                 // 将结尾连接至开头
        g.fillStyle = "#f88";                          // 亮红色
        g.fill();                                      // 填充矩形
        g.font = "bold 12px sans-serif";               // 定义一种字体
        g.fillText("Total Interest Payments", 20,20);  // 将文字绘至到图例中

        // 很多资产数据并不是线性的，很难将其反映至图表中
        var equity = 0;
        g.beginPath();                                 // 开始绘制新图形
        g.moveTo(paymentToX(0), amountToY(0));         // 从左下方开始
        for(var p = 1; p <= payments; p++) {
            // 计算出每一笔赔付的利息
            var thisMonthsInterest = (principal-equity)*interest;
            equity += (monthly - thisMonthsInterest);  // 得到资产额
            g.lineTo(paymentToX(p),amountToY(equity)); // 将数据绘制到画布上
        }
        g.lineTo(paymentToX(payments), amountToY(0));  // 将数据线绘制至x轴
        g.closePath();                                 // 将线条结尾连接至线条开头
        g.fillStyle = "green";                         // 使用绿色绘制图形
        g.fill();                                      // 曲线之下的部分均填充
        g.fillText("Total Equity", 20,35);             // 文本颜色设置为了绿色

        // 再次循环，余额数据显示为黑色粗线条
        var bal = principal;
        g.beginPath();
        g.moveTo(paymentToX(0),amountToY(bal));
        for(var p = 1; p <= payments; p++) {
            var thisMonthsInterest = bal*interest;
            bal -= (monthly - thisMonthsInterest);     // 得到资产额
            g.lineTo(paymentToX(p),amountToY(bal));    // 将直线连接至某点
        }
        g.lineWidth = 3;                               // 将直线宽度加粗
        g.stroke();                                    // 绘制余额的曲线
        g.fillStyle = "black";                         // 使用黑体字体
        g.fillText("Loan Balance", 20,50);             // 图例文字

        // Now make yearly tick marks and year numbers on X axis
        g.textAlign="center";                          // 文字居中对齐
        var y = amountToY(0);                          // Y坐标设为0
        for(var year=1; year*12 <= payments; year++) { // 遍历每年
            var x = paymentToX(year*12);               // 计算标记位置
            g.fillRect(x-0.5,y-3,1,3);                 // 开始绘制标记
            if (year == 1) g.fillText("Year", x, y-5); // 在坐标轴做标记
            if (year % 5 == 0 && year*12 !== payments) // 每5年的数据
                g.fillText(String(year), x, y-5);
        }

        // Mark payment amounts along the right edge
        g.textAlign = "right";                         // 文字右对齐
        g.textBaseline = "middle";                     // 文字垂直居中
        var ticks = [monthly*payments, principal];     // 我们将要用到的两个点
        var rightEdge = paymentToX(payments);          // 设置X坐标
        for(var i = 0; i < ticks.length; i++) {        // 对每两个点做循环
            var y = amountToY(ticks[i]);               // 计算每个标记的Y坐标
            g.fillRect(rightEdge-3, y-0.5, 3,1);       // 绘制标记
            g.fillText(String(ticks[i].toFixed(0)),    // 绘制文本
                       rightEdge-5, y);
        }
    }
    </script>
```