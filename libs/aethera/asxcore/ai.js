/**
 * By Aethera/GsLKS/CubieCloud:
 * AsXCore for AsX
 * v0.0.1
 * CubieCloud (c) 2019 - 2023
 */
 let md5 = require("md5"),
 axios = require("axios"),
 jaro = require("jaro-winkler"),
 contexts = [],
 toRemove = ["/",',','.',':','"'];

 /**
  * @description AI code for the module.
  * @param {String} stim 
  * @param {Array} cont 
  * @param {String} lang 
  * @param {String} replacer
  * @exports 
  * @returns 
  */
module.exports = async function (stim, cont, lang, replacer) {
 if (!lang || lang == 0) lang = "english";
 if (!stim || stim == (null || undefined)) throw new SyntaxError("Stimulus cannot be null or undefined!");
 if (!Array.isArray(cont)) throw new SyntaxError("Context array, must be an array"), cont = contexts;
 if (!replacer) replacer = "O_o";
 if (stim in toRemove) stim = toRemove.some(item => stim.slice(item));

 let context = cont;

 let connect = (await axios.get("https://www.thoughtscreen.com/", {
     headers: {
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
     },
 })).headers["set-cookie"];

 var body = "stimulus=" + escape(escape(stim)).replace(/%u/g, "|") + "&islearning=1&icognocheck=";

 if (context.length > 10) context.splice(0, context.length - 10);
 let l = context.length - 1;

 switch (context.length <= 0) {
     case true:

         body += md5(body.substring(7, 33));
     case false:
         for (let i = 0; i <= l; i++) {
             body += `&vText${i + 2}=${escape(context[l-i]).includes("%u") ? escape(escape(context[l-i]).replace(/%u/g, "|")) : escape(context[l-i])}`;
         };
         break;
 }

 // for testing purposes we will use the preset screen (english)
 let personality = lang

 let res = await axios.post("https://www.thoughtscreen.com/webservicemin?uc=UseOfficialCleverbotAPI", body, {
     headers: {
         Cookie: connect,
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
         "Content-Type": "text/plain",
         "Referer": `https://thoughtscreen.com/screen-${personality}`,
     },
 });

 cbout = res.data.split("\r")[0];

 // only let responses above 0.6 be used
 if (cont.length >= 1) {

     let jres = res;

     var jcbout = jres.data.split('\r')[0];
     let temp = jcbout;

     // Use jaro to increase the capability of the responses

     if (jaro(temp, context.length - 1) >= 0.6) {
         while ((/cleverbot/gi).test(temp)) temp.replace(/cleverbot/gi, replacer);
         cbout = temp;
         return cbout
         
     } else if (jaro(temp, context.length - 1) == 0.5) {

         let get2 = res;

         var jcbout2 = get2.data.split('\r')[0];
         let temp2 = jcbout2;

         // Use jaro to increase the capability of the responses
         // based off BlobKat's context idea
         for (i = 0; i <= l; i++) {
             module.exports = comp2 = jaro(temp2, context[0]);
             //console.log("Result: " + comp2); // log the results for testing
             if (comp2 >= 0.6) {
                 while ((/cleverbot/gi).test(temp2)) temp2.replace(/cleverbot/gi, replacer);
                 jcbout2 = temp2;
                 return jcbout2;
             }
         }

     } else {
         return "Sorry but I couldn't find a suitable response to that 😥";
     }
 } else {
     while ((/cleverbot/gi).test(cbout)) cbout.replace(/cleverbot/gi, replacer);
     return cbout;
 }
}