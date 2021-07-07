const { parse, rewriteDefault } = require('@vue/compiler-sfc');
const { compile } = require('@vue/compiler-dom');
const babel = require('@babel/core');

let Map = {};
const handleAst = (ast, str) => {
  if (ast && ast.type === 1) {
    if (ast.children && ast.children.length) {
      for (let i = ast.children.length - 1; i >= 0; i--) {
        str = handleAst(ast.children[i], str);
      }
    }
    const lines = str.split('\n');
    const line = ast.loc.start.line;
    const column = ast.loc.start.column;
    const st = column + ast.tag.length;
    let targetLine = lines[line - 1];
    targetLine = targetLine.slice(0, st) + ' line="111"' + targetLine.slice(st);
    lines[line - 1] = targetLine;
    str = lines.join('\n');
    return str;
  }
  return str;
};
module.exports = function (content, map) {
  // babel.transform(content);
  console.log('------:', this.loaders);
  const pathh = this.resourcePath;
  if (Map[pathh]) {
    // return Map[pathh];
  } else {
    const ast = parse(content);
    const aast = ast.descriptor.template.ast;
    const source = aast.loc.source;
    const res = handleAst(aast, source);
    // console.log(res);
    const tt = ast.descriptor.source.replace(source, res);
    Map[pathh] = tt;
    // return tt;
  }
  this.callback(null, Map[pathh]);
  return;
};
