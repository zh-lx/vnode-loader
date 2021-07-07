"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var loader_utils_1 = __importDefault(require("loader-utils"));
var FileMap = {}; // 全局的FileMap，记录那些文件被处理过
/**
 * @description inject line、column and path to VNode when webpack compiling .vue file
 * @type webpack.loader.Loader
 */
function TrackCodeLoader(content, map, meta) {
    var options = loader_utils_1.default(this);
    console.log(options.resourcePath);
    console.log(content);
    return content;
}
module.exports = TrackCodeLoader;
//# sourceMappingURL=index.js.map