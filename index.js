const whois = require('whois-json')
const fs = require('node:fs').promises

const config = {
  topLevelDomain: 'fun', // 要查询的顶级域名
  batchSize: 8, // 每次查询域名的数量
  waitTimeMs: 300, // 每次查询的间隔时间(毫秒)
}
const domainAvailableListFile = `Available-Domains-${config.topLevelDomain}.txt`

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function checkDomain(domain) {
  try {
    const result = await whois(domain)
    if (result.theQueriedObjectDoesNotExist) {
      console.log(`${domain}是可注册的`)
      return domain
    } else {
      console.log(`${domain}不可注册`)
    }
  }
  catch (error) {
    console.error(`检查域名: ${domain}时出错，错误信息: ${error}`)
  }
  return null
}

async function writeDomainsToFile(domains, letter, previousLetter) {
  const content = domains.join('\n')
  if (content) {
    const prefix = previousLetter !== letter ? '\n' : ''
    await fs.appendFile(`${domainAvailableListFile}`, `${prefix + content}\n`, 'utf8')
  }
}

async function checkDomainsInBatches() {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97))
  let previousLetter = ''

  for (const letter of letters) {
    const domainPairs = letters.filter(l => l !== letter)
      .map(pairLetter => `${letter}${letter}${pairLetter}${pairLetter}.${config.topLevelDomain}`)

    for (let i = 0; i < domainPairs.length; i += config.batchSize) {
      const batchDomains = domainPairs.slice(i, i + config.batchSize)
      const batchPromises = batchDomains.map(domain => checkDomain(domain))

      const results = await Promise.allSettled(batchPromises)
      const availableDomains = results.map(result => result.value).filter(Boolean)

      await writeDomainsToFile(availableDomains, letter, previousLetter)
      previousLetter = letter

      if (i + config.batchSize < domainPairs.length) {
        await sleep(config.waitTimeMs)
      }
    }
    previousLetter = ''
  }
  return `任务结束，可以注册的域名写入在文件: ${domainAvailableListFile}`
}

checkDomainsInBatches().then((message) => {
  console.log(message)
}).catch((error) => {
  console.log('出现了错误:', error.message)
})
