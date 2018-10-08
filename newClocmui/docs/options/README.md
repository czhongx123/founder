# 模块配置

模块所有可配置项通过`/src/config.js`文件进行配置。

## 基本信息

模块基本信息，用来描述和区分一个模块。

### name

类型：`String`

vue 远程模块的名称，一般在根据产品原型拆分模块的时候和主框架约定好。

模块名称遵从 npm 包命名规范，单词小写，多单词使用`-`连接。

模块名称会在必要的地方有隔离命名空间的作用，比如：

- css 样式

- store 的模块名称

- 嵌套路由的 pathname。

### version

类型：`String`

vue 远程模块的版本号，版本号命名应遵从[语义化版本规范](https://semver.org/lang/zh-CN/)。模块版本提供了和主框架之间版本探查的能力，以应对主框架亦或是模块进行破坏性升级的情况。

### author

类型：`name <email>`

vue 远程模块作者。作者信息通常情况下没有实质性用途，未来在主框架支持模块插拔管理时可以看到模块列表及作者信息。

## 模块外部依赖

> 曾经考虑过远程模块把依赖一并打包。通过网络请求到本地之后再由主框架判断是否需要加载，实际上那些不需要加载的模块就白白浪费了网络资源。而且当模块依赖过多时，对带宽及网速有更高的要求，也不符合打包 lib 依赖外置的主流做法，所以此作法废弃。

### externals

类型：`Object`

现在的方案是我们需要指定一个外部依赖清单，凭借这个清单，webpack 会使用[externals](https://www.webpackjs.com/configuration/externals/)配置，打包后会把这些库排除在外，大大减小了我们打出包的体积。

外部依赖通过`/src/externals.js`文件进行配置，并导入`/src/config.js`文件。

```javascript
// 配置外部依赖库名称（key）和使用时的别名（value）
module.exports = {
  jquery: '$',
  axios: 'axios'
}
```
为什么要单独一个文件？

> 因为`/src/externals.js`文件除了导入`/src/config.js`文件使用外，还需要导入`vue.config.js`使用，而这时代码运行在nodejs环境中，模块的导入导出使用commonjs方式。如果我们之间把外部依赖配置在`/src/config.js`文件中，通过ES Module方式导出，则无法导入`vue.config.js`文件。

## 环境变量

类型：`Object`
环境变量记录着整个模块用到的各种依环境不同而不同的常量。在项目任意地方导入后可以直接使用常量，避免了手动或通过 CI 另外配置替换环境变量的麻烦事儿。

```javascript
// 配置模块中所使用的常量
const env = {
  development: {
    API_BASE: 'http://localhost:8080'
  },
  production: {
    API_BASE: 'http://qingjin.me'
  }
}
```

使用：

```javascript
import { env } from '@/config'
axios.get(env.API_BASE + '/something')
```

希望根据不同运行环境进行切换的变量一定要拥有相同的`key`值。
