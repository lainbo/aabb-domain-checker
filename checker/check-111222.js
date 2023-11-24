// 用于检查 111222.xyz 这种域名是否被注册
import { checkDomains } from '../utils/check.js';
function generateNumericDomainNames(tld) {
  let domains = [];
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const domain = `${i}${i}${j}${j}.${tld}`;
      domains.push(domain);
    }
  }

  return domains;
}

// 改为你想要的顶级域名↓
// Change to the top level domain you want
const topLevelDomain = 'xyz';
const domainsToCheck = generateNumericDomainNames(topLevelDomain);
checkDomains(domainsToCheck, topLevelDomain)
