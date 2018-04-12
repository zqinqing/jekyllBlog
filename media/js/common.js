/*
* @Author: zqinqing
* @Date:   2017-09-24 12:04:17
* @Last Modified by:   Allen
* @Last Modified time: 2017-11-24 18:38:33
*/
var app = (function() {
    var _module = {};
    return {
        //定义模块
        module: function(type, fn) {
            if (typeof _module[type] === 'undefined') {
                _module[type] = [fn];
            } else {
                _module[type].push(fn);
            }
            return this;
        },
        //使用模块
        use: function(type, args) {
            if (!_module[type]) return;
            var events = {
                type: type,
                args: args || {}
            };

            len = _module[type].length;
            var i = 0;
            for (; i < len; i++) {
                _module[type][i].call(this, events);
            }
            return this;
        },

    }

})();
//工具方法
(function(win, id, factory) {
    "use strict"; //使用严格模式
    //进行模块化打发，封装模块
    if (typeof(module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(id, win);
    } else if (typeof(define) === 'function' && define.amd) { // AMD
        define(function() {
            return factory(id, win);
        });
    } else { // <script>
        win[id] = factory(id, win);
    }

})(window, 'tool', function(id, window) {

    var tool = {
        template: function(str, data) {
            return str.replace(/\{#(\w+)#\}/, function(match, key) {
                return typeof data[key] === undefined ? '' : data[key];
            });
        },
        each: function(str, data) {

        },
        ajax: function(option) {
            var options = $.extend({}, option);

            $.ajax({
                url: options.url || "",
                type: options.type || "POST",
                data: options.data || {},
                dataType: options.dataType || "json",
                async: options.async || true,
                beforeSend: options.beforeSend || function() {},
                success: options.success || function() {},
                error: options.error || function() {},
                complete: options.complete || function() {},
                timeout: options.timeout || 5000,
                cache: options.cache || false,
                contents: options.contents || "",
                contentType: options.contentType || "application/x-www-form-urlencoded; charset=UTF-8",
                context: options.context || "",
                headers: options.headers || "",
                statusCode: options.statusCode || {},
            });
        },
        base: function(option) {

            layer.open({
                type: option.layerType || 1,
                skin: option.skin || '', //样式类名
                anim: option.anim || 2,
                area: option.area || [],
                title: option.title || '提示',
                shadeClose: option.shadeClose || true, //开启遮罩关闭
                content: option.content || '',
                success: function(layero, index) {
                    option.layerSuccess && option.layerSuccess(layero, index);
                }
            });
        }
    }
    return tool;
});
/*
// canvas 背景
(function() {
    function canvasLine(opt) {
        var defaults = $.extend({
            'obj': '#canvas'
        }, opt.args);
        var canvasPage3 = $("#canvas")[0];
        canvasPage3.width = $(window).width();
        canvasPage3.height = $(window).height();
        var ctx = canvasPage3.getContext("2d");
        var zhongX = $(window).width() / 2;
        var zhongY = $(window).height() / 2;

        function randomNum(x, y) {
            return Math.floor(Math.random() * (y - x + 1) + x);
        }

        function randomColor() {
            return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
        }

        function Ball() {
            this.r = randomNum(0.1, 3);
            this.color = "white";

            this.x = randomNum(this.r, canvasPage3.width - this.r);
            this.y = randomNum(this.r, canvasPage3.height - this.r);

            this.speedX = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
            this.speedY = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
        }

        Ball.prototype.move = function() {
            this.x += this.speedX * 0.2;
            this.y += this.speedY * 0.2;

            if (this.x <= this.r) {
                this.x = this.r;
                this.speedX *= -1;
            }
            if (this.x >= canvasPage3.width - this.r) {
                this.x = canvasPage3.width - this.r
                this.speedX *= -1;
            }
            //小球碰到上边界的处理 反弹
            if (this.y <= this.r) {
                this.y = this.r;
                //反弹
                this.speedY *= -1;
            }
            //小球碰到下边界的处理 反弹
            if (this.y >= canvasPage3.height - this.r) {
                this.y = canvasPage3.height - this.r;
                //反弹
                this.speedY *= -1;
            }
        }

        Ball.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        var balls = [];
        var arr = [];
        for (var i = 0; i < 0.0002 * canvasPage3.width * canvasPage3.height; i++) {
            var ball = new Ball();
            balls.push(ball);
        }

        setInterval(function() {
            arr = [];
            ctx.clearRect(0, 0, canvasPage3.width, canvasPage3.height);
            for (var i = 0; i < balls.length; i++) {
                balls[i].move();
                balls[i].draw();
                if (ballAndMouse(balls[i]) < 130) {
                    ctx.lineWidth = (130 - ballAndMouse(balls[i])) * 1.5 / 130;
                    ctx.beginPath();
                    ctx.moveTo(balls[i].x, balls[i].y);
                    ctx.lineTo(zhongX, zhongY);
                    ctx.strokeStyle = balls[i].color;
                    ctx.stroke();
                }
            }

            for (var i = 0; i < balls.length; i++) {
                for (var j = 0; j < balls.length; j++) {
                    if (ballAndBall(balls[i], balls[j]) < 80) {
                        ctx.lineWidth = (80 - ballAndBall(balls[i], balls[j])) * 0.6 / 80;
                        ctx.globalAlpha = (130 - ballAndBall(balls[i], balls[j])) * 1 / 80;
                        ctx.beginPath();
                        ctx.moveTo(balls[i].x, balls[i].y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.strokeStyle = balls[i].color;
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0;

        }, 30);

        canvasPage3.onmousemove = function(event) {
            event = event || window.event;
            zhongX = event.offsetX;
            zhongY = event.offsetY;
        }

        function ballAndMouse(obj) {
            var disX = Math.abs(zhongX - obj.x);
            var disY = Math.abs(zhongY - obj.y);
            return Math.sqrt(disX * disX + disY * disY);
        }

        function ballAndBall(obj1, obj2) {
            var disX = Math.abs(obj1.x - obj2.x);
            var disY = Math.abs(obj1.y - obj2.y);
            return Math.sqrt(disX * disX + disY * disY);
        }
    };
    app.module('canvasLine', canvasLine);
})();
*/

// search 搜索
(function (){
    function search(opt){
        var defaults = $.extend({
            'url': '/search.xml',
            'xml': 'xml',
            'obj': '#search'
        }, opt.args);

        $.ajax({
            url: defaults.url,
            dataType: defaults.xml,
            success: function( xmlResponse ) {
               var data = $( "article", xmlResponse ).map(function() {
                    return {
                        value: $( "title", this ).text() + ", " + ( $.trim( $( "date", this ).text() ) ),
                        desc: $("description", this).text(),
                        url: $("url", this).text()
                    };
                }).get();

                $( defaults.obj ).autocomplete({
                    source: data,
                    minLength: 0,
                    select: function( event, ui ) {
                      window.location.href = ui.item.url;
                    }
                });
            }
        });
    };
    app.module('search', search);
})();




$(document).ready(function(){
    // app.use('canvasLine'); // canvas背景
    app.use('search');     // search搜索

    //音乐关闭
    /* 注释页面音乐
    $("#music").bind("click", function() {
        $(this).toggleClass("pause");
        var audio = $("#music audio")[0];
        if (audio.paused) {
            audio.play(); //audio.play();// 这个就是播放
        } else {
            audio.pause(); // 这个就是暂停
        }
    });
    */
    // 监控滑轮滚动 出现动画效果
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
            (function(){
            window.scrollReveal = new scrollReveal({reset: true});
        })();
    };

    // 返回顶部
    var backToTopEle = $('<div class="back-top"><p class="hint">点击返回本页顶部</p></div>').appendTo($("body")).click(function() {
        $("html, body").animate({ scrollTop: 0 }, 120);
    }), 
    backToTopFun = function() {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 200)? backToTopEle.show(): backToTopEle.hide();    
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            backToTopEle.css("top", st + winh - 166); 
        }
    };

    backToTopEle.hide(); 
    $(window).bind("scroll", backToTopFun);
    $('div.main a,div.pic a').attr('target', '_blank');

    setInterval(function () {
        //Ajax调用处理
        $.ajax({
            type: "GET",
            url: "https://api.lwl12.com/hitokoto/main/get",
            data: 0,
            success: function(data){
                $("#notice").html(data);
            },
            error: function (data) {
                console.log('请求错误!')
            }
        });

        /*
        //Ajax调用处理
        var html = $.ajax({
           type: "GET",
           url: "https://api.lwl12.com/hitokoto/main/get",
           data: 0,
           async: false
        }).responseText;
        $("#box").html('<h2>'+html+'</h2>');
        */
    },60000)
});