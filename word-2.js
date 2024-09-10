const nguyen_am_don = ['a', 'ă', 'â', 'e', 'ê', 'i', 'o', 'ô', 'ơ', 'u', 'ư', 'y'];
const nguyen_am_doi = ['ai', 'ao', 'au', 'âu', 'ay', 'ây', 'eo', 'êu', 'ia', 'iê', 'yê', 'iu', 'oa', 'oă', 'oe', 'oi', 'ôi', 'ơi', 'oo', 'ôô', 'ua', 'ưa', 'uâ', 'ưa', 'uê', 'ui', 'ưi', 'uo', 'uô', 'ươ', 'ươ', 'ưu', 'uy'];
const nguyen_am_ba = ['iêu', 'yêu', 'oai', 'oao', 'oay', 'oeo', 'uao', 'uây', 'uôi', 'ươi', 'ươu', 'uya', 'uyê', 'uyu'];
const phu_am_don = ['b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x'];
const phu_am_ghep = ['ch', 'gh', 'gi', 'kh', 'nh', 'ng', 'ngh', 'ph', 'qu', 'th', 'tr'];
const phu_am_duoi = ['c', 'm', 'n', 'p', 't', 'ch', 'nh', 'ng'];

// Các dấu thanh tiếng Việt
const dau_thanh = ['', '́', '̀', '̉', '̃', '̣']; // thanh ngang (không dấu), sắc, huyền, hỏi, ngã, nặng

const pick_one_in = (arr) => {
    const len = arr.length;
    if (len === 0) return undefined; 
    const randomIndex = Math.floor(Math.random() * len);
    return arr[randomIndex];
};

// Hàm để thêm dấu vào nguyên âm
const them_dau = (nguyen_am) => {
    const randomDau = pick_one_in(dau_thanh);
    if (randomDau === '') return nguyen_am; // Không có dấu thì trả về nguyên âm gốc
    
    // Áp dụng dấu thanh cho nguyên âm chính trong cụm nguyên âm
    const nguyen_am_chinh_regex = /[aeiouyâăêôơư]/i; // Các nguyên âm có thể nhận dấu
    return nguyen_am.replace(nguyen_am_chinh_regex, match => match + randomDau);   
}; 

const ghep_tieng = () => {
    let word = '';
    
    const nguyen_am_type = Math.floor(Math.random() * 3) + 1; // Chọn nguyên âm đơn, đôi hoặc ba
    const phu_am_type = Math.floor(Math.random() * 2) + 1; // Chọn phụ âm đơn hoặc ghép
    
    if (phu_am_type === 1) {
        word += pick_one_in(phu_am_don); // Phụ âm đầu đơn
    } else {
        word += pick_one_in(phu_am_ghep); // Phụ âm đầu ghép
    }

    if (nguyen_am_type === 1) {
        // Nguyên âm đơn
        let nguyen_am = pick_one_in(nguyen_am_don);
        word += them_dau(nguyen_am); // Thêm dấu ngẫu nhiên vào nguyên âm đơn
        
        // Xử lý phụ âm cuối
        const duoi = Math.random() < 0.5;
        if (duoi) word += pick_one_in(phu_am_duoi);
    } else if (nguyen_am_type === 2) {
        // Nguyên âm đôi
        let nguyen_am = pick_one_in(nguyen_am_doi);
        word += them_dau(nguyen_am); // Thêm dấu ngẫu nhiên vào nguyên âm đôi
    } else {
        // Nguyên âm ba không áp dụng dấu
        word += pick_one_in(nguyen_am_ba);
    }

    return word;
};

console.log(ghep_tieng());
