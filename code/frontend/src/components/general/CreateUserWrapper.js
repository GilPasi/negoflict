import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddUserPage from '../../pages/AddUserPage'
import { useNavigate } from "react-router-dom"


const CreateUserWraper = ()=>{
    const [userData,setUserData] = useState([])
    const [idCase,setIdCase] = useState(null)
    const [sideVal,setSideVal] = useState(0)

    const location = useLocation()
    const navigate = useNavigate()



    const quaryParams = new URLSearchParams(location.search)
  
    const side = quaryParams.get('side')
    console.log(side)

    useEffect(()=>{
        const val =side=='A'?0:1
        setSideVal(val)


        console.log(userData)
    },[side])
   


    useEffect(()=>{
        const urlId = quaryParams.get('id')
        console.log(urlId)
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
      

    const handleSubmit =(event)=>[
        event.preventDefault()

    ]

    const next = ()=>{
        navigate(`?side=B&id=${idCase}`)

    }
    const goBack = ()=>{
        navigate(-1)

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