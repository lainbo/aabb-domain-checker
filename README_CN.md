# aabb域名可用性检查器

## 概述
这个 Node.js 脚本可以批量检查指定顶级域名下，还未被注册且形如aabb格式的域名，比如`xxyy.com`, `ccdd.xyz`，并将可用的域名结果写入txt文件

## 配置
脚本可以通过 `config` 对象进行自定义，您可以设置：
- `batchSize`：一次查询的域名数量
- `topLevelDomain`：要查询的顶级域名(比如"com")
- `waitTimeMs`：查询之间的等待时间（毫秒）

## 输出
脚本将可用的域名输出到一个名为 `Available-Domains-<TLD>.txt` 的文本文件中

## 使用方法
1. `git clone`当前仓库
2. 使用 `pnpm install` 安装依赖
3. 在`config.js`文件开始位置的`config`对象中修改`topLevelDomain`属性，比如修改为`fun`，将查询所有形如"aabb.fun"
4. 使用 `node aabb.js` 或者 `node 111222.js`运行你想要检查的格式

**想要检查所有形如111222的com域名**
1. 在`/checker/check-111222.js`中将`topLevelDomain`的值改为`com`
2. 运行`pnpm run check-111222`

**想要检查自定义的格式域名**
1. 在checker文件夹中创建一个你自己的js文件
2. 写一个生成域名数组的函数，可以模仿`check-111222.js`，最终目的是给`checkDomains`函数传一个数组，数组中的每一项都是一个域名即可，比如`['aaa.com', 'bbb.com' ...]`
3. 然后直接运行你的js文件

在运行此脚本之前，请确保已设置 Node.js 环境
