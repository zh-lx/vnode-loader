"use strict";
var compiler_sfc_1 = require("@vue/compiler-sfc");
var inject_ast_1 = require("./inject-ast");
var FileMap = {}; // 全局的FileMap，记录那些文件被处理过
/**
 * @description inject line、column and path to VNode when webpack compiling .vue file
 * @type webpack.loader.Loader
 */
function TrackCodeLoader(content, map, meta) {
    var filePath = this.resourcePath; // 当前文件的绝对路径
    if (!FileMap[filePath]) {
        var vueParserContent = compiler_sfc_1.parse(content); // vue文件parse后的内容
        var domAst = vueParserContent.descriptor.template.ast; // template开始的dom ast结构
        var templateSource = domAst.loc.source; // template部分的原字符串
        var newTemplateSource = inject_ast_1.getInjectContent(domAst, templateSource, filePath); // 注入后的template部分字符串
        var newContent = content.replace(templateSource, newTemplateSource);
        FileMap[filePath] = newContent;
    }
    this.callback(null, FileMap[filePath]);
    return;
}
module.exports = TrackCodeLoader;
//# sourceMappingURL=index.js.map