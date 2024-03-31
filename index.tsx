import "./styles.css";

import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "Nya",
    description: "Nyan Nyan Nyan Inspired from Misskey cat mode",
    authors: [
        {
            id: 687562947790503974,
            name: "dwjk64",
        },
    ],

    start() {
        this.preSend = addPreSendListener(async (_, message) => {
            if (!message.content) return;

            message.content = "test"; //(await translate("sent", message.content)).text;
        });
    },

    stop() {
        removePreSendListener(this.preSend);
    },
});
