import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddUserPage from '../../pages/AddUserPage'
import { useNavigate } from "react-router-dom"
import useNodeS from "../../hooks/useNodeS"
import useSubmit from '../../hooks/useSubmit'
import useServer from "../../hooks/useServer"


const CreateUserWraper = ()=>{
    const [userData,setUserData] = useState([])
    const [idCase,setIdCase] = useState(null)
    const [sideVal,setSideVal] = useState(0)


    const location = useLocation()
    const navigate = useNavigate()
    const { registerManyUsers } = useNodeS()
    const { createGroupMember } = useServer()
    const { GetNewAccessToken } = useSubmit()

    const { dataCase } = location.state || {};

    
    // const memberGroups = res?[...res.data.members_groups]:{}




    const quaryParams = new URLSearchParams(location.search)
  
    const side = quaryParams.get('side')
    console.log(side)

    useEffect(()=>{
        const val =side=='A'?0:1
        setSideVal(val)


    },[side])
   


    useEffect(()=>{
        const urlId = quaryParams.get('id')
        setIdCase(urlId)
    },[])

    const handleChange = (event) => {
        const { name, value } = event.target
        const index = sideVal
      
        setUserData(prevState => {
          const prevData = [...prevState]
          const check = prevData[index]
      
          if (check) {
            prevData[index] = { ...check, [name]: value }
          } else {
            prevData[index] = { [name]: value }
          }
      
          return prevData
        })
      }
      

    const handleSubmit =async(event)=>{
        event.preventDefault()
        const arrUser = userData

        arrUser.forEach(user=>{
          let pass = `Negoflict${user.phoneNumber}`
          user.username = user.email
          user.password = pass
        })

        const newToken = await GetNewAccessToken()
        


        
          const res =await registerManyUsers(arrUser,newToken)

          const users = [...res.dbResult]

          const response_final_step = await createGroupMember(users,newToken,dataCase)

          console.log(response_final_step)
        navigate('/mediator/cases',{
          replace:true,
        })
    }

    

    const next = ()=>{
        navigate(`?side=B&id=${idCase}`,{
          state: { dataCase }
        })

    }
    const goBack = ()=>{
        navigate(-1,{
          state: { dataCase }
        }
          )

    }
    


    return(
        side==='A'
        ?
        <AddUserPage 
        side='A'
        idCase={idCase}
        next={next}
        handleChange={handleChange}
        userData={userData[0]}
        />
        :
        <AddUserPage
        side='B'
        idCase={idCase}
        goBack={goBack}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userData={userData[1]}
        />

    )
}

export default CreateUserWraper