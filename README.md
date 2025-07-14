# Nya
Cat mode for discord
(Vencord custom plugin)
*Also insipred from misskey cat mode*

# What does it do?
Add "냥" after "다" (and etc.) if after "다" character is "," or "." or "?" or "!" or ";" or space or there's no text

Replace, "넹", "넴" etc. character to "냥" if "넹" etc. character's next character is "," or "." or "?" or "!" or space or there's no text

나 낙 낚 낛 난 낝 낞 낟 날 낡 낢 낣 낤 낥 낦 낧 남 납 낪 낫 났 낭 낮 낯 낰 낱 낲 낳 will changes to

냐 냑 냒 냓 냔 냕 냖 냗 냘 냙 냚 냛 냜 냝 냞 냟 냠 냡 냢 냣 냤 냥 냦 냧 냨 냩 냪 냫

If message starts with "?" or "!" or "." or "," or ";"
It will turn to "냥?" or "냥!" or "냥." or "냥,"
(goes same if message is right after space.) (" ?" or " !" or " ." or " ," or " ;")

(And more, too lazy to write all lol)

# Install Guide
Follow the vencord install guide [here](https://docs.vencord.dev/installing/)

[for the complicated custom plugin installation guide](https://docs.vencord.dev/installing/custom-plugins/#_top) *(recommended)*

**Make sure your to read warnings before injecting custom plguins**

## Injecting custom plugin

*You can skip this custom plugin installation guide ~~it's better to read installation guide from above~~*

Place the unzipped plugin inside the userplugins folder (vencord/src/userplugins) if you don't have the folder, you will be need to make it yourself

Then, build your vencord (From downloaded Vencord path)

```shell
pnpm build
```

Inject your vencord, and plugins to your client

```shell
pnpm inject
```

You can use [discord PTB](https://discord.com/api/download/ptb?platform=win) version if you want.

# Finish

Now, enable `Nya` plugin in plugin settings

**Make sure to refresh your vencord client after enable it**

## Customize your plguin!

https://github.com/user-attachments/assets/5c68ac26-2427-4a41-a048-bcb206b917e0

~~You can customize your ~체 from Nya plugin settings!~~
~~(Since 1.3 version)~~

^ This system is removed for some reason

# Disclaimer

*I don't recommend to use this plugin, it has a very dirty script. also it may not work. I made this plugin when I was learning TypeScript*
