const env = 'development';

const config = {
    development:{
        api:'http://10.0.0.3:3000'
    },
    staging:{
        api:'http://stating'
    },
    production:{
        api:'http://production'
    }
};

export default config[env];