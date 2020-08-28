var fs = require('fs');
var readlineSync = require('readline-sync');
var colors = require('colors');

const consoleOutput = (input, shift, output, decode) => {
    console.log('Input text : '.green + input.green);
    console.log('Shift : '.red + shift.red);
    console.log('Encoded text : '.blue + output.blue);
    console.log('Decoded text : '.yellow + decode.yellow);
};

const choiceMethod = () => {
    var method = ['Code of Caesar', 'Vigeneres code', 'Transposition', 'Disposable notepad', 'Create input file'];
    index = readlineSync.keyInSelect(method, 'Which method?');
};

const caesarCode = () => {
    console.log('Caesar Code!');

    var file = readlineSync.question('Input file name: ');
    var inputText = fs.readFileSync(file + '.txt').toString();
    var shift = readlineSync.question('Input shift (0.255): ',
        {
            limit: function (input) {
                return (input > 0 && input < 256);
            },
            limitMessage: 'Sorry, $<lastInput> out of range. (0..255)'
        });

    var encodedText = inputText.split('').map((a) => a = String.fromCharCode(a.charCodeAt() + +shift)).join('');
    fs.writeFileSync('outputfile.txt', encodedText);

    var inputEncodedText = fs.readFileSync('outputfile.txt').toString();
    var decodedText = inputEncodedText.split('').map((a) => a = String.fromCharCode(a.charCodeAt() - +shift)).join('');
    fs.writeFileSync('decodefile.txt', decodedText);

    consoleOutput(inputText, shift, encodedText, decodedText);
};

const transposition = () => {
    console.log('Transposition!');
    var message = '';
    var file = readlineSync.question('Input file name: ');
    var inputText = fs.readFileSync(file + '.txt').toString().split('');
    var block = readlineSync.question('Input block: ',
        {
            limit: function (input) {
                if (isNaN(+input)) {
                    message = input + ' is not a number';
                    console.log(message);
                    return false;
                }
                if (input.length < 3) {
                    message = 'Block size must be greater than two';
                    console.log(message);
                    return false;
                }
                input = input.split('');
                let temp = input.slice().sort();
                let min = temp[0];
                for (let i = 1; i < temp.length; i++) {
                    if (+input[i] == +temp[i]) {
                        message = 'Input correct number where key not equal original position';
                        console.log(message);
                        return false;
                    }
                    if (min >= temp[i]) {
                        message = 'Input correct number';
                        console.log(message);
                        return false;
                    }
                    min = temp[i];
                }
                return true;
            }
        });
    var stringBlock = block.toString().split('');
    var encodedText = [];
    var x = 0;

    for (let i = 0; i < (Math.ceil(inputText.length / block.toString().length)); i++) {
        for (let j = 0; j < block.toString().length; j++) {
            if (inputText[+stringBlock[j] - 1 + x] !== undefined) {
                encodedText.push(inputText[+stringBlock[j] - 1 + x])
            } else {
                encodedText.push(' ');
            }
        }
        x += block.toString().length;
    }

    inputText = inputText.join('');
    encodedText = encodedText.join('');
    fs.writeFileSync('outputfile.txt', encodedText);

    var inputEncodedText = fs.readFileSync('outputfile.txt').toString().split('');
    var decodedText = [];
    x = 0;

    for (let i = 0; i < (Math.ceil(inputEncodedText.length / block.toString().length)); i++) {
        for (let j = 0; j < block.toString().length; j++) {
            decodedText[stringBlock[j] - 1 + x] = inputEncodedText[j + x];
        }
        x += block.toString().length;
    }


    decodedText = decodedText.join('');
    fs.writeFileSync('decodefile.txt', decodedText);
    consoleOutput(inputText, block, encodedText, decodedText);

};

const vigeneresCode = () => {
    console.log('Vigeneres Code!');
    var message = '';
    var file = readlineSync.question('Input file name: ');
    var inputText = fs.readFileSync(file + '.txt').toString().split('');
    var block = readlineSync.question('Input block: ',
        {
            limit: function (input) {
                if (!isNaN(+input)) {
                    message = input + ' is not a string';
                    console.log(message);
                    return false;
                }
                if (input.length < 3) {
                    message = 'Block size must be greater than two';
                    console.log(message);
                    return false;
                }
                return true;
            }
        });

    var stringBlock = block.split('');
    var encodedText = [];
    var x = 0;

    for (let i = 0; i < (Math.ceil(inputText.length / block.length)); i++) {
        for (let j = 0; j < block.length; j++) {
            if (inputText[j + x] !== undefined) {
                encodedText.push(String.fromCharCode(inputText[j + x].charCodeAt() + stringBlock[j].charCodeAt()));
            } else {
                encodedText.push(' ');
            }
        }
        x += block.length;
    }

    inputText = inputText.join('');
    encodedText = encodedText.join('');
    fs.writeFileSync('outputfile.txt', encodedText);

    var inputEncodedText = fs.readFileSync('outputfile.txt').toString().split('');
    var decodedText = [];
    x = 0;

    for (let i = 0; i < (Math.ceil(inputEncodedText.length / block.toString().length)); i++) {
        for (let j = 0; j < block.toString().length; j++) {
            if (inputEncodedText[j + x] !== ' ') {
                decodedText.push((String.fromCharCode(inputEncodedText[j + x].charCodeAt() - stringBlock[j].charCodeAt())));
            } else {
                decodedText.push(' ');
            }
        }
        x += block.toString().length;
    }

    decodedText = decodedText.join('');
    fs.writeFileSync('decodefile.txt', decodedText);
    consoleOutput(inputText, block, encodedText, decodedText);

};

const disposableNotepad = () => {
    console.log('Disposable notepad!');
    var message = '';
    var file = readlineSync.question('Input file name: ');
    var inputText = fs.readFileSync(file + '.txt').toString().split('');
    var block = readlineSync.question('Input block: ',
        {
            limit: function (input) {
                if (!isNaN(+input)) {
                    message = input + ' is not a string';
                    console.log(message);
                    return false;
                }
                console.log(input.length, inputText.length);
                if (input.length != inputText.length) {
                    message = 'The string must be equal to the outgoing text.';
                    console.log(message);
                    return false;
                }
                return true;
            }
        });

    var stringBlock = block.split('');
    var encodedText = [];
    var x = 0;

    for (let i = 0; i < inputText.length; i++) {
        encodedText.push(String.fromCharCode(((inputText[i].charCodeAt() + stringBlock[i].charCodeAt()) % 65535) < 32 ? ((inputText[i].charCodeAt() + stringBlock[i].charCodeAt()) % 65535) + 32 : ((inputText[i].charCodeAt() + stringBlock[i].charCodeAt()) % 65535)));
    }

    inputText = inputText.join('');
    encodedText = encodedText.join('');
    fs.writeFileSync('outputfile.txt', encodedText);

    var inputEncodedText = fs.readFileSync('outputfile.txt').toString().split('');
    var decodedText = [];
    x = 0;

    for (let i = 0; i < inputText.length; i++) {
        decodedText.push(String.fromCharCode((Math.abs(inputEncodedText[i].charCodeAt() - stringBlock[i].charCodeAt()) % 65535) < 32 ? (Math.abs(inputEncodedText[i].charCodeAt() - stringBlock[i].charCodeAt()) % 65535) + 32 : (Math.abs(inputEncodedText[i].charCodeAt() - stringBlock[i].charCodeAt()) % 65535)));
    }

    decodedText = decodedText.join('');
    fs.writeFileSync('decodefile.txt', decodedText);
    consoleOutput(inputText, block, encodedText, decodedText);

};

const createFile = () => {
    console.log('Create file!');
    var file = readlineSync.question('Input file name: ', {
        limit: /^[a-zA-Z0-9]+$/
    });
    var text = readlineSync.question('Enter text for the file: ',{
        limit: /^[а-яА-ЯёЁa-zA-Z0-9 \t\n\r\f\v.,!?:…]+$/
    });
    fs.writeFileSync(file + '.txt', text);
};

var index;

while (index != -1) {

    choiceMethod();

    switch (index) {
        case 0:
            caesarCode();
            break;
        case 1:
            vigeneresCode();
            break;
        case 2:
            transposition();
            break;
        case 3:
            disposableNotepad();
            break;
        case 4:
            createFile();
            break;
    }

}