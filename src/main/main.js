const Database = new Map;


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


    // cache Database start
    static getEntry(key) {
        // return if they send us no key
        if(!key) return new Error("sean.js | You need a valid key for this.");

        // get the database entry
        const entry = Database.get(key);
        
        // return if there is no entry
        if(!entry) return null;
        
        // send the database entry
        return entry;
    }

    // set a database entry
    static setEntry(key, object) {
        // return if they send us no key
        if(!key) return new Error("sean.js | You need a valid key for this.");
        
        // return if they dont give us a object
        if(!object) return new Error("sean.js | You didnt provide a database entry");

        // set the database object
        const entry = Database.set(key, object);

        // return if we can't set the Database entry
        if(!entry) return new Error("sean.js | Can't set this as entry");

        // return the object after no problems
        return object;
    }

    // delete database entry
    static deleteEntry(key) {
        // return if they send us no key
        if(!key) return new Error("sean.js | You need a valid key for this.");

        // set the database entry to null
        const deletedEntry = Database.set(key, null);

        return true;
    }
}
module.exports = main;
