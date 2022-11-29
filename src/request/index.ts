import axios from "axios";
//创建axios实例
const service = axios.create({
    baseURL: "http://localhost:9000",
    // baseURL:"https://api.apiopen.top/api",
    // baseURL:"https://www.fastmock.site/mock/88589a30789822d059bca54bf21044d8/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",

    }
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截
service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code != 200) {
        return Promise.reject(res.data)
    }
    // 兼容服务端返回的字符串数据
    if (typeof res.data === 'string') {
        res.data = (res.data ? JSON.parse(res.data) : res.data)
    }

    return res.data
}, (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
})

export default service
