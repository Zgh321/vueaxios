import homePageApi from '@/api/homePageApi/homePageApi'
import leftNavApi from '@/api/leftNavApi/leftNavApi'
import userManageApi from '@/api/userManageApi/userManageApi'
export default {
  leftNavApi,
  homePageApi,
  userManageApi,
  //登录
  login(data){
    return axios.postAxios('/login',data)
  }
}

