//封装请求相关的方法
import axios from "axios"
// 导入请求加载进度条
let instance=axios.create({
    baseURL:process.env.VUE_APP_SSO,
    timeout:30000
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
})


export default instance