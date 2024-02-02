function createCopy(data){
    return JSON.parse(JSON.stringify(data));
}

function limitText(text, maxLength) {
    if (text.length <= maxLength) return text;
    text = text.substr(0, maxLength);
    var lastSpace = text.lastIndexOf(' ');
    return text.substr(0, lastSpace) + '...';
}

export {createCopy, limitText};