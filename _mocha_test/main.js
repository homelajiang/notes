var fibonacci = function (n) {
    if (n === 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
};

if(require.main === module){
    //如果是直接执行main.js，如果是被其他文件require的则不会执行
    var n = Number(process.argv[2]);
    console.log('fibonacci('+n+')is',fibonacci(n));
}

exports.fibonacci = fibonacci;