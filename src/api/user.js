import axios from '@/utils/ajaxRequest'

let login = function(user){
  return axios.request({
    url:'login',
    method:'post',
    data:user,
    headers:{
      'Content-Type':'application/json'
    }
  })
}

let validate = function(){
  return axios.request({
    url:'validate',
  })
}

let upload = function(fd){
  return axios.request({
    url:'upload',
    method:"post",
    data:fd,
    headers:{
      'Content-Type':'multipart/form-data'
    }
  })
}

export default {
  login,
  validate,
  upload
}