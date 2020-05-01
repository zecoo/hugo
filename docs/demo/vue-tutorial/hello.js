var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

  var app2 = new Vue({
      el: '#app-2',
      data: {
          message: 'now u see me'
      }
  })

  var app3 = new Vue({
      el: '#app-3',
      data: {
          seen: true
      }
  })


  var app4 = new Vue({
      el: '#app-4',
      data: {
          todos: [
              { text: 'todo1' },
              { text: 'todo2' },
              { text: 'todo3' },
          ]
      }
  })

  var app5 = new Vue({
      el: '#app-5',
      data: {
          message: 'Hello Vue'
      },
      methods: {
          reverseMsg: function() {
              this.message = this.message.split('').reverse().join('')
          }
      }
  })

  var app6 = new Vue({
      el: '#app-6',
      data: {
          message: 'Hello Vue'
      }
  })

  
  // 注意，这段代码一定要放在todo-item调用的app之前
  Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
  })

  var app7 = new Vue({
      el: '#app-7',
      data: {
        groceryList: [
            { id: 0, text: 'fruit'},
            { id: 1, text: 'vegetable'},
            { id: 2, text: 'cheese'}
        ]
      }
  })
  