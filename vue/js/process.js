var app = new Vue({
    el: '#app',
    data: {
        message: 'hello vue'
    }
})
var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date()
    }
})
var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
})

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: "hello word"
    },
    methods: {
        click: function() {
            this.message = this.message.split('').reverse().join('');
        }
    }
})

var app6 = new Vue({
        el: '#app-6',
        data: {
            message: 'hello'
        }
    })
    // / Define a new component called todo-item
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { text: 'Vegetables' },
            { text: 'Cheese' },
            { text: 'Whatever else humans are supposed to eat' }
        ]
    }
})

var data = { a: 1, message: "e111eeee" };
var vm = new Vue({
    el: '#example',
    data: data,
    methods: {
        click: function() {
            this.message = this.message.split('').reverse().join('');
        }
    },
    created: function() {
        console.log("a is" + this.a)
    },
    updated: function() {
        console.log("updated")
    }
})
console.log('vm.$data: ' + vm.$data.a);
console.log(vm.$data === data);
console.log((vm.$el) === document.getElementById('example'));



var vs = new Vue({});
console.log(vs);


var vs = new Vue({
    el: '#example2',
    data: {
        message: 'helloo'
    },
    computed: {
        reversedMessage: function() {
            console.log(Date.now());
            return this.message.split('').reverse().join('')
        }
    }
})

console.log(vs.reversedMessage) // -> 'olleH'
vs.message = 'Goodbye'
console.log(vs.reversedMessage) // -> 'eybdooG'