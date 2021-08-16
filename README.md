# vnode-loader

用于向 vue 项目编译后的 dom 上注入其对应编译前的代码在编辑器中位置信息的 webpack loader。<br/>

配合 [vnode-plugin](https://github.com/zh-lx/vnode-plugin) 一起使用
## 安装
### 1. 安装 `vnode-loader` 和 `vnode-plugin`
在项目根目录执行以下命令：
```
yarn add vnode-loader vnode-plugin -D
```
or
```
npm install vnode-loader vnode-plugin -D
```
### 2. 修改 `vue.config.js` 文件
在 `vue.config.js` 文件中，添加如下的 chainWebpack 配置<b>（注意需要判定一下环境，该功能只用于开发环境下）</b>：
```js
// vue.config.js
module.exports = {
    // ...other code
    chainWebpack: (config) => {
        // 添加如下代码，注意判别环境
        if (process.env.NODE_ENV === 'development') {
            const VNodePlugin = require('vnode-plugin');
            config.module
                .rule('vue')
                .test(/\.vue$/)
                .use('vnode-loader')
                .loader('vnode-loader')
                .end();
            config.plugin('vnode-plugin').use(new VNodePlugin());
        }
    }
};
```
### 3. Mac添加环境配置
mac本需额外添加如下的配置（适用于vscode），window应该不需要：
- 在项目根目录添加一个名为 `.env.local` 的文件夹，内容如下：<br>
    ```
    # editor
    VUE_EDITOR=code
    ```
- 在 vscode 中执行 `Command + Shift + P`, 输入 `shell Command: Install 'code' command in Path` 并点击该命令：

    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4dae5fc05664650b3ac61ba7fbc7370~tplv-k3u1fbpfcp-watermark.image)
    出现以下弹窗表示设置成功： 
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bcb5cef91d249afa7ed845620937cc3~tplv-k3u1fbpfcp-watermark.image)
## 效果
