var wraps = $('.drag-wrap');
var startX;
var startY;
var wrapNum = 0;
var insertLoc = 0;

function dragStart(e) { 
    // 下面的item向上移动50px
    moveItem(getNextItem(this), -50);
    // 记录拖动时鼠标的位置
}

function dragging(e) {
    if (this.className == 'drag') {
        this.className = 'dragging';
    }
}

function getNextItem(item) {
    //var brother = item.nextSibling;
    var brother = item.nextElementSibling;
    // 这个很关键：&& brother.nodeName === '#text 原因是nextSibling直接获取得到的可能是文本节点，所以需要剔除文本节点。DIYgod大神用的是递归的方法剔除
    // while (brother && brother.nodeName === '#text') {
    //     brother = getNextItem(brother);
    // }
    return brother;
}

function moveItem(item, path) {
    while(item) {
        item.style.top = parseInt(item.style.top) + path + 'px';
        item = getNextItem(item);
    }
}

function getLocation(event) {
    // 计算鼠标自开始拖动到结束拖动移动的距离
    // 这里判断具体分到哪个wrap写得很粗糙。但是也必要细究
    if (event.clientX > 650) {
        wrapNum = 1;
    } else {
        wrapNum = 0;
    }
    console.log('+++++++' + event.clientX);
    var wrapTopLoc = $('.drag-wrap')[0].offsetTop;
    insertLoc = Math.floor((event.clientY - wrapTopLoc) / 50);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e = e || window.event;
    e.preventDefault();
    getLocation(e);
    console.log('-----insert loc----');
    console.log(wrapNum, insertLoc);

    var targetWrap = $('.drag-wrap')[wrapNum];
    console.log('aaa');
    console.log(targetWrap);
    var targetTop = 0;
    var targetItem = targetWrap.getElementsByClassName('drag')[insertLoc];
    if (targetItem) {
        targetTop = targetItem.style.top;
        console.log('AtargetTop: ' + targetTop);
    } else {
        // 插到末尾
        var itemNum = targetWrap.getElementsByTagName('li').length;
        targetTop = itemNum * 50;
        console.log('BtargetTop: ' + targetTop);
    }

    moveItem(targetItem, 50);
    
    var movingItem = $('.dragging')[0];
    movingItem.className = 'drag';
    movingItem.style.top = parseInt(targetTop) + 'px';

    targetWrap.insertBefore(movingItem, targetItem);
}

window.onload = function () {
    var drag = document.getElementsByClassName('drag');
    for (var i = 0, len = drag.length; i < len; i++) {
        drag[i].draggable = true;
        drag[i].style.top = (i % 5 * 50) + 'px';

        $.on(drag[i], 'dragstart', dragStart);
        $.on(drag[i], 'drag', dragging);
    }
    $.on(document.body, 'drop', drop);
    $.on(document.body, 'dragover', dragOver);
}