import axios from 'axios'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 50000
  })

//axios拦截器
//请求拦截的作用
instance.interceptors.request.use(config => {
  return config
}, err => {})

//响应拦截
instance.interceptors.response.use(res => {
  return res.data
}, err => {

})
return instance(config)
}