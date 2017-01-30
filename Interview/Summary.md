## 
- stackoverflow 答案
- 字符串匹配相等 / 回文 
```
解法1：
function strEqual1(str1,str2){
    return str1 === str2.split('').reverse().join('');
}
解法2：
function strEqual2(str1,str2){
    let len1 = str1.length,
        len2 = str2.length;

    if (typeof str1 !== 'string' || typeof str2 !== 'string') return false;
	if (str1 === str2) return true;
	if (len1 !== len2) return false;
    for(let i = 0, j = len2 - 1;i < len1 - 1; i++,j-- ){
        if(str1[i] !== str2[j]){
            return false;
        }
    }
    return true;
}
```
- 当你输入一个网址的时候，实际会发生什么?
[英文地址](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)
[翻译地址](http://www.cnblogs.com/wenanry/archive/2010/02/25/1673368.html)
[stackoverflow](http://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser)
  + 第一步当然是输入网址
  + 第二步浏览器查找域名对于的IP地址
  + 第三步浏览器给web服务器发送一个HTTP请求
  + 第四步 facebook服务的永久重定向响应 服务器给浏览器响应一个301永久重定向响应，这样浏览器就会访问“http://www.facebook.com/” 而非“http://facebook.com/”。
  + 第五步浏览器跟踪重定向地址  现在，浏览器知道了“http://www.facebook.com/”才是要访问的正确地址，所以它会发送另一个获取请求
  + 第六步服务器"处理"请求 服务器接收到获取请求，然后处理并返回一个响应。
  + 第七步服务器发回一个HTML响应 报头中把Content-type设置为“text/html”。报头让浏览器将该响应内容以HTML形式呈现，而不是以文件形式下载它。浏览器会根据报头信息决定如何解释该响应，不过同时也会考虑像URL扩展内容等其他因素。
  + 第八步浏览器开始显示HTML 在浏览器没有完整接受全部HTML文档时，它就已经开始显示这个页面了：
  + 第九步浏览器发送获取嵌入在HTML中的对象
  + 第十步浏览器发送异步（AJAX）请求

- 什么是DOM  
    [Render](http://www.nowamagic.net/academy/detail/48110557)
    [Render](http://www.cnblogs.com/RachelChen/p/5456182.html)
    [cnblogs Render](http://www.cnblogs.com/luluping/archive/2013/04/05/3000460.html)
    简单来说，DOM是对HTML或者XML等文档的一种结构化表示方法，通过这种方式，用户可以通过提供标准的接口来访问HTML页面中
    的任何元素的相关属性，并可对DOM进行相应的添加、删除和更新操作等

    基于DOM树的一些可视（visual）的节点，WebKit来根据需要来创建相应的RenderObject节点，这些节点也构成了一颗树，称之为Render树。
    基于Render树，WebKit也会根据需要来为它们中的某些节点创建新的RenderLayer节点，从而形成一棵RenderLayer树。

    Render树和RenderLayer树是WebKit支持渲染所提供的基础但是却非常重要的设施。
    这是因为WebKit的布局计算依赖它们，浏览器的渲染和GPU硬件加速也都依赖于它们。幸运地是，得益于它们接口定义的灵活性，不同的浏览器可以很方便地来实现自己的渲染和加速机制。

    Render树和RenderLayer树是WebKit支持渲染所提供的基础但是却非常重要的设施。这是因为WebKit的布局计算
    依赖它们，浏览器的渲染和GPU硬件加速也都依赖于它们。幸运地是，得益于它们接口定义的灵活性，不同的浏览器可以很方便地来实现自己的渲染和加速机制。

    Render树是基于DOM树建立起来的一颗新的树， 是布局和渲染等机制的基础设施。 Render树节点和DOM树节点
    不是一一对应关系，那么哪些情况下需要建立新的Render节点呢？
      DOM树的document节点；
      DOM树中的可视化节点，例如HTML，BODY，DIV等，非可视化节点不会建立Render树节点，例如HEAD，META，SCRIPT等；
      某些情况下需要建立匿名的Render节点，该节点不对应于DOM树中的任何节点；   
      RenderObject对象在DOM树创建的同时也会被创建，当然，如果DOM中有动态加入元素时，也可能会相应地创建RenderObject对象。下图示例的是RenderObject对象被创建的函数调用过程。
      Render树建立之后，布局运算会计算出相关的属性，这其中有位置，大小，是否浮动等。有了这些信息之后，渲染引擎才只知道在何处以及如何画这些元素。

    记住"visibility:hidden"和"display：none"之间的不同，“visibility:hidden”将元素设置为不可见，但是同样在布局上占领一定空间（例如，它会被渲染成为空盒子），但是“display:none”的元素是将节点从整个render tree中移除，所以不是布局中的一部分 。 

    渲染引擎首先解析HTML文档，转换为一棵DOM树，此为第一步。接下来不管是内联式，外联式还是嵌入式引入的CSS样式也会被解析，渲染出另外一棵用于渲染DOM树的树-渲染树(render tree) ，渲染树包含带有颜色，尺寸等显示属性的矩形，这些矩形的顺序与显示顺序一致。然后就是对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置。最后就是遍历渲染树并用上一章提到的ＵＩ后端层将每一个节点绘制出来。
- 一道简单面试题
```
//函数声明
function Foo() {
    //前面没有var let const 所以这个是全局的
    getName = function () { 
    	console.log('1');
    };
    return this;
}
//函数添加getName属性 ，类型是Function
Foo.getName = function () {
	console.log('2');
};
//函数原型添加方法
Foo.prototype.getName = function () { 
	console.log('3');
};
var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}

Foo.getName();     2
getName();	       4
Foo().getName();   //括号和点 优先级一样 从左向右执行  1
getName();         1
new Foo.getName();  // .操作符要比new优先级要高 new (Foo.getName)() 2
<!--带参数的new操作符是优先级最高的
按照(new Foo()).getName();来执行，情况就很简单了，
(new Foo())返回了新生成的对象，该对象没有getName()方法，
所以在prototype中找到了getName()方法
-->
<!--new Foo().getName();    3
首先带参数的new操作符优先级最高，第一步划分为：
new (new Foo().getName)();
第二步划分为：
new ((new Foo()).getName)();
所以执行(new Foo()).getName这个函数是对应的Foo.prototype.getName,
所以执行new (Foo.prototype.getName)()-->

new new Foo().getName();3		
请问上述代码在浏览器环境下，输出结果是多少？
　　 揭晓一下最终答案:

2 4 1 1 2 3 3
```

讲解:
```
　首先必须注意一个问题

function Foo() {
    getName = function () { 
    	console.log('1');
    };
    return this;
}
在函数内部声明的getName变量，前面是不带有var、let,const的，所以其实根据LHS(这个的介绍可以去的我博客看一下关于LHS和RHS的总结)，声明的getName是在全局范围内(也是就window)。
　　其次需要明确你是否知道下面代码在浏览器中的执行结果：

var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}
getName();
上述代码的执行结果是:4。原因是这样的，var声明的变量和函数声明function都会被提升，但是函数声明的提升的级别是比
var要高的，所以上面的代码的实际执行结果是：

function getName() { 
	console.log(5);
}
var getName = function () { 
	console.log('4');
};
getName();
后一个函数表达式getName覆盖了前面的函数声明getName,实际执行的是函数表达式（也就是是为什么JavaScript永远不会有函数重载这么一说了），所以输出的是4。
　　首先我给下面的代码添加一下必要的注释：

//函数声明
function Foo() {
    //全局变量
    getName = function () { 
    	console.log('1');
    };
    return this;
}
//为函数添加属性getName,其类型是Function，所以这里也可以看出来，Function也是一种Object
Foo.getName = function () {
	console.log('2');
};
//为Foo的原型添加方法getName
Foo.prototype.getName = function () { 
	console.log('3');
};
var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}
下面执行第一条语句：

Foo.getName();  
函数Foo本身并没有执行，执行的是函数的属性getName，当然输出的是：2.
　　接下来执行：

getName();	
这是在全局范围内执行了getName()，有两条对应的getName的声明，根据前面我们所提到的提升的级别来看实际执行是函数表达式：

var getName = function () { 
	console.log('4');
};
所以输出的是4。
　　接下来执行

Foo().getName(); 
首先看一下JavaScript的操作符优先级,从高到低排序
从上面可以看出来()与.优先级相同，所以Foo().getName()从左至右执行。首先运行Foo(),全局的getName被覆盖成输出console.log('1'),并且返回的this此时代表的是window。随后相当于执行的window.getName(),那么输出的实际就是1(被覆盖)。
　　下面到了

getName();  
这个不用说了，执行的还是：1(和上面一毛一样)。
　　下面到了三个最难的部分：

new Foo.getName();
对于这条语句的执行，有两种可能：

(new Foo).getName()
或

new (Foo.getName)()
但是我们根据操作符优先级表可以得知，其实上.操作符要比new优先级要高，所以实际执行的是第二种，所以是对

Foo.getName = function () {
	console.log('2');
};
函数执行了new操作，当然输出的是2。
下面到了执行

new Foo().getName();   
这个语句的可能性也有两种：

(new Foo()).getName();
或者

new (Foo().getName)();
那么应该是那种的呢？原来我以为会是第二种的执行方式，后面通过浏览器调试发现真实的执行的方式是第一种。我看到题目的作者是这么解释的：

 首先看运算符优先级括号高于new。实际执行为(new Foo()).getName()。遂先执行Foo函数。

我觉得上面的解释是有问题的，对比上面两种执行方式，第一种是先执行new，然后执行的是.操作符，然后执行的是()。第二种是先执行了(),再执行的是.，最后执行new操作符。如果真的按照引用所说的用优先级的方式判别，其实恰恰应该执行的是第二种而不是第一种。
　　后来总算找到原因了，原来之前那个出现的比较多的JavaScript优先级的表并不完整，万能的MDN给出了最权威的JavaScript优先级表运算符优先级
　　我列举出最重要的部分（由高到低）：
所以带参数的new操作符是优先级最高的，这下就没有问题了，执行顺序确实应该是第一种。
　　那么按照(new Foo()).getName();来执行，情况就就很简单了，(new Foo())返回了新生成的对象，该对象没有getName()方法，所以在prototype中找到了getName()方法。所以输出的是3。
　　胜利就在眼前，我们看一下最后一问。

new new Foo().getName();		
和上一步一样的方法，我们按照优先级表给分析一下这个语句到底是怎么执行的。
　　首先带参数的new操作符优先级最高，第一步划分为：

new (new Foo().getName)();
第二步划分为：

new ((new Foo()).getName)();
所以执行(new Foo()).getName这个函数是对应的Foo.prototype.getName,所以执行new (Foo.prototype.getName)()肯定输出的是3。
```
- 关于apply的错误分析 调用层数太多 Uncaught RangeError: Maximum call stack size exceeded
```
执行一下代码块,可能出现的问题：
var a=[]; var b=new Array(12562214);
a.push.apply(a,b)  --- 建议使用concat会好点
或者下面这个
(function a() {
    a();
})();
fix as below:
(function a(x) {
    // The following condition 
    // is the base case.
    if ( ! x) {
        return;
    }
    a(--x);
})(10)
```

- 题目1
```
数组

a = [
{id: 10001, name: "Lisa", age: 16},
{id: 10002, name: "Bob", age: 22},
{id: 10003, name: "Alice", age: 20},
];
数组

b = [
{id: 10001, gender: "Female"},
{id: 10002, name: "Bob King", birthday: "1996-01-22"},
{id: 10005, name: "Tom", birthday: "2000-01-01"},
];
写一个函数按id用b更新a,期望得到的结果为：

[
{id: 10001, name: "Lisa", age: 16, gender: "Female"},
{id: 10002, name: "Bob King", birthday: "1996-01-22", age: 22},
{id: 10003, name: "Alice", age: 20},
{id: 10005, name: "Tom", birthday: "2000-01-01"},
]
```
```
const map = a.reduce((acc, curr, index) => {
  acc[curr.id] = index;
  return acc;
}, {});
// 返回的acc 如下内容： 
<!-- 箭头函数
10001:0
10002:1
10003:2
-->
b.forEach(o => {
  const index = map[o.id];

  if (index !== undefined) {
    a[index] = Object.assign(a[index], o);
  }
  else {
    a.push(o);
  }
});
```

- 题目2 
```
接口数据：
{
 rows: [
  ["Lisa", 16, "Female", "2000-12-01"],
  ["Bob", 22, "Male", "1996-01-21"]
 ],
 metaData: [
  {name: "name", note: ''},
  {name: "age", note: ''},
  {name: "gender", note: ''},
  {name: "birthday", note: ''}
 ]
}

期待输出：
[
 {name: "Lisa", age: 16, gender: "Female", birthday: "2000-12-01"},
 {name: "Bob", age: 22, gender: "Male", birthday: "1996-01-21"},
]
```

```
解法：
//外循环走 各种数据
var result = data.rows.reduce(function(prev1, cur1) {
    //内循环走要出来的数据属性
    prev1.push(data.metaData.reduce(function(prev, cur, index) {
        prev[cur.name] = cur1[index];
        return prev;
    }, {}))
    return prev1;
}, []);

console.log(result);
console.log(result[0]);
console.log(result[1]);
```
- [严格和非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)
- ana.js / select.js
- Object Array 方法
- 继承
```
组合继承
var o1 = {num:123};
var o2 = {num2:345};
o2.extend = function(obj){
    for(var k in obj){
        this[k] = obj[k];
    }
}
o2.extend(o1);

原型继承
Fn.prototype.fn = function(){}
Fn.prototype = {
    constructor:Fn,
    fn:function(){}
}

组合式实现 原型继承 原型继承修改的是对象的原型对象 函数的原型属性
function Fn(){}
Fn.fn = Fn.prototype;
Fn.fn = function(obj){
    for(var k in obj){
        this[k] = obj[k]; //这里的this指的是Fn.prototype的
    }
}
Fn.fn.extend({});
```

- prototype + __proto__
```
// 相同点?
// 1, 这两个都是属性, 简单说就是存储引用的变量
// 2, 同一个构造函数, 与构造函数的实例对象. 这两个属性的引用对象是同一个对象

// 不同点?
// 1, 在不同的角度使用这两个属性
//		prototype 使用在构造函数后面
//		__proto__ 使用在对象后面
// 2, 描述也不相同
//		prototype 叫做	构造函数的原型属性
//		__proto__ 叫做	对象的原型对象
// 3, __proto__ 是非标准属性
//		所以我们在描述对象的时候是说 对象会连接到原型对象上

// 作用
// 在实现继承的时候, 一般都是使用 构造函数的 prototype 属性
// 在分析结构与验证对象等测试与调试中, 会用到 __proto__

obj.name--->当前对象找  当前对象没有去原型对象里面找
obj.__proto__.name 直接去原型对象里面去找

```

- 
```
Object 中的成员：
// Object 原型中的常用方法
propertyIsEnumerable
// -able	表示可能性的后缀
// enum		枚举, 一个一个的展示出来
// 属性是否可以枚举, 属性是否可以被 for-in 遍历到
// var o = {};
// in
// alert( 'hasOwnProperty' in o );  // o.hasOwnProperty
// for ( var k in o ) {
//	console.log( k );
// }
// 这个方法判断属性是否可以被枚举, 同时判断属性是否是自己提供的
// 因此该方法表示判断属性必须是 自己提供的, 同时可以被枚举的, 那么就返回 true, 否则返回 false
// 在 ES3 的基础上, 该方法没有任何意义, 是对 hsOwnProperty 的一个升级版
// 在 ES5 中引入了 对象特性( attribute )的概念, 才会使得该方法有点作用
// console.log( Object.prototype.toString.call( 1 ) );
// console.log( toLocaleString.call( 1 ) );
```
- 创建函数的方式
 + 声明式
 + 表达式
 + new function
```
// new Function 的语法规则
// 语法
// var 函数名 = new Function( arg1, arg2, arg3, ..., argN, body );
// 解释
// 	Function 构造函数所有的参数都是字符串类型的
//	除了最后一个参数, 所有的参数都作为生成函数的参数. 这里可以没有参数
//	最后一个参数也是字符串, 表示的是生成函数的函数体
举例：
<script id="engin">
			/*
			 
		 		var total = 0, 
					args = arguments, 
					len = args.length;
				for ( var i = 0; i < len; i++ ) {
					total += args[ i ];
				}
				return total;
		 	
		 	
		 	*/
		</script>
		<script>
		
			var getBody = function ( id ) {
				var script = document.getElementById( id );
				var body = script.innerHTML.replace('/*', '').replace('*/', '');
				script.parentNode.removeChild( script );
				return body;
			}
		
			
			onload = function () {
				
				
				var fnSum = new Function( getBody( 'engin' ) );
				
				var res = fnSum( 1, 2, 3 );
				
				alert( res );
				
			};			
		</script>    
 ```

 - 结论概念 
 ```
 函数的原型链：
// 总结一下基本结论
			// 1, 对象都有原型对象, 对象默认继承自原型对象
			// 2, 函数被定义后, 默认就有原型属性, 原型属性也是对象
			// 3, 函数的原型属性默认继承自 Object.prototype
			// 4, 原型对象中 constructor 指向对应的构造函数
			// 5, 所有的函数都是 Function 的实例
			// 6, 函数也是对象
			
			// 基本的概念
			// prototype 是函数的原型属性, 是该函数创建的对象的原型对象
			// __proto__ 是对象的原型对象, 是创建该对象的构造函数的 原型属性
			
			
			function Foo() {} 
			
			// Foo 有 prototype 属性
			// 讨论 __proto__
			// 函数 Foo 是 Function 的实例
			// 即 Function 是 Foo 的构造函数
			// 类比
			//	 Person		p
			// => p.__proto__ 就是 Person.prototype
			// => Person.prototype.__proto__ 就是 Object.prototype
			
			// 替换
			// => Foo.__proto__ 就是 Function.prototype
			// => Function.prototype.__proto__ 就是 Object.prototype
			
			
			// 原型对象就是构造函数的原型属性
			
			// 所以, Foo.__proto__ 就是 构造函数的原型属性, 即 Function.prototype
			
			// 默认函数的原型属性继承自 Object.prototype
			// Function 是函数, Function.prototype 是函数的原型属性
			// Function.prototype 继承自 Object.prototype
			
			
			// 这里与之前唯一不同的是将 函数当做对象来看
			
			
			
			// 根据结论: Function, 和 函数, 和 Function.prototype 之间的关系, 可以得到
			// Array 是 Function 的实例, 继承自 Fucntion.prototype
			// Date 是 Function 的实例, 继承自 Fucntion.prototype
			// Object 是 Function 的实例, 继承自 Fucntion.prototype
			// ...
			// Fucntion 是 Function 的实例, 继承自 Fucntion.prototype
			// 	结论 Function.__proto__ 就是 Function.prototype

 ```
 - 
 ```
 			// 疑点
			function Fn() {} 
			function Foo() {} 
			var o = new Fn(); 
			console.log(o instanceof Fn); 	//true 
			Fn.prototype = new Foo(); 
			Fn.prototype.constructor = Fn;
			console.log(o instanceof Fn); 	// false 
            // new Foo() 是否在o的原型链上
			console.log(o instanceof Foo);  // false 

            function Fn() {} 
			function Foo() {}
			var f = new Fn();
			// f -> Fn.prototype -> Object.prototype -> null
			// 覆盖
			var o;
			Fn.prototype = o = new Foo();
			var f = new Fn();
			// f -> o -> Foo.prototype -> Object.prototype -> null
 ```
 - 实例成员 和 静态成员
```
// 实例成员就是 由构造函数创建的对象的成员
// 静态成员就是 构造函数的成员

// 一般在使用的时候, 将通用的方法 由 静态成员提供, 实例成员如果要实现该功能, 调用静态成员来实现
 

 递归：
 // 获得 node 的子节点
		// 化归一下, 已经完成获得节点的子节点, 那么子节点的子节点也或得到, 如此下去就是所有的后代的节点
		var getChildren = function ( node, list ) {
			// 要将 node 中所有的子元素 放到 list 中( 只要元素 )
			for ( var i = 0; i < node.childNodes.length; i++ ) {   // 遍历node的子节点
				var subNode = node.childNodes[ i ];	// 就是子节点
				// 判断是否为 元素标签
				if ( subNode.nodeType === 1 ) {
					// 如果是元素节点就存到 list 中
					list.push( subNode );
					
					getChildren( subNode, list );
				}
			}
		}
		function find() {
			var arr = [];
			// 获得元素
			getChildren( document.body, arr );
			return arr;
		}
		
		var nodes = find();
		for (var i= 0; i < nodes.length; i++) {
			nodes[ i ].style.border = "3px solid red"; 
		}		
高级写法：
<script>
			
			var find = function ( node ) {
				
				var arr = [];
				for ( var i = 0; i < node.childNodes.length; i++ ) {
					if ( node.childNodes[ i ].nodeType === 1 ) {
						arr.push( node.childNodes[ i ] );
						
						// 获得子节点的子节点
						arr = arr.concat( find( node.childNodes[ i ] ) );
						
					}
				}
				
				return arr;
			}
			
			
			onload = function () {
				var nodes = find( document.body );
			
				for ( var i = 0; i < nodes.length; i++ ) {
					nodes[i].style.border = "2px solid black";
				}
				
			};
			
 			
		</script>
 ```

 - 词法作用域
```
// 词法作用域 解释
// 只和代码的书写，定义时的顺序有关，和运行时候的顺序无关
// 函数内部可访问外部的变量，反之则不允许
// 什么是变量名提升--》告诉解释器 已经定义变量了 这个变量可以用了
// 什么是函数名提升--》 告诉解释器 现在已经定义了一个函数了 现在马上就可以用了

变量作用域琏的绘制：
// 结论
    // 1, 声明会提升
    // 2, 只有函数才会限定作用域
// 规则
    // 1> 将全部的 script 标签看做一个整体. 是一个 0 级别的链
    // 		链中所有的全局范围内的变量, 函数, 对象... 都是链中的成员
    //		由于声明会提升, 因此在绘制链之前将代码可以进行调整, 在开始的时候
    //		将声明都写在前面, 绘图的时候按照顺序绘制, 较为简单.
    //
    // 2> 由于只有函数才可以限定作用域. 因此在函数上引出一条新链, 级别为 n + 1
    // 		在函数内部, 又是一个完整, 独立的作用域结构
    //		因此在函数内部定义的任何成员也按照 1> 中的规则在该链上展开
    //
    // 3> 如果有函数, 继续绘制下去 

// 变量搜索原则
// 在代码的运行过程中, 如果访问某一个变量
// 那么首先在当前链上找 ( 无序 ), 如果没有, 在 n-1 级上找
// ( 在函数内部允许访问定义在函数外部的变量 )
// 如此往复, 直到 0 级链, 如果还没有 抛出异常
// 如果找到, 则结束寻找, 直接获得该链上变量的数据
//这两句话
//    var getName = function(){ alert(4); }; 提升了名字
//    function getName(){ alert(5); }		 提升了函数

// 1, 函数覆盖名字
//var  getName;
//function getName() {}

// 2, 
//function getName() {}
//var getName; 这个声明无效了  假如有数值 那就是有效的 var getName = 7;

var f = function f() {}; 表达式
function f() {}  声明 这两个不是一回事
var a;   意思就是有一个a存在了 a是什么呢 现在不知道 下面凡是看到a的时候不报错
function a(){alert(2);}  这个两个a是一个东西  赋值不是一回事
	代表这是一个函数 下面在用a的时候调用这个函数 这两句代码是不执行的
	 这两个是不是一个东西 代表他们分配的内存是不是一样的
	 这两个东西在声明阶段不占内存 告诉我们的解释器 有这两个东西存在了--》编译原理
	 声明不占内存 执行的时候才会分配内存 

var a;
function a(){} 这个把第一个声明覆盖了	 
a = function(){} 同一个作用域 不允许有两个同名的但是不同的数据
var f = function f(){};  表达式
function f(){} 这两个不是一回事 声明

举例：
//		var a = 1;
//		   
//		function a(){
//			a = 1
//		}
//		a()
//		console.log(a)
分析：		
    var a;
    function a(){
        a = 1
    }
    
    a = 1;
    
    // a()  a is not a function
    console.log(a) -->1 
```

- 闭包
```
闭包:
// 在函数内部允许访问外部的变量, 但是反之不允许

// 什么是闭包
// 闭包从字面上看就是封闭和包裹, 在函数中定义的变量
// 在函数外部无法访问, 因此这个函数就构成闭包

// 要解决闭包的什么问题
// 就是要想办法访问到它的数据
// 闭包的应用有两个模型
	// 1, 实现私有数据
	// 2, 实现缓存数据
			var fib = (function () {
				var arr = [];
				return function ( n ) {
					// count++;
					// 面试求兔子数列, 要求使用 callee
					if ( n < 0 ) throw new Error( '数字不允许是负数' );
					
					var res = arr[ n ];   // 先到数组中取
					if ( res !== undefined ) {
						// 数组中有数据
						return res;
					} else {
						// 如果是 1 或 0 则将 1 返回给 res
						// 否则递归结果交给 res;
						
						if ( n === 0 || n === 1 ) {
							res =  1;
						} else {
							res = arguments.callee( n - 1 ) + 
									arguments.callee( n - 2 );
						}
						
						arr[ n ] = res;  // 将计算的结果放到数组中, 那么下一次再计算的
										 // 时候可以直接拿来用, 就不用计算量
						return res;
					}
				};
			})();
			
			fib( 5 );	
函数名存储数据：
		// createCache
			var fib = function ( n ) {
				var res = fib[ n ];   // 先到函数名中取
				if ( res !== undefined ) {
					// 函数中有数据
					return res;
				} else {
					// 如果是 1 或 0 则将 1 返回给 res
					// 否则递归结果交给 res;
					
					if ( n === 0 || n === 1 ) {
						res =  1;
					} else {
						res = arguments.callee( n - 1 ) + 
								arguments.callee( n - 2 );
					}
					
					fib[ n ] = res;  // 将计算的结果放到数组中, 那么下一次再计算的
									 // 时候可以直接拿来用, 就不用计算量
					fib.len++;
					
					return res;
				}
			};
			
			fib.len = 0;
			
			fib( 5 );
```
- 题目
```
// 1, 如何验证写在构造函数中的方法是都占内存的？  
			/*
			var fn = function () {
				this.sayHello = function () {};
			};
			var p1 = new fn();
			var p2 = new fn();
			console.log( p1.sayHello === p2.sayHello );
			*/

// 1, 创建对象的方法
			//	-> 1, 字面量 或  var o = {};
			//  -> 2, 构造函数 或 代码
			//  -> 3, Object.create()
			//  -> 4, copy
// 3, 给对象添加属性的办法
			// 1> 利用动态特性 o.xxx = xxx
			// 2> 构造函数中 this.xxx = xxx
			// 3> 原型中添加 xxx.prototype.xxx = xxx
			// 4> 字面量   
			// 5> extend  
			// 6> 关联数组 o[ 'xxx' ] = xxx

// 8, 如何兼容的获得对象的类型名
			/*
			var getType = function ( obj ) {
				if ( obj.constructor.name ) {
					return obj.constructor.name;
				} else {
					return /function (.+?)\(/.exec( obj.constructor + '' )[ 1 ];
				}
			}
			*/

// 10,如何判断属性或者方法是被继承的 而不是被自己实现的
			严谨的话 使用递归判断实现
			var Fn = function () { this.age = 1; };
			Fn.prototype.name = 'jim';
			// Fn.prototype.age = undefined;
			var f = new Fn();
			// hasOwnProperty
			// 如何判断属性是被继承的??? 
			f.hasOwnProperty('age') 只能说明这个属性或者方法是f提供的
			f.age 保证有这个属性
			console.log( f.age && !f.hasOwnProperty( 'age' ) );
			有age这个属性 并且不是自己提供的
			console.log( 'age' in f && !f.hasOwnProperty( 'age' ) );
			// age 可能存在原型链上, 也可能不存在
			
			// 如果属性值就是 null 或 undefined, 那么此时 f.age 就无法判断了

// 11,  如何将一个Json 字符串转为对象
		eval, new Function, JSON.parse, 基本的字符串操作

// 13 原型继承   --- 实现共用  但是会有很多层级 原型链太长 搜索时间也长
			  组合式继承 --- 
			// 1> 要求每一个对象都有 inherit, 给 Object.prototype 添加即可
			// 2> 继承自 p, 在方法中 p 用什么表示, 即 this
			// 3> 继承自参数 obj
			
			Object.prototype.inherit = function ( obj ) {
				var o = {};
				for ( var k in this ) {
					o[ k ] = this[ k ];
				}
				for ( var k in obj ) {
					o[ k ] = obj[ k ];
				}
				
				return o;
			};

// 14, 函数有方法, Function.prototype
			//	       返回的对象继承自 函数.prototype
			// 1> 题目中的做法
			/*
			Function.prototype.inherit = function () {
				return Object.create( this.prototype );
			};
			*/
			// 2> 原意
			/*
			Function.prototype.inherit = function ( obj ) {
				var o = Object.create( this.prototype );
				for ( var k in obj ) {
					o[ k ] = obj[ k ];
				}
				return o;
			};
			*/
			函数的原型属性利用 函数.prototype 来获得. 表示由该函数创建的对象继承自 该函数的 prototype
			
			函数的原型对象利用 函数.__proto__ 来获得, 或 Function.prototype 来获得. 表示 该函数 继承自
				Function.prototype 或 函数.__proto__			

// 1, 定义函数, 函数有一个属性叫 prototype
			// 2, 函数的属性 prototype 是一个对象类型
			//    类似 var o = { name: {} };
			
			// 3, 属性 prototype 是一个含有 constructor 与 __proto__ 属性的对象
			//		这个对象就是 Person.prototype
			
			// 4, constructor 属性就是当前函数
			Person === Person.prototype.constructor (把Person.prototype看成一个整体)
			//	推论: 函数的 prototype 属性的 constructor 就是当前函数
			
			// 5, 所有的函数的 prototype 属性所表示的对象都继承自 Object.prototype
			//	即: 函数.prototype.__proto__ 就是 Object.prototype
			有一个例外---Object.						prototype.__proto__ === Object.prototype ---> false
					     Array.prototype.__proto__ === Object.prototype  ---> true				
```

- 原型相关
```
原型链的习题：
			// 1,
			// 原型继承: 每一个对象都可以找到一条由对象构成的, 一直到 Object.prototype 的链式结构
			// 			每一个在链上的对象所提供的方法或属性, 当前对象都可以访问. 这个就是原型继承.
			//			
			//			所以原型继承就是修改原型链上的对象, 以使得当前对象具有某个属性或方法
			
			// 2, 
			// 优点: 共享方法与节约内存
			// 缺点: 增加链式搜索的负担

深拷贝
var copy = function(o1,o2){
	for(var k in o2){
		if(typeof(o2[k]) === 'object'){
			o1[k] = {};
			copy(o1[k],o2[k]);
		} else {
			o1[k] = o2[k];
		}
	}
}			

var deepClone = function(obj){
	var o = {};
	copy(o,obj);
	return o;
}
```
- 函数调用模式
```
function foo() {
	console.log( this );
}

foo();							// 函数模式   --window
var o = {fn:foo, name:'xp'};	
o.fn();							// 方法模式   -- Object {name:'xp'} 当前调用方法的对象	
new foo();						// 构造器模式 -- foo 指的就是foo的对象 构造器模式 this 就是 new 出来的新的对象

//[].push.apply(divs,ps);  这个意思是把ps里面的每一个元素 当做一个个元素
						放到divs里面 ，把divs当做数组来调用 push方法
						这个push是借过来用的 数据全放在divs里面了 因为数据是可读的
						所以不可以使用push 可以使用concat
concat 代表把数组连起来 不能是伪数组 所以变成真数组 contact 返回的是新数组
push 返回的数组长度


简单分析：
	/*
			var a = 2;
			var o = {a: 3, foo: foo};
			var p = {a: 4};
			
			o.foo();  // 3
			
			(p.foo = o.foo)();   // 2  赋值运算符 a=b=c=1 
			记住 --》 取得是右边的值  赋值操作的时候 和对象无关 
			// 编译原理 相当于吧o.foo里面存的那个函数赋给了p.foo
			所以可以理解为foo = o.foo 取出来的是函数
			// 词法分析以后, 留下来的不是 o.foo 而是 o.foo 里面存储的值
			里面存的就是一个函数
			function foo() {
			    console.log(this.a);
			}
						
			(p.foo)();			// 4
			p.foo();			// 4
		*/
		
			var o = { num: 123, fn: function() { alert( this.num ); } };
			var num = 456;
			var foo = o.fn;  o.fn赋值给变量foo， 如果这个变量接收的是函数的话 此时
								是把里面存的值取出来赋值
								o不参与赋值 通过o找到里面的fn 赋给foo
								fn指向了一个函数  将函数赋给了foo
								foo 就是函数本身 foo调用的时候本身没有任何对象
								函数调用模式 this就代表全局window  
			
			foo();  //456 
		</script>

object.getName();
(object.getName)();
(object.getName = object.getName)(); //The window 非严格模式下
这个赋值表达式的值是函数本身 所以this的值不能得到维持 结果就返回了the window

// 要求写一个方法, 让多个对象来调用
			
			// 1, 简单的实现
			/*
			function Foo1 () {
				console.log( 'Foo1 被调用了' );
			}
			// 函数模式
			Foo1();
			// 方法
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			Foo1.apply( o1 );
			Foo1.apply( o2 );
			*/
			
			// 2, 传参
			/*
			function Foo2 ( a, b, c ) {
				console.log( 'Foo2 被调用了, 参数是 ' + a + ", " + b + ", " + c );
			}
			// 函数式
			Foo2(1, 2, 3);
			// 方法模式
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			Foo2.apply( o1, [ 1, 2, 3 ] );
			Foo2.apply( o2, [ 1, 2, 3 ] );
			*/
			
			
			// 3, 加入 this
			/*
			function Foo3() {
				console.log( this );
			}
			// 函数模式
			Foo3();	// window
			// 方法模式
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			Foo3.apply( o1 ); 
			Foo3.apply( o2 );
			*/
			
			
			// 4, 加入 this, 和 参数
			/*
			function Foo4( a, b, c ) {
				console.log( this );
				console.log( [].join.apply( arguments, [', ']) );
				//arguments伪数组 apply调用apply 需要使用数组作为参数
				//元素连接 形成字符串 arguments 连接起来  用逗号分隔
 			}
			// 函数
			Foo4( 1, 2, 3 ) ;  object window  -- 1,2,3
			// 方法 
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			
			Foo4.apply( o1, [ 1, 2, 3, 4 ]);  object{name:'jim'}  1,2,3,4
			
			Foo4.apply( o2, [ 1, 2, 3, 4 ]);
```
- 正则
```
//	     0123456789012345678901
var s = "abcdefgefgefghijefglmn";
var i = -1, arr = [];
do {
	i = s.indexOf( 'e', i + 1);
	if ( i != -1 ) {
		arr.push( i );
	}
} while ( i != -1 );

//	     0123456789012345678901
var s = "abcdefgefgefghijefglmn";
var r = new RegExp( "e", "g" ); 如果把一个字符串所以字符找出来
							第二个参数需要是'g'
							有了g代表从刚刚找过的下一个元素开始找
var arr = [];
var m;
// 在 exec 的方法中有一个规定, 如果同一个正则表达式对象 如果开启了全局模式
// 每调用一次 exec 方法就会查找下一个字符串, 直到最后找不到 返回 null
while ( ( m = r.exec( s ) ) != null ) {
	arr.push( m.index );
}

```