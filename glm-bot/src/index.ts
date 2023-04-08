import { Context, Schema, Logger } from "koishi";

export const name = "glm-bot";

export const usage = `
chatglm对话插件，需要自己配置后端，也可以直接用其他人的api
### 配置说明
- t4版服务器地址: 最多人用，自建需要安装[api.py](https://forum.koishi.xyz/t/topic/1089)文件
  - 地址示例：https://你的服务器地址/chatglm?
  - 提问词：glm
- 秋叶版服务器地址: 适配秋叶一键包的api，有公网ip的可以用，有[教程](https://forum.koishi.xyz/t/topic/1075/)
  - 地址示例：https://公网ip/chat
  - 提问词：glms

  

### 问题反馈
请到[论坛](https://forum.koishi.xyz/t/topic/1089)留言`;

export interface Config {
  myServerUrl: string;
  publicUrl: string;
  send_glmmtg_response: boolean;
  prefix: string;
}
export const Config = Schema.intersect([
  Schema.object({
    type: Schema.union([
      Schema.const("usrid版api文件" as const).description("usrid版api文件"),
      Schema.const("秋叶版api" as const).description("秋叶版api文件"),
    ] as const)
      .default("usrid版api文件")
      .description("服务器地址选择"),
  }).description("基础设置"),
  Schema.union([
    Schema.object({
      type: Schema.const("usrid版api文件"),
      myServerUrl: Schema.string().description("API 服务器地址。").required(),
      send_glmmtg_response: Schema.boolean()
        .description("使用glmmtg的时候是否会发送tag到会话框")
        .default(false),
      prefix: Schema.string().description("跑图机器人的前缀").default("rr"),
    }),
    Schema.object({
      type: Schema.const("秋叶版api"),
      publicUrl: Schema.string().description("API 服务器地址。").required(),
    }),
  ]),
]);

const logger = new Logger("glm-testbot");

export async function apply(ctx: Context, config: Config) {
  function mathRandomInt(a, b) {
    if (a > b) {
      var c = a;
      a = b;
      b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  var memory_id = mathRandomInt(1, 1000000);

  ctx
    .command("ai", "向chatglm提问")
    .usage("进阶：输入'glm 重置记忆 '即可将记忆清零")
    .action(async ({ session }, ...args) => {
      if (args[0] == "重置记忆" || args[0] == "重置对话") {
        await session.send("已重置全局记忆");
        memory_id += 2;
      } else {
        const apiAddress = [
          config.myServerUrl,
          "msg=" + args[0],
          "&usrid=|public",
          "|channel_id=" + session.channelId,
          "|usr_id=" + session.userId,
          "|secret=" + memory_id,
        ].join("");
        return await ctx.http.get(apiAddress, { responseType: "text" });
      }
    });
  var chat_id = mathRandomInt(1, 1000000);
  const cmd1 = ctx
    .command("glms <msg:text>", "也是向chatglm提问")
    .usage("输入'glms 对话的文字 '即可")
    .action(async ({ session }, msg) => {
      const res = await ctx.http.post(config.publicUrl, {
        msg: msg,
      });
      console.log(res);
      console.log(msg);
      return res;
    });

  const cmd2 = ctx
    .command(
      "glmmtg <text:text>",
      "输入你想画的画面，发送给ChatGLM，让ChatGLM来帮你写tag"
    )
    .usage(
      `请确保当前聊天环境存在rryth或novelai插件
     使用例子：glmmtg 阳光沙滩`
    )
    .action(async ({ session }, text) => {
      const apiAddress = config.myServerUrl + "chatglm?msg=";
      const defaultText =
        "用尽可能多的英文标签详细的描述一幅画面，用碎片化的单词标签而不是句子去描述这幅画，描述词尽量丰富，每个单词之间用逗号分隔，例如在描述白发猫娘的时候，你应该用：white hair，cat girl，cat ears，cute，girl，beautiful，lovely等英文标签词汇。你现在要描述的是：";
      const userText = defaultText + text;
      const session_id = [
        "&source=blockly_public",
        "&usrid=|channel_id=",
        session.channelId,
        "|user_id=",
        session.userId,
        "|chat_id=",
        chat_id,
      ];

      try {
        const response = await ctx.http.get(apiAddress + userText + session_id);
        if (config.send_glmmtg_response) {
          await session.send(`${config.prefix} ${response}`);
        }
        await session.execute(`${config.prefix} "${response}"`);
        await ctx.http.get(apiAddress + "clear" + session_id, {
          responseType: "text",
        });
        console.log(response);
      } catch (error) {
        logger.error(error);
      }
    });
}

/*


*/
