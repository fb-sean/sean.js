class main {
	static async boo(options = {}) {
		if (!options) throw new TypeError('sean.js Error: You didn\'t provide options!');
        
        let text;

        if(options.caps === true) text = `BOO`

        if(options.fastboo === true) text = "_" + text + "_"

		return text;
	}
}
module.exports = main;
