const { config:_versionConfig } = require("./package.json");

const {banban_version,guess_version,voice_version,who_version,shibushi_version,expandtravel_version,sing_version,juben_version,teammate_version,dialog_version} = _versionConfig
const notifyHookUrl_sing='https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=649825d8-5a20-4e32-84e6-aeb21032dd5c'
const notifyHookUrl_other="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=2cd44145-00dc-4df1-a227-27ade88f0cb6"
const notifyHookUrl_guess = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=4e6a0b9a-5875-420e-98d2-fd3746b8eaa6'

module.exports = [
  {
    name: "音乐派对",
    appName: "sing",
    appID: "wxa71188d07226bed1",
    platform: "mp-weixin",
    version: sing_version,
    pageIndex:'base/pkgSing/pages/index',
    notifyHookUrl:notifyHookUrl_sing
  },
  {
    name: "伴伴音乐派对",
    appName: "sing",
    appID: "1111941611",
    platform: "mp-qq",
    version: sing_version,
    appToken: "d5bde6d950df488765276e4012dfae75",
    pageIndex:'base/pkgSing/pages/index',
    notifyHookUrl:notifyHookUrl_sing
  },
  {
    name: "伴伴陪玩",
    appName: "banban",
    appID: "wx61e35ef7199d05e9",
    platform: "mp-weixin",
    version: banban_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "伴伴交友",
    appName: "banban2",
    appID: "1110282758",
    appToken: "746d90f3da5d9e67c857171ba1dffb27",
    platform: "mp-qq",
    version: banban_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  // {
  //   name: "伴伴交友",
  //   appName: "banban3",
  //   appID: "1110653278",
  //   appToken: "8bddbc44bb30d1dfd57ab6f0431cef94",
  //   platform: "mp-qq",
  //   version: banban_version,
  //   pageIndex:'base/pages/index/index',
  //   notifyHookUrl:notifyHookUrl_other
  // },
  {
    name: "陪你1314",
    appName: "banban4",
    appID: "wxe4575e357aa72cc4",
    platform: "mp-weixin",
    version: banban_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "派对",
    appName: "banban5",
    appID: "wx7d5c2b6c6ee83ba1",
    platform: "mp-weixin",
    version: banban_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "恋恋CP",
    appName: "voice",
    appID: "wx49d80b5d14c83f29",
    platform: "mp-weixin",
    version: voice_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "恋爱CP",
    appName: "voice",
    appID: "1111647170",
    platform: "mp-qq",
    version: voice_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },
  {
    name: "你画我猜组局",
    appName: "guess",
    appID: "wxd8e7feee2ab11ecd",
    platform: "mp-weixin",
    version: guess_version,
    pageIndex:'base/pkgGuess/pages/index/index',
    notifyHookUrl:notifyHookUrl_guess
  },
  {
    name: "一起画一画",
    appName: "guess",
    appID: "1109952303",
    platform: "mp-qq",
    appToken: "b61c5cc10b27f3f048bc8b8f1c7f8601",
    version: guess_version,
    pageIndex:'base/pkgGuess/pages/index/index',
    notifyHookUrl:notifyHookUrl_guess
  },
  {
    name: "谁是凶手【剧本】",
    appName: "who",
    appID: "wx836b2f72d8a03da2",
    platform: "mp-weixin",
    version: who_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },
  {
    name: "谁是凶手【剧本】",
    appName: "who",
    appID: "1109615067",
    appToken: "b61d1dccaa53e3aeee6c2d6cf8959ecd",
    platform: "mp-qq",
    version: who_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "是不是",
    appName: "shibushi",
    appID: "wx9a382ce228366587",
    platform: "mp-weixin",
    version: shibushi_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "海龟汤",
    appName: "shibushi",
    appID: "1111903768",
    appToken: "43260d1ead6c92177764308ce001d230",
    platform: "mp-qq",
    version: shibushi_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "扩列交友旅行",
    appName: "expandtravel",
    appID: "1111049017",
    appToken: "79daa75bae397f4048a2e0d70b8edff5",
    platform: "mp-qq",
    version: expandtravel_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "剧本杀工具",
    appName: "juben",
    appID: "wxd4202c4bdad01d7f",
    platform: "mp-weixin",
    version: juben_version,
    pageIndex:'base/pkgJubenTools/pages/home/home',
    notifyHookUrl:notifyHookUrl_other
  },
  {
    name: "皮队友",
    appName: "teammate",
    appID: "wx9dde416079fa584e",
    platform: "mp-weixin",
    version: teammate_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },
  {
    name: "皮队友",
    appName: "teammate",
    appID: "1110880901",
    appToken: "b6619dfcf74d05b31fad02eee2fce184",
    platform: "mp-qq",
    version: teammate_version,
    pageIndex:'base/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },
  {
    name: "对话闯关",
    appName: "dialog",
    appID: "wx805f4bb2e3df3ec5",
    platform: "mp-weixin",
    version: dialog_version,
    pageIndex:'base/pkgDialog/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },
  {
    name: "恋爱聊天小游戏",
    appName: "dialog2",
    appID: "1111831934",
    platform: "mp-qq",
    appToken: "98b509f9b16afb0effc950bab9f5a001",
    version: dialog_version,
    pageIndex:'base/pkgDialog/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },
  {
    name: "你会聊天吗",
    appName: "dialog",
    appID: "1111509125",
    platform: "mp-qq",
    appToken: "e5abc4f8d106dea2a17b27928c06ba1f",
    version: dialog_version,
    pageIndex:'base/pkgDialog/pages/index/index',
    notifyHookUrl: notifyHookUrl_other
  },

];
