
export const getPerm=(user)=>{
    const u = user.role
   
    switch (u){
        case 1:
            return 'super_user'
        case 2:
            return 'mediator'
        case 3:
            return 'user'
        default:
            return null
    }
}