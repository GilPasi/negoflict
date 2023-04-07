import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddUserPage from '../../pages/AddUserPage'
import { useNavigate } from "react-router-dom"
import useNodeS from "../../hooks/useNodeS"
import useServer from "../../hooks/useServer"
import { useLazyGetNewAccessQuery } from '../../store/index'
import {store} from '../../store/index'


const CreateUserWraper = ()=>{
  // status = not finished
  //hooks==========
  const location = useLocation()
  const navigate = useNavigate()
  const { registerManyUsers, registerUsersTogroups } = useNodeS()
  const { createGroupMember } = useServer()
  const [fetchAccess] = useLazyGetNewAccessQuery()
  
  //==============

  //values=========
  const { dataCase, groupArr } = location.state || {};
  const quaryParams = new URLSearchParams(location.search)
  const side = quaryParams.get('side')
  //=============
  
  //state========
    const [userData,setUserData] = useState([])
    const [idCase,setIdCase] = useState(null)
    const [sideVal,setSideVal] = useState(0)
    const [groups,setGorups] = useState([])
  //===========

  //useEffects==========
    useEffect(()=>{
      const val =side=='A'?0:1
      setSideVal(val)
    },[side]);
   
    useEffect(()=>{
        const urlId = quaryParams.get('id')
        setIdCase(urlId)
    },[]);
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const resultCase = Object.values(state.case_api.mutations)[0]
      if (resultCase && resultCase.status === 'fulfilled'){
        const {error,data} = resultCase
        if(error)
          alert('eror')
        setIdCase(data.case.id.slice(-7))
      } 
      const resultGroups = Object.values(state.group_api.mutations)[0]
      if (resultGroups && resultGroups.status === 'fulfilled'){
        const {error,data} = resultGroups
        if(error)
          alert(error)
        setGorups(data.AgoraResponse)
      }
    });
    return () => {
      unsubscribe()
    };
  }, [store]);
    //================

    //handlers============

    const handleChange = (event) => {
        const { name, value } = event.target
        
        const index = sideVal
        console.log('index',index)
      
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
    //handlers===========
    const handleSubmit =async(event)=>{
        event.preventDefault()
        const arrUser = userData

        arrUser.forEach(user=>{
          let pass = `Negoflict${user.phoneNumber}`
          user.username = user.email
          user.password = pass
        })

        const {data:newToken} = fetchAccess()
      

        const {data, status} =await registerManyUsers(arrUser,newToken,dataCase)
        if(status !== 200)
          rediract(status)
          

        const res2 = await registerUsersTogroups(groupArr,arrUser)
        

        const users = [...data.dbResult]

        const response_final_step = await createGroupMember(users,newToken,dataCase)

        rediract(status)
     };
      //==============

      //functions========
      const rediract = (status)=>{
        navigate('/mediator/cases',{
          replace:true,
          state:{
            status:status,
            render:false
          } 
      })

    }
    const next = ()=>{
      navigate(`?side=B&id=${idCase}`,{
        state: { dataCase, groupArr}
      })

  }
  const goBack = ()=>{
      navigate(-1,{
        state: { dataCase,groupArr }
      }
        )
  }
  //=================
  

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