import axios from 'axios'

export function request2(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
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