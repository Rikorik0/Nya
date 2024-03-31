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

export default definePlugin({
    name: "Nya",
    description: "Nyan Nyan Nyan Inspired from Misskey cat mode",
    authors: [
        {
            id: 687562947790503974,
            name: "dwjk64",
        },
    ],
    dependencies: ["MessageAccessoriesAPI", "MessagePopoverAPI", "MessageEventsAPI", "ChatInputButtonAPI"],
    // not used, just here in case some other plugin wants it or w/e

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
