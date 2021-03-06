---
date: 2017-10-23 20:00:31+00:00
layout: post
title: 1.8、第一部分 第四章 表达式和运算符 4.8算术表达式
categories: 表达式、运算符
tags: 表达式、运算符
---

### 4.8 算术表达式

本节涵盖了那些进行算术计算的运算符,以及对操作数的算术操作,乘法,除法和减法运算符非常简单,我们首先讲解它们,加法运算符单独占一节,因为加法同样可以做字符串连接操作,并且其类型转换有些特殊,一元运算符和位运算符同样在单独的两节中会讲到.

基本的算术运算符是`*乘法`、`/除法`、`%求余`、`+加法`、`-减法`。我们会在随后有专门一节讲述`+`运算符,剩下的4个运算符非常简单.只是在必要的时候将操作数转换为数字而已，然后求积、商、余数、和差,所有那些无法转换为数字的操作数都转换为NaN值,如果操作数(或者转换结果)是NaN值,算术运算的结果也是NaN、

运算符'/'用第二个操作数来除以第一个操作数,如果你使用过那些区分整型和浮点型数字的编程语言,那么当用一个整数除以另一个整数时,则希望得到的结果也是整数,但在js中，所有的数字都是浮点型的,除法运算的结果也是浮点型,比如,5/2的结果是2.5,而不是2除数为零的运算结果为正无穷大,而0/0的结果是NaN,所有这些运算均不会报错。

运算符'%'计算的是第一个操作数对第二个操作数的模.换句话说,就是第一个操作数除以第二个操作数的余数,结果的符号和第一个操作数(被除数)的符号保持一致,例如,5%2结果是1,-5%2的结果是-1.

求余运算符的操作数通常都是整数,但也适用于浮点数,比如.6.5%2.1结果是0.2.

#### 4.8.1 '+'运算符

二元加法运算符'+'可以对两个数字做加法,也可以做字符串连接操作:

```js

    1 + 2               // => 3 
    'hello' + 'there'   // => 'hello there'
    '1' + '2'           // => '12'
```

当两个操作数都是数字或都是字符串的时候,计算结果是显而易见的,然而对于其他情况来说,则要进行一些必要的类型转换,并且运算符的行为依赖于类型转换的结果,加号的转换规则优先考虑字符串连接,如果其中一个操作数是字符串或者转换为字符串的对象，另一个操作数将会转换为字符串,加法将进行字符串的连接操作,如果两个操作数都不是类字符串(string-like)的,那么都将进行算术加法运算。

从技术上来讲,加法操作符的行为表现为:

* · 如果其中一个操作数是对象,则对象会遵循对象到原始值的转换规则转换为原始类值(参考3.8.3节):日期对象通过sostring();方法执行转换,其他对象则通过valueOf方法执行转换,如果valueOf方法返回一个原始值的话，由于多数对象都不具备可用的valueOf()方法,因此他们会通过toString();方法来执行转换.
* · 在进行对象到原始值的转换后,如果其中一个操作数是字符串的话,另一个操作数也会转换为字符串，然后进行字符串的连接、
* · 否则,两个操作数都将转换为数字(或NaN),然后进行加法操作。

这里有一些例子:

```js
    
    1 + 2            // => 3    : 加法
    '1' + '2'        // => '12' : 字符串拼接
    '1' + 2          // => '12' : 数字转换为字符串后进行字符串拼接
    1 + {}           // => '1[object object]' : 对象转换为字符串后进行字符串拼接
    true + true      // => '2'  : 布尔值转换为数字后做加法

    2 + null         // => 2    : null 转换为0后做加法
    2 + undufined    // => NaN  : undefined转换为NaN后做加法
```

最后,需要特别注意的是,当加号运算符和字符串和数字一起使用时,需要考虑加法的结合行的对运算顺序的影响,也就是说,运算结果是依赖于运算符的运算顺序的,比如：

```js
    
    1 + 2 + 'blind mice';           // => '3 blind mice'
    1 + (2 + 'blind mice');         // => '12 blind mice'
```
第一行没有圆括号, '+'运算符具有从左至右的结核性,因此两个数字首先尽心加法计算,计算结果和字符串进行拼接,在第二行中,圆括号改变了运算顺序： 数字2和字符串拼接,生成一个新字符串,然后数字1和这个新字符串进行再次拼接,生成了最终结果.

#### 4.8.2一元算术运算符

一元运算符作用域一个单独的操作数,并产生一个新值,在js中,一元运算符具有很高的优先级，而且都是结合(right-associative)。本节将讲述一元算术运算符(+、-、++和--),必要时,他们会将操作数转换为数字.需要注意的是,'+'和'-'是一元运算符,也是二元运算符。

下面介绍一元算术运算符:

**一元加法(+)**

* · 一元加法运算符把操作数转换为数字(或者NaN),并返回这个转换后的数字,如果操作数本身就是数字,则直接返回这个数字.

**一元减法(-)**

* · 当'-'用做一元运算符时,它会根据需要把操作数转换为数字,然后改变运算结果的符号。

**递增(++)**

* · 递增'++'运算符对其操作数进行增量(加一)操作,操作数是一个左值(lvalue)(变量,数组元素或对象属性),运算符将操作数转换为数字,然后给数字加1,并将加1后的数值重新赋值给变量,数组元素或者对象属性。
* · 递增'++'运算符的返回值依赖于它相对操作数的位置,当运算符在操作数之前,称为自增量,(pre-increment)运算符,它对操作数进行增量计算,并返回计算后的值,当运算符在操作数之后,称为'后增量'(post-increment)运算符,它对操作数进行增量计算,但返回未做增量计算的(unincremented)值,思考一下如下两行代码之间的区别:

```js
    
    var i = 1, j = ++i;                 // i和j的值都是2
    var i = 1, j = i++;                 // 1是2,j是1
```
* · 需要注意的是,表达式++x并不总和x = x + 1完全一样,'++'运算符从不进行字符串连接操作,它总是会将操作数转换为数字并自增1,如果x是字符串,'1'，++x的结果就是数字2,而x+1是字符串'11'.
* · 同样需要注意的是,由于js会自动进行分号补全,因此不能再后增量运算符和操作数之间插入换行符,如果插入了换行符,js将会把操作数当做一条单独的语句,并在其之前补上一个分号.
* · 不管是前增量还是后增量,这个运算符通常用在for循环中,用于控制循环内的计数器(见5.5.3节).

**递减( - - )**

* · 递减' - - '运算符的操作数也是一个左值,它把操作数转换为数字,然后减1,并将计算后的值重新赋值给操作数,和'++'运算符一样,递减'--'运算符的返回值依赖于它相对操作数的位置,当递减运算符在操作数之前，操作数将减1并返回减去1之后的值,当递减运算符在操作数之后,操作数减1并返回减1之前的值,当递减运算符在操作符的右侧时,运算符和操作数之间不能有换行符。

#### 4.8.3 位运算符
位运算符可以对由数字表示的二进制进行更低层级的按位运算,尽管他们并不是传统的数学运算,但这个也将其归类为算术运算符,因为他们作用域数值类型的操作数并返回数学运算,但这里也将其归类为算术运算符,因为它们作用于数值类型的操作数,并返回数字,这些运算符在js编程中并不常用,如果你对十进制整数的二进制表示并不熟悉的话,你可以跳过本节内容,这里的4个运算符都是对操作数的每个位进行布尔运算,这里将操作数的每个位当做布尔值,(1 = true, 0 = false).其他三个位运算符用来进行左移位和右移位.

位运算符要求它的操作数是整数,这些整数表示,为32位整形而不是64位浮点数,必要时,(*@ο@*) 位运算符,首先要将操作数转换为数字,并将数字强制表示为32位整型,这会忽略原格式中的小数部分和任何操作32位的二进制位,它们舍弃第5位之后的二进制位,以便生成一个位数正确的数字,需要注意的是,位运算符会将NaN,infinity和-Infinity都转换为0、

按位与(&)

*   位运算符'&'对它的整型操作数逐位执行布尔与(AND)操作，只有两个操作数中相对应的位都是1,结果中的这一位才是1,例如: 0x1234 & 0x0034.

按位或(`|`)

*   位操作符`|`对它的整型操作数逐位执行布尔或(OR)操作,如果其中一个操作数相应的位为1,或者两个操作数相应位都是1,那么结果中的这一位就是1,例如:0x1234 `|` 0x00FF = 0x12FF。

按位异或(^)

*   位运算符'^'对它的整型操作数逐位执行布尔异或(XOR)操作,异或是指第一个操作数位true或第二个操作数位true,但两者不能同时为true,如果两个操作数中只有一个相应位为1(不能同时为1),那么结果中的这一位就是1,例如:0xFF00 ^ 0xF0F0 = 0x0FF0

按位非(~)

*   运算符'~'是一元运算符,位于一个整型参数之前,它将操作数所有的位取反,根据js中带符号的整数的表示方法,对一个值使用'~'运算符相当于改变它的符号并减1,例如： ~0x0F = 0xFFFFFFF0 或 -16

左移(<<)

*   将第一个操作数的所有二进制进行左移操作,移动的位数由第二个数指定,移动的位数是0~13之间的一个整数,例如,在表达式a<<1中,a的第一位变成了第二位,a的第二位变成了它的第三位,以此类推,例如: 7 << 2 = 28

带符号右移动(>>)

*   运算符'>>'将第一个操作数的所有位进行右移操作,移动的位数由第二个操作数指定,移动的位数是0~31之间的一个整数,右边溢出的位将忽略,填补在左边的位由原操作数的符号决定,以便保持结果的符号与原操作数一致,如果第一个操作数是正数,移位后用0填补最高位,如果第一个操作数是负的,移位后就用1填补高位,将一个值右移1位,相当于它除以2(忽略余数),右移两位,相当于它除以4,以此类推,例如,7 >> 1 = 3, -7 >> 1 = -4.

无符号右移( >>> )

*   运算符'>>>'和运算符'>>'一样,只是右边的高为总是填补0,与原来的操作数符号无关,例如,-1 >> 4 = -1,但是-1 >>> 4 = 0x0FFFFFFF.




### 4.9关系表达式

本节介绍js的关系运算符,关系运算符用于检测两个值之间的关系(比如"相等","小于",或"是....的属性"),根据关系是否存在而返回true或false,关系表达式总是返回一个布尔值,通常在if,while或者for语句,(参照第五章)中使用关系表达式,用以控制程序的执行流程,接下来的几节讲述相等和不相等运算符,比较运算符和js中其他两个关系运算符in和instanceof。

#### 4.9.1 相等和不等运算

'=='和'===',运算符用于比较两个值是否相等,当然它们对相等的定义不尽相同.两个运算符允许任意类型的操作数,如果操作数相等则返回true,否则返回false.

`===`也称为严格相等运算符,(strict equality)(有时也称作恒等运算符(identity operator)),它用来检测两个操作是否相等,这里相等,的定义非常宽松,可以允许进行类型转换。

js支持'='、'=='、'==='、运算符,你应当理解这些(`赋值`、`相等`、`恒等`)运算符之间的区别,并在编码过程中小心使用,尽管它们都可以称做`相等`单位了减少概念混淆,应当把`=`称为得到或赋值,把`==`称做相等,把`===`称做严格相等。

`!=` 和`!==`运算符的检测规则是`==`和`===`运算符的求反,如果两个值通过`==`的比较结果为true,那么通过`!=`的比较结果则为false,如果两个值通过`===`的比较结果为true,那么通过`!==`的比较结果则为false,4.10节会提到,`!`运算符是布尔运算符,我们只要记住`!=`称做不相等,`!==`称做不严格相等,就可以了。

在3.7节已经提到,js对象的比较是引用的比较,而不是值的比较,对象和其本身是相等的,但和其他任何对象都不相等,如果两个不同的对象具有相同数量的属性,相同的属性名和值,它们依然是不相等的.相应位置的数组元素是相等的两个数组也是不相等的。

严格相等运算符`===`首先计算其操作数的值,然后比较这两个值,比较过程中没有任何类型转换:

* · 如果两个值类型不相同,则他们不相等.
* · 如果两个值都是null或者都是undefined,则它们不相等.
* · 如果两个值都是布尔值true,或都是布尔值false,则它们相等. 
* · 如果其中一个值是NaN,或者两个值都NaN,则它们不相等,NaN和其他任何值都是不相等的,包括它本身!,通过x!==x来判断是否为NaN,只有在x为NaN的时候,这个表达式的值才为true.
* · 如果两个值为数字且数值相等,则它们相等,如果一个值为0,另一个值为-0,则它们同样相等.
* · 如果两个值为字符串,且所含的对应位上的16位数(参照3.2节)完全相等,则它们相等,如果他们的长度或内容不同,则它们不等,两个字符串可能含义完全一样且所显示出的字符也一样,但具有不同编码的16位值,js并不对Unicode进行标准化的转换,因此像这样的字符串通过'==='和'=='运算符的比较结果也不相等,第三部分的String.localeCompare()提供了另外一种比较字符串的方法.
* · 如果两个引用值指向同一个对象,数组或函数,则它们是相等的，如果指向不同的对象,则它们是不等的,尽管两个对象具有完全一样的属性.

相等运算符'=='和恒等运算符相似,但相等运算符的比较并不严格,如果两个操作数不是同一个类型,那么相等运算符会尝试一些类型转换,然后进行比较.

* · 如果两个操作数的类型相同,则和上文所述的严格相等的比较规则一样,如果严格相等,那么比较结果为相等,如果他们不严格相等,则比较结果为不相等.
* · 如果两个操作数的类型不同,'=='相等操作数符也可能认为它们相等,检测相等将会遵守如下规则和类型转换:

*   —— 如果一个值是null,另一个是undefined,则它们相等.
*   —— 如果一个值是数字,另一个是字符串,先将字符串转换为数字,然后使用转换后的值进行比较。
*   —— 如果其中一个值是true,则将其转换为1再进行比较.如果其中一个值是false.则将其转换为0再进行比较。
*   —— 如果一个值是对象,另一个值是数字或字符串,则使用3.8.3节所提到的转换规则将对象转换为原始值,然后在进行比较,对象通过toString(),方法或valueOf方法转换为原始值,js语言黑心的内置类首先尝试使用用valueOf(),再尝试使用toString(),除了日期类,日期类只是用toString()转换,那些不是js语言核心的对象则通过各自的实现中定义的方法转换为原始值。
*   —— 其他不同类型之间的比较均不相等.

**这里有一个判断相等的小例子**

```js
    '1' == true;
```

这个表达式的结果是true,这表明完全不同类型的值比较结果为相等,布尔值·true,首先转换为位数字1,然后再执行比较,接下来,字符串'1'页转换为数字1,因为两个数字的值相等,因此比较结果为true。

#### 4.9.2比较运算符

比较运算符用来检测两个操作数的大小关系,(数值大小或字母表的顺序):

**小于(<)**

*   ·如果第一个操作数小于第二个操作数,则'<'运算符的计算结果为true,否则为false

**大于(>)**

*   ·如果第一个操作数大于第二个操作数,则'>'运算符的计算结果为true,否则为false。

**小于等于(<=)**

*   ·如果第一个操作数小于或者等于第二个操作数,则'<='运算符的计算结果为true,否则为false。

**大于等于(>=)**

*   ·如果第一个操作数大于或者等于第二个操作数,则'>='运算符的计算结果为true,否则为false。

比较操作符的操作数可能是任意类型,然而,只有数字和字符串才能真正的执行比较操作,因此那些不是数字和字符串的操作数都将进行类型转换,类型转换规则如下：

*   ·如果操作数为对象,那么这个对象将依照3.8.3节结果处所描述的转换规则转换为原始值,如果valueOf()返回一个原始值,那么直接使用这个原始值,否则,使用toString(),的转移结果进行比较操作.
*   ·在对象转换为原始值之后,如果两个操作数都是字符串,那么将依照字母的顺序对两个字符串进行比较,这里提到的'字母表顺序'是指组成这个字符串的16位Unicode字符的索引顺序.
*   ·在对象转换为原始值之后,如果只有有一个操作数不是字符串，那么两个操作数都将转换为数字进行数值比较,0 和 -0是相等的,Infinity比其他任何数字都大,(除了InfinIty本身),-Infinity比其他任何数字都小(除了它自身).如果其中一个操作数是(或转换后是)NaN,那么比较操作符总是返回false。

需要注意的是,js字符串是一个由16位整数值组成的序列,字符串的比较也只是两个字符串中的字符的数值比较,由Unciode定义的字符编码顺序和任何特定语言或者本地语言字符集中的传统字符编码顺序不尽相同,注意,字符串比较是区分大小写的,所有的大写的ASCII字母都'小于'小写的ASCII字母,如果不注意这条不起眼的规则的话会造成一些小麻烦,比如,使用'<'小于运算符比较,'Zoo'和'aardvark',结果为true。

参照string.localCompare()方法来获得更多字符串比较的相关信息,String.localCompare()方法更加健壮可靠,这个方法参照本地语言的字母表定义的字符次序,对于那些不区分字母大小写的比较来说,则需要首先将字符串转换为小写字母或大写字母,通过String.toLowerCase(),和String.toUpperCase().做大小写的转换.

对于数字和字符串操作来说,加好运算符和比较运算符的行为都有所不同,前者更偏爱字符串,如果它的其中一个操作数是字符串的话,则进行字符串连接操作,而比较运算符则更偏爱数字,只有在两个操作数都是字符串的时候,才会进行字符串的比较:

```js
    1 + 2       // 加法,结果是3
    '1' + '2'   // 字符串连接,结果是'12'
    '1' + 2     // 字符串连接,2转换为'2',结果是'12'
    11 < 3      // 数字的比较,结果为false
    '11' < '3'  // 字符串的比较,结果为true
    '11' < 3    // 数字的比较,'11'转换为11,结果为false.
    'one' < 3   // 数字的比较,'one'转换为NaN,结果为false.
```

最后,需要注意的是,'<='(小于等于)和'>='(大于等于)运算符在判断相等的时候,并不依赖于相等运算符和严格相等运算符的比较规则,相反,小于等于运算符怒只是简单的'不大于',大于等于运算符也只是'不小于'。只有一个例外,那就是当其一个操作数是(或者转换后是)NaN的时候,所有4个比较运算符均返回false。

#### 4.9.3 in运算符
`in`运算符希望它的左操作数是一个字符串或可以转换为字符串,希望它的右操作数是一个对象,如果右侧的对象拥有一个名为左操作数值的属性名,那么表达式返回true,例如:

```js
    var point = {x : 1,y : 1 };         // 定义一个对象
    'x' in point                        // => true  : 对象中有一个名为'x'的属性.
    'z' in point                        // => false : 对象中不存在一个名为'z'的属性
    'toString' in point                 // => true  : 对象继承了toString()方法


    var data = [7, 8, 9];               // 拥有三个元素的数组
    '0' in data                         // => true  : 数组中包含元素'0'
    1  in data                          // => true  : 数字转换为字符串
    3  in data                          // => false : 没有索引为3的元素
```

#### 4.9.4 instanceof 运算符

`instanceof`运算符希望左操作数是一个对象,右操作数标识对象的类,如果左侧的对象是右侧类的实例,则表达式返回true.否则返回false,第九章将会讲到,js中对象的类是通过初始化它们构造函数来定义的,这样的话,instanceof的右操作数应当是一个函数,比如:

```js
    var d = new Date();                 // 通过Date()构造函数来创建一个新对象。
    d instanceof Date;                  // => true  : d是由Date()创建的。
    d instanceof Object;                // => true  : 所有的对象都是Object的实例
    d instanceof Number;                // => false : d不是一个number对象

    var a = [1, 2, 3];                  // 通过数组直接量的写法创建一个数组.
    a instanceof Array;                 // => true  : a是一个数组
    a instanceof Object;                // => true  : 所有的数组都是对象
    a instanceof RegExp;                // => false : 数组不是正则表达式
```

需要注意的是,所有的对象都是Object的实例,当通过instanceof判断一个对象是否是一个类的实例的时候,这个判断也会包含对'父类'(superclass)的检测,如果instanceof的左操作数不是对象的话,instanceof返回false,如果右操作数不是函数.则抛出一个类型错误异常。

为了理解instanceof是如何工作的,必须首先理解'原型链'(prototype chain).原型链作为js的继承机制,将在6.2.2节详细讲述,为了计算表达式o instanceof f,js首先计算f.prototype,然后在原型链中查找o,如果找到,那么o就是f(或者f的父类)的一个实例,表达式返回true,如果f.ptototype不在o的原型链中的话,那么o就不是f的实例.instanceof返回false。

### 4.10逻辑表达式

逻辑运算符'&&'、`||`、和'!'是对操作符进行布尔算术运算,经常和关系运算符一起配合使用,逻辑运算符将多个关系表达式组合起来组成一个更复杂的表达式,这些运算符在下面几节中会一一讲述,为了更高地理解他们,应当首先回顾一下3.3节提到的'真值'和'假值'的概念、

#### 4.10.1逻辑与(&&)

`&&`运算符可以从三个不同的层次进行理解,最简单的第一层理解是,当操作数都是布尔值的时候,`&&`对两个值执行布尔与(AND)操作,只有在第一个操作数和第二个操作数都是true的时候,它才返回true,如果其中一个操作数是false,它返回false。

`&&`常用来连接两个关系表达式

```js
    x == 0 && y == 0 // 只有在x和y都是0的时候,才会返回true
```

关系表达式的运算结果总是为true或false,因此当这样使用的时候,`&&`运算符本身也返回true或false,关系运算符的优先级比`&&`和(`||`)要高,因此类似这种表达式可以放心地书写,而不用补充圆括号.

但是`&&`的操作数并不一样是布尔值,回想一下,有些值可以当做`真值`和`假值`(参照3.3节,假值是false、null、undefined、0、-0、NaN和'',所有其他的值包括所有对象都是真值),对`&&`的第二层理解是,`&&`可以对真值进行布尔与(AND)操作,如果两个操作数都是真值,那么返回一个真值,否则,至少一个操作数是假值的话,则返回一个假值,在js中任何希望使用布尔值的地方,表达式和语句都会将其当做真值或假值来对待,因此实际上`&&`并不总是返回true和fasle,但也并无大碍.

需要注意的是,上文提到了运算符返回一个`真值`,或者`假值`,但并没有说明这个`真值`或者`假值`到底是什么值,为此,我们深入讨论对`&&`的第三层,(也是最后一层的理解),运算符首先计算左操作数的值,即首先计算`&&`左侧的表达式,如果计算结果是假值,那么整个表达式的结果一定也是假值,因此,`&&`这时简单地返回左操作数的值,而并不会对右操作数进行计算。

反过来讲，如果左操作数是真值,那么整个表达式的结果则依赖于右操作数的值,如果右操作数是真值,那么整个表达式的值一定是真值,如果右操作数是假值,那么整个表达式的值一定是假值,因此,当左操作数是真值时,`&&`运算符将计算右操作数的值并将其返回座位整个表达式的计算结果:

```js
    var o = {x : 1};
    var p = null;
    o && o.x        // => 1 : o是真值,因此返回值为o.x
    p && p.x        // => 0 : p是假值,因此将其返回,而并不去计算p.x
```

这对于理解&&可能不会去计算右操作数的情况至关重要,在上述的示列代码中,变量p的值是null,而如果计算表达式p.x的话会抛出一个类型错误异常,但是示列代码使用了&&的一种复合语言习惯的用法,因此只有在p为真值,(不能是null或undefined)的情况下才会计算p.x

```js
    if(a == b) stop();      // 只有在 a == b的时候才调用stop();
    (a == b) && stop();     // 同上
```

一般来讲,当`&&`右侧的表达式具有副作用的时候,(赋值、递增、递减和函数调用表达式)要格外小心,因为这些带有副作用的表达式的执行依赖左操作数的计算结果.

尽管`&&`可以按照第二层和第三层的理解进行一些复杂的表达式运算,但大多数情况下,`&&`仅用来对真值和假值做布尔计算。

#### 4.10.2逻辑或(||)

`||`运算符对两个操作数做布尔值或(OR)运算，如果其中一个或者两个操作数是真值,他返回一个真值,如果两个操作数都是假值,它返回一个假值.

尽管`||`运算符大多数情况下只是做简单布尔或(OR)运算,和`&&`一样,它也具有一些更复杂的行为,它会首先计算第一个操作数的值,也即是说会首先计算左侧的表达式,如果计算结果为真值,那么返回这个真值,否则,在计算第二个操作数的值,即计算右侧的表达式,并返回这个表达式的计算结果.

和`&&`运算符一样,同样应当避免右操作数包含一些具有副作用的表达式,除非你目的明确的在有测试用带副作用的表达式,而有可能不会计算右侧的表达式。

这个运算符最常用的方式是用来从一组备选表达式中选出第一个真值表达式:

```js
    // 如果max_width已经定义了,直接使用它,否则在preferences对象中查找max_width
    // 如果没有定义它,则使用一个写死的常量。
    var max = max_width || preferences.max_width || 500;
```

这种惯用法通常用在函数体内,用来给参数提供默认值:
```js
    // 将o的成员属性复制到p中,并返回p
    function copy(o, p) {
        p = p || {};            // 如果向参数p没有传入任何对象,则使用一个新创建的对象
        // 函数体内的主逻辑
    }
```

#### 4.10.3逻辑非(!)

`!`运算符是一元运算符,它放置自爱一个单独的操作数之前.它的目的是将操作数布尔值进行求反,例如,如果x是真值,则!x返回false,如果x是假值,则!x返回true。

和`&&`与`||`运算符不同,`!`运算符首先将其操作数转换为布尔值`参照第三章讲述的转换规则`,然后再对布尔值求反,也就是说`!`总是返回true或者fasle,并且,可以通过使用两次逻辑非运算来得到一个值得等价布尔值:`!!x(参照3.8.2节)`

作为一个一元运算符,`!`具有很高的优先级,并且和操作数紧密绑定在一起,如果你希望对类似p && q的表达式做求反操作,则需要使用圆括号:!(p && q)。布尔计算的更多原理性只是不必要做过多的解释,这里仅用javascript代码做简单说明：

```js
    // 对于p和q取任意值,这两个等式都永远成立
    !(p && q) === !p || !q
    !(p && q) === !p && !q
```
### 4.11赋值表达式
javascript使用`=`运算符来给变量或者属性赋值,例如:

```js
    i = 0           // 将变量i设置为0
    o.x = 1         // 将对象o的属性x设置为1
```
`=`运算符希望它的左操作符是一个左值:一个变量或者对象属性(或数组元素).它的右操作数可以使任意类型的任意值。赋值表达式的值就是右操作数的值,赋值表达式的副作用是,有操作数赋值给左侧的变量或对象属性,这样的话,后续对这个变量和对象属性的引用都将得到这个值.

尽管赋值表达式通常非常简单,但有时仍会看到一些浮渣表达式包含赋值表达式的情况,例如,可以将赋值和检测操作放在一个表达式中,就像这样:

```js
    (a - b) == 0
```
如果这样的话,应当清楚地知道`=`和`==`运算符之间的区别!,需要注意的是,`=`具有非常低的优先级,通常在一个较长的表达式中用到了一条赋值语句的值得时候,需要补充圆括号以保证正确的运算顺序。

赋值操作符的结合性是从左至右,也就是说,如果一个表达式中出现了多个赋值运算符,运算顺序是从右到左，因此可以通过如下的方式来对多个变量赋值:

```js
    i = j = k = 0;  // 把三个变量初始化为0
```

**带操作的赋值运算**

除了常规的赋值运算`=`之外,js还支持许多其他的赋值运算符,这些运算符将赋值运算符和其他运算符连接起来，提供一种更为快捷的运算方式.例如,运算符`+=`执行的是加法运算和赋值操作,下面的表达式:

```js
    total += sales_tax

    // 和接下来的表达式是等价的

    total = total + sales_tax

```

运算符'+='可以作用于数字或字符串,如果其操作数是数字,它将执行加法运算和赋值操作,如果操作数是字符串,它就执行字符串连接操作和赋值操作.

这类运算符还包括`-=`、`*=`、`&=`等,表4-2列出了这一类的所有运算符.

表4-2:赋值运算符

| 运算符  | 示例；      | 等价于    |
| :-----  | :---------- | :-------  |
| +=      | a += b      | a = a + b |
| -=      | a -= b      | a = a - b |
| *=      | a *= b      | a = a * b |
| /=      | a /= b      | a = a / b |
| %=      | a %= b      | a = a % b |
| <<=     | a <<= b     | a = a << b|
| >>=     | a >>= b     | a = a >> b|
| >>>=    | a >>>= b    | a = a>>>b |
| &=      | a &= b      | a = a & b |
|`|`=     | a`|`= b     | a = a`|`b |
| ^=      | a ^= b      | a = a ^ b |


```js
    // 在大多数情况下,表达式为:
    a op = b

    // 这里的op代表一个运算符,这个表达式和下面的表达式等价:

    a = a op b

```
在第一行中,表达式a计算了一次,在第二行中,表达式a计算了两次,只有在a包含具有副作用的表达式(比如函数调用和赋值操作)的时候,两者才不等价,比如,下面两个表达式就不等价:

```js
    data[i++] *= 2;
    data[i++] data[i++] *2
```
### 4.12 表达式计算

和其他很多解释性语言一样,js同样可以解释运行由js源代码组成的字符串,并产生一个值,js通过全局函数eval()来完成这个工作:
```js
    eval('3 + 2')    // => 5
```
动态判断源代码中的字符串是一种强大的语言特性,几乎没有必要在实际中应用,如果你使用了eval(),你应当仔细考虑是否真的需要使用它、

>**`eval()`是一个函数还是一盒运算符** eval()是一个函数,但由于它已经被当成运算符来对待了,因此将它放在本章来讲述,js语言早期版本定义了eval()函数,从那时起,该语言的设计者和解释器的作者对其实施了更多限制,使其看起来更像运算符，现代js解释器进行了大量的代码分析和优化,而eval()的问题在于,用于动态执行的代码通常来讲是不能分析，一般来讲,如果一个函数调用了eval(),那么解释器将无法对这个函数做进一步优化,而将eval(),定义为函数的另一个问题是,它可以被赋予其他的名字:

```js
    var f = eval;
    var g = f;
```
>如果允许这种情况的话,那么解释器将无法放心地优化任何调用g()的函数,而当eval(),是一个运算符(并作为一个保留字)的时候,这种问题就可以避免掉,接下来的4.12.2节和4.12.3节将会介绍如何对eval()实施更多的限制,以便让它的行为更接近运算符、

#### 4.12.1 eval()

eval()只有一个参数,如果传入的参数不是字符串,它直接返回这个参数,如果传入的参数不是字符串,它直接返回这个参数,如果参数是字符串,它会吧字符串当成js代码进行编译,(parse),如果编译失败则抛出一个语法错误(syntaxError)异常,如果编码成功,则开始执行这段代码.并返回字符串中最后一个表达式或语句的值,如果最后一个表达式或语句没有值,则最终返回undefined,如果字符串抛出一个异常,这个异常将把该调用传递给eval().

关于eval()最重要的是,它使用了调用它的变量作用域环境,也就是说,它查找变量的值和定义新变量和函数的操作和局部作用域中的代码完全一样,如果一个函数定义了一个局部变量x,然后调用了eval('x'),它会返回局部变量的值,如果它调用eval('x = 1'),它会改变局部变量的值,如果函数调用了eval('var y = 3'),它声明一个新的局部变量y,同样的,一个函数可以通过如下代码声明一个局部函数:

```js
    eval('function f(){return x + 1;}');    
```

如果在最顶层代码中调用eval(),当然,它会作用于全局变量和全局函数.

需要注意的是,传递给eval()的字符串必须在语法上讲的通——不能通过eval()往函数中任意黏贴代码片段,比如eval('return;')是没有意义的,因为return只有函数中才起作用,并且事实上,eval()的字符串执行时的上下文环境和调用函数的上下文环境是一样的,这不能使其作为函数的一部分来运行,如果字符串作为一个单独的脚本是有语义的(就想诸如x = 0的短代码),那么将其传递给eval()作参数是完全没有问题的,否则,eval()将抛出语法错误异常.

```
    parse , 意思是'解析'这段字符串,更精确地讲,应该是'编译'这段字符串,编译不包括代码的执行
    比如这段代码:
    var foo = function(a){
        eval(a);
    };
    foo('return');
    按照原文的意思这段代码中执行eval(a)的上下文是全局的,在全局上下文中使用rerturn会抛出语法错误: return not in function.

```

#### 4.12.2 全局eval()

eval()具有更改局部变量的能力,这对于js优化器来说是一个很大的问题,然而作为一种权宜之计,js解释器针对那些调用了eval()的函数所做的优化并不多,但当脚本定义了eval(),的一个别名,且用另一个名称调用它,js解释器又会如何工作呢?为了让js解释器的实现更加简化,ECMAScript 3标准规定了任何解释器都不允许对eval()赋予别名,如果eval()函数通过别名调用的话,会抛出一个EvalError异常、

实际上，大多数的实现并不是这么做的,当通过别名调用时,eval()会将其字符串当成顶层的全局代码来执行,执行的代码可能会定义新的全局变量和全局函数,或者给全局变量赋值,但却不能使用或修改主调函数中的局部变量,因此,这不会影响到函数内的代码优化。

ECMAScript 5是反对使用EvalError的,并且规范了eval()的行为,"直接的eval()",当直接使用非限定的"eval()"名称(eval看起来像是一个保留字)来调用eval()函数时,它总是在调用它的上下文作用域内执行,其他间接调用则使用全局对象作为其上下文作用域,并且无法读、写、定义局部变量和函数,下面有一段示例代码：
```js
    var geval = eval;               // 使用别名调用eval将是全局eval
    var x = 'global',y = 'global';  // 两个全局变量
    function f(){                   // 函数内执行的是局部eval
        var x = 'local';            // 定义局部变量
        eval('x += "changed"');     // 直接eval更改了局部变量的值
        return x;                   // 返回更改后的局部变量
    }
    function g(){                   // 这个函数内执行了全局eval
        var y = 'local';            // 定义局部变量
        geval("y += 'changed';");   // 间接调用改变了全局变量的值
        return y;                   // 返回未更改的局部变量
    }   
    console.log(f(), x);            // 更改了局部变量: 输出'local changed global'
    console.log(g(), y);            // 更改了全局变量: 输出'loval globalchanged'
```
我们注意到,全局eval()的这些行为不仅仅是出于代码优化器的需要而做出的一种折中方案,他实际上是一种非常有用的特性,它允许我们执行那些对上下文没有任何以来的全局脚本代码段.我们在本节开始处也提到,真正需要eval()来执行代码段的场景并不多见,但当你真的意识到它的必要性时,你更可能会使用全局eval而不是局部eval.

IE9之前的早期版本IE和其他浏览器有所不同,当通过别名调用eval(),时并不是全局eval(),(他也不会抛出一个EvalError异常,仅仅将其当做局部eval来调用),但IE的确定义了一个名叫execScript()的全局函数来完成全局eval()的功能(但和eval()稍有不同，execScript()总是会返回null)、

#### 4.12.3严格eval()

ECMAScript 5严格模式(参照5.7.3节)对eval()函数的行为施加了更多的限制,甚至对标识符eval的使用也施加了限制,当在严格模式下调用eval()时,或者eval()执行的代码段以`use strict`指令开始,这里的eval()是私有上下文环境中的局部eval也就是说,在严格模式下,eval执行的代码段可以查询或更改局部变量,但不能在局部作用域中定义新的变量或函数。

此外,严格模式将'eval'列为保留字.这让eval()更像一个运算符,不能用一个别名覆盖eval()函数,并且变量名、函数名函数参数或者异常捕获的参数都不能取名位'eval'

### 4.13其他运算符

javascript支持很多其他各种各样的运算符,后续几节详细讨论它们:

#### 4.13.1条件运算符(?:)

条件运算符是javascript中唯一的一个三元运算符(三个操作数),有时直接称作,'三元运算符',通常这个运算符写成`?:`当然在代码中往往不会那么简单,因为这个运算符拥有三个操作数,第一个操作数在`?`之前,第二个操作数在`?`和`:`之间.第三个操作数在`:`之后,；例如:
```js
    x > o ? x : -x     // 求x的绝对值
```
条件运算符的操作数可以是任意类型,第一个操作数当成布尔值,如果是真值,那么将计算第二个操作数,并返回其计算结果,否则,如果第一个操作数是假值,那么将计算第三个操作数,并返回其计算结果,否则,如果第一个操作数是假值,那么将计算第三个操作数,并返回其计算结果,第二个和第三个操作数总是会计算其中之一,不可能两者同时执行。

其实使用if语句也会带来同样的效果(参照5.4.1节)`?:`运算符只是提供了一种简写形式,这里是一个`?:`的典型应用场景,判断一个变量是否有定义(并拥有一个有意义的真值)如果有定义则使用它,如果无定义则使用一个默认值:
```js
    greeting = "hello" + (username ? username : "there");

    // 这和下面使用if语句的代码是等价的,但显然上面的代码更加简洁:
    greeting = 'hello';
    if (username)
        greeting += username;
    else
        greeting += "there"

```

#### 4.13.2 typeof运算符

typeof是一元运算符,放在其单个操作数前面,操作数可以是任意类型,返回值为表示操作数类型的一个字符串,表4-3列出了任意值在typeof运算后的返回值:

**表4-3:任意值在typeof运算后的返回值**

| x                 | typeof x                                                                    |
| :---------------- | :-------------------------------------------------------------------------- |
| undefined         | 'undefined'                                                                 |
| unll              | 'object'                                                                    |
| true or false     | 'Boolean'                                                                   |
| 任意数字或NaN     | 'Number'                                                                    |
| 任意字符串        | 'String'                                                                    |
| 任意函数          | 'function'                                                                  |
| 任意内置对象      | 'object'                                                                    |
| 仁义宿主对象      | 由编译器各自实现的字符串,但不是'undefined'、'Boolean'、'Number' or 'string' |

typeof最常用的用法是写在表达式中,就像这样:

```js
    (typeof value == 'string')? "'" + value + "'":value
```
typeof运算符同样在switch语句(见5.4.3节)中非常有用,需要注意的是,typeof运算符可以带上圆括号,这让typeof看起来想一个函数名,而不是一个运算符关键字:

```js
    typeof(i)
```

我们注意到,当操作数是null的时候,typeof返回'object',如果想将null和对象区分开,则必须针对特殊值显式检测,对于宿主来说,typeof有可能并不返回'object',而返回字符串,但实际上客户端js中大多数宿主对象都是'object'类型.

由于所有的对象和数组的typeof运算结果是'object'而不是function.因此它对于区分对象,和其他原始值来说是很有帮助的,如果想区分对象的类,则需要使用其他的手段,比如使用instanceof运算符.class特性以及constructor属性。

尽管js中的函数是对象的一种,但typeof运算符还是将函数特殊对待,对函数做typeof运算有着特殊的返回值,在js中,函数和可执行的对象,(callable object)有着微妙的区别,所有的函数都是可执行的(callable),但是对象也有可能是执行的,可以向调用函数一样调用它.但它并不是一个真正的函数,根据ECMAScript 3规范,对于可执行对象typeof运算都将返回'function'、ECMAScript 5规范扩充所有可执行对象(non-native callable object)当成其客户端的方法,来使用,在IE 9之前的版本中,非原生可执行对象typeof运算符将返回'object'尽管它们的行为和函数非常相似,而在IE9中,那些客户端方法是真正的内置函数对象(native function object),要了解真正的函数和可执行对象之间的详细差别请参照8.7.7节。

#### 4.13.3 delete运算符

delete是一元操作符,它用来删除对象属性或者数组元素,就像赋值,递增,递减运算符一样,delete也是具有副作用的,它是用来做删除操作的,不是用来返回一个值的，例如:

```js
    var o = {x : 1, y : 2};             // 定义一个对象
    delete o.x                          // 删除一个属性
    'x' in o                            // => false :这个属性在对象中不再存在

    var a = [1, 2, 3];                  // 定义一个数组
    delete a[2];                        // 删除最后一个数组元素
    2 in a;                             // => false : 元素2在数组中已经不存在了
    a.length                            // => 3 : 注意,数组长度并没有改变,尽管上一行代码删除了这个元素,但删除操作留下了一个'洞',实际上并没有修改数组的长度,因此a数组的长度仍然是3.
```

需要注意的是.删除属性或者删除数组元素不仅仅是设置了一个undefined的值,当删除一个属性时,这个舒心将不再存在,读取一个不存在的属性将返回undefined,但是可以通过in运算符(见4.9.3节)来检测这个属性是否在对象中存在.

delete希望他的操作数是一个左值,如果它不是左值,那么delete将不进行任何操作同时返回true,否则delete将试图删除这个指定的左值,如果删除成功,delete将返回true,然而并不是所有的属性都可删除,一些内置核心和客户端属性是不能删除的,用户通过var语句声明的变量不能删除,同样,通过function语句定义的函数和函数参数也不能删除.

在ECMAScript 5严格模式中,如果delete的操作数是非法的,比如变量、函数或函数参数,delete操作将抛出一个语法错误(SyntaxError)异常,只有操作,是一个属性访问表达式(见4.4节)的时候它才会正常工作,在严格模式下,delete删除不可配置的属性(参照6.7节)时会抛出一个类型错误异常,在非严格模式下,这些delete操作都不会报错,只是简单地返回false,以表明操作数不能执行删除操作。

这里有一些关于delete运算符的例子:

```js
    var o = {x : 1, y : 2};         // 定义一个变量,初始化为对象
    delete o.x;                     // 删除一个对象属性,返回true
    typeof o.x;                     // 属性不存在,返回'undefined'
    delete o.x;                     // 删除不存在的属性,返回true
    delete o;                       // 不能删除通过var声明的变量,返回false
                                    // 在严格模式下,将抛出一个异常
    delete 1;                       // 参数不是一个左值,返回true.
    this.x = 1;                     // 给全局对象定义一个属性,这里没有使用var
    delete x;                       // 试图删除它,在非严格模式下返回true
                                    // 在严格模式下会抛出异常,这时使用'delete this.x'来代替
    x;                              // 运行时报错,没有定义x
```
6.3节还有会关于delete操作符的讨论

#### 4.13.4 void运算符
void是一元运算符,它出现在操作数之前,操作数可以是任意类型,这个运算符并不是经常使用: 操作数会照常计算,但忽略计算结果并返回undefined,由于void会忽略操作是的值,因此在操作数具有副作用的时候使用void来让程序更具语义.

这个运算符最常用在客户端的URL————javascript:URL中,在URL中可以带有副作用的表达式,而void则让浏览器不必显示这个表达式的计算结果,例如,经常在html代码中的`<a>`标签里使用void运算符:
```js
    <a href="javascript:void window.open()">打开一个新窗口</a>
```
通过给`<a>`的onclick绑定一个事件处理程序要比href中写`javascript:RUL`要更加清晰,当然,这样的话void操作符就可有可无了.

#### 4.13.5 逗号运算符(,)

逗号运算符是二元运算符,它的操作数可以使任意类型,它首先计算左操作符,然后计算右操作数,最后返回右操作数的值,看下面的示例代码:

```js
    i = 0, j = 1, k = 2;
```

总是会计算左侧饿表达式,但计算结果忽略掉,也就是说,只有左侧表达式具有副作用,才会使用逗号运算符让代码变得更通顺,逗号运算符最常用的场景是再for循环中(见5.5.3节),这个for循环通常具有多个循环变量:

```js
    // for 循环中的第一个逗号是var语句中的一部分
    // 第二个逗号是都好运算符
    // 它将两个表达式(i++和j--)放在一条(for循环中的)语句中
    for(var i = 0, j = 10; i < j; i++,j--)
        console.log(i + j);
```







































