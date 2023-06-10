import IconImageUser from "./iconImageUser"
import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getPermName } from "../../utils/permissions"
import Header from "./Header"



const SettingsPage = ({detail})=>{
    //hooks===========
    const location = useLocation()

    //variable========
    const {isMe} = location.state ?? ''
    const user = useSelector(state=>state.user)
    const userId = isMe? user.id : detail

    //lazyApi===========

    //states===========
    const [userDetail,setUserDetail] = useState({})

    

    useEffect(()=>{
        if(isMe){
          const modify =  modUser(user)
          setUserDetail(modify,true)
      
        }

    },[userId])

    const modUser = (user,isMe)=>{
        if(Object.keys(user).length === 0)return
        const {email, first_name, last_name, role} = user
        const roleName = getPermName({role:role})

        return {
            email:[email,false],
            first_name:[first_name,false],
            last_name:[last_name,false],
            role:[roleName,false]
        }
       
    };





    




    


    
    





    return(
        <div style={{width:'100%'}}>
            <div >
                <Header isLarge={true} withoutLinks={true}/>
            <IconImageUser setting={true}/>
            {Object.keys(userDetail).length !== 0 &&
                Object.keys(userDetail).map((key,index)=>{
                    console.log('sdafasdf')
                    return(
                        <div key={index}>
                            <div style={{display:'flex', justifyContent:'space-between'}}>
                            <p style={{fontFamily:'Roboto', fontSize:'larger', fontWeight:'600', marginRight:'10px'}}>{key}:</p>
                            <p style={{fontFamily:'Roboto', fontSize:'larger'}}>{userDetail[key][0]}</p>
                            {userDetail[key][1]&& <button className="buttonModify">modify</button>}
                           
                            </div>
                           
                        </div>
                    )
                })
            }

            </div>

     
        </div>
    )

}
export default SettingsPage