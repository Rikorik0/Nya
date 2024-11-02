import "./styles.css";

import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import definePlugin from "@utils/types";

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
    '내': "냥",
    '넹': "냥",
    '넴': "냥",
    '넵': "냥",
    '냐': "냥",
    '님': "냥",
    '니': "냥",
    '다': "다냥",
    '까': "까냥",
    '네': "네냥",
    '야': "야냥",
    '꺼': "꺼냥",
    '래': "래냥",
    '해': "해냥",
    '지': "지냥",
    '라': "라냥",
    '요': "요냥",
    '가': "가냥",
    '데': "데냥",
    '돼': "돼냥",
    '줘': "줘냥",
    '마': "마냥",
    '와': "와냥",
    '어': "어냥",
    '자': "자냥",
}

var nyaCharacters = [
    '.',
    ',',
    '?',
    '!',
    ' ',
]

function replacePunctuation(input: string): string { // yeah I used gpt to write this I don't know RegEx
    return input.replace(/(^|\s)([?!,.;~^@]+)/g, (match, p1, p2) => {
        const firstChar = p2[0];
        let transformed;
        
        if (firstChar === '?') transformed = '냥?';
        else if (firstChar === '!') transformed = '냥!';
        else if (firstChar === ',') transformed = '냥,';
        else if (firstChar === '.') transformed = '냥.';
        else if (firstChar === ';') transformed = '냥;';
        else if (firstChar === '~') transformed = '냥~';
        else if (firstChar === '^') transformed = '냥^';
        else if (firstChar === '@') transformed = '냥@';
        else transformed = p2;
        
        return p1 + transformed + p2.slice(1);
    });
}

function Nyaize(originalMessage) {
    for (let key in nyaWords2) {
        originalMessage = originalMessage.replaceAll(key+".", nyaWords2[key]+".")
        originalMessage = originalMessage.replaceAll(key+",", nyaWords2[key]+",")
        originalMessage = originalMessage.replaceAll(key+"?", nyaWords2[key]+"?")
        originalMessage = originalMessage.replaceAll(key+"!", nyaWords2[key]+"!")
        originalMessage = originalMessage.replaceAll(key+";", nyaWords2[key]+";")
        originalMessage = originalMessage.replaceAll(key+"~", nyaWords2[key]+"~")
        originalMessage = originalMessage.replaceAll(key+"^", nyaWords2[key]+"^")
        originalMessage = originalMessage.replaceAll(key+"@", nyaWords2[key]+"@")
        originalMessage = originalMessage.replaceAll(key+" ", nyaWords2[key]+" ")

        if (originalMessage.endsWith(key)) {
            originalMessage = originalMessage.slice(0, -1) + nyaWords2[key];
        }
    }

    for (let key in nyaWords) {
        originalMessage = originalMessage.replaceAll(key, nyaWords[key])
    }

    originalMessage = replacePunctuation(originalMessage)

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
