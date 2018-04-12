---
date: 2017-10-11 20:00:31+00:00
layout: post
title: 1.3、第一部分 javascript 语言核心 
categories: javascript语言核心
tags: 词法结构
---


这一部分主要描述javascipt语言核心，这部分是该语言的主要参考资料学习之初通读一遍这章，以后遇到javascrpt难点时，回到这里重新查阅相关内容以巩固知识的掌握:

* 第2章、词法结构
* 第3章、类型、值和变量
* 第4章、表达式和运算符
* 第5章、语句
* 第6章、对象
* 第7章、数组
* 第8章、函数
* 第9章、类和模块
* 第10章、正则表达式的模式匹配
* 第11章、javascript的子集和扩展
* 第12章、服务器端javascript


### 第2章 语法结构

编程语言的词法结构是一套基础性规则,用来描述如何使用这门语言来编程,作为语法的基础,它规定了诸如变量名是什么样的、怎么写注释、以及程序语句之间如何分隔等规则。本章是主要介绍javascript的词法结构。

#### 2.1 字符串

javascript 程序是用Unicode字符集编写的。Unicode是ASCII和Latin-1的超集,并支持地球上几乎所有再用的语言,ECMAScript 3要求Javascript的实现必须支持Unicode 2.1及后续版本,ECMAScript 5则要求支持Unicode 3及后续版本。可以参考3.2节的边栏来了解更多关于Unicode和javascript的信息。

#### 2.1.1 区分大小写
Javascript 是区分大小写的语言,也就是说,关键字,变量,函数名和所有表示符(identifier)都必须采用一致的大小写形式。比如,关键字"while"必须写成"while",而不能写成"While" 或者 "WHILE".同样 "online", "Online"、"OnLine" 和 "ONLINE" 是4个不同的变量

HTML并不区分大小写,(XHTML区分大小写).由于它和客户端javascript联系紧密,因此这点区别很容易混淆,许多客户端javascript对象和属性与他们所表示的html标签和属性同名.在html中,这些标签和属性名可以使用大写,也可以使用小写,而在javascript中必须是小写,例如,在html中设置事件处理程序时,onclick属性可以写成onClick,但是在javascript代码(或者xhtml文档)中,必须使用小写的的onclick.

#### 2.1.2 空格、换行符和格式控制符

javascript会忽略程序中标识 (token) 之间的空格,多数情况下,javascript同样会忽略换行符,由于可以在代码中随意使用空格和换行,因此可以采用整齐,一致的缩进来形成统一的编码风格,从而提高代码的可读性!

除了可以识别普通的空格符 (\u0020), javascript 还可以识别如下这些表示空格的字符: 水平制表符(\u0009),垂直制表符(\000B),换页符(\u000c)、不中断空白(\u00A0)、字节序标记(\uFEFF),以及在Unicode中所有Zs类别的字符。javascript将如下字符识别为行结束符: 换行符(\u000A),回车符(\u000D),行分隔符(\2028),段分隔符(\u2029)。回车符加换行符在一起呗解析为一个单行结束符。

Unicode格式控制字符(Cf类),比如"从右至左书写标记"(\u200F)和"从左至右书写标记",(\u200E),控制文本的视觉显示,这对于一些非英语文本的正确显示来说是至关重要的,这些字符可以用在javascript的注释,字符串直接量和正则表达式直接量中,但不能用子安表示符(比如,变量名)中。但有个例外,宽度连接符(\u200D)和零宽度非连接符(\uFEFF)是可以出现在标识符中的,但不能作为表示符的首字符.上文也提到了,字节序标记格式控制符(\uFEFF)被当做了空格来对待.

#### 2.1.3 Unicode 转义序列

在有些计算机硬件和软件里,无法显示或输入Unicode字符全集.为了支持那些使用老旧技术的程序员,javascript定义了一种特殊序列,使用6个ASCII字符来代表任意16位Unicode内码.这些Unicode转义序列均以\u为前缀,其后跟随4个十六进制数(使用数字以及大写或小写的字符A~F表示).这种Unicode转义写法可以用在javascript字符串直接量、正则表达式直接量和标识符中(关键字除外)。例如,字符e的Unicode转义写法为\u00E9,如下两个javascript字符串是完全一样的。
 
> "cafe" === "caf\u00e9"  // => true

Unicode转义写法也可以出现在注释中,但由于Javascript会将注释忽略,它们知识被当成上下文中的ASCII字符处理,而且并不会被解析为其对应的Unicode字符。

#### 2.1.4 标准化

Unicode允许使用多种方法对统一字符进行编码、比如,字符"e"可以使用Unicode字符\u00E9表示,也可以使用普通的ASCII字符e跟随一个语调符\u0301、在文本编辑器中，这两种编码的显示结果一模一样,但他们的二进制编码表示是不一样的,在计算机里也不相等.Unicode标准为所有字符定义一个首选的 编码格式,并给出了一个标准化的处理方式将文本转换为一种适合比较的标准格式,javascript会认为它正在解析的程序代码已经是这种标准格式,不会再对其表示符,字符串或正则表达式作为标准化处理。

### 2.2 注释

javascript支持两个格式的注释。 在行尾 "//" 之后的文本都回被javascript当做注释忽略掉.此外 "/*" 和 "*/" 之间的文本也会当做注释,这种注释可以跨行书写,但不能有嵌套的注释。下面都是合法的javascript注释:

```js
    // 这里是单行注释
    /* 这是一段注释  */ // 这是另一段注释
    /*
     * 这是一段多行注释
     * 这里的注释可以连写多行
     */
```

### 2.3 直接量

所谓直接量 (literal), 就是程序中直接使用的数据值.下面列出的都是直接量

```js
    12                      // 数字
    1.2                     // 小数
    "hello world"           // 字符串文本
    'Hi'                    // 另一种字符串
    true                    // 布尔值
    false                   // 另一个布尔值
    /javascript/gi          // 正则表达式直接量 (用作模式匹配) 
    unll                    // 空
```

### 2.4 标识符和保留字

标识符就是一个名字。在javascript中,标识符用来对变量和函数进行命名,或者用做javascript代码中某些循环语句中的跳转位置的标记。javascript标识符必须以字母、下划线`_`或者美元符$开始.后续的字符可以是字母,数字,下划线或者美元符(数字不允许作为首字符出现,以便javascript可以轻易区分开标识符和数字),下面是合法的标识符:

```js
    i
    my_variabl_name
    v13
    _dummy
    $str
```
出于可移植性和易于书写的考虑,通常我们只使用ASCII字母和数字来书写标识符.然后需要注意,javascript允许表示符中出现Unicode字符全集中的字母和数字.(从技术上来讲,ECMAScript标准也允许在标识符的首字符后面出现Unicode字符集中的Mn类、Mc类),由此,程序员也可以使用非英语语言或数学符号来书写标识符:

```js
    var si = true;
    var π = 3.14;
```

和其它任何编程语言一样,javascript保留了一些标识符为自己所用.这些"保留字"不能用作普通的标识符!

### 保留字

javascript预留出来一些标识符作为自己的关键字.因此,就不能再用这些关键字作为标识符了:

```js
    break    delete  function    return  typeof
    case     do      if          switch  var
    catch    else    in          this    void
    cotinue  false   intanceof   throw   while
    debugger finally new         true    with
    default  for     null        try
```

javascript同样保留了一些关键字,这些关键字在当前语言版本中并没有使用,但在未来版本总可能会用到,ECMAScript 5保留了这些关键字:

```js
    class   const   enum   export   extends     import  super
```

此外,下面这些关键字在普通的javascript代码中是合法的,但是在严格模式下是保留字:

```js

    implements    let         private         public  yield
    interface     package     protected       static 
```

严格模式同样对下面的标识符的使用做了严格限制,它们并不完全是保留字,但也不能用作变量名、函数名或参数名:

```js
    argumnets   eval
```

ECMAScript 3将java的所有关键字列为自己的保留字,尽管这些保留字在ECMAScript 5中放宽了限制,但如果你希望代码能在基于ECMAScript 3实现的解释器上运行的话,应当避免使用这些关键字作为标识符:

```js
    abstract    dounble     goto        native      static
    boolean     enum        implements  package     super
    byte        export      import      private     synchronized
    char        extends     int         protected   throws
    class       final       interface   public      transient
    const       float       long        short       volatile
```

javascript预定义了很多全局变量和函数,应当避免把他们的名字作为变量名以及函数名:

```js
    arguments   encodeURI           Infinity    Number      RegExp
    Array       encodeURIComponent  isFinite    Object      String
    Boolean     Error               isNaN       parseFloat  SyntaxError
    Date        eval                JSON        parseInt    TypeError
    decodeURI   EValError           Math        RangeError  undefined
    decodeURIComponent              NaN         ReferenceError  URIError
```

javascript 的具体实现可能定义独有的全局变量和函数,每一种特定的javascript运行环境(客户端,服务器端等)都有自己的一个全局属性列表,这一点是需要牢记的,参照第四部分的window对象来了阶客户端javascript中定义的全局变量和函数列表.

### 2.5可选的分号

javascript和其它编程语言一样,使用`;` 将语句分隔开，这对增强代码的可读性和整洁性是非常重要的:缺少分隔符,一条语句的结束就成了吓一跳语句的开始,反之亦然.在javascript中，如果语句个字站一行,通常可以省略语句之间的分好(程序结尾或右花括号`}`也可以省略)。许多javascript程序员，使用分好来明确标记语句的结束，即使在并不完全需要分好的时候也是如此,另一种风格就是,在任何可以省略分好的地方都将其省略,只有在不得不用的时候才使用分号。不管哪种编程风格,关于javascript中可选分号的问题都有几个细节需要注意。

考虑如下代码,因为两条语句用两行书写,第一个分号是可以省略掉的:

```js
    a = 3;
    b = 4;
```

如果按照如下格式去书写，第一个分号则不能省略掉:
```js
    a = 3; b = 4;
```

需要注意的是,js并不是在所有换行处都填补分号:只有在缺少了分号就无法正确解析代码的时候，js才会填补分号,换一句话说(类似下面代码中的两处异常),如果当前语句和随后的费空格字符不能当做一个整体来解析的话，js就在当前语句行结束出填补分号：

```js
    var a
    a 
    = 
    3
    console.log(a);
```
js将其解析为:

```js
    var a; a = 3; console.log(a); 
```
js给第一行换行处添加了分号，因为如果没有分号，js就无法解析代码var a a。第二个a可以单独当做一条语句`a`,但是js并没有给第二行结尾填补分号，因为它可以和第三行内容一起解析成`a=3`.

这些语句的分隔规则会导致一些意向不到的情形,这段代码写成了两行,看起来是两条独立的语句:

```js
    var y = x + f
    (a + b).toString()
```

但第二行的圆括号却和第一行的f组成了一个函数调用,js会把这段代码看做:

```js
    var y = x + f(a+b).toString();
``` 

而这段代码的本意并不是这样,为了能让上述的代码解析为两条不同的语句,必须手动填写行位的显示分号.

通常来讲,如果一条语句以`(`、`[`、`/`、`+` 或者 `—`开始，那么它极有可能和前一条语句合在一起解析。以`/`、`+`和`—`开始的语句并不常见，而以`(`、`[`开始的语句则很常见。至少在一些js编码风格里面是很普通的,有些程序员喜欢保守的在语句前加上一个分号,这样哪怕之前的语句被修改了，分号被误删除了，当前语句还是会正常的解析:

```js
    var x = 0                               // 这里省略了分号
    ;[x, x + 1, x + 2].forEach(console.log) // 前面的分号保证了正确的语句解析
```

如果有语句和下一行语句无法合并解析,js则在第一行后填补分号,这是通用规则,但有两个例外，第一个例外是在设计`return`、`break`和`continue`语句的场景中.如果这三个关键字后紧跟着换行,js则会在换行处填补分号,例如这段代码:

```js
    return
    true;
```
js会解析成 
```js
    return; true;
```
而代码的本意是这样:

```js
    return true;
```

也就是说,在`ruturn`、`break`和`continue` 和随后的表达式之间不能有换行,如果添加了换行,程序则只在极特殊的情况下才会报错,而且程序的调试非常不方便

第二个例外是在涉及`++`和`--`运算符的时候,这些运算符可以作为表达式的前缀,也可以当做表达式的后缀.如果将其后缀表达式，它和表达式应当在同一行,否则，行尾将填补分号,同时`++`或`--`将会作为下一行代码的前缀操作符并与之一解析,例如,这段代码:

```js
    x
    ++ 
    y
```

这段代码将解析为 `x; ++y`,而不是`x++: y`.


![](http://oxoz3bzmd.bkt.clouddn.com/17-10-12/67105377.jpg-picture)


<!-- Touwa
                  ,:,
                  :
                .;i
                i;i
               .r,;
               ,i,;
               .; i,
             .  i: i                     ....,.,.
            .:   i,,i              .:,,,::i:i:iiii;;;::
           .;     i:i:         ..,aZi;;i..,,,:,,.,.,,iir;i
           :r      .:::.,iX80aX. Z8;7rXSX;r;ii:,:,:,,...::7X:
           ,i:.     :;:;:i2BMMMWa@7;.iZW2;   ,,,,,,:::::.. ;80i
            i:::. ,ii...:;8Xi:r0Mr  .   iX27: ..,,,.,,:,,..  SM8i
             i:,,i;:.:;i.  :;7;iX; ,.  . ..;SX,..,,,,:,  ,.,  iB@Z
              .::,..::;::,;;i:  BS .77  ..,..iXr,.:,,:S2;  .i. i8BWi
              .i, .i,:,:,:,,.. ZM, ..ZB; ,.,.,.;7i.,,, 7B0;  ;, i88WX
             :;  :a:.,:,,.:,,.rM8:... ZMa .,,,,.,:i,.    2MZi 7i ;8ZB2
            ii  X0:.,,,:.,.,: aMX;.,.. SM8..,,,,,,.ii,    rWWX Zi 78ZB2
           i:  aB..::,,:: ,,, 0@rr:.:.: 2M8 i....,:,,ii. . :0BX:W: 28ZB;
          i:. ZM  ,,,,,i.,7;,.B@iri . ii 0W8 i..  .::,:7r.  ,0BXZB. Z88B.
         i,7.XMi ,. . i. XXX:.BW::X    Z :B2X i,i   .,:.r2i  ,08Z08.70aWa
        iiXX,Ma  i . ;;  0:8  BW; a ., 8; ZZi:::,X;   .,.i2X  :0ZZ8ZrZi7M,
       .XiB.8@: i,,..2. XX:0. BBX Z:.. 2Z ;@r :r. Sa:   .,,SS  7BZ8Zaai B2
       SrSS;@Z ,;.,.XS :X..8, 8WX XX . X8  BZ .77. ;02.  .,.X2  Z8ZZZ00.:@
      i8 8ra@7 ;;., Z: 7i..Zr ZB2 :Z.. rW  rS .iWX;  SBX. ...Sa 708ZZZWa.B,
      8r.BXB0, S,: iZ  X ;.2Z XBa  Zr  7@X ,ii:,0Zra, .202:  .7,i@00ZZWa 0:  .         i:
     ;W 2BZB; ;2.i XW .;:r:rW ;BZ  i8  7@S iX,i;8Mi,27. .X8a;   .SBW0B0  8:  ;: ,     :..i:
     8a 8B0S  XX:i ZW,.r;ii;B: BZ.  Z7 X@a;72;,r7Za,:7S;.  ;2ZX:   70Z:i,@    r7 ;       7,
    ,BiiSZ0 ,.a;7..8W:.X; ,;B;,ZW,  ;B SM;..7  ,i i;;i;:.     ;XX:    70@2  .  X i:     ;:
    iW.S,Za ar2rX :BBX r, .;Br.7MX . ZaZ@, :7. ii.  ,;8@827;:i:;X8Z8X:  i. .iX2a .;:.,ii.
    X@,Z ;7 Z;2XS :0BX X;. .Z; :B0   ,@0W  i7  ;i.,    rBMMM@W@@@WWBWWW0SrS2aZai ,:,rir,
   .2Z.0  ,X8 SZ2 i08rrX,   XZ  7MX   XMB  ri  7..       .7a8B00Z200ZZ0Mr  .:;i  X, Si.i::
   ,a .B  ,ZX 288 XB8i,:r   .Z,  0W:.  W8 ,7,;i              :80: ZW080W@. ;;,   a: SWi ,i,
  .;i .B  .0; aB0:;@X  :r:   :i  :@X,: ;i r; ,  iS0WMMMMMM8a8Xii;irWZaX777;i.    .  ,MZ  i:
  .i.  0: :8: 20WXiBB.  7i    :..,ra :;,,;r  :SMMMMMMMMMM,M820WS;:i;i;2Z@S           0@  r,
   r,  B;.:0: 22;Wr8@B  .Xi  . .   ,i  ,r2:   BZ , BMMMZW : Z087r 2@@0Si. ;   .,,:. XXW;:,
   X2  Sa :8. X8 7W8WZi   i:.      ,,.  , ii: .  iMX;ii0i  .WBZ.,i@M:    ,X:i7S7X7;Z7 Mi
   SM   X ,Zii,Mr ;BWZ:r         7BS   .   .,.    .S7S@@   aWB,,2BMM   , ;;;X;., :2i  M
   20B7 ;Z,Z0S B@. ,W@7:7 7MM@MMMB7   . ... .....   ,;i,, i2B2;0B8M7    .ri7i     ,: XM
   Z7 a0Z0.8M; XMr, ZMBir; 77a2S     . .   . . . . ..,,iir.;W0B0ZBW     ;i7i    i  iiM2
   SB     ,2M  .07W: MMBrX.   :i,,,.... .:..... ....,:::i  0BZ8ZZ@7    ;rr7     : ,rXM,
   ;M      Sa :ZiZ@M77M@Xi;.,;rr,:.... . i.... ..... .   .ZB888XZ@   iiXX;X.     :iX0W  :i::.,,,..
    MZ    X07 SM.rSWMBii7 Z7  . ... . . . . . . . .    .ZZ8aWaXi0W,  ;i   :    ,77r;W.r0X;:,,.,,:::,,..
    XMr   MZ7.BM. ZWMaSW8 ;Ma.     . . . .   . .     ,ZMX;rW0,r:Wa   .: i;    iaX;iai .      .   . ..,..,:
     BMWaWM i8MZ ,MM2XZ7r; B@MWX          :X:      i0M8:,,0W;.r.MB   ,i rr    X.X7Zr..    . . . . . . ,.  :.
      7Z2W7  MWrr,MMiii;X2 80@MM2:i;i:.          7WM8;., 2M7 r:i0:   :, :r   .: X0M: ;  .... . . . . . :,  ..
        .8  7MaS8,MW  X7XS,2BB@M@;.;rr7;rrX:. i2MM8i,,:.7MX :; S7    i: ,;   : ;7XMB. i    .,..   ... . :,.  .
        Si. WW:W0iMX  iZir:2B0WB8Mr.:iiii;XZWMMMZ;.,::.:@M,;r; Z:.   :. ,;  .: ,X2MM0 ;2      .i,  . .   .:,
       .;. ;M:7WB;M;   ,  :aW0M8 0Mr.:iiii:i,;7i,,i::, 2MX::r. 0,,      ,r  i ;XrXiZMW rXi,     ::. . .   i,:
       ::: WS 0W07M;  .   :ZW88@ .8MS:i;i;:XX,.,:i,;S.7MB ,i; :@ :       7..,:S. i:  ZW,.:rX;:   .:  .  ,;;,,:
      .:7 rM i@BBXMX  ,   r8@;,M,.,XMZ:i;;;;S27:i:;7:SMM:,i;: 2Z :       ;S7  :S  ,i  7B;  ,7XX,  i,   :rir:,,: .
      ,Xr WS 20B0aWZ  .   7MB  Mi:i,i0Z;:i::,irii;;,;M@;.ii; .ai i       :Sr  i2r  :,  :87   ,77   ;  irii;;.,,.
     .;0 iM  0Ba80WB  .iriZM;  M7 .;i,rriiiiiii;ii::B@X.:i7i ;7:.i        ar  7SXr ,:   .W;   7Z:  i:,riiii;,.:.:,
     .8a 87 .BB0a80M.   rS@M: .@a  .i;i;i;;;;r;ii:,BM2.:ii7.,X;:.;        XS  ;SX2 .  :  :M7rri@@i  ;;i;i;i;:..iii
     rMi.Z  ,BB00ZZW7    SM;X:.a@.   .;;r;;i;;;i:,0MZ.:ii;; ;;X ,r        ;Z    2;,   Z.  i@rri2@0  7iii;ii;: i7:.
    .WW rr  ,W00808@W   iMX:7r,;MX     .:;;r;;;:.8MZ,:i;ir. 7r7 ,S         Xr.  72i: :ZS : ZZiiX0W.:2::;iiir;:;;:.
    2MZ X   :B080Z0BM   BW XrrBiB0  . .   ..,.  ZM2 .;r;;r :X7  .a        ..r;  2;77 ;Wa 7 ,M::a8Ba7S7:iii;;iriii;;
   .WWX.;   ,B08888BB .7Mrii rM8ZW:  . . .     WMa   .:ii; XSi   X:       7: ;, 7XSXiXB728, 0S 28B7;rS:;;;:,i;iiii.
   r@Br,:   .808888BM, 0:    ,W8B@a   . .     MMX       ;; Z7;    .       77 SX7ZX7;ia0:7X,.SZ :Wai;7ri;i..:rii;;
   ZBB;i.   .Z00888W@;;7      880MM:        :MM;      ,;i;.B;;            ;X ;2Z7;iir027 i;rrZ .27;r77::.:ii:ii;i
  .B80;i    ,XWZ0Z0WX ;      ;aB0BM0       SMM; ,:::.,;iii,W;;7           ri, 77Xr;;07SS;rr;72 ,;;r;S,,:i;;iii;ii
  rWZ0i:    .;B8ZZBZ 7.     :S;S80@Mr.::,iBMW, :2W8BaX:::i:M;r,           ::. ;2Sii2Xi;7;riiXa iX;;7Xii;iiii;iir.
  a088i     ,.00ZBW  M7     X.S;rZWMWr;rS0MWX:X802BW@W27;i;MS. Xi.        ;:X 28;;rii;;;ii7ZW; r7irS;:iiiiiii:;;
  8880:      .7W8W: BMB    ai rSi,7@MB8808Z02r7riS0a7iXM0XiM:  XXr       iXr7 8WBW8ZX7;720WWX. :rrrX:iiiiiiiiiX
  BZB0i     ,; BWX.2MB@a.,Sa   X2r;200ZZZaZBriXXSXi:ir0SX;rMS:7:77;     iXrXaZZ22XXrr;S802X:. r7;rXiiiiiiiii:7X
  W8Z0:     aB Xa:Z XMBM7X2.  ;8880B8MMMB88Mairr  :SaXi;;:XMa7rSXrXr   ;Xri8Si:i:::ii777ii.i:;Z7rXX:iiiiiiii:8
  W02Zi   .7@M: rBr  0MSi2: ;0W888@MMXMMMMMM0   .X7;SXXrX8a@2,rra7;7XrX7i:SZ;:7SXX2Z00aXr;raXBXr7S;:iiiiiii,aX
  8WSar   ;0@XX 2M    @X 7 ZMB88a0@M0 B,SMMM.  8MM;,:rS0BWB@8 Xr;SXr;r;r7a8a00Xa0a7r7ri;;7XXZ:  i;:iiiiiii:r0
  SW2XS  i2Mi BS0WZ    : S  8@M8ZWMM0:M;    .aMMMMMS::iZ8iXM@ iS7rXXS2aZ8ZaSBM87;XSiii;;X770,  iiii:iiiii:i8.
  ;WZia,:;Mr  00Z0WS   i ir   :@MMWW8 BMM0ZWMWB@BWMMWXrr7i:WM; X7rXZ2aZ8aa22B8;;rr;ri;;XX;0Zr;;;iiiiiiii::ar
   8@iX;.0Z   8807rM2  i  7    7MWi0B 8MMB@r8B08W@@MMa;rXr:2Ma .XrXi,.:X8aaaZ..:iX7;r;7X;Z0X;:iiiiiiiii::XX
   7@Sri;M   :B082 XMa :   ;   ;;; @8 aM87W7SW88ZBWMMr :rX77WM.,.Si::i:,78a0;,:i:iX7r7XrXWX:,iiiii:iii::rS
    WBrrWS   XBa0X .:0a:   :,  rS: MZ S@Z WiaBB0080B@:,:i:;iXMS,,.;iiii:,X88::iii:;7r;X;02.,iiiiiiiiiiiiS
    X@XSa    88rB2  ; i2,   .  ;X  M2,7WS,8 2W8BZ80BW,,iii:,,MWr:: riiii,:02.iiiii:i;.;SB;.iiiiiii:iii:X:.:r
.    80Br    00:0Z  2B  r         iMi,7WXrX rW000080M:,i;ii: aMB,;,.riiii.Zr:iiiiii:i7r20,:iiiiiiiiii:X;ii,,:
.   ,,ZB8    BB;XB   WZ.;     .:  iM,,rWXXi  0B8888WMX.ii;ii.;MM;i;,:;i;:i2::iiiiiiiir;0Z,:iiiiii;ii:X;iii;,:
.  .: 8B@X   002i@,   M8      .2  7M, 70Z2: :;B088WMWX,iiiii:.BMS:iSiiiii72,iiiiiii:;i;B2.iiiiiiiii:Xr::i:;::
   i,7B2BM:  B8Bi8S   .M.      S. SM. 70B0. rSrZ8WWa r;ii;i;i.XMZ:i;8i:i,2r:iiiiiiiii::WS,:iiiiiii:Xr::i:;;::
   ,iZW ,MW  00ZX;W    :,      :r ZM, iBZ0: 7BZX8a.  :S:ii;ii,iM@,i Z8,,iSi:iiii;iiii;i02.iii:iii:X;:::rrXi:.
   ,7B8  ,MZ aBZr72S   .:       7 0M. ;Z;07 7080BX    aii;i;i: BMi:,7Mi,;2:ii;iiiiii:;;20,:i:iii:r;:::a0rX.i
   ,S@Z   .MX7BB:XrZ.   7       ::rM: X;Xa0.X000@;    X7iiiii:.aM;,,7Mi.XX::ii;iiiiii:r;W7,:ii;:r;i::ia;:::;
   ,XM2    iM2Z@S 8;X   ;.       r .  X72ZX Z00@a      2:ii;ii.SMX.,7@.,2r:ii;i;iii;ii:iXB,:i;:;;iii:S::i:i,
    rMZ     iW7ZM :Wr;  :i        r  .XXSX ;00@Z  .    Xriii;:,rMX..8B.:2:iiiiiiiiiiiii:;88,:,r;iii:X7:i;,r
    .WW  ..  rBi20 S@Xi  i      ; i: .XXr;:0W@r  ... . :7ii;ii,;MS :M8 ;S:iiiiiiiii;i;ii:;a8::iiiii:2i:ii:r,       .
     XMi ..   ZWi7: 8MS   .    ,X  7  Xrr7W@ZWX         i:iiii,iM7 2Mr.7X:ii;i;iii;iiiiii:iXa7iiii:;X,iii:;,  .:::::.
   . :WW     ,@W;;:  ZM2,,i    X.  .r r7;XB, 0MM:   ;2aZa;,iii,;M;:MB,,7;iiiiiiiiiiiiii;i::ri7r;iiiZ:,:ii:i  .,,..
: ;r  :@Z  i0MM8  i:  aM8ii   ;;    ,777r2; Si ZMW7.   XMB,:ii,iMr0Mr.i;;iiiiiiiiiiiii;i::ri7.:i:.r8a7r:rr;:i::,,..
   r;ir0@Sr027rXa8S7i: SMMSr i7      ,SXrX;;X    78WWWW@@Wr:ii.7M@Ma.::riii;i;i;iiiii;iii2::r::::8X:rX7rX;::.,...,,,
;.:  2MMMMBr,    ZMWBri.i8MMii        ;Xrra7  .     :i:i;.rii:.SMMS :,;2:i;iii;iii;iiii,aS::;:ii2BZXi:;:.
  ,i:X8082i;S888BBZ7X  ;,,7,        .; X;XWBZ; ;aaS7i,.iirX7:i.0Mr :,:8a,iiii;i;iii;ii:X7::i:iXr,,,i;X7
.              ;XXZa227:i7    :    .22.;XXMMMMX SMZ7Xa2,iir2i:iMW :,:S@r,iii;i;iiiiiiii7r,:;7;X:i:: iXXXi:. .....
         ,:, X0:     iS07X: .r;.:;rXXX:.2aZXi@M. BWX X8;i;:SS:XMS :7Z0BX.ii;i;iiiiiii::8008a7rXi:irZX7r..,     ..,.,
, ,..        Z0i       7i        7S7777 82   8a iSB0:;ii;iiiriBM7S008ZZBXiii;;;i;iii;iS002;,r7   ;rWr   ..,...
,.,i:r;;i:,,  :;i;r: .;,        7S77772 8; ,:770BZ7,,::;;;i: XM2,7ri:i:r777r;;;r;;r77r;7:  :;.    ..:irX7X22XrXrr
     ...,,,.. ..,;aia:ii.  ;i  7S777X72raaS2Za8ar:::i:i:i:: 7MB,i;rrrrr;;irr72Xrr7X;i;.,.       . ..::7XX7;..ir r,
.            ....,i7;::;.,  . ,27777r7r2X:,:,,.,,i::.:ii. .aMBi;rr;;iiiii;;r;r;;iii7i,...:i:..   . ...       .
. ,.,.,.,:ii;iii;ir7:,.   i:  XX7r777r7XX,;iiii::,:,BMZZMaWMZ..:::iiii;i;;;,.       .    ,:   .
     ..:,,...:iri:,:rS:;XXS2X2aZ2SXX77XS2::ii;;rii::iXrXaMZ, ,:i:i:i:iii,                  . .,i;;;;ii::,,.
.          ,:,.       ,Sa77::i;iiiX2SXX2Z:;;;;r;r;rr;:,.,X. ::i:iiiiiiiii.      ,,:,,:i,:,:.,,..:i;;;;r;;;r;ri:
.                    .  ..           ;Xr,..,............. .,.,.,.,.,.,,::i::,:.....,.,,,,,,,.,.,..   . ....,   ..,.,                                                 .,..       i                                   .i;,,.,.,,,.,.,,,.,,:.,.,.,.............. ...       ii;i,       .   . . . . . . . . . ... .....                              .... .                                           ......... .,,.,.... .   . .
-->