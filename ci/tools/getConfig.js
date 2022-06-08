const path = require("path");
const fs = require("fs");
const shell = require("shelljs");

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const {p: platform , a: appName, all: isAll} = argv || {} // platform, appname

const CONFIG = require( "../../build.apps.js")

function initConfig() {
  if(isAll){
    return CONFIG;
  }

  if(platform){
    const platformArr = CONFIG[platform];
    if(!platformArr || !platformArr.length) return null;
    let buildItem;
    platformArr && platformArr.map(item=>{
      if(item.appName == appName) buildItem = item;
    });
  
    buildItem = buildItem || platformArr[0];

    return {
      [platform] : [buildItem]
    }
  }

  return null;
}

const buildArr = initConfig();
if(!buildArr) console.log('无可用打包信息');

module.exports = buildArr;