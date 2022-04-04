const Database = new Map;
const { MessageButton, MessageActionRow, } = require("discord.js")

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
	};


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
	};


    // cache Database start
    static getEntry(key) {
        // return if they send us no key
        if(!key) throw new Error("sean.js | You need a valid key for this.");

        // get the database entry
        const entry = Database.get(key);
        
        // return if there is no entry
        if(!entry) return null;
        
        // send the database entry
        return entry;
    };

    // set a database entry
    static setEntry(key, object) {
        // return if they send us no key
        if(!key) throw new Error("sean.js | You need a valid key for this.");
        
        // return if they dont give us a object
        if(!object) throw new Error("sean.js | You didnt provide a database entry");

        // set the database object
        const entry = Database.set(key, object);

        // return if we can't set the Database entry
        if(!entry) throw new Error("sean.js | Can't set this as entry.");

        // return the object after no problems
        return object;
    };

    // delete database entry
    static deleteEntry(key) {
        // return if they send us no key
        if(!key) throw new Error("sean.js | You need a valid key for this.");

        // set the database entry to null
        const deletedEntry = Database.set(key, null);

        return true;
    };



    // cap some text
    static cap(text) {
        if(!text) throw new Error("sean.js | You need to give me a text for that.");
        text = text.replace(/\_/g, ' ');
        // split the provided text
        const split = text.trim().split(" ");

        // array for the return statement
        const splitFixed = [];


        // function to cap the text
        split.forEach((t) => {
            t = t.charAt(0).toUpperCase() + t.slice(1).toLocaleLowerCase();
            splitFixed.push(t);
        })

        if(splitFixed.length <= 0) throw new Error("sean.js | Your text is to short.")

        return splitFixed.join(' ');
    };


    // discord.js pageinator
    static async pages(client, interaction, pages, timeout = 1200000, otherButtons) {
        // return if no pages given
        if(!pages) throw new Error("sean.js | Pages are not given.")

        // return if no client is given
        if(!client?.user) throw new Error("sean.js | No client given.")

        // return if no interaction is given
        if(!interaction) throw new Error("sean.js | No interaction given.")




        const randomStringId = Math.random().toString(36).substring(2, 9);

        // return if the script can't create a random string
        if(!randomStringId) throw new Error("sean.js | Can't create a random String for the buttons")

        // first button row
        const ButtonRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`previousbtn_${randomStringId}`)
            .setLabel('Previous Page')
            .setStyle('SECONDARY'),

            new MessageButton()
            .setCustomId(`nextbtn_${randomStringId}`)
            .setLabel('Next Page')
            .setStyle('SECONDARY'),

            new MessageButton()
            .setCustomId(`stopinteraction_${randomStringId}`)
            .setLabel('End Interaction')
            .setStyle('SECONDARY'),
        )

        // disabled button row
        const disabledButtons = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`previousbtn_${randomStringId}`)
            .setLabel('Previous Page')
            .setStyle('SECONDARY')
            .setDisabled(true),

            new MessageButton()
            .setCustomId(`nextbtn_${randomStringId}`)
            .setLabel('Next Page')
            .setStyle('SECONDARY')
            .setDisabled(true),

            new MessageButton()
            .setCustomId(`stopinteraction_${randomStringId}`)
            .setLabel('End Interaction')
            .setStyle('SECONDARY')
            .setDisabled(true),
        )

        // set the current page to 0
        let currentPage = 0;

        // if the pager provided other buttons do this
        let otherButtonRow = null;
        if(otherButtons) {
            otherButtonRow = new MessageActionRow()
            .addComponents(
                otherButtons
            )
        }


        // get the components right
        let currentRow;
        if(otherButtonRow != null) {
            currentRow = [
                ButtonRow,
                otherButtonRow,
            ]
        } else {
            currentRow = [
                ButtonRow,
            ]
        }

        // do the same for the disabeld row
        let currentDisabaledRow;
        if(otherButtonRow != null) {
            currentDisabaledRow = [
                disabledButtons,
                otherButtonRow,
            ]
        } else {
            currentDisabaledRow = [
                disabledButtons,
            ]
        }
        

        // has the interaction already been deffered? if not defer the reply
        if(interaction.deferred == false) {
            await interaction.deferReply();
        }

        // send the current page
        const curPage = await interaction.editReply({
            embeds: [pages[currentPage]],
            components: currentRow,
            fetchReply: true,
        });

        // create the filter to collect the right collector
        const filter = (inter) => 
        inter.customId === `previousbtn_${randomStringId}` ||
        inter.customId === `nextbtn_${randomStringId}` || 
        inter.customid === `stopinteraction_${randomStringId}`;



        // create the collector
        const collector = await curPage.createMessageComponentCollector({
            filter,
            time: timeout,
        })


        // start the collector
        collector.on("collect", async (ButtonInteraction) => {
            // return if a other user try to use these buttons
            if(ButtonInteraction.user.id != interaction.user.id) return ButtonInteraction.reply({
                content: `❌ You can't use this button.`,
                ephemeral: true,
            })

            // switch statement for the buttons
            switch (ButtonInteraction.customId) {
                case `previousbtn_${randomStringId}`:
                    currentPage = currentPage > 0 ? --currentPage : pages.length - 1;
                    break;
                case `nextbtn_${randomStringId}`:
                    currentPage = currentPage+ 1 < pages.length ? ++currentPage : 0;
                    break;
                case `stopinteraction_${randomStringId}`:
                    collector.stop();
                    ButtonInteraction.deferUpdate();

                    return await interaction.editReply({
                        embeds: [pages[currentPage]],
                        components: currentDisabaledRow
                    })
            }
            
            // defet the reply and edit the page
            await ButtonInteraction.deferUpdate();
            await ButtonInteraction.editReply({
                embeds: [pages[currentPage]],
                components: currentRow,
            });

            // reset the timer for longer paging
            collector.resetTimer();
        });

        collector.on("end", (_, reason) => {
            if(curPage.deletable && reason != "messageDelete") {
                interaction.editReply({
                    embeds: [pages[currentPage]],
                    components: currentDisabaledRow,
                })
            }
        })

        return curPage;
    };



}
module.exports = main;
