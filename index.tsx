/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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

    //originalMessage = originalMessage.replaceAll("\uB2E4(?=[^\w\s]|$|\s)", "다냥")

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

            message.content = await Nyaize(message.content); //message.content.replace("gay", "lesbian"); ; //(await translate("sent", message.content)).text;
        });
    },

    stop() {
        removePreSendListener(this.preSend);
    },
});
