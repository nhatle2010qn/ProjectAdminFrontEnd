const currentUser = JSON.parse(localStorage.getItem('currentUser'));

console.log(currentUser);
export function authHeader(){
    if(currentUser && currentUser.token){
        return { Authorization: 'Bearer '+currentUser.token  };
    }
}