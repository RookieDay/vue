## vue
- var app= new Vue({}) 实例以后可以在console app.** 来修改数据 然后实时查看
- 计算属性
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```
```
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```
   + 这里我们声明了一个计算属性 reversedMessage 。我们提供的函数将用作属性 vm.reversedMessage 的 getter 。
   + 你可以打开浏览器的控制台，修改 vm 。 vm.reversedMessage 的值始终取决于 vm.message 的值。
     你可以像绑定普通属性一样在模板中绑定计算属性。 Vue 知道 vm.reversedMessage 依赖于 vm.message ，
     因此当 vm.message 发生改变时，依赖于 vm.reversedMessage 的绑定也会更新。而且最妙的是我们是声明式
     地创建这种依赖关系：计算属性的 getter 是干净无副作用的，因此也是易于测试和理解的。
- 计算缓存 vs Methods
```
你可能已经注意到我们可以通过调用表达式中的method来达到同样的效果：
<p>Reversed message: "{{ reverseMessage() }}"</p>
// in component
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```
   + 不经过计算属性，我们可以在 method 中定义一个相同的函数来替代它。对于最终的结果，两种方式确实是相同的。
     然而，不同的是计算属性是基于它的依赖缓存。计算属性只有在它的相关依赖发生改变时才会重新取值。这就意味着只要 message 没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
     这也同样意味着如下计算属性将不会更新，因为 Date.now() 不是响应式依赖：
```
computed: {
  now: function () {
    return Date.now()
  }
}
```
   + 相比而言，每当重新渲染的时候，method 调用总会执行函数。
     我们为什么需要缓存？假设我们有一个重要的计算属性 A ，这个计算属性需要一个巨大的数组遍历和做大量的计算。
     然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter ！如果你不希望有缓存，请用 method 替代。
- 计算属性 vs Watched Property
   + Vue.js 提供了一个方法 $watch ，它用于观察 Vue 实例上的数据变动。当一些数据需要根据其它数据变化时
```
<div id="demo">{{ fullName }}</div>
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

```
上面代码是命令式的和重复的。跟计算属性对比：
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```   
- 计算setter
   + 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
```
// ...
computed: {
  fullName: {
    // getter 其实就是这种的简写
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

- 观察watchers
    + 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的 watcher 。这是为什么 Vue 提供一个更通
      用的方法通过 watch 选项，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。
```
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```

```
<!-- Since there is already a rich ecosystem of ajax libraries    -->
<!-- and collections of general-purpose utility methods, Vue core -->
<!-- is able to remain small by not reinventing them. This also   -->
<!-- gives you the freedom to just use what you're familiar with. -->
<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行 去找answer
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
    // ajax请求直到用户输入完毕才会发出
    // 学习更多关于 _.debounce function (and its cousin
    // _.throttle), 参考: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        var vm = this
        if (this.question.indexOf('?') === -1) {
          vm.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        vm.answer = 'Thinking...'
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    )
  }
})
</script>
```

- class与style绑定
```
class绑定
<div v-bind:class="classObject"></div>
```
```
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal',
    }
  }
}
```

```
style绑定
直接绑定到一个样式对象通常更好，让模板更清晰：
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
同样的，对象语法常常结合返回对象的计算属性使用。
自动添加前缀

数组语法
v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：
<div v-bind:style="[baseStyles, overridingStyles]">

当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。
```
- 条件渲染
    + Vue 尝试尽可能高效的渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使 Vue 更快之外还可以
      得到一些好处。如下例，当允许用户在不同的登录方式之间切换:
```
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
在代码中切换 loginType 不会删除用户已经输入的内容，两个模版由于使用了相同的元素，<input> 会被复用，仅仅是替换了他们的 placeholder。
```
```
这样也不总是符合实际需求，所以 Vue 提供一种方式让你可以自己决定是否要复用元素。你要做的是添加一个属性 key ，key 必须带有唯一的值。
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
- v-show v-if
    + v-if 是真实的条件渲染，因为它会确保条件块在切换当中适当地销毁与重建条件块内的事件监听器和子组件。
      v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——在条件第一次变为真时才开始局部编译（编译会被缓存起来）。
      相比之下， v-show 简单得多——元素始终被编译并保留，只是简单地基于 CSS 切换。
      一般来说， v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换使用 v-show 较好，如果在运行时条件不大可能改变则使用 v-if 较好。 


- 组件构建应用
```
Vue.component --- 创建一个实例 定义一个 名字
props: ['todo'], 这个可以理解为是和<todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item> v-bind绑定 将item传给todo , 
todo 继续赋给组建里面的双大括号

在 Vue 里，一个组件实质上是一个拥有预定义选项的一个 Vue 实例：
// Define a new component called todo-item
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
现在你可以在另一个组件模板中写入它：
<ol>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ol>
但是这样会为每个 todo 渲染同样的文本，这看起来并不是很酷。我们应该将数据从父作用域传到子组件。让我们来修改一下组件的定义，使得它能够接受一个 prop 字段：
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
现在，我们可以使用 v-bind 指令将 todo 传到每一个重复的组件中：
<div id="app-7">
  <ol>
    <!-- Now we provide each todo-item with the todo object    -->
    <!-- it's representing, so that its content can be dynamic -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
  </ol>
</div>

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
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
这只是一个假设的例子，但是我们已经将应用分割成了两个更小的单元，子元素通过 props 接口实现了与父亲元素很好的解耦。我们现在可以在不影响到父应用的基础上，进一步为我们的 todo 组件改进更多复杂的模板和逻辑。
```
- 列表渲染 key TODO
```
key

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略。如果数据项的顺序被改变，Vue将不是移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。
这个默认的模式是有效的，但是只适用于不依赖子组件状态或临时 DOM 状态（例如：表单输入值）的列表渲染输出。
为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有唯一 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值（在这里使用简写）：
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
建议尽可能使用 v-for 来提供 key ，除非迭代 DOM 内容足够简单，或者你是故意要依赖于默认行为来获得性能提升。
因为它是 Vue 识别节点的一个通用机制， key 并不特别与 v-for 关联，key 还具有其他用途，我们将在后面的指南中看到其他用途。
```

- 事件处理器
```
有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：
<button v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```
- 事件修饰符
```
事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在 methods 中轻松实现这点，但更好的方式是：methods 只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题， Vue.js 为 v-on 提供了 事件修饰符。通过由点(.)表示的指令后缀来调用修饰符。
.stop
.prevent
.capture
.self
.once

<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>

```


- 按键修饰符
```
在监听键盘事件时，我们经常需要监测常见的键值。 Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
全部的按键别名：
.enter
.tab
.delete (捕获 “删除” 和 “退格” 键)
.esc
.space
.up
.down
.left
.right
可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

- 表单控件绑定
```
绑定value
对于单选按钮，勾选框及选择列表选项， v-model 绑定的 value 通常是静态字符串（对于勾选框是逻辑值）：
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">
<!-- 当选中时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 v-bind 实现，并且这个属性的值可以不是字符串。

复选框
    <input
    type="checkbox"
    v-model="toggle"
    v-bind:true-value="a"
    v-bind:false-value="b"
    >
    // 当选中时
    vm.toggle === vm.a
    // 当没有选中时
    vm.toggle === vm.b

单选按钮
    <input type="radio" v-model="pick" v-bind:value="a">
    // 当选中时
    vm.pick === vm.a

选择列表设置
    <select v-model="selected">
        <!-- 内联对象字面量 -->
    <option v-bind:value="{ number: 123 }">123</option>
    </select>
    // 当选中时
    typeof vm.selected // -> 'object'
    vm.selected.number // -> 123    
```

- 组件
   + 组件在注册之后，便可以在父实例的模块中以自定义元素 <my-component></my-component> 的形式使用。要确保在初始化根实例 之前 注册了组件：
   ```
   <div id="example">
    <my-component></my-component>
    </div>
    // 注册
    Vue.component('my-component', {
    template: '<div>A custom component!</div>'
    })
    // 创建根实例
    new Vue({
    el: '#example'
    })
    ---------------------
    渲染为：
    <div id="example">
    <div>A custom component!</div>
    </div>
   ```
   ```
   局部注册组件
   不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：
   var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
这种封装也适用于其它可注册的 Vue 功能，如指令。
   ```
组件 http://www.cnblogs.com/w-wanglei/p/5851629.html

深入响应式原理
我们已经涵盖了大部分的基础知识 - 现在是时候深入底层原理了！Vue 最显著的特性之一便是不太引人注意的响应式系统(reactivity system)。模型层(model)只是普通 JavaScript 对象，修改它则更新视图(view)。这会让状态管理变得非常简单且直观，不过理解它的工作原理以避免一些常见的问题也是很重要的。在本节中，我们将开始深入挖掘 Vue 响应式系统的底层细节。
如何追踪变化
把一个普通 Javascript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。
用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。这里需要注意的问题是浏览器控制台在打印数据对象时 getter/setter 的格式化并不同，所以你可能需要安装 vue-devtools 来获取更加友好的检查接口。
每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。
变化检测问题
受现代 Javascript 的限制（以及废弃 Object.observe），Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。例如：
```
var vm = new Vue({
  data:{
  a:1
  }
})
// `vm.a` 是响应的
vm.b = 2
// `vm.b` 是非响应的
Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
Vue.set(vm.someObject, 'b', 2)
您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：
this.$set(this.someObject,'b',2)
有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
也有一些数组相关的问题，之前已经在列表渲染中讲过。

```