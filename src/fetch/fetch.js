import axios from 'axios'
import router from "../router"
// 封装请求 及 配置
const host = 'https://yoga.17link.cc'
export const fetch = (url, options) => {
  axios.defaults.headers = {
    "Content-Type": "application/json",

    "Accept": "application/json"
  };
  // axios.defaults.withCredentials = true
  const api_token = localStorage.getItem('api_token') || ''


  if (/$http|$https/.test(url)) {
    url = url
  } else {
    axios.defaults.baseURL = host + url 
    if (url.indexOf("?") == -1) {
      url = `${host}${url}?api_token=${api_token}`;
    } else {
      url = `${host}${url}&api_token=${api_token}`;
    }
  }
 
  
  return new Promise((resolve, reject) => {
    axios(url ,options)
      .then(response => {
        if (response.status == 200 && response.data.state == 401) {
          localStorage.removeItem('api_token')
          const currentRoute = router.currentRoute
          const currentPage = {
            name: currentRoute.name,
            query: currentRoute.query
          }
          if (currentRoute.name !== 'index') {
            localStorage.setItem('currentRoute', JSON.stringify(currentPage))
          }
          window.location.href = 'https://yoga.17link.cc/api/my/web_auth?page=https://yoga.17link.cc/dist/index.html' 
        } else if (response.status == 200) {
          resolve(response.data);
        } 
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}