window.onload = function() {
    var btns = $('#oval-button').getElementsByTagName('li');
    var imgs = $('#img-slide');
    var index = 0;

    function showBtn() {
        // remove all light class
        for (var i=0; i<btns.length; i++) {
            if (btns[i].className == 'light-btn') {
                removeClass(btns[i], 'light-btn');
            }
        }
        // add index light class
        addClass(btns[index], 'light-btn')
    }
    
    var animated = false;

    function animate(width) {
    
        animated = true;
        // 每个时间间隔移动一小部分，形成动画效果
        var time = 300;
        var interval = 10;
        // 偏移量
        var speed = width / (time / interval);
        var currentLeft = parseInt(imgs.style.left);
        var newLeft = currentLeft + width;
    
        function go() {
            if ((speed < 0 && parseInt(imgs.style.left) > newLeft)
                || (speed > 0 && parseInt(imgs.style.left) < newLeft)) {
                imgs.style.left = parseInt(imgs.style.left) + speed + 'px';
                // settimeout 是在interval毫秒之后执行go
                // 也就是一共执行了（time/interval）= 30 步完成一张图片的转换，每步移动speed的距离
                setTimeout(() => {
                    go();
                }, interval);
            } else {
                if (newLeft < -4680) {      // out of index situation
                    imgs.style.left = '-780px';
                } else if (newLeft > -780) {
                    imgs.style.left = '-4680px';
                } 
                animated = false;
            }
        }
        go();
    }
    
    $.click($('#prev'), function(){
        if (!animated) {
            animate(780);
            index--;
            if (index == -1) {
                index = 5;
            }
            showBtn();
        }
    });
    
    $.click($('#next'), function(){
        if (!animated) {
            animate(-780);
            index++;
            if (index == 6) {
                index = 0;
            }
            showBtn();
        }
    });

    for (var i=0; i<btns.length; i++) {
        $.click(btns[i], function() {
            if (!animated){
                var toIndex = this.getAttribute('index');
                if (toIndex == index){
                    return;
                }
                animate((toIndex - index) * -780);
                index = toIndex;
                showBtn();
            }
        })
    }
}

// 这种display = none的方式来做轮播图，动画效果很差

// function animate(){
//     index++;
//     var imgs = $('.img-slide');
//     if (index >= imgs.length){
//         index = 0;
//     }
//     for (var i=0; i<imgs.length; i++) {
//         imgs[i].style.display = 'none';
//     }
//     imgs[index].style.display = 'block';
// }

function stop() {
    clearInterval(timer);
}

var timer = 0;
function playASC() {
    // 防止正序逆序震荡
    if (timer) {
        stop();
    }
    var next = $('#next');
    timer = setInterval(() => {
        next.click();
    }, 1000);
}

function playDESC() {
    if (timer) {
        stop();
    }
    var next = $('#prev');
    timer = setInterval(() => {
        next.click();
    }, 1000);
}