/*
 * @Description: vite整体配置项
 * @Autor: duym
 * @Date: 2022-09-21 18:47:36
 * @LastEditors: duym
 * @LastEditTime: 2022-12-26 14:21:00
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 注意：在 ts 模块中加载 node 核心模块需要安装 node 的类型补充模块：npm i -D @types/node
import path from 'path'
import viteCompression from 'vite-plugin-compression'
// 打包体积分析
import fs from 'fs'
import dotenv from 'dotenv'
//自动导入compositionAPI
import autoImport from 'unplugin-auto-import/vite'
import componentsVite from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 打包体积分析
import { visualizer } from 'rollup-plugin-visualizer'
import resolveExternalsPlugin from 'vite-plugin-resolve-externals'
/**
 * command - 命令模式
 * mode - 生产、开发模式
 */
export default defineConfig(({ command, mode }): Object => {
    try {
        // 根据环境变量加载环境变量文件
        const file = dotenv.parse(fs.readFileSync(path.resolve(__dirname, './env', `.env.${mode}`)))
        // 根据获取的key给对应的环境变量赋值
        for (const key in file) {
            process.env[key] = file[key]
        }
    } catch (e) {
        console.error(e)
    }
    return {
        // 静态资源基础路径 base:"./":"/"
        base: './',
        envDir: './env', //这里使用相对路径，绝对路径其实也可以（环境变量配置的文件路径）
        envPrefix: ['VITE', 'VENUS'], //vite默认只加载VITE（设置prefix可识别其他配置项）
        plugins: [
            vue({ reactivityTransform: true }),
            vueJsx(),
            // 自动引入compostitionApi和全局typescript说明
            autoImport({
                resolvers: [ElementPlusResolver()],
                include: [
                    /\.[t]sx?$/, //匹配.ts,.tsx,.js,.jsx
                    /\.vue$/,
                    /\.vue\?vue/, //.vue
                    /\.md$/ //.md
                ],
                imports: ['vue', 'vue-router'], //自动导入vue和vue-router相关方法
                dts: 'src/auto-imports.d.ts' //生成auto-import.d.ts  全局声明
            }),
            componentsVite({
                resolvers: [ElementPlusResolver()],
                dts: 'src/components-imports.d.ts', //生成components-import.d.ts  全局声明
                dirs: ['src/components'] //按需加载的文件夹
            }),
            visualizer({
                open: true, //设置为 true,否则无效
                gzipSize: true,
                brotliSize: true
            }),
            resolveExternalsPlugin({ AMap: 'AMap' }),
            // 需要时可以放开，这里暂时没有调用
            viteCompression({
                // 生成压缩包gz
                verbose: true, //输出压缩成功
                disable: false, // 是否禁用
                threshold: 10240, // 体积大于阈值会被压缩，单位是b
                algorithm: 'gzip', // 压缩算法
                ext: '.gz' // 生成的压缩包后缀
            })
        ],
        // 强制预构建插件包
        optimizeDeps: {
            include: ['axios']
        },
        css: {
            // css预处理器
            preprocessorOptions: {
                less: {
                    chartset: false,
                    modifyVars: {
                        // 全局less变量存储路径(配置less的全局变量)
                        hack: `true; @import (reference) "${path.resolve('src/styles/common.less')}";`
                    },
                    javascriptEnabled: true
                }
            },
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule: any) => {
                                // 去除elementPlus内部charset警告
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            }
                        }
                    }
                ]
            }
        },
        build: {
            sourcemap: mode === 'prod' && command === 'build', //是否构建source map 文件
            outDir: 'dist', //指定输出路径
            assetsDir: 'assets', //指定静态资源存放路径
            chunkSizeWarningLimit: 1000,
            cssCodeSplit: true, //提取css一个文件
            emptyOutDir: true, //打包前先清空原有打包文件
            // 生产情况下清空console
            // minify: 'terser',Vite3需要单独安装插件
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                },
                ie8: true,
                output: { comments: true } // 删除注释
            },
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, 'index.html')
                },
                compact: true,
                // 拆分代码，按需加载
                manualChunks: {
                    vue: ['vue', 'vue-router']
                },
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                },
                brotliSize: false // 不统计
            }
        },
        resolve: {
            // 设置路径别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@imgs': path.resolve(__dirname, 'src/assets/imgs'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@interface': path.resolve(__dirname, 'src/interface'),
                '@views': path.resolve(__dirname, 'src/views'),
                // '@store': path.resolve(__dirname, 'src/store'),
                '@api': path.resolve(__dirname, 'src/api'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@local': path.resolve(__dirname, 'src/local'),
                '@hooks': path.resolve(__dirname, 'src/hooks')
            }
        },
        server: {
            open: true,
            port: 3000,
            proxy: {
                [mode === 'mock' ? '/app' : '/user']: {
                    target: process.env.VITE_BASE_URL,
                    secure: true, // 如果是https接口，需要配置这个参数为true
                    changeOrigin: true
                    // rewrite: (path) => path.replace(/^\/a/, '')
                    // pathRewrite:{
                    //     '^/api':''
                    // }
                }
                // '/user': {
                //     target: process.env.VITE_BASE_URL,
                //     secure: true, // 如果是https接口，需要配置这个参数为true
                //     changeOrigin: true,
                //     // rewrite: (path) => path.replace(/^\/a/, '')
                //     // pathRewrite:{
                //     //     '^/api':''
                //     // }
                // },
            }
        },
        define: {
            'process.env': process.env
        }
    }
})
