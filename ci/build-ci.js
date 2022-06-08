/* eslint-disable import/no-commonjs */
const inquirer = require('inquirer');
const buildList = require('../build.apps');
const chalk = require('chalk');
const runBuild = require('./tools/runBuild');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
let buildChoice = buildList.map(v => {
  return `${v.name}/${v.appName}/${v.platform}`;
});

const buildFromArgv = () => {
  //参数打包
  const { appName, platform, v, env, userName } = argv;
  const buildInfo = buildList.filter(x => {
    return x.appName == appName && x.platform == platform;
  })[0];
  if (!buildInfo) {
    console.error('未找到要打包的小程序');
    return;
  }

  console.log(
    chalk.green(
      `\n FromArgv开始打包${buildInfo.name}/${appName}/${platform}/${env}--v${buildInfo.version}`
    )
  );

  runBuild({
    ...buildInfo,
    env,
    userName,
    upload: true
  });
};

if (argv.fromArgv) {
  buildFromArgv();
} else {
  //交互式指令
  const envChoice = ['api', 'alpha', 'dev'];
  const uploadChoice = ['是', '否'];
  // 自定义交互式命令行的问题及简单的校验
  let question = [
    {
      name: 'name',
      type: 'checkbox',
      message: '请选择要打包的小程序',
      choices: buildChoice
    },
    {
      name: 'env',
      type: 'list',
      message: '请选择环境',
      choices: envChoice
    }
  ];
  question = !argv.watch
    ? question.concat([
      {
        name: 'upload',
        type: 'list',
        message: '是否上传体验版',
        choices: uploadChoice
      }
    ])
    : question;

  inquirer.prompt(question).then(answers => {
    let res = answers.name.map(v => {
      let str = v.split('/');
      return {
        name: str[0],
        appName: str[1],
        platform: str[2]
      };
    });
    let finalList = buildList.filter(v => {
      const findIndex = x => {
        return x.appName == v.appName && x.platform == v.platform;
      };
      let index = res.findIndex(findIndex);
      return index !== -1;
    });
    finalList.map(v => {
      console.log(
        chalk.green(
          `\n 开始打包${v.name}/${v.appName}/${v.platform}/${answers.env}--v${v.version}`
        )
      );
      runBuild({ ...v, env: answers.env, upload: answers.upload == '是' });
    });
  });
}
