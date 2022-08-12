import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueHighlightJS from 'vue-highlightjs'
// 导入全局样式
import './assets/css/global.css'


// import style
import './assets/css/icon.css'
// 文章样式
import './assets/css/quill.snow.css'
// 代码高亮样式
import './assets/css/monokai-sublime.css'
// 导入插件
import './plugin'
import instance from './util/blog_request'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
// Vue.use(VueHighlightJS)
Vue.prototype.$http=instance
instance.interceptors.request.use(config => {
  config.headers.sessiontoken = localStorage.getItem('token')
  return config
})
// 动态加载畅易言评论外部script
Vue.prototype.$loadScript = (url, callback) => {
  let script = document.createElement('script');
  if (script.readyState) { 
    // IE浏览器
      script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              callback();
          }
      }
  } else { 
    // 其他浏览器
      script.onload = function () {
          callback();
      }
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
