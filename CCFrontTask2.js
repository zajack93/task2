const runes = [
    {
        word: 'El',
        power: 28,
        cantLinkWith: 'Ort'
    }, {
        word: 'Eld',
        power: 33,
        cantLinkWith: 'Sure'
    }, {
        word: 'Tir',
        power: 9,
        cantLinkWith: 'Eth'
    }, {
        word: 'Nef',
        power: 7,
        cantLinkWith: 'Ist'
    }, {
        word: 'Eth',
        power: 31,
        cantLinkWith: 'Tir'
    }, {
        word: 'Ith',
        power: 22,
        cantLinkWith: 'Pul'
    }, {
        word: 'Tal',
        power: 8,
        cantLinkWith: 'Io'
    }, {
        word: 'Ral',
        power: 25,
        cantLinkWith: 'Um'
    },{
        word: 'Ort',
        power: 18,
        cantLinkWith: 'El'
    }, {
        word: 'Thul',
        power: 13,
        cantLinkWith: 'Sol'
    }, {
        word: 'Amn',
        power: 6,
        cantLinkWith: 'Fal'
    }, {
        word: 'Sol',
        power: 10,
        cantLinkWith: 'Thul'
    }, {
        word: 'Shael',
        power: 17,
        cantLinkWith: 'Lem'
    }, {
        word: 'Dol',
        power: 11,
        cantLinkWith: 'Hel'
    }, {
        word: 'Io',
        power: 20,
        cantLinkWith: 'Tal'
    }, {
        word: 'Lum',
        power: 32,
        cantLinkWith: 'Gul'
    }, {
        word: 'Ko',
        power: 27,
        cantLinkWith: 'Mal'
    },{
        word: 'Fal',
        power: 14,
        cantLinkWith: 'Amn'
    }, {
        word: 'Lem',
        power: 26,
        cantLinkWith: 'Shall'
    }, {
        word: 'Pul',
        power: 15,
        cantLinkWith: 'Ith'
    }, {
        word: 'Um',
        power: 16,
        cantLinkWith: 'Ral'
    }, {
        word: 'Mal',
        power: 21,
        cantLinkWith: 'Ko'
    }, {
        word: 'Ist',
        power: 4,
        cantLinkWith: 'Nef'
    }, {
        word: 'Gul',
        power: 23,
        cantLinkWith: 'Lum'
    }, {
        word: 'Vex',
        power: 24,
        cantLinkWith: 'Ohm'
    },{
        word: 'Ohm',
        power: 1,
        cantLinkWith: 'Vex'
    }, {
        word: 'Lo',
        power: 2,
        cantLinkWith: 'Cham'
    }, {
        word: 'Sur',
        power: 30,
        cantLinkWith: 'Eld'
    }, {
        word: 'Ber',
        power: 3,
        cantLinkWith: null
    }, {
        word: 'Jah',
        power: 5,
        cantLinkWith: 'Zod'
    }, {
        word: 'Cham',
        power: 29,
        cantLinkWith: 'Lo'
    }, {
        word: 'Zod',
        power: 19,
        cantLinkWith: 'Jah'
    }
];
// check if new runic not exists already in output
function isRunicUnique(output, runic) {
    var newRunicWords=runic.word.split('-');

    // check if not empty
    if (output.length > 0) {
        for (result of output) {
            var words = result.word.split('-'),
            count = 0;
            // check row by row
            for (rune of words) {
                for (newRune of newRunicWords) {
                    // if found the same
                    if(rune == newRune) {
                        ++count;
                    }

                    // if found the same number of item
                    if (count == words.length) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}


exports.generateRunicWords = length => {
    // check if parameter is higher than zero
    if (parseInt(length) <= 0) {
        return 'Parameter must by higher than zero!';
    }

    var limit = 10, // global limit
        output = [],
        // sort arr by power desc
        sortedRunes = runes.sort(function(a, b) {
            if(a.power > b.power) return -1;
            if(a.power < b.power) return 1;
            return 0;
        });

    for (var j=0; j<sortedRunes.length;j++) {
        var power    = sortedRunes[j].power,
            word     = sortedRunes[j].word,
            lastLink = '',
            n = 1;


        for (var k=0; k<sortedRunes.length; k++) {
            var words = word.split('-');
            // check rune can be linked to another
            if ((words.length < length)
                && (j!=k)
                && lastLink != sortedRunes[k].cantLinkWith) {
                word  += '-' + sortedRunes[k].word;
                power += sortedRunes[k].power;
                n++;
            }

            lastLink = sortedRunes[k].cantLinkWith;
        }

        runic = {
            'word': word,
            'power': (power-n)
        };

        if (n==length && isRunicUnique(output, runic)) {
            // sort words by most powerful
            words = runic.word.split('-');
            words.sort(function(a, b) {
                var powerA, powerB = 0;
                for (rune of sortedRunes) {
                    if (rune.word == a) powerA = rune.power;
                    if (rune.word == b) powerB = rune.power;
                    if (powerA>0 && powerB>0) break;
                }
                return (powerA < powerB);
            });
            runic.word = words.join('-');
            output.push(runic);
            // if global limit is reached return output
            if (output.length == limit) {
                return output;
            }
        }
    }

    return output;
};

exports.checkRunicWord = runicWord => {
    // check if parameter is not empty
    if (!runicWord.length) {
        return 'Input cannot be empty!';
    }

    var arr = runicWord.split('-'), // split runicWord to array by -
        power = n = 0,
        lastLink = '';

    // check duplicates
    if (arr.length != Array.from(new Set(arr)).length) {
        return 'Please remove duplicates!';
    }

    for (var i=0; i<arr.length; i++) {
        // rune was not found
        if (i>n) {
            return('Invalid runic word');
        }

        for(rune of runes) {
           // check rune can be linked to another
           if (rune.word == arr[i]) {
               if (lastLink == rune.cantLinkWith) {
                   throw new Error('Wrong rune link');
               }
               power += rune.power;
               n++;
               break;
           }
        }

        lastLink = arr[i];
    }

    return (power-n);
};