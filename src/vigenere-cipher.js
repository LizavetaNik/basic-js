const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  
  constructor(direct = true) {
    this.direct = direct;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let encrypted = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      if (/^[A-Z]$/.test(char)) {
        const keyChar = key[keyIndex % key.length];
        const shift = keyChar.charCodeAt(0) - 65;
        const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        encrypted += encryptedChar;
        keyIndex++;
      } else {
        encrypted += char;
      }
    }

    return this.direct ? encrypted : encrypted.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    let decrypted = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];
      if (/^[A-Z]$/.test(char)) {
        const keyChar = key[keyIndex % key.length];
        const shift = keyChar.charCodeAt(0) - 65;
        const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + 26 - shift) % 26) + 65);
        decrypted += decryptedChar;
        keyIndex++;
      } else {
        decrypted += char;
      }
    }

    return this.direct ? decrypted : decrypted.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
