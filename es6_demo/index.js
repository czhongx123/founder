//es6 新特性总结

//1.let,const 关键字

//2.箭头函数


//3.class类
class Animal{
    constructor(name){
        this.name=name
    }
    sayName(){
        console.log("My name is"+this.name)
    }
}

class Programmer extends Animal{
    constructor(name){
        super(name)
    }
    program(){
        console.log('aaaaa')
    }
}

var animal=new Animal('dummy');



//4.增强的对象字面量

var human={
    breathe(){
        console.log('11111111')
    }
}

var worker={
    __proto__:human,
    company:'haha',
    work(){
        console.log('ccc')
    }
}

human.breathe();


//5.字符串模板

var num=Math.random()
console.log(`yor num is ${num}`)


//6.解构赋值
var [name,,age]=['aa','bb','cc']

console.log(name,age)//aa cc

//常用来更换变量的值


//7.默认参数值
   
function sayHello(name){
    //传统的
    var a=name||'hh'
    console.log(a)
}

function sayHello2(name='dd'){
    console.log(name)
}
sayHello()
sayHello2()

//8.不定参数

    //将所有参数相加的函数
    function add(...x){
        return x.reduce((m,n)=>m+n);
    }
   //传递任意个数的参数
   console.log(add(1,2,3))//输出6 

//9.扩展参数
var people=['aa','bb','cc'];
function sayHello(p1,p2,p3){
    console.log(`hello $(p1),$(p2),$(p3)`)
}
sayHello(...people)


//10.Map,Set函数

//11.字符串函数扩展
    //includes()：返回布尔值，表示是否找到了参数字符串。
    //startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
    //endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

//12.Module
        //export  import

//13.指数运算符 **

    //2**3   //结果8
    //常见组合    var a**=3   同 a=a*a*a


//14.扩展运算符 ...
    //常用语数组的克隆
    var aa=[2,3]
    var bb=[... aa]
    bb[0]=1
    //bb为[1,3]

//15.includes()
    //方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似第二个参数表示搜索的起始位置，默认为 0


//16. Object.assign()
    //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
    //Object.assign 方法实行的是浅拷贝，而不是深拷贝。
//17.Promise 对象


//18.async 函数


//19.Object.keys(obj)   Object.values(obj)  Object.entries(obj)

    //var a={a:'aa',b:'bb'}
    //Object.keys(a)   //['a','b']
    //Object.values(a)   //['aa','bb']
    //Object.entries(a)   //[['a','aa'],['b','bb']]