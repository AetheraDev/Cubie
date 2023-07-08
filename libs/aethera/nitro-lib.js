/**
 * @param {Boolean} boost
 * @returns https://discord.gift/randomGiftCode
 */
module.exports = (boost = false) => {
    let giftCode = '', dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for(let i = 0; i < (boost ? 24 : 16); i++) giftCode += dict.charAt(Math.floor(Math.random() * dict.length));
    return `https://discord.gift/${giftCode}`;
}