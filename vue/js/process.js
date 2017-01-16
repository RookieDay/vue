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


// var vv = new Vue({
//     el: '#demo',
//     data: {
//         firstName: 'Foo',
//         lastName: 'Bar',
//         fullName: 'Foo Bar'
//     },
//     watch: {
//         firstName: function(val) {
//             this.fullName = val + ' ' + this.lastName
//         },
//         lastName: function(val) {
//             this.fullName = this.firstName + ' ' + val
//         }
//     }
// })

// var vvv = new Vue({
//     el: '#demo',
//     data: {
//         firstName: 'Foo',
//         lastName: 'Bar'
//     },
//     computed: {
//         fullName: function() {
//             return this.firstName + this.lastName;
//         }
//     }
// })

var vvvv = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: {
            get: function() {
                return this.firstName + this.lastName;
            },
            set: function(newValue) {
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
})


var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        question: function(newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods: {
        getAnswer: _.debounce(
            function() {
                var vm = this;
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                vm.answer = "Thinking...";
                axios.get('https://yesno.wtf/api').
                then(function(response) {
                    vm.answer = _.capitalize(response.data.answer)
                }).catch(function(error) {
                    vm.answer = 'Error! Could not reach the API. ' + error
                });
            }, 500
        )
    }
})
var random = new Vue({
    el: '#random',
    data: {}
})
var pp = new Vue({
    el: '#ppp',
    data: {
        type: "A"
    }
})

var for1 = new Vue({
    el: '#for-1',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
})

new Vue({
    el: '#repeat-object',
    data: {
        object: {
            FirstName: 'John',
            LastName: 'Doe',
            Age: 30
        }
    }
})

Vue.component('ttodo-item', {
    template: '\
     <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
    ',
    props: ['title']
})
new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            'Do the dishes',
            'Take out the trash',
            'Mow the lawn'
        ]
    },
    methods: {
        addNewTodo: function() {
            this.todos.push(this.newTodoText);
            this.newTodoText = "";
        }
    }
})


new Vue({
    el: '#num',
    data: {
        numbers: [1, 2, 3, 4, 5]
    },
    computed: {
        evenNumbers: function() {
            return this.numbers.filter(function(number) {
                return number % 2 === 0
            })
        }
    }
})

new Vue({
    el: '#on1',
    data: {
        counter: 0
    }
})

Vue.component('button-counter', {
    template: '<button v-on:click="increment">{{counter}}</button>',
    data: function() {
        return {
            counter: 0
        }
    },
    methods: {
        increment: function() {
            this.counter += 1;
            this.$emit('increment');
        }
    }
})

new Vue({
    el: '#counter-event-example',
    data: {
        total: 0
    },
    methods: {
        incrementTotal: function() {
            this.total += 1;
        }
    }
})

Vue.component('currency-input', {
    template: '\
    <span>\
      $\
      <input\
        ref="input"\
        v-bind:value="value"\
        v-on:input="updateValue($event.target.value)"\
      >\
    </span>\
  ',
    props: ['value'],
    methods: {
        updateValue: function(value) {
            var formattedValue = value.trim()
                .slice(0, value.indexOf('.') + 3);
            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue
            }
            this.$emit('input', Number(formattedValue))
        }
    }
})