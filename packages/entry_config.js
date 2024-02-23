// 分离打包时的入口配置文件

const fs = require ('fs');
const path = require ('path');

let files = fs.readdirSync (path.resolve (__dirname, './components/'));

// 获取./components目录下面不包含.的文件
module.exports = files.filter (file => !~file.indexOf ('.'));
