var ccFrontTask2 = require('./CCFrontTask2.js'),
    readline     = require('readline-sync'),
    length       = readline.question("How many length of runic? "),
    word         = readline.question("Put runic word ");

try {
    console.log(ccFrontTask2.generateRunicWords(length));
    console.log(ccFrontTask2.checkRunicWord(word));
} catch (err) {
    console.log(err.message)
}