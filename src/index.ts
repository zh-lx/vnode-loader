import { parse } from '@vue/compiler-sfc';
import { LoaderContext } from 'webpack';

let FileMap = {}; // 全局的FileMap，记录那些文件被处理过

/**
 * @description inject line、column and path to VNode when webpack compiling .vue file
 * @type webpack.loader.Loader
 */
function TrackCodeLoader(
  this: LoaderContext<any>,
  content: string,
  map: object,
  meta: any
) {
  const filePath = this.resourcePath; // 当前文件的绝对路径
  if (!FileMap[filePath]) {
    const vueParserContent = parse(content); // vue文件parse后的内容
    const domAst = vueParserContent.descriptor.template.ast; // template开始的dom ast结构
    const templateSource = domAst.loc.source; // template部分的原字符串
  }
}

export = TrackCodeLoader;
