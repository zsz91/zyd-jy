import router from './router.config';
import path from 'path';
const resolve = dir => path.join(__dirname, '../'+dir);
export  default {
    publicPath:'./',
    base:'',
    history: 'hash',
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                locale: {
                    enable: true,
                    default: 'zh-CN',
                    baseNavigator: true,
                },
                dynamicImport: {
                    loadingComponent: '',
                }
            }
        ]
    ],
    routes:router , //路由配置
    chainWebpack(config, { webpack }) {
        // 删除进度条插件
        config.plugins.delete('progress');
        config.resolve.alias
            .set('src',resolve('src'))
            .set('components',resolve('src/components'))
            .set('utils',resolve('src/utils'))
            .set('config',resolve('src/config'))
            .set('api',resolve('src/api'))
            .set('request',resolve('src/utils/request'))
            .set('pages',resolve('src/pages'))
            .set('stores',resolve('src/stores'))
            .set('common',resolve('src/common'))
            .set('hoc',resolve('src/hoc'))
            .set('assets',resolve('src/assets'));

    },
    theme: {
        "@primary-color": 'rgba(43,69,181,1)'
    },
    cssLoaderOptions:{
        localIdentName:'[local]'
    }
}
