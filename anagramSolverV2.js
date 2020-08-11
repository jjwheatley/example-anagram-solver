'use strict';

function AnagramSolver() {

    this.checkTextForAnagrams = async function(text, type) {
        let string = text.toLowerCase();
        let anagrams = [];
        let wordList = [];
        await $.getJSON("wordlists/WebstersEnglishDictionary/dictionary.json", function(jsonDictionary) {
            //Build Dictionary Array
            for (let word in jsonDictionary) {
                wordList.push(word);
            }
            if(string.length != 9){
                type = 'solutionMultistring';
            }
            switch(type) {
                case 'solutionCountdown':
                    anagrams = solutionCountdown(string, wordList, jsonDictionary);
                  break;
                case 'solutionMultistring':
                default:
                    anagrams = solutionMultistring(string, wordList, jsonDictionary);
                  break;
              }
        });
        console.table(anagrams);
        return anagrams;
    }

    function solutionCountdown(text, wordList, dictionary){
        let results = [];
        let string = [text];
        let solvedStrings = checkStringsAgainstWordList(string, wordList);
        if(getObjectSize(solvedStrings) == string.length){
            results = formatResults(solvedStrings, dictionary)
        }
        return results;
    }

    function solutionMultistring(text, wordList, dictionary){
        let results = [];
        let string = text.replace(/\s+/g, '');
        let loopLimit = 20;
        let strings = [];
        let solvedStrings = [];
        for(let i = 1; i < loopLimit; i++) {
            string = scrambleString(string);
            strings = splitStringIntoUsableLengths(string);
            solvedStrings = checkStringsAgainstWordList(strings, wordList);
            if(getObjectSize(solvedStrings) == strings.length){
                results = formatResults(solvedStrings, dictionary)

            }
        }
        return results;
    }

    function formatResults(solutions, dictionary){
        for (let key in solutions) {
            for(let solution of solutions[key]){
                solutions[key] = solution + ': ' + dictionary[solution];
            }
        }
        return solutions;

    }

    function checkStringsAgainstWordList(strings, wordList){
        
        let permutations = [];
        let results = [];
        for(let s of strings){
            let substringResults = [];
            permutations = findPermutations(s)
            for(let p of permutations){
                if(p =='silent'){
                    // console.log(wordList.includes(p));
                }
                if(wordList.includes(p) == true){
                    substringResults.push(p);
                }
            }
            if(substringResults.length > 0){
                results[s] = substringResults;
            }
        }
        return results;

    }

    function scrambleString(string) {
        var a = string.split(""),
            n = a.length;
    
        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    function splitStringIntoUsableLengths(string){
        let arr = string.match(/.{1,6}/g);
        return arr;
    }

    function findPermutations(string){
        if (string.length < 2) return string; // This is our break condition
        
        var permutations = []; // This array will hold our permutations
        for (var i = 0; i < string.length; i++) {
            var char = string[i];
        
            // Cause we don't want any duplicates:
            if (string.indexOf(char) != i) // if char was used already
            continue; // skip it this time
        
            var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS
        
            for (var subPermutation of findPermutations(remainingString))
            permutations.push(char + subPermutation)
        }
        return permutations;
    }
    
    function getObjectSize(object) {
        let size = 0,
            key;
        for (key in object) {
            if (object.hasOwnProperty(key)) size++;
        }
        return size;
    }
}