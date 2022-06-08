// const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const shell = require("shelljs");
const axios = require("axios");
const fs = require("fs");
const ci = require("miniprogram-ci");
const fileHash = require("./tools/fileHash");
// 小程序上传
module.exports = async function runUpload(item) {
  item.desc =  `${item.userName} ci build ${item.version} ${item.env} ${item.env != 'api' ? '非线上环境，不能提审!!' : ''}`;
  switch (item.platform) {
    case "mp-weixin": //微信小程序上传
      await uploadWechat(item);
      break;
    case "mp-qq": //QQ小程序上传
      await uploadQQ(item);
      break;
    default:
      console.log("platform not supported");
  }
};
// 微信小程序上传
async function uploadWechat(item) {
  const project = new ci.Project({
    appid: item.appID,
    type: "miniProgram",
    projectPath: path.join(
      __dirname,
      `../dist/${item.platform}-${item.appName}`
    ),
    privateKeyPath: path.join(__dirname, `./keys/private.${item.appID}.key`),
    ignores: ['node_modules/**/*'],
  });

  const uploadResult = await ci.upload({
    project,
    version: item.version,
    desc: item.desc,
    setting: {
      es6: true,
      minify: true,
      autoPrefixWXSS: true,
      minifyWXML: true,
      minifyWXSS: true,
      minifyJS: true
    }
  });

  await notifyGroupNew(item);
  console.log("====uploadResult", uploadResult);
}

// QQ小程序上传
function uploadQQ(item) {
  return new Promise((resolve, reject) => {
    const flag = `${item.platform}-${item.appName}`;
    const buildPath = path.join(__dirname, `../dist/${flag}`);

    shell.exec(
      `docker run \
        -e PLUGIN_VERSION=${item.version} \
        -e PLUGIN_DESC=${item.desc} \
        -e PLUGIN_APPTOKEN=${item.appToken} \
        -e PLUGIN_EXPERIENCE=true \
        -e PLUGIN_PREVIEW=false \
        -e PLUGIN_BUILDUSER=robot \
        -e PLUGIN_FIRSTPAGE=${item.pageIndex} \
        -e PLUGIN_USEPACKAGEJSON=false \
        -e PLUGIN_NPMBUILD=false \
        -v "${buildPath}":"/tmp" \
        -w /tmp "qqminiapp/build:latest"
      `,
      async function(error, stdout, stderr) {
        if (error) {
          reject(error);
          return;
        }

        // let str = JSON.stringify(stdout);
        // matchReg = /(?<=link: ').*?(?=')/;
        // let link = str.match(matchReg)[0];
        // if (!link) return;

        await notifyGroupNew(item);

        resolve(stdout);
      }
    );
  });
}

async function notifyGroupNew(item) {
  var myDate = new Date(); //实例一个时间对象；

  const h = myDate.getHours(); //获取系统时，
  const s = myDate.getMinutes(); //分
  const m = myDate.getSeconds(); //秒

  const msg = `
  ${item.name} --v${item.version} 
  ${item.appName}/${item.platform}/${item.env}
  
  体验版更新于：${h}:${s}:${m}
  构建者：${item.userName}

  ${item.platform == "qq" ? "QQ" : "微信"} 扫码体验 
  `;
  console.log(msg);
  // 企业微信不支持直接跳转qq
  await axios.post(item.notifyHookUrl, {
    msgtype: "text",
    text: {
      content: msg,
      // mentioned_list: ["@all"]
    }
  });

  const qrimg = item.platform == 'qq' ? `../dist/${item.platform}-${item.appName}/qrcode.png` : './wechat.jpg';

  let filePath = path.join(__dirname, qrimg);
  const data = await fileHash(filePath);
  await axios.post(item.notifyHookUrl, {
    msgtype: "image",
    image: {
      base64: fs.readFileSync(filePath).toString("base64"),
      md5: data
    }
  });
}