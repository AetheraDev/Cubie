let ai = require("./ai.js");

class Asx {
	constructor() {
		/**
		 * @type {require("./ai.js")}
		 */
		this.ai = ai;
	}

	/**
	 * @param {String} message - The message you want to send to the API
	 * @param {Array} ctx - The context array you can add to enhance the logic of the AI
	 * @param {String} lang - The language you want to use (see docs for available languages)
	 * @param {String} replacer - What you want to replace "cleverbot" with
	 */
	async getReply(message, ctx, lang, replacer) {

		if (typeof message !== "string")
			throw new TypeError("[AsXCore]: Erro na query.");

		if (message == null)
			throw new SyntaxError("[AsX]: Nenhum parametro inserido.");

		if (!Array.isArray(ctx))
			throw new TypeError("[AsX] Query parameter (Context) must be an array");
		
		if (typeof lang !== "string")
			throw new TypeError("[AsX: ERROR] Query parameter (language) must be a string");

		if (typeof replacer !== "string")
			throw new TypeError("[AsX: ERROR] Query parameter (Replacer) must be a string");

		return await this.ai(message, ctx, lang, replacer);
	}

	/**
	 * @param {String} message - The message you want to send to the API
	 * @param {Array} ctx - The context array you can add to enhance the logic of the AI
	 * @param {String} lang - The language you want to use (see docs for available languages)
	 * @param {String} replacer - What you want to replace "cleverbot" with
	 */
  	static async ai(message, ctx, lang, replacer){
		if (typeof message !== "string")
			throw new TypeError("[AsX: ERROR] Query paramter (message) must be a string");

		if (message == null)
			throw new SyntaxError("[AsX: ERROR] Query parameter (message) must be passed");

		if (!Array.isArray(ctx))
			throw new TypeError("[AsX: ERROR] Query parameter (Context) must be an array");
		
		if (typeof lang !== "string")
			throw new TypeError("[AsX Error] Query parameter (language) must be a string");

		if (typeof replacer !== "string")
			throw new TypeError("[AsX: ERROR] Query parameter (Replacer) must be a string");

		return await ai(message, ctx, lang, replacer);
	}
}

module.exports = Asx;
