class Tweet {
	/**
	 * Constructs the tweet
	 * @param {int} id or NOID
	 * @param {string} date 
	 * @param {string} text 
	 * @param {string} type either SCHEDULE or DRAFT
	 */
	constructor({ _id, date, text, type, hash }) {
		this._id = _id || TYPE.NOID;
		this.date = (date == TYPE.UNDATED) ? TYPE.UNDATED : new Date(date);
		this.text = text || '';
		this.type = type || TYPE.DRAFT;
		this.hash = hash || '';

		this.set();
	}

	set() {
		this.setText();
		this.setDate();
	}

	/**
	 * Sets the tweet date
	 */
	setDate() {
		if (this.date === TYPE.UNDATED) {
			this.displayDate = 'Draft';
			return;
		}
		this.displayTime = this.date.toLocaleTimeString().replace(':00 ', ' ');
		this.locDate = new Date(this.date.toLocaleDateString());
		this.displayDate = '' + this.locDate.getDate() + ' ' + MONTHS[this.locDate.getMonth()];
	}

	/**
	 * 
	 */
	toJSON({ action, includeDate }) {
		return {
			action,
			text: this.text,
			_id: this._id,
			date: (includeDate) ? this.date : TYPE.UNDATED,
			type: this.type
		};
	}

	/** 
	 * Sets the text of the tweet to be html ready
	 */
	setText() {
		this.displayText = this.text.replace(/\n/g, '<br />');
		this.displayText = this.displayText.replace(/[@#][a-zA-Z0-9]+/g, '<span class="b">$&</span>');
	}

	/**
	 * Checks to see if string constains linkable content
	 * @param {string} str 
	 * @returns true when data has anything linkable
	 */
	hasLink(str) {
		const regex = /\S*[\#|\@](?:\[[^\]]+\]|\S+)/gim;
		let m;

		if ((m = regex.exec(str)) !== null) {
			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
				str.replace(match, `<a class='linkable'>${match}</a>`)
				console.log(`Found match, group ${groupIndex}: ${match}`);
			});
		}
		return str;
	}

	/**
	 * Determines if a string contains emoji
	 * @method hasEmoji
	 * @param {string} str 
	 * @returns true when the string has an emoji
	 */
	hasEmoji() {
		const regex = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
		let m;

		if ((m = regex.exec(this.text)) !== null) {
			// The result can be accessed through the `m`-variable.
			m.forEach((match, groupIndex) => {
				console.log(`Found match, group ${groupIndex}: ${match}`);
			});
			return true;
		}
		return false;
	}
};
