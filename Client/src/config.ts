const env = 'development';

const config = {
    development:{
        api:'http://192.168.8.122:3000'
    },
    staging:{
        api:'http://stating'
    },
    production:{
        api:'http://production'
    }
};

export default config[env];