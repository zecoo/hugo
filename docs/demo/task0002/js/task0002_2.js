function countDown() {
    // get input
    // test : 2020-6-1
    var text = $('#input-date').value;
    var endDate = new Date();
    var currentTime = new Date();
    if (!text) {
        $('#error').innerText = 'No input';
    } else {
        $('#error').innerText = '';
        value = text.split('-');
        if (value.length == 3){
            // execute per second
            t = setTimeout(() => {
                countDown();
            }, 1000);
    
            if ($('#result')) {
                $('.center')[0].removeChild($('#result'));
            } 
            // set end date
            endDate.setFullYear(value[0], value[1], value[2]);
            endDate.setHours(0, 0, 0, 0);
    
            // cal diff
            var diff = endDate - currentTime;
            if (diff < 0){
                $('#error').innerText = 'Please input a future time';
            } else {
                // set diff(ms) to YYYY-MM-DD
            var diff_day = diff / (24 * 60 * 60 * 1000);
            var day = Math.floor(diff_day);
            var diff_hours = (diff_day - day) * 24;
            var hours = Math.floor(diff_hours);
            var diff_minutes = (diff_hours - hours) * 60;
            var minutes = Math.floor(diff_minutes);
            var diff_secends = (diff_minutes - minutes) * 60;
            var seconds = Math.floor(diff_secends);
    
            // display on html
            var result = day + 'days ' + hours + 'hours ' + minutes + 'minutes ' + seconds + 'seconds ' + 
                ' lefts ' + 'up to ' + value[0]  + '-' + value[1] + '-' + value[2];
            var element = document.createElement('p');
            element.id = 'result';
            element.innerText = result;
            $('.center')[0].appendChild(element);
            }
        } else {
            $('#error').innerText = 'Please input the correct form: YYYY-MM-DD';
        }
    }
}

function reset() {
    $('#input-date').value = '';
    if ($('#result')) {
        clearTimeout(t);
        $('.center')[0].removeChild($('#result'));
    }
    $('#error').innerText = '';
}