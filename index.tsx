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

function Nyaize(originalMessage) {
    for (let key in nyaWords) {
        originalMessage = originalMessage.replaceAll(key, nyaWords[key])
    }

    originalMessage = originalMessage.replaceAll("다.", "다냥.")
    originalMessage = originalMessage.replaceAll("다,", "다냥,")
    originalMessage = originalMessage.replaceAll("다?", "다냥?")
    originalMessage = originalMessage.replaceAll("다!", "다냥!")
    originalMessage = originalMessage.replaceAll("다 ", "다냥 ")
    //originalMessage = originalMessage.replaceAll("\uB2E4$", "다냥")

    if (originalMessage.endsWith("다")) {
        originalMessage = originalMessage.slice(0, -1) + "다냥";
    }

    return originalMessage;
}

export default definePlugin({
    name: "Nya",
    description: "Nyan Nyan Nyan Inspired from Misskey cat mode",
    authors: [
        {
            id: 687562947790503974n,
            name: "dwjk64",
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
