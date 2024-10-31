# Nya
Cat mode for discord
(Vencord custom plugin)
*Also insipred from misskey cat mode*

# What does it do?
Add "냥" after "다" if after "다" character is "," or "." or "?" or "!" or space or there's no text

Replace "네", "넹", "넴" "야" etc. character to "냥" if "네" etc. character's next character is "," or "." or "?" or "!" or space or there's no text

나 낙 낚 낛 난 낝 낞 낟 날 낡 낢 낣 낤 낥 낦 낧 남 납 낪 낫 났 낭 낮 낯 낰 낱 낲 낳 will changes to

냐 냑 냒 냓 냔 냕 냖 냗 냘 냙 냚 냛 냜 냝 냞 냟 냠 냡 냢 냣 냤 냥 냦 냧 냨 냩 냪 냫

# Install Guide
Follow the vencord install guide [here](https://docs.vencord.dev/installing/)

Place the plugins inside the userplugins folder (vencord/src/userplugins) if you don't have the folder, you will be need to make it yourself

Then, build your vencord (From downloaded Vencord path)

```shell
pnpm build
```

Inject your vencord, and plugins to your client

```shell
pnpm inject
```

You can use [discord PTB](https://discord.com/api/download/ptb?platform=win) version if you want.

Now, enable `Nya` plugin in plugin settings

**Make your to refresh your vencord client after enable it**

*I don't recommend to use this plugin, it has a very dirty script. also it may not work. I made this plugin when I was learning TypeScript*
