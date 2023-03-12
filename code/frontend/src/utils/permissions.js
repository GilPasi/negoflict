
export const getPerm=(user)=>{
    const u = user.role
   
    switch (u){
        case 1:
            return 'admin'
        case 2:
            return 'mediator'
        case 3:
            return 'user'
        default:
            return null
    }
}