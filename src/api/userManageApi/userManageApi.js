export default {
  getUserList (data) {
    return axios.getAxios(`/users?query=${data.query}&pagenum=${data.pagenum}&pagesize=${data.pagesize}`)
  },
  //修改状态
  editState (data) {
    return axios.putAxios(`/users/${data.id}/state/${data.mg_state}`)
  },
  //根据id获取修改信息
  getEditUser(id) {
    return axios.getAxios(`/users/${id}`)
  },
  //添加用户
  addUser(data) {
    return axios.postAxios(`/users`, data)
  },
  //修改保存用户
  editUser(id,data){
    return axios.putAxios(`/users/${id}`, data)
  },
  //删除
  deleteUserUid(id){
    return axios.deleAxios(`/users/${id}`)
  },
  //获取所有角色
  getAllRoleList() {
    return axios.getAxios(`/roles`)
  }
}
