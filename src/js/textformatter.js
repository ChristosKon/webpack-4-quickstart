export function splitText(text) {
    let textArray = [];

    // Strip seemingly randomly injected whitespace
    text = text.replace(/ {17}/g, ' ').trim();

    // 13 spaces mean new paragraph in fb format
    textArray = text.split(/ {13}/);

    return textArray;
}

export function formatToHTML(textArray, wrapperElement = 'p') {
    let formattedText = '';

    textArray.forEach(function(textChunk) {
        formattedText += `<${wrapperElement}>${textChunk}</${wrapperElement}>`;
    });

    formattedText = formattedText.replace(/\n/g, '<br />');

    return formattedText;
}

export function complexSplitText(text) {
    let textArray = splitText(text),
        counter = 0,
        isFirstParagraph = true;

    text = textArray.join(' ');
    text = text.replace(/\n/g, ' ');

    textArray = [];

    for (let i = 0, l = text.length; i < l; i++) {
        if (counter > 200) {
            if (/\.|\?/.test(text[i])) {
                if (isFirstParagraph) {
                    textArray.push(text.slice(i - counter, i + 1));
                    isFirstParagraph = false;
                } else {
                    textArray.push(text.slice(i + 2 - counter, i + 1));
                }
                counter = 0;
            }
        } else if (i === l - 1) {
            textArray.push(text.slice(i - counter, l));
        }
        counter++;
    }

    textArray = textArray.map(function(paragraph) {
        if ((/^\. /).test(paragraph)) {
            return paragraph.slice(2);
        }
        return paragraph;
    });

    return textArray;
}
