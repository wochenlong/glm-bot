import { Context, Schema } from "koishi";
export declare const name = "glm-bot";
export declare const usage = "\nchatglm\u5BF9\u8BDD\u63D2\u4EF6\uFF0C\u9700\u8981\u81EA\u5DF1\u914D\u7F6E\u540E\u7AEF\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u7528\u5176\u4ED6\u4EBA\u7684api\n### \u914D\u7F6E\u8BF4\u660E\n- t4\u7248\u670D\u52A1\u5668\u5730\u5740: \u6700\u591A\u4EBA\u7528\uFF0C\u81EA\u5EFA\u9700\u8981\u5B89\u88C5[api.py](https://forum.koishi.xyz/t/topic/1089)\u6587\u4EF6\n  - \u5730\u5740\u793A\u4F8B\uFF1Ahttps://\u4F60\u7684\u670D\u52A1\u5668\u5730\u5740/chatglm?\n  - \u63D0\u95EE\u8BCD\uFF1Aglm\n- \u79CB\u53F6\u7248\u670D\u52A1\u5668\u5730\u5740: \u9002\u914D\u79CB\u53F6\u4E00\u952E\u5305\u7684api\uFF0C\u6709\u516C\u7F51ip\u7684\u53EF\u4EE5\u7528\uFF0C\u6709[\u6559\u7A0B](https://forum.koishi.xyz/t/topic/1075/)\n  - \u5730\u5740\u793A\u4F8B\uFF1Ahttps://\u516C\u7F51ip/chat\n  - \u63D0\u95EE\u8BCD\uFF1Aglms\n\n  \n\n### \u95EE\u9898\u53CD\u9988\n\u8BF7\u5230[\u8BBA\u575B](https://forum.koishi.xyz/t/topic/1089)\u7559\u8A00";
export interface Config {
    myServerUrl: string;
    publicUrl: string;
    send_glmmtg_response: boolean;
    prefix: string;
}
export declare const Config: Schema<Schemastery.ObjectS<{
    type: Schema<"usrid版api文件" | "秋叶版api", "usrid版api文件" | "秋叶版api">;
}> | Schemastery.ObjectS<{
    type: Schema<string, string>;
    myServerUrl: Schema<string, string>;
    send_glmmtg_response: Schema<boolean, boolean>;
    prefix: Schema<string, string>;
}> | Schemastery.ObjectS<{
    type: Schema<string, string>;
    publicUrl: Schema<string, string>;
}>, {
    type: "usrid版api文件" | "秋叶版api";
} & import("cosmokit").Dict<any, string> & (Schemastery.ObjectT<{
    type: Schema<string, string>;
    myServerUrl: Schema<string, string>;
    send_glmmtg_response: Schema<boolean, boolean>;
    prefix: Schema<string, string>;
}> | Schemastery.ObjectT<{
    type: Schema<string, string>;
    publicUrl: Schema<string, string>;
}>)>;
export declare function apply(ctx: Context, config: Config): Promise<void>;
