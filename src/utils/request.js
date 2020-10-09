import axios from 'axios'
import Vue from 'vue';
import {Message} from 'element-ui';
const instance = axios.create({
  baseURL:'/api/private/v1/',
  timeout:5000
})
//axios全局拦截
instance.interceptors.request.use(config => {
  //为请求头对象，添加token验证对象 Authorization
  let token = null
  if (sessionStorage.getItem('vueAxios')) {
    let vueAxios = JSON.parse(sessionStorage.getItem('vueAxios'))
    token = vueAxios.token ? vueAxios.token : null
  }
  config.headers.Authorization = token
  return config
})

//拦截返回进行配置 弹信息报错等
instance.interceptors.response.use(
  function (response) {
    if (response.data.meta.status !== 200) {
      Message(response.data.meta.msg);
    }
    return response.data;
  },
  function (error) {
    // console.log(error);
    return Message.error('请求错误，请稍后重试');
  }
);
instance.getAxios = function (url) {
  return instance({
    method: 'GET',
    dataType: "json",
    url: url,
  })
},
  instance.putAxios = function (url,data) {
    return instance({
      method: 'PUT',
      dataType: "json",
      url: url,
      data:data
    })
  },
  instance.postAxios = function (url,data) {
    return instance({
      method: 'POST',
      dataType: "json",
      url: url,
      data:data
    })
  }
instance.deleAxios = function (url, data) {
  return instance({
    method: 'DELETE',
    dataType: "json",
    url: url,
    data: data,
  });
};

/**
 * 注册插件
 */

Plugin.install = function (Vue, options) {
  //两个地方都挂 方便调用
  Vue.axios = instance;
  window.axios = instance;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return instance;
      }
    },
    $axios: {
      get() {
        return instance;
      }
    },
  });
};

Vue.use(Plugin);
export default Plugin;
