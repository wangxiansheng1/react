wrap商城项目结构描述

项目运行

npm install     //下载package.json依赖库插件

npm run start   //热替换

npm run dist //打包生产环境


├── dist                                        // 项目打包路径
├── elm                                         // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── components                              // UI组件
│   │   ├── common                              // 公共组件
│   │   ├── footer                              // 底部公共组件
│   │   └── header                              // 头部公共组件
│   ├── config                                  // 基本配置
│   ├── container                               // 容器组件
│   ├── images                                  // 公共图片
│   ├── layouts                                 // 布局组件
│   ├── lib                                     // 外部引入
│   ├── router                                   
│   ├── redux                                   // redux的状态管理
│   │   ├── action                              // 配置actions
│   │   ├── reducer                             // 配置reducer
│   │   ├── store                               // 创建store
│   └── style                                   // 样式
│   │   ├── common                              // 公共样式
│   │   ├── header                              // header样式
│   │   ├── footer                              // footer样式
│   │   ├── components                          // components样式
│   ├── ApP.jsx                                 // 页面入口文件
│   ├── template                                // 页面模块入口文件
├── .babelrc                                    // 转义ES6配置文件
├── .gitignore                                  // git配置文件
├──  package.json                               // 项目依赖库
├── webpack.config.dist.js                      // webpack 生产环境打包
├── webpack.loaders.js                          // webpack 引入loaders



