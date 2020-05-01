var choice = $('#prompt').getElementsByTagName('li');
var inputBox = $('#autoInput');

function showHint() {
    $('#prompt').style.display = 'block';
    // inputBox.value = 'aaa';
}

console.log(choice[1].innerText);


for (var i=0; i<choice.length; i++) {
    $.click(choice[i], function() {
        var index = this.getAttribute('index');
        inputBox.value = choice[index].innerText;
        $('#prompt').style.display = 'none';
    });
}