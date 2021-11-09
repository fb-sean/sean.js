class main {

    // send booooooo
	static async boo(options = {}) {

        // Error handling!
		if (!options) throw new TypeError('sean.js Error: You didn\'t provide options!');
        if(options.emoji === true && options.caps === true) throw new TypeError('sean.js Error: You can\`t use Emojis and Caps twice!');
        if(options.emoji === true && options.fastboo === true) throw new TypeError('sean.js Error: You can\`t use Emojis and Fast Boo twice!');

        // define text   
        let text;


        // Create BOOO

        // default text
        text = `boo`

        // Edit BOOO

        if(options.caps === true) text = `BOO`

        if(options.fastboo === true) text = "_" + text + "_"

        if(options.emoji === true) text = `🅱️🅾🅾️`


		return text;
	}


    // get diffrent from 2 arrays
    static async diffrent(firstarray, lastarray) {

        // Error handling!
		if (!firstarray) throw new TypeError('sean.js Error: You didn\'t provide the first array!');
        if (!lastarray) throw new TypeError('sean.js Error: You didn\'t provide the last array!');

        // check if the array is a array
        if(!Array.isArray(firstarray)) throw new TypeError('sean.js Error: first array is not a array!');
        if(!Array.isArray(lastarray)) throw new TypeError('sean.js Error: last array is not a array!');


        // return the diffrents
	return firstarray.filter(i => {
        return lastarray.indexOf(i) < 0
    });
	}
}
module.exports = main;
