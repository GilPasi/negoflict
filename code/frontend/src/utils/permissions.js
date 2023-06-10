
export const getPermName=({role})=>{

    if(!role || role === 'undifined')return 0
  
    if(role === 1)return 'admin'
    if(role === 2)return 'mediator'
    return 'user'
}

export const getPermSign = ({is_staff,is_superuser})=>{

    if(typeof is_staff !== 'boolean' || typeof is_superuser !== 'boolean')return 0

    if(is_superuser)return 1
    if(is_staff)return 2
    return 3
    
}

export const getPermTotal = ({is_staff,is_superuser})=>{
    const sign = getPermSign({is_staff,is_superuser})
    return getPermName({role:sign})
}