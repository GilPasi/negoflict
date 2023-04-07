import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddUserPage from '../../pages/AddUserPage'
import { useNavigate } from "react-router-dom"
import useNodeS from "../../hooks/useNodeS"
import useServer from "../../hooks/useServer"
import {store, useRegisterUsersMutation, useRegisterToChatGroupsMutation, usePutUserToMemberGroupMutation} from '../../store/index'
import {useSelector} from "react-redux";


const CreateUserWraper = ()=>{
  // status = not finished
  //hooks==========
  const location = useLocation()
  const navigate = useNavigate()
  const { createGroupMember } = useServer() //change
    const { access } = useSelector(state => state.user)
    const [registerUsers] = useRegisterUsersMutation()
    const [registerToChatGroups,resualt] = useRegisterToChatGroupsMutation()
    const [updateMembers] = usePutUserToMemberGroupMutation()

  
  //==============

  //values=========
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
      const val =side==='A'?0:1
      setSideVal(val)
    },[side]);
  
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();

      const resultCase = Object.values(state.case_api.mutations)[0]
      if (resultCase && resultCase.status === 'fulfilled'){
        const {error,data} = resultCase
        if(error)
          alert('error')
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
  }, []);
    //================

    //handlers============

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
    //handlers===========
    const handleSubmit =async(event)=>{
        event.preventDefault()
        const arrUser = userData

        arrUser.forEach(user=>{
          let pass = `Negoflict${user.phoneNumber}`
          user.username = user.email
          user.password = pass
        })

        registerUsers({users:arrUser,access:access,caseId:idCase})

        console.log('data==>',groups,arrUser)
        const res =await registerToChatGroups({groups:groups,users:arrUser})
        console.log(res)
        console.log(resualt.error)


        // const sides = ['A','B']

        // for(let i=0; i<2; i++){
        //      updateMembers({user:arrUser[i],access:access,idCase:idCase,side:sides[i]})
        // }
        rediract()
     };
      //==============

      //functions========
      const rediract = ()=>{
        navigate('/mediator/cases',{
          replace:true,
      })

    }
    const next = ()=>{
      navigate(`?side=B&id=${idCase}`,{
        state: { idCase, groups}
      })

  }
  const goBack = ()=>{
      navigate(-1,{
        state: { idCase,groups }
      }
        )
  }
  //=================
  

    return(
        side==='A'
        ?
        <AddUserPage 
        side='A'
        idCase={idCase?.slice(-7) ?? idCase}
        next={next}
        handleChange={handleChange}
        userData={userData[0]}
        />
        :
        <AddUserPage
        side='B'
        idCase={idCase?.slice(-7) ?? idCase}
        goBack={goBack}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userData={userData[1]}
        />

    )
}

export default CreateUserWraper