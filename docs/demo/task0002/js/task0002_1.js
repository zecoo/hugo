// 在看DIYgod的代码的时候 他用的$(.xxx)我不能用，还以为是出了什么bug
// 仔细一想，是人家在 util.js 里早就封装好了，所以就不用像我一样傻傻得写 docuemnt.getElementsBy..
// 现在看来，ife task0002的设计也是及其精妙

function showHobby() {
    // get text in textarea
    var text = $('#hobby-input').value;

    // split hobby
    text = trim(text).replace(/[\s,，;、；]+/g, " ");
    var hobbies = text.split(' ');
    hobbies = uniqArray(hobbies);

    // add in html
    // 我去，我在这里踩的坑是真的让人难受。
    // getElementsByClassName 得到的结果是一个数组，所以如果是直接 appendChild，就会报错 is not a function
    // test: apple;orange、 pear, orange;
    if (hobbies.length < 2) {
        $('#error').innerText = 'No input';
    } else {
        $('#error').innerText = '';
        var center = $('.center');
        if ($('#result')){
            center[0].removeChild($('#result'));
        }
        var result = document.createElement('ul');
        result.id = 'result';
        for(var i=0; i<hobbies.length; i++) {
            var hobby = document.createElement('li');
            hobby.innerText = hobbies[i];
            result.appendChild(hobby);
        }
        center[0].appendChild(result);
    }
}

function reset() {
    // $('#hobby-input').value = '';
    $('#hobby-input').value = '';
    $('#result').innerText = '';
}