const shell = require("shelljs");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const runUpload = require('../index')
const execSync = require("child_process").execSync

//主域名配置
const domainMap = {
  'teammate': 'imhotplay.com',
  'who': '91hotplay.com'
}

// 小程序打包
module.exports = function runBuild(item) {
  const promise = new Promise((resolve, reject) => {
    try{
      if(!item.userName){
        item.userName = execSync("git config user.name").toString().trim();
      }
    }catch(e){}

    if(!item.userName){
      return reject(new Error('构建人userName不能为空'));
    }

    shell.exec(
        `cross-env NODE_ENV=development  UNI_OUTPUT_DIR=dist/build/${item.appName}-${item.platform} uni -p ${item.platform}`,
      {
        async: true,
      },
      async function(error, stdout, stderr) {
        
        if (error) {
          return reject(error);
        }
        resolve(stdout);
        try {

          // 开始上传
          if((!argv.watch && item.upload && item.userName) || argv.upload){
            runUpload(item)
          }
        } catch (e) {
          console.log("runUpload error::", e);
          reject(e);
        }
      }
    );
  });

  return promise;
};
