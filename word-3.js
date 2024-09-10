const fs = require('fs');
const mammoth = require('mammoth');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Đọc file .txt
const readTxtFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

// Đọc file .docx
const readDocxFile = (filePath) => {
    return new Promise((resolve, reject) => {
        mammoth.extractRawText({path: filePath})
            .then(result => resolve(result.value))
            .catch(err => reject(err));
    });
};

// Xử lý văn bản để tách từ, loại bỏ trùng lặp và tạo mảng từ duy nhất
const processText = (text) => {
    // Tách từ
    let words = tokenizer.tokenize(text);
    
    // Loại bỏ các từ trùng lặp
    let uniqueWords = [...new Set(words)];
    
    return uniqueWords;
};

// Tùy chọn đọc file và xử lý
const loadAndProcessFile = async (filePath) => {
    try {
        let text;
        if (filePath.endsWith('.txt')) {
            text = await readTxtFile(filePath);
        } else if (filePath.endsWith('.docx')) {
            text = await readDocxFile(filePath);
        } else {
            throw new Error('Unsupported file type');
        }

        let uniqueWords = processText(text);
        console.log('Unique words:', uniqueWords);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Sử dụng chương trình
const filePath = 'data.txt'; // Thay đổi đường dẫn file ở đây
loadAndProcessFile(filePath);
