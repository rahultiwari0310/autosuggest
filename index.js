const inputField = document.getElementById('suggest')
let value = ''
let suggestionsHTML = document.getElementById('suggestions')
const app = document.getElementById('app')
suggestionsHTML.addEventListener('click', e => {
    inputField.value = e.target.id + ' '
    inputField.focus()
    suggestionsHTML.innerHTML = ''

})
inputField.addEventListener('input', e=> {
    value = e.target.value

    getSuggestions(value).then(res => {
        
        suggestionsHTML.innerHTML = generateListOptions(res)
    })
    .catch(err => {
        console.log(err)
    })
})

function generateListOptions(list) {
    return list.map(it => {
        return `<li id='${it}'>${it}</li>`
    }).join('')
}
// inputField.addEventListener('blur', e=> {
//     suggestionsHTML.innerHTML = ''
// })

document.addEventListener('click', e => {
    if(!app.contains(e.target)) {
        suggestionsHTML.innerHTML = ''
    }
})

// ================================= Mock Server Start =============================
var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 200;

function getRandomBool(n) {
  var maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

function getSuggestions(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}
// ================================= Mock Server End =============================