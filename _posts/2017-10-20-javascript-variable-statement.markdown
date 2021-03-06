---
date: 2017-10-20 20:00:31+00:00
layout: post
title: 1.6、第一部分 第三章 类型、值和变量 3.9节 变量声明
categories: javascript语言核心
tags: 变量声明
---

### 3.9 变量声明

在javascript程序中,使用一个变量之间应当先声明,变量是使用关键字var来声明的,如下所示:

```js
    var i;
    var sum;
```

也可以通过一个var关键字来声明多个变量:

```js
    var i,num;
```

而且还可以将变量的厨师服之和变量声明合写在一起:

```js
    var message = 'hello';
    var i = 0, j = 0, k = 0;
```

如果未在var声明语句中给变量指定初始值,那么虽然声明了这个变量,但在给它存入一个值之前,它的初始值就是undefined。

我们注意到,在for和for/in循环(在第5章会讲到)中同样可以使用var语句,这样可以更简洁地声明在循环体语法内中使用的循环变量,例如:

```js
    for(var i = 0; i < 10; i++) console.log(i);
    for(var i = 0, j = 10; i < 10; i++,j--) console.log(i * j);

    var o = {x:1, y:2}; 
    for(var p in o) console.log(p);
```

如果你之前编写过诸如C或java的静态语言,你会注意到在javascript的变量声明中并没有指定变量的数据类型.javascript变量可以使任意数据类型,例如,在javascript中首先将数字赋值给一个变量,随后再讲字符串复制给这个变量,这是完全合法的:

```js
    var i = 10;
    i = 'ten';
```

**重复的声明和遗漏的声明**

使用var 语句重复声明变量是合法且无害的,如果重复声明带有初始化器,那么这就和一条简单的赋值语句没什么两样.

如果你试图读取一个没有声明的变量的值,javascript会报错,在ECMAScript 5严格模式(见5.7.3节)中,给一个没有声明的变量赋值也会报错,然而从历史上讲,在非严格模式下,如果给一个为生命的变量赋值,javscript实际上会给全局对象创建一个同名属性,并且它工作起来像(但并不完全一样,查看3.10.2节)一个正确声明的全局变量,这以为着你可以侥幸不声明全局变量,但这是一个不好的习惯并会造成很多的bug,因此,你应当始终使用var来声明变量.

### 3.10 变量作用域

一个变量的作用域(scope)是程序源代码中定义这个变量的区域,全局变量拥有全局作用域,在javascript代码中的任何地方都是有定义的,然而在函数内声明的变量只是函数体内有定义,它们是局部变量,作用域是局部性的,函数参数也是局部变量,它们只在函数体内有定义.

在函数体内,局部变量的优先级高于同名的全局变量,如果在函数内声明的一个局部变量或者函数参数中带有的变量和全局变量重名,那么全局变量就被局部变量所遮盖.

```js
    var scope = 'global';               // 声明一个全局变量
    function checkscope() {
        var scope = 'local';            // 声明一个同名的局部变量
        return scope;                   // 返回局部变量的值,而不是全局变量的值
    }

    checkscope();                       // => 'local';
```

尽管在全局作用域编写代码时可以不写var语句,但声明局部变量时则必须使用var语句,思考一下如果不这样做会怎样:

```js
    scopr = 'global';                   // 声明一个全局变量,甚至不用var 声明
    function checkscope2(){
        scope = 'local';                // 糟糕!我们刚刚修改了全局变量
        myscope = 'local';              // 这里显式地声明了一个新的全局变量
        return [scope, myscope];        // 返回两个值 
    }

    checkscope2();                       // => ['local', 'local']    : 产生了副作用
    scope                                // => 'local'               : 后面声明的全局变量把前面的覆盖了
    myscope                              // => 'local'               : 全局命名空间搞乱了
```

函数定义是可以嵌套的,由于每个函数都有它自己的作用域,因此会出现几个局部作用域嵌套的情况,例如:

```js
    var scope = 'global scope';         // 全局变量
    function checkscope() {                 
        var scope = 'local scope';      // 局部变量
        function nested(){
            var scope = 'nested scope'; // 嵌套作用域内的局部变量
            return scope;               // 返回当前作用域内的值
        }
        return nested;
    }               
    checkscope();                       // => '嵌套作用域'                    
```

#### 3.10.1 函数作用域和声明提前

在一些类似C语言的编程语言中,花括号内的每一段代码都具有各自的作用域,而且变量在声明它们的代码段之外是看不见的,我们称之为块级作用域,而且变量在声明它们的代码段之外是不可见的,我们称为块级作用域`(block scope)`,而javascript中没有块级作用域,javascript取而代之地使用了函数作用域`(fcuntion scope)`:变量资额声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的。

在如下代码中,在不同的位置定义了变量**i、j和k**,它们都在同一个作用域内,这三个变量在函数体内均是有定义的.

```js
    function test(o){
        var i = o;                          // i 在整个函数体内均是有定义的
        if(typeof o == 'object'){           
            var j = o;                      // j 在函数体内是有定义的,不仅仅是在这个代码段内
            for (var k = o; k < 10; k++){   // k 在函数体内是有定义的,不仅仅是在循环体
                console.log(k);             // 输出数字0 ~ 9
            }                           
            console.log(k);                 // k 已经定义了,输出10
        }
        console.log(j);                     // j 一定定义了,但可能没有初始化
    }
    test("测试");                           // "测试"是字符串，不是对象，if判断为假,不执行if语句中的代码块，但是虽然j是在if内声明的，但它在整一个test函数内都是可见的，即j已经声明，仅仅未赋值，所以输出undefined。
    
    // 输出:
    undefined
    undefined
```


```js
    var testObject = {
            x:2,y:3
        };
    function test(o) {
            var i  = 0;
            if (typeof o == "object") {
                var j = 0;
                for (var k=0; k < 10; k++) {
                    console.log(k);
                }
                console.log(k);
            }
            console.log(j);
        }
    test(testObject);                      // 此处testObject是一个对象，满足if的判断条件，执行if花括号内的代码块，j则在if花括号内赋值为0，因此j输出的值为0
    
    // 输出
    0
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    0
```

javascript的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的,有意思的是,这意味着变量在声明之前甚至已经可用,javascript的这个特性被非正式地称为声明提前`(hoisting)`,即javascript函数里声明的所有变量(但不涉及赋值)都被`提前`,至函数体的顶部,看一下如下代码:

```js
    var scope = 'global';
    function f(){
        console.log(scope);             // 输出'undefined',而不是'global'
        var scope = 'local';            // 变量在这里赋初始值,但变量本身在函数体内任何地方均是有定义的
        console.log(scope);             // 输出'local'
    }
```
你可能会误以为函数中的第一行会输出'global',因为代码还没执行到var语句声明局部变量的地方,其实不然,由于函数作用域的特性,局部变量在整个函数体始终是有定义的,也就是说,在函数体内局部变量遮盖了同名全局变量,尽管如此,只有在程序执行到var 语句的时候,局部变量才会被真正赋值,因此,上述过程等价于:将函数内的变量声明`提前`至函数体顶部,同时变量初始化留在原来的位置:

```js
    function f(){
        var scope;                      // 在函数顶部声明了局部变量
        console.log(scope);             // 变量存在,但其值是'undefined'
        scope = 'local';                // 这里将其初始化并赋值
        console.log(scope);             // 这里它具有了我们所期望的值
    }
```

在具有块级作用域的编程语言中,在狭小的作用域里让变量声明和使用变量的代码尽可能靠近彼此,通常来讲,这是一个非常不错的编程习惯,由于javascript没有块级作用域,因此一些程序员特意将变量声明放在函数体顶部,而不是将声明靠近放在使用变量之处,这种做法是的他们的源代码非常清晰地放映了真实的变量作用域.

#### 3.10.2作为属性的变量

当声明一个javascript全局变量时,实际上是定义了一个全局对象的一个属性(见3.5节).当使用var声明一个变量时,创建的这个属性是不可配置的(见6.7节),也就是说这个变量无法通过delete运算符删除,坑你你已经注意到了,如果你没有使用严格模式并给一个未声明的变量赋值的话,javascrtipt会自动创建一个全局变量,以这种方式创建的变量时全局对象的正常可配置属性,并可以删除它们:

```js
    var truevar = 1;                    // 创建一个不可删除的全局变量
    fakevar = 2;                        // 创建一个全局对象的一个可删除的属性
    this.fakevar2 = 3;                  // 同上
    delete truevar                      // false  : 变量并没有被删除
    delete fakevar                      // true   : 变量被删除
    delete this.fakevar2                // true   : 变量被删除
```

javascript 全局变量是全局对象的属性,这是ECMAScript规范中强制规定的,对于局部变量则没有如此规定,但我们可以想象得到,局部变量当做跟函数调用相关的某个对象的属性,ECMAScript 3规范称该对象为`调用对象`**(call object)**,ECMAScript 5规范称为`声明上下文对象`(declarative environment record)。javasctipt可以允许使用this关键字来引用全局对象,却没有方法可以引用全局变量中存放的对象,这种存放局部变量的对象的特有性质,是一种对我们不可见的内部实现,然而,这些局部变量对象存在的观念是非常重要的,我们会在下一节展开叙述。

#### 3.10.3作用域链

js是基于词法作用域的语言: 通过阅读包含变量定义在内的属性源码就能知道变量的作用域,全局变量在程序中始终都是有定义的,局部变量在声明它的函数体内以及其所嵌套的函数内始终是有定义的。

如果将一个局部变量看做是自定义实现的对象的属性的话,那么可以换个角度来解读变量作用域,每一段js代码(全局代码或函数)都有一个与之关联的作用域链(`scope chain`)。这个作用域链是一个对象列表或者链表,这组对象定义了这段代码`作用域中`的变量。当js需要查找变量x的值的时候(这个过程称做`变量解析`(variable resolution)),它会从链中的第一个对象开始查找,如果这个对象有一个名为x的属性,则会直接使用这个属性的值，如果第一个对象中不存在名为x的属性,js就会继续查找链上的下一个对象,如果第二个对象依然没有名为x的属性,则会急需查找下一个对象，以此类推,如果作用域上没有任何一个对象含有属性x,那么就认为这段代码的作用域链上不存在x,并最终抛出一个引用错误(ReferenceError)异常。

在js的最顶层代码中,(也就是不包含在任何函数定义内的代码),作用域链是有一个全局对象组成，在不包含嵌套的函数体内,作用域链上有两个对象,第一个是定义了函数参数和局部变量的对象,第二个是全局对象,在一个嵌套的函数体内,作用域链上天至少有三个对象,理解对象链的创建规则是非常重要的,当定义一个函数时，它实际上保存一个作用域链,当调用这个函数时，它创建一个新的对象来存储它的局部变量,并将这个对象添加至保存的那个作用域上,同时创建一个新的更长的表示函数,内部函数又会重新定义一遍,因为每次调用外部函数的时候,内部函数的代码都是相同的,而且关联这段代码的作用域链也不相同.

作用域链的概念对于理解with语句(5.7.1节)是非常有帮助的,同样对理解闭包(见8.6节)的概念也至关重要。

