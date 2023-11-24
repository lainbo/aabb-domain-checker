import whois from "whois-json";
import { promises as fs } from 'node:fs';
import config from '../config.js';
const domainAvailableListFile = `Available-Domains-$1.txt`

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

async function writeDomainsToFile(domains, fileNameSuffix = '') {
  const content = domains.join('\n');
  if (content) {
    await fs.appendFile(domainAvailableListFile.replace('$1',fileNameSuffix), `${content}\n`, 'utf8');
  }
}

export async function checkDomains(domains, topLevelDomain) {
  let allAvailableDomains = [];

  for (let i = 0; i < domains.length; i += config.batchSize) {
    const batchDomains = domains.slice(i, i + config.batchSize);
    const batchPromises = batchDomains.map(domain => checkDomain(domain));

    const results = await Promise.allSettled(batchPromises);
    const availableDomains = results.map(result => result.value).filter(Boolean);
    allAvailableDomains = allAvailableDomains.concat(availableDomains);

    await sleep(config.waitTimeMs); // 使用 sleep 函数以避免过快的请求
  }

  if (allAvailableDomains.length > 0) {
    await writeDomainsToFile(allAvailableDomains, topLevelDomain);
  }
}


