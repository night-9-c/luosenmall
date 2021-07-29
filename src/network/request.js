import axios from "axios";

export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios的拦截器
  //请求拦截
  axios.interceptors.request.use(config =>{
    console.log(config);
    //1.config中不符合服务器的要求
    //2.加载时显示请求的图标
    //3.登录（token），特殊信息
    return config
  },err=>{
    console.log(err)
  });

  //响应拦截
  axios.interceptors.response.use(res =>{
    return res.data
  },err=>{
    console.log(err)
  })
  //3.发送真正网络请求
  return instance(config)
}
