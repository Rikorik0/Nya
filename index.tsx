import { Settings } from "@api/Settings";
import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import definePlugin, { OptionType } from "@utils/types";

var chaePrefix = Settings.plugins.Nya.chaePrefixValue;

var nyaWords = {
    '나': "냐",
    '낙': "냑",
    '낚': "냒",
    '낛': "냓",
    '난': "냔",
    '낝': "냕",
    '낞': "냖",
    '낟': "냗",
    '날': "냘",
    '낡': "냙",
    '낢': "냚",
    '낣': "냛",
    '낤': "냜",
    '낥': "냝",
    '낦': "냞",
    '낧': "냟",
    '남': "냠",
    '납': "냡",
    '낪': "냢",
    '낫': "냣",
    '났': "냤",
    '낭': "냥",
    '낮': "냦",
    '낯': "냧",
    '낰': "냨",
    '낱': "냩",
    '낲': "냪",
    '낳': "냫",
}

var nyaWords2 = {
    '내': chaePrefix,
    '넹': chaePrefix,
    '넴': chaePrefix,
    '넵': chaePrefix,
    '냐': chaePrefix,
    '님': chaePrefix,
    '니': chaePrefix,
    '다': "다" + chaePrefix,
    '까': "까" + chaePrefix,
    '네': "네" + chaePrefix,
    '야': "야" + chaePrefix,
    '꺼': "꺼" + chaePrefix,
    '래': "래" + chaePrefix,
    '해': "해" + chaePrefix,
    '지': "지" + chaePrefix,
    '라': "라" + chaePrefix,
    '요': "요" + chaePrefix,
    '가': "가" + chaePrefix,
    '데': "데" + chaePrefix,
    '돼': "돼" + chaePrefix,
    '줘': "줘" + chaePrefix,
    '마': "마" + chaePrefix,
    '와': "와" + chaePrefix,
    '어': "어" + chaePrefix,
    '자': "자" + chaePrefix,
    '죠': "죠" + chaePrefix,
    '서': "서" + chaePrefix,
    '게': "게" + chaePrefix,
    '듯': "듯" + chaePrefix,
    // '임': "임냥", disabled due addNyangAtMWord function
}

function refreshPrefix() { // someone help me fix these spaghetti
    chaePrefix = Settings.plugins.Nya.chaePrefixValue

    nyaWords2 = {
        '내': chaePrefix,
        '넹': chaePrefix,
        '넴': chaePrefix,
        '넵': chaePrefix,
        '냐': chaePrefix,
        '님': chaePrefix,
        '니': chaePrefix,
        '다': "다" + chaePrefix,
        '까': "까" + chaePrefix,
        '네': "네" + chaePrefix,
        '야': "야" + chaePrefix,
        '꺼': "꺼" + chaePrefix,
        '래': "래" + chaePrefix,
        '해': "해" + chaePrefix,
        '지': "지" + chaePrefix,
        '라': "라" + chaePrefix,
        '요': "요" + chaePrefix,
        '가': "가" + chaePrefix,
        '데': "데" + chaePrefix,
        '돼': "돼" + chaePrefix,
        '줘': "줘" + chaePrefix,
        '마': "마" + chaePrefix,
        '와': "와" + chaePrefix,
        '어': "어" + chaePrefix,
        '자': "자" + chaePrefix,
        '죠': "죠" + chaePrefix,
        '서': "서" + chaePrefix,
        '게': "게" + chaePrefix,
        '듯': "듯" + chaePrefix,
    }
}

var nyaCharacters = [
    '.',
    ',',
    '?',
    '!',
    ' ',
]

function replacePunctuation(input: string): string { // yeah I used gpt to write this I don't know RegEx
    return input.replace(/(^|\s)([?!,.;~^@()]+)/g, (match, p1, p2) => {
        const firstChar = p2[0];
        let transformed;
        
        if (firstChar === '?') transformed = chaePrefix + '?';
        else if (firstChar === '!') transformed = chaePrefix + '!';
        else if (firstChar === ',') transformed = chaePrefix + ',';
        else if (firstChar === '.') transformed = chaePrefix + '.';
        else if (firstChar === ';') transformed = chaePrefix + ';';
        else if (firstChar === '~') transformed = chaePrefix + '~';
        else if (firstChar === '^') transformed = chaePrefix + '^';
        else if (firstChar === '@') transformed = chaePrefix + '@';
        else if (firstChar === '(') transformed = chaePrefix + '(';
        else if (firstChar === ')') transformed = chaePrefix + ')';
        else transformed = p2;
        
        return p1 + transformed + p2.slice(1);
    });
}

function addNyangAtMWord(sentence: string): string { // Also from GPT
    return sentence.split(' ').map((word) => {
        const match = word.match(/^([가-힣]+)([?!,.;~^@()]*)$/);

        if (!match) return word;

        const baseWord = match[1];
        const punctuation = match[2];

        const lastChar = baseWord[baseWord.length - 1];
        const charCode = lastChar.charCodeAt(0);

        if (charCode >= 0xAC00 && charCode <= 0xD7A3) {
            const baseCode = charCode - 0xAC00;
            const jongseong = baseCode % 28;

            if (jongseong === 16) {
                return baseWord + Settings.plugins.Nya.chaePrefixValue + punctuation;
            }
        }

        return word;
    }).join(' ');
}

function Nyaize(originalMessage) {
    for (let key in nyaWords2) {
        originalMessage = originalMessage.replaceAll(key+".", nyaWords2[key]+".") // yeah I gotta optimize these
        originalMessage = originalMessage.replaceAll(key+",", nyaWords2[key]+",")
        originalMessage = originalMessage.replaceAll(key+"?", nyaWords2[key]+"?")
        originalMessage = originalMessage.replaceAll(key+"!", nyaWords2[key]+"!")
        originalMessage = originalMessage.replaceAll(key+";", nyaWords2[key]+";")
        originalMessage = originalMessage.replaceAll(key+"~", nyaWords2[key]+"~")
        originalMessage = originalMessage.replaceAll(key+"^", nyaWords2[key]+"^")
        originalMessage = originalMessage.replaceAll(key+"@", nyaWords2[key]+"@")
        originalMessage = originalMessage.replaceAll(key+"(", nyaWords2[key]+"(")
        originalMessage = originalMessage.replaceAll(key+")", nyaWords2[key]+")")
        originalMessage = originalMessage.replaceAll(key+" ", nyaWords2[key]+" ")

        if (originalMessage.endsWith(key)) {
            originalMessage = originalMessage.slice(0, -1) + nyaWords2[key];
        }
    }

    for (let key in nyaWords) {
        originalMessage = originalMessage.replaceAll(key, nyaWords[key])
    }

    originalMessage = replacePunctuation(originalMessage)

    originalMessage = addNyangAtMWord(originalMessage)

    return originalMessage;
}

export default definePlugin({
    name: "Nya",
    description: "Nyan Nyan Nyan Inspired from Misskey cat mode",
    authors: [
        {
            id: 687562947790503974n,
            name: "Rikoring",
        },
    ],

    options: {
        chaePrefixValue: {
            type: OptionType.STRING,
            description: "~체 Prefix",
            default: "냥",
            onChange: refreshPrefix
        }
    },

    start() {
        this.preSend = addPreSendListener(async (_, message) => {
            if (!message.content) return;

            message.content = await Nyaize(message.content);
        });
    },

    stop() {
        removePreSendListener(this.preSend);
    },
});
