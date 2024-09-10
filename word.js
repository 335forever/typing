const fs = require('fs');
const readline = require('readline');

// Đọc số lượng dòng trong file
async function getNumberOfLines(filePath) {
    let lineCount = 0;
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        rl.on('line', () => lineCount++);
        rl.on('close', () => resolve(lineCount));
        rl.on('error', reject);
    });
}

// Đọc một dòng cụ thể từ file
async function getLine(filePath, lineNumber) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        let currentLine = 0;
        rl.on('line', (line) => {
            if (currentLine === lineNumber) {
                rl.close();
                resolve(line);
            }
            currentLine++;
        });

        rl.on('error', reject);
    });
}

// Chính
(async () => {
    const filePath = 'words.txt';
    const numberOfLines = await getNumberOfLines(filePath);

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomLineNumber = getRandomInt(0, numberOfLines - 1);

    const line = await getLine(filePath, randomLineNumber);
    const entry = JSON.parse(line);
    const words = entry.text.split(' ');

    let sentence = [];
    while (sentence.length < 10) {
        const randomLineNumber = getRandomInt(0, numberOfLines - 1);
        const line = await getLine(filePath, randomLineNumber);
        const entry = JSON.parse(line);
        const words = entry.text.split(' ');

        for (const word of words) {
            if (sentence.length < 10) {
                sentence.push(word);
            } else {
                break;
            }
        }
    }

    console.log('Câu đã ghép:', sentence.join(' '));
})();
