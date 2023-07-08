const tasx = require("./asx.js");
const ai = new tasx();

const context = [];

input = ["Hey", 'how are you?', 'hello'];
let out = input[Math.floor(Math.random()*input.length)];


ai.getReply(out, context, "english", "OwO").then((res) =>{
    console.log(out); // Log the input to get the basic visual flow
    console.log(res); // log the output to see the response
    context.push(out); // push the input to the context
    context.push(res); // Push the response to the context

});

// []: change this in your code when you go to have a context, eg:

/*bot.on("message", function (msg) {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;

    let context = [];
    
    if (msg.content.startsWith(`${prefix}chat`)) {
        let input = msg.content.replace(`${prefix}chat`);

        ai.getReply(input, context).then(reply => {
            msg.reply(reply); // send the message
            context.push(reply); // add the response to the context
        });
    }
});*/