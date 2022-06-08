import Taro from '@tarojs/taro'
import System from '../system'
import Session from './session'
import DeviceInfo from './deviceInfo'
import Utility from './utility'
import Md5 from './md5'
import Log from './log'
import Debug from './debug'

var _queryIndex = 0
export default class Xhr {
  static get(url, options = {}) {
    Xhr.getJson(url)
      .then(res => {
        if (options.onComplete) options.onComplete(res)
      })
      .catch(e => {
        if (options.onError) options.onError(null, null, e.message)
      })
  }

  static post(url, data, options = {}) {
    Xhr.postJson(url, data)
      .then(res => {
        if (options.onComplete) options.onComplete(res)
      })
      .catch(e => {
        if (options.onError) options.onError(null, null, e.message)
      })
  }

  static getJson(url, options) {
    var options = options || {}
    return new Promise((resolve, reject) => {
      uni.request({
        url: Xhr._withUrl(url, options.isGoLang),
        header: Xhr.getHeader()
      })
        .then(res => {
          Xhr.parseHeader(res)
          if (res.statusCode != 200 || typeof res.data == 'string') {
            reject({ message: 'error json' })
          } else {
            if (res.data.success === true || options.disableAutoError) {
              resolve(res.data)
            } else {
              Debug.liveLog('GET请求内部错误', url, res)
              reject({ message: res.data.msg || '服务返回数据异常' })
            }
          }
        })
        .catch(e => {
          Debug.liveLog('GET请求错误', url, options, e)
          reject({ message: '网络请求错误' })
        })
    })
  }

  static postJson(url, data, options) {
    var options = options || {}
    return new Promise((resolve, reject) => {
      Taro.request({
        url: Xhr._withUrl(url, options.isGoLang),
        data: data,
        method: 'post',
        header: options.UA ? Object.assign({}, Xhr.getHeader(), { 'U-A': Xhr.getAgent() }) : Xhr.getHeader()
      })
        .then(res => {
          Xhr.parseHeader(res)
          if (res.statusCode != 200 || typeof res.data == 'string') {
            reject(Xhr._getEror(res))
          } else {
            if (res.data.success === true || options.disableAutoError) {
              resolve(res.data)
            } else {
              console.log('POST请求内部错误', url, res)
              reject({ message: res.data.msg || '服务返回数据异常', data: res.data })
            }
          }
        })
        .catch(e => {
          console.log('POST请求错误', url, options, e)
          reject({ message: e.message || '网络请求错误' })
        })
    })
  }

  static _getEror(res) {
    if (res.statusCode >= 500) {
      return { message: '服务器返回异常，请重试' }
    } else if (res.statusCode >= 400) {
      return { message: '错误的请求，请重试' }
    } else if (res.statusCode >= 300) {
      return { message: '登录状态可能已过期，请重试' }
    } else {
      return { message: '服务器返回数据错误，请重试' }
    }
  }

  static _withUrl(url, port) {
    _queryIndex++
    var args = {
      package: System.packageName || '',
      _ipv: System.isVerify ? '1' : '0',
      _platform: DeviceInfo.platform + '.' + DeviceInfo.appPlatform,
      _index: _queryIndex.toString(),
      _model: DeviceInfo.model || '',
      _timestamp: parseInt(new Date().getTime() / 1000).toString()
    }
    var keys = Object.keys(args)
    keys.sort()

    var hashArgs = []
    keys.forEach(key => {
      if (args[key] != null) {
        hashArgs.push(key + '=' + args[key])
      }
    })
    args['_sign'] = Md5.hex_md5(hashArgs.join('&') + '!mini#')

    if (url.indexOf('go/') == 0) {
      //goLang接口
      args['format'] = 'json'
    }

    var query = []
    for (var key in args) {
      if (args.hasOwnProperty(key)) {
        query.push(key + '=' + encodeURIComponent(args[key]))
      }
    }

    let urlpre
    if (url.indexOf('miniexpand/home') > -1) {
      urlpre = url.indexOf('http') > -1 ? '' : System.apiDomainNew
    } else {
      urlpre = url.indexOf('http') > -1 ? '' : System.apiDomain
    }


    let querystring = urlpre + url + (url.indexOf('?') > -1 ? '&' : '?') + query.join('&')
    return querystring
  }

  static parseHeader(res) {
    var headers = res.header
    if (!headers || !Utility.isObject(headers)) return
    var keys = Object.keys(headers)
    keys.forEach(key => {
      if (key.toLowerCase() == 'user-status') {
        try {
          var userStatus = JSON.parse(headers[key])
          if (userStatus && Utility.isObject(userStatus) && userStatus['status'] == 403) {
            Session.logout()
          }
        } catch (e) {}
      }
    })
  }

  static getAgent() {
    var agent = DeviceInfo.userAgent
    if (agent == null || agent.isEmpty) {
      agent = 'Agent'
    } else {
      agent = agent.replace(/[\u4E00-\u9FA5]/g, '')
    }
    return agent + ` / Xs android V${System.appVersion}.0 / Js V1.0.0.0 / Login V` + Session.version.toString()
  }

  static getHeader() {
    return {
      'content-type': 'application/x-www-form-urlencoded',
      //'User-Agent' : Xhr.getAgent(),
      'User-Tag': encodeURIComponent(Log.mac), //mac
      'User-Channel': encodeURIComponent(Log.channel), //渠道号
      'User-Model': encodeURIComponent(DeviceInfo.model),
      'user-token': Session.token
    }
  }
}
