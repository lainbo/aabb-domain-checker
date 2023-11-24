# aabb Domain Availability Checker
English | [简体中文](./README_CN.md)

## Overview
This Node.js script can batch check the unregistered domain names in aabb format under a given TLD, such as `xxyy.com`, `ccdd.xyz`, and write the results of the available domain names to a txt file.

## Configuration
The script can be customized through the config object. You can set:

- `batchSize`: The number of domain names to query at a time.
- `topLevelDomain`: The top-level domain you want to check (e.g., "com").
- `waitTimeMs`: The wait time between queries (milliseconds).

## Output
The script outputs the available domain names to a text file named `Available-Domains-<TLD>`.txt.

## How to Use
1. `git clone` current repo.
2. Install dependencies with `pnpm install`.
3. Modify the `topLevelDomain` property in the `config` object at the beginning of the `config.js` file, such as changing it to `fun`, to query all domains in the form of "aabb.fun".
4. Use `node aabb.js` or `node 111222.js` to run the format you want to inspect.

**Want to check all com domains that look like 111222**
1. change the value of `topLevelDomain` to `com` in `/checker/check-1112222.js`
2. run `pnpm run check-111222`

**Want to check for a customized format domain name**
1. create your own js file in the checker folder
2. Write a function that generates an array of domain names that mimics `check-111222.js`, with the end goal being to pass an array to the checkDomains function, where each item in the array is a domain name, e.g., `['aaa.com', 'bbb.com' ...]' `.
3. Then run your js file directly
Before running this script, make sure the Node.js environment is set up.
