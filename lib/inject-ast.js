"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectContent = void 0;
var constant_1 = require("./constant");
function getInjectContent(ast, source, filePath) {
    // type为1是为标签节点
    if ((ast === null || ast === void 0 ? void 0 : ast.type) === 1) {
        // 递归处理子节点
        if (ast.children && ast.children.length) {
            // 从最后一个子节点开始处理，防止同一行多节点影响前面节点的代码位置
            for (var i = ast.children.length - 1; i >= 0; i--) {
                var node = ast.children[i];
                source = getInjectContent(node, source, filePath);
            }
        }
        var codeLines = source.split('\n'); // 把行以\n划分方便注入
        var line = ast.loc.start.line; // 当前节点起始行
        var column = ast.loc.start.column; // 当前节点起始列
        var columnToInject = column + ast.tag.length; // 要注入信息的列(标签名后空一格)
        var targetLine = codeLines[line - 1]; // 要注入信息的行
        var newLine = targetLine.slice(0, columnToInject) +
            (" " + constant_1.InjectLineName + "=\"" + line + "\" " + constant_1.InjectColumnName + "=\"" + column + "\" " + constant_1.InjectPathName + "=\"" + filePath + "\"") +
            targetLine.slice(columnToInject);
        codeLines[line - 1] = newLine; // 替换注入后的内容
        source = codeLines.join('\n');
    }
    return source;
}
exports.getInjectContent = getInjectContent;
//# sourceMappingURL=inject-ast.js.map