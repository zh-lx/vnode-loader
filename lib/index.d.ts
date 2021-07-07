/// <reference types="node" />
/**
 * @description inject line、column and path to VNode when webpack compiling .vue file
 * @type webpack.loader.Loader
 */
declare function TrackCodeLoader(this: any, content: string | Buffer, map: object, meta: any): string | Buffer;
export = TrackCodeLoader;
