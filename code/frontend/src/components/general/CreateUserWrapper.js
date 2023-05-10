import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddUserPage from '../../pages/AddUserPage'
import { useNavigate } from "react-router-dom"
import {store, useRegisterUsersMutation, useRegisterToChatGroupsMutation, usePutUserToMemberGroupMutation, useCreateContactMutation, useCreateUsersMutation} from '../../store/index'
import {useSelector} from "react-redux";
import { useLazyIsEmailExistQuery,useLazyIsUsernameExistQuery } from "../../store/index"


const CreateUserWraper = ()=>{
  // status = finished
  //hooks==========
  const location = useLocation()
  const navigate = useNavigate()
  const { access,id } = useSelector(state => state.user)
  const [registerUsers] = useRegisterUsersMutation()
  const [createUsers] = useCreateUsersMutation()
  const [registerToChatGroups] = useRegisterToChatGroupsMutation()
  const [updateMembers] = usePutUserToMemberGroupMutation()
  const [createContact] = useCreateContactMutation()
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
    const [disableSubmit,setDisableSubmit] = useState(true)
    const [disableNext, setDisableNext] = useState(true)
    const [isEmailValid] = useLazyIsEmailExistQuery()
    const [validation,setValidation] = useState({isValid:true, errorMsg:''})
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
          console.log(error)
        setIdCase(data.case.id)
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

  useEffect(() => {
    if (groups.length > 0 && idCase) {
      setDisableSubmit(false);
    }
  }, [groups, idCase]);
  
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
        validate(value,index)
      }

      const validate = (value, index) => {
        if (!userData[index]) {
          return;
        }
      
        if (value === "") {
          if (side === "A") {
            setDisableNext(true);
            return;
          } else {
            setDisableSubmit(true);
            return;
          }
        }
      
        const keys = Object.keys(userData[index]);
        if (!keys) {
          return;
        }
      
        if (keys.length < 4) {
          if (side === "A") {
            setDisableNext(true);
            return;
          } else {
            setDisableSubmit(true);
            return;
          }
        }
      
        if (side === "A") {
          setDisableNext(false);
        } else {
          setDisableSubmit(false);
        }
      };
      const validateSubmit = async ({ users }) => {
        let isExist = 'not-exist'
        let errors = ''
   
        for (let userId in users) {
          let { data, error } = await isEmailValid({ email: users[userId].email });
          
          if (data === true || error) {
              isExist ='exist';
              errors+=`this email ${users[userId].email} is already exist \n` 
          }
        }
        if(errors.length > 0)
          setValidation({isValid:false,errorMsg:errors})
        
        return isExist;
      };
      
      

    //handlers===========
    const handleSubmit =async(event)=>{
        event.preventDefault()
        const arrUser = userData
        const isExistEmail =await validateSubmit({users:arrUser})
        console.log('email is ',isExistEmail)
        if(isExistEmail==='exist')return

        arrUser.forEach(user=>{
          let pass = `Negoflict${user.phoneNumber}`
          user.username = user.email
          user.password = pass
        })

        

        registerUsers({users:arrUser,access:access,caseId:idCase})

        createUsers({users:arrUser,access:access}) //need to add more api to register in server
        .then(res=>{
          const usersArr = [...res.data]
          const sides = ['A','B']         

          registerToChatGroups({groups:groups,users:arrUser})

          for(let i=0; i<2;i++){
            updateMembers({user:usersArr[i],access:access,idCase:idCase,side:sides[i]})
            .catch(err=>console.log(err))

            createContact({mediator_id:id,user_id:usersArr[i].id})
          }

        })
        .catch(err=>console.log(err))

        clearState()
        rediract()
     };
      //==============

      //functions========
      const rediract = ()=>{
        navigate('/mediator/cases/?open_close=True',{
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
      })
  }
  const clearState = ()=>{
    setUserData(()=>[])
    setIdCase(null)
    setSideVal(0)
    setGorups([])
    setDisableSubmit(true)
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
        disabled ={disableNext}
        goBack={goBack}
        errorMsg={validation}
        />
        :
        <AddUserPage
        side='B'
        idCase={idCase?.slice(-7) ?? idCase}
        goBack={goBack}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        userData={userData[1]}
        disabled={disableSubmit}
        errorMsg={validation}
        />

    )
}

export default CreateUserWraper