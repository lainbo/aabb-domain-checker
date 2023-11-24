// 用于检查 aabb.fun 这种域名是否被注册
import { checkDomains } from '../utils/check.js';
function generateDomainNames(tld) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return letters.flatMap(letter => 
    letters.filter(l => l !== letter)
      .map(pairLetter => `${letter}${letter}${pairLetter}${pairLetter}.${tld}`)
  );
}

// 改为你想要的顶级域名↓
// Change to the top level domain you want
const topLevelDomain = 'fun';
const domainsToCheck = generateDomainNames(topLevelDomain);
checkDomains(domainsToCheck, topLevelDomain).then(() => {
  console.log('所有域名检查完成');
});
