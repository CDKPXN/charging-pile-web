const  isAdmin = function(){
    let user = localStorage.getItem('user')
    return user ==="admin";
  }
 module.exports={
    isAdmin
 }