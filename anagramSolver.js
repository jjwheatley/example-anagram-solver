'use strict';

function AnagramSolver () {

    this.checkTextForAnagrams = function(text) {
        let anagrams = [];
        let wordList = ['list', 'no', 'time'];

        for (let key in wordList) {
            let isAnagram = this.isWordWithinText(text, wordList[key]);
            if (isAnagram !== false) {
                anagrams.push(wordList[key]);
                text = isAnagram;
            }
        }
        return anagrams;
    }

    this.isWordWithinText = function(haystack, needle) {
        let haystackArray = this.getArrayFromString(haystack); //Make user input into an array. This is our haystack
        let needleArray = this.getArrayFromString(needle); // Make the dictionary word we're searching for into an array. This is our needle
        // console.log(needle);
        Object.keys(needleArray).forEach(function(key) {
            if (haystackArray[key]) {
                if (haystackArray[key] == needleArray[key]) {
                    delete haystackArray[key];
                    delete needleArray[key];
                } else if ((haystackArray[key] > needleArray[key])) {
                    haystackArray[key] = (haystackArray[key] - needleArray[key]);
                    delete needleArray[key];
                } else {
                    return false; //Haystack does not contain all the characters of our needle
                }
            }
        });
        if (this.getObjectSize(needleArray) > 0) {
            return false; //Not all characters in the needle were found and unset
        }
        let haystackLeftovers = this.getStringFromArray(haystackArray);
        return haystackLeftovers;
    }

    this.getArrayFromString = function(string) {
        let array = [];
        for (let i = 0; i < string.length; i++) {
            if (!(string.charAt(i) in array)) {
                array[string.charAt(i)] = 1;
            } else {
                array[string.charAt(i)] += 1;
            }
        }
        array = this.sortByKey(array);
        return array;
    }

    this.getObjectSize = function(object) {
        let size = 0,
            key;
        for (key in object) {
            if (object.hasOwnProperty(key)) size++;
        }
        return size;
    }

    this.getStringFromArray = function(array) {
        let string = '';
        Object.keys(array).sort().forEach(function(key) {
            for (let i = 0; i < array[key]; i++) {
                string = string + key;
            }
        });
        return string;
    }

    this.sortByKey = function(object) {
        const ordered = {};
        Object.keys(object).sort().forEach(function(key) {
            ordered[key] = object[key];
        });
        return ordered;
    }
}

