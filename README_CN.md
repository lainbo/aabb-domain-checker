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
3. 在`index.js`文件开始位置的`config`对象中修改`topLevelDomain`属性，比如修改为`fun`，将查询所有形如"aabb.fun"
4. 使用 `pnpm run start` 运行脚本

在运行此脚本之前，请确保已设置 Node.js 环境
