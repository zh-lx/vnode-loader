import { LoaderContext } from 'webpack';
/**
 * @description inject line、column and path to VNode when webpack compiling .vue file
 * @type webpack.loader.Loader
 */
declare function TrackCodeLoader(this: LoaderContext<any>, content: string, map: object, meta: any): void;
export = TrackCodeLoader;
