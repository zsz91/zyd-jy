import fetch from 'isomorphic-fetch';
import hash from 'hash.js';
import router from 'umi/router';
import FormdataWrapper from './object-to-formdata-custom';
import { getLocal } from 'utils';
import stores from 'stores';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '登录已过期,请重新登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkStatus = response => {
  if (response.status !== 401 ) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;

  window.CommonStore.notification({
    message: `${response.status ===401 ? "登录过期":"请求错误"} ${response.status}`,
    description: errortext,
  })
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  stores.CommonStore.rest();
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  options = {

  }
) {
  let config = getLocal('config');
  config = config ? JSON.parse(config) : null;
  let defaultToken = config ? config.access_token : null;
  const token = defaultToken !== null && defaultToken !== "null" ? defaultToken:"0000";
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
   if(token){
     if(url.indexOf('?')>=0){
       url = url + '&token=' + token
     }else{
       url = url+"?token="+token;
     }

  }
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash.sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'omit',
    mode: 'cors',
  };

  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {


    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };

      newOptions.body =FormdataWrapper(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (response.status !== 200) {
        return response.text();
      }
      return response.json();
    })
    .then(response => {
      if (typeof response == 'string') {
        try{
          const xxx = JSON.parse(response)

          notification.error({
            message: "操作失败",
            description: xxx.errMsg,
          });
          return null;
        }catch(e){
          return response;
        }
      }
      return response;
    })
    .catch(e => {

      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */

        return;
      }
      // environment should not be used
      if (status === 403) {
        router.push('/404');
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push('/500');
        return;
      }
      if (status >= 404 && status < 422) {
        router.push('/404');
      }
      window.CommonStore.notification({
        message: "网络故障",
        description: "无法连接到服务器,请检查您的网络",
      })
      return;
    });
}
