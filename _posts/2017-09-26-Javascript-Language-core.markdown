---
date: 2017-09-26 19:00:31+00:00
layout: post
title: 1.1、javascript语言核心 
categories: 日志
tags: javascript
---



在前端这条路上，我想要走的更远，必须要基础扎实，所以我选择了把javascript权威指南这本js的书给啃下，以提高自己的基础水平。在书中的第一小节，主要是这本书的起始，也是整本书的概述，涉及的知识点比较多，

这是我学习javascript权威指南的学习笔记、希望过后能给自己一个回忆,和给自己留下一份日后可以温习的笔记。这是javascript权威指南`code`的第一章，第一节主要简述了javascript的注释，及javascript的数据类型,以及变量、赋值等等。

#### javascript的注释

```js
    // 变量是表示值的一个符号名字
    // 变量是通过var 关键字声明的
    var x;                 // 声明了一个变量x
    // 值可以通过等号赋值给变量
    x = 0;                 // 现在变量x的值为0
    x                      // => 0:通过变量获取其值

    // javascript 支持多种数据类型
    x = 1;                 // 数字 number 类型
    x = 0.01;              // 整数和实数共用了一种数据类型,它们都是 number 数字类型
    x = 'hello world';     // 由单引号的文本构成的字符串   string 类型
    x = "javascript";      // 由双引号的文本构成的字符串   string 类型
    x = true;              // 布尔值 boolean 类型
    x = false;             // 布尔值 boolean 类型
    x = null;              // null 是一个特殊的值，意思是空
    x = undefined          // undefined 和 null 非常类似
```


#### javascript的对象and数组

在javascript中，有两个非常重要的数据类型是对象和数组，对象和数组在javascript中运用的非常频繁.

```js
    // javascript中最重要的类型就是对象
    // 对象是名 / 值的集合，或字符串到值映射的集合
    var book = {                        // 对象是由花括号映射的集合
        topic: 'javascript',            // 属性topic的值是'javascript'
        fat: true                       // 属性fat的值是true
    };                                  // 右花括号是必须要有的，标志着对象的结束

    // 通过"." 或 "[]"来访问对象属性
    book.topic                          // => 'javascript'
    book['fat']                         // => true: 这是另一种获取属性的方式
    book.author = 'zqinqing';           // 通过赋值创建一个新属性
    book.contents = {};                 // {} 是一个空对象,它没有属性

    // javascript 同样支持数组( 以数字索引的列表 ) *从零开始
    var primes = [2,3,5,7];             // 拥有4个值的数组,由"["和"]"划定边界
    primes[0]                           // => 2:数组中的第一个元素(索引从零开始代表第一个)
    primes.length                       // => 4:数组中的元素个数
    primes[primes.length - 1]           // => 7:数组的最后一个元素
    primes[4] = 9;                      // => 通过赋值来添加新元素
    primes[4] = 11;                     // => 通过赋值来改变已有元素
    var empty = [];                     // => 是空数组，它具有0个元素
    empty.length                        // => 0

    // 数组和对象中都可以包含另一个数组或对象
    var points = [
        {x: 0,y: 0},                    // 具有两个元素的数组
        {x: 1,y: 1}                     // 每个元素都是一个对象
    ];

    var data = {                        // 一个包含两个属性的对象
        trial1: [[1,2],[3,4]],          // 每一个属性都是数组
        trial2: [[2,3],[4,5]]           // 数组的元素也是数组
    };
```

上段代码通过方括号定义数组元素和通过花括号定义对象那个属性名和属性值之间的映射关系的语法成为初始化表达式initilizer expression, 表达式是javascript重的一个短语，这个短语可以通过运算的出一个值。通过'.'和'[]'来引用对象属性或数组元素的值就构成一个表达式.

#### javascript的运算符

```js
    // javascript中最常见的表达式写法是像下面代码这样使用运算符(operator):
    // 运算符作用余操作数,生成一个新的值
    // 最常见的是算术运算符
    3 + 2                                   // => 5:加法
    3 - 2                                   // => 1:减法
    3 * 2                                   // => 6:乘法
    3 / 2                                   // => 1.5:除法
    points[1].x - points[0].x               // => 1:更复杂的操作也能照常工作
    '3' + '2'                               // '32': + 可以完成加法运算也可以做字符连接

    // Javascript定义了一些算术运算符的简写形式
    var count = 0;                          // 定义一个变量
    count ++;                               // 自增1
    count --;                               // 自减1
    count +=2;                              // 自增2: 和'count = count + 2'; 写法一样
    count *=3;                              // 自乘3: 和'count = count * 3'; 写法一样
    count                                   // => 6: 变量名本身也是一个表达式

    //  相等关系元素副用来判断两值是否相等
    //  不等、大于、小于运算符的运算结果是true或者false
    var x = 2,y = 3;                    // 这里的 = 等号是复制的意思,不是比较相等
    x == y                              // => false: 相等
    x != y                              // => true: 不等
    x < y                               // => true: 小于
    x <= y                              // => true: 小于等于
    x >= y                              // => false: 大于等于
    "two" == "three"                    // => false: 两个字符串不相等
    "two" > "three"                     // => true: 'tw'在字母表中的索引大于'th'
    false == (x > y)                    // => true: false和false相等

    // 逻辑运算符是对布尔值的合并或求反
    (x == 2) && (y == 3)                // => true: 两个比较都是true, &&表示"与"
    (x > 3) || (y < 3)                  // => false: 两个比较不都是true, || 表示"或"
    !(x == y)                           // => true: !'求反'
```

语句和表达式之间有很多共同之处,粗略地讲,表达式仅仅计算出一个值但并不作任何操作,它并不改变程序的运行状态。而语句并不包含一个值(或者说包含的值我们并不关系)，但是，它们改变程序的状态.在上文中已经见过变量声明语句和赋值语句。另一类语句是"控制结构"(control structure),比如条件判断和循环。

#### javascript的函数

函数是带有名称(named)和参数的javascript代码段,可以以此定义多次调用.

```js
    // 函数是一段带有参数的javascript代码段,可以多次调用
    function plus1(x){                                  // 定义了名为plus1的一个参数,带有参数x
        return x + 1;                                   // 返回一个比传入的参数大的值
    }                                                   // 函数的代码是由花括号包裹起来的的部分
    plus1(y)                                            // => 4: y 为3,调用函数的结果为 3 + 1

    var square = function(x) {                          // 函数是一种植,可以复制给变量
        return x*x;                                     // 计算函数的值
    };                                                  // 分好表示了复制语句的结束

    square(plus1(y))                                    // => 16: 在一个表达式重调用两个函数
```

当函数和对象合写在一起时,函数就变成了"方法"(method):
    
```js
    // 当函数复制给对象的属性,我们称为'方法',所有的JavaScript独享都含有方法
    var a = [];                                         // 创建一个空数组
    a.push(1,2,3);                                      // push()方法想数组中添加元素
    a.reverse();                                        // 另一个方法:讲数组元素的次序反转

    // 数组和对象中都可以包含另一个数组或对象
    var points = [
        {x: 0,y: 0},                    // 具有两个元素的数组
        {x: 1,y: 1}                     // 每个元素都是一个对象
    ];

    // 我们也可以定义自己的方法,"this"关键字是对定义方法的对象的引用:这里的例子是上文日岛的包含两个点的位置信息的数组
    points.dist = function() {                  // 定义一个方法用来计算两点之间的距离
        var p1 = this[0];                       // 通过this获得对当前数组的引用
        var p2 = this[1];                       // 并取得调用的数组前两个元素
        var a = p2.x - p1.x;                    // x坐标轴上的距离
        var b = p2.y - p2.x;                    // y坐标轴上的距离
        return Math.sqrt(a * a + b * b);        // 用Math.sqrt()来计算平方根
    }

    points.dist()                               // => 1.414 :求得两个点之间的距离
```

下面是一下控制语句的例子,这里的实例函数内包含了最常见的javascript控制语句:

```js
    // 这些javascript语句使用该语法包含条件判断和循环，使用类似C、C++、java和其它的语法
    function ads(x) {                       // 求绝对值的函数
        if(x >= 0){                         // if判断语句
            return x;                       // 如果比较结果为true则执行这里的代码.
        }                                   // 子句的结束
        else {                              // 当if条件不满足时执行else字句
            return - x;
        }                                   // 如果分支中只有一句语句，花括号是可以省略的
    }                                       // 注意if/else中嵌套的return语句

    function factorial(n){                  // 计算阶乘的函数
        var product = 1;                    // 给product赋值为1
        while(n > 1){                       // 当()内的表达式为true时循环执行{}内的代码
            product *= n;                   // 'product = product * n';的简写形式
            n--;                            // 'n = n -1'  的简写形式
        }
        return product;                     // 返回product
    }

    factorial(4);                           // => 24: 1*4*3*2


    function factorial2(n) {                // 实现循环的另一种写法
        var i, product = 1;                 // 给product赋值为1
        for(i = 2; i <= n; i ++)            // 讲i从2自增至n
            product *= i;                   // 循环体,当循环体中只有一句代码,可以省略{}
        return product;                     // 返回计算好的阶乘
    }
    factorial2(5);                          // => 120: 1*2*3*4*5;
```

javascript是一种面向对象的编程语言,但和传统的面向对象又有很大区别，下面是一个简单的示列，这段代码扎实了如何在javascript中定义一个类来表示2D平面几何中的点,这个类实例化的对象拥有一个名为r()的方法,用来计算该点到原点的距离:

```js
    // 定义一个构造函数以初始化一个新的point对象
    function point(x, y){                   // 按照惯例,构造函数均以大写字母开始
        this.x = x;                         // 关键字this指向初始化的实例
        this.y = y;                         // 将函数参数存储为对象的属性
    }                                       // 不需要return

    // 使用new关键字和构造函数来创建一个实例
    var p = new point(1,1);                 // 平面几何中的点(1,1);

    // 通过给构造函数的prototype对象赋值给point对象定义方法
    point.prototype.r = function (){
        return Math.sqrt(this.x * this.x + this.y * this.y);    // 返回x<sup>2</sup>+y<sup>2</sup>的平方根
    }                                                           // this指代调用这个方法的对象

    // point的实例对象p (以及所有的point实例对象)继承了方法r()
    p.r();                                                      // => 1.414...
```