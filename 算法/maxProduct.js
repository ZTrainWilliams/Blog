/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  const length = words.length;
  const masks = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    const word = words[i];
    const wordLength = word.length;
    for (let j = 0; j < wordLength; j++) {
      masks[i] |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
    }
  }
  console.log(masks)
  let maxProd = 0;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if ((masks[i] & masks[j]) === 0) {
        maxProd = Math.max(maxProd, words[i].length * words[j].length);
      }
    }
  }
  return maxProd;

  // let l = words.length
  // let nex = 0
  // for(let i = 0; i < l + 1; i++) {
  //   for(let j = i + 1; j < l; j++) {
  //     let abl = words[i].length *words[j].length
  //     if (abl > nex && getSameAB(words[i], words[j])) {
  //       nex = abl;
  //     }
  //   }
  // }
  // function getSameAB(a, b) {
  //   for(let i = 0; i < a.length; i++) {
  //     if(b.indexOf(a[i]) !== -1) {
  //       return false
  //     }
  //   }
  //   return true
  // }
  // return nex
};

console.log(maxProduct(["abcw","baz","foo","bar","fxyz","abcdef"]))
