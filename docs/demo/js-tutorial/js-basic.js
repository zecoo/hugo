console.log("hello world")

// variable
var name = "zecoo";
console.log("hello " + name);

// array
var arr = [1, 2, "a", name];
console.log(arr.length);

// object
var obj_zecoo = {
    name : 'zecoo',
    age : 22,
    school : 'WHU'
};
console.log(obj_zecoo.age)

// for-in
for (var key in obj_zecoo) {
    console.log(key)
}

// map
var m = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log(m.get('a'));

// iterator 
for (var x of m) {
    console.log(x);
}

// reduce
var test_arr = [1, 3, 5, 7, 9]
function add(arr) {
    return arr.reduce( function (x, y) { // return is indepensable
        return x + y;
    });
}
var add_res = add(test_arr);
console.log(add_res)

// filter 
function filter_3(arr) {
    return arr.filter( function (x) {
        return x % 3 == 0;
    })
}
var filter_res = filter_3(test_arr);
console.log(filter_res);

// find (the 1st element)
console.log(test_arr.find(function (s) {
    return s%3 == 0;
}))

// for each
arr.forEach(console.log)

// Date
var now = new Date();
console.log(now.getHours());

// oop
var Student = {
    name: 'Robot',
    height: 1.7,
    run: function () {
        console.log(this.name + " is running...");
    }
};

function createStudent (name) {
    var s = Object.create(Student);
    s.name = name;
    return s;
}

var xiaoming = createStudent("xiaoming");
xiaoming.run();


// update dom
/*
var list = document.getElementById('test-list')
var new_dom_arr = [];
var c = [];
for (i = 0; i<list.children.length; i++) {
    c = list.children[i];
    new_dom_arr.push(c.innerText);
}
new_dom_arr.sort();
for (i = 0; i < new_dom_arr.length; i++) {
    list.children[i].innerText = new_dom_arr[i];
}
*/
