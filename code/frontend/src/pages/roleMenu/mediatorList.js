import { useGetMediatorsQuery , useDeleteGroupMutation , useCloseCaseMutation} from "../../store"
import { useState } from "react"
import { useSelector } from 'react-redux';
import { getPermName } from "../../utils/permissions";

import PopUpGeneral from "../../components/general/PopUpGeneral"
import IconImageUser from '../../components/general/iconImageUser'
import TrashIcon from '../../components/general/icons/TrashIcon'
import useAlert from '../../hooks/useAlert';
import Loader from "../../components/general/Loader"
import Header from "../../components/general/Header"

import '../../styles/components/MediatorList.css'


const MediatorList = ()=>{

    const {data:mediatorData, error:mediatorError, isFetching} = useGetMediatorsQuery()
    const [show, setShow] = useState(false)
    const [infoChoose, setInfoChoose] = useState({})
    const { deletAlert, textAlert } = useAlert();
    const { role } = useSelector((state) => state.user);
    const gotRole = getPermName({role:role});
    const [deleteGroupsAgora, { data:deleteGroups, error:errorDeleteGroups }] = useDeleteGroupMutation();
    const [closeCase,{data:closeData,error:errorClose}] = useCloseCaseMutation()
    const { groups } = useSelector((state) => state.groups);
    const handleStart = () => {
        //HEN : complete delete logic

        // return groups.filter((group) =>
        //   group.groupname.startsWith(`${caseData.title}_`)
        // );
      };

      const handleDelete = async () => {

        const isDismissed = await deletAlert({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          confirmText: 'Yes, I`m sure!',
        }); // if the user dismissed and not press delete
        if (isDismissed) return;
        let filteredGroups = handleStart();
        const summary =await textAlert({title:'write a summary'})
        
        // finish closing groups
        // {groupid} delete from agora
        // and close case at server
        deleteGroupsAgora({groupS: filteredGroups});
        // closeCase({summary:summary,caseId:caseData.id })
      };



    if(isFetching){
        return(
            <Loader withLogo={true}/>
        )
    }
    if(mediatorError)return

    const handleOpen=(info)=>{
        console.log('innn',info)
        setInfoChoose(info)
        setShow(prev=>!prev)
    }
    const handleClose = ()=>{
        setShow(false)

    }
    console.log(mediatorData)






    return(
        <div style={{position:'relative' }}>
            <Header isLarge={true}/>
            <h1 className="headr-MediatorList">Mediator List</h1>
            {mediatorData.map(mediator=>{
                return(
                    <div className="info-mediator-box aligner" key={mediator.user.id}>
                        <IconImageUser/>
                        <button className="on-open-info-btn" onClick={()=>handleOpen(mediator)}>
                            <div className="full-name-box">
                                <span className="first_name_mediator">{mediator.user.first_name}</span>
                                <span className="last_name_mediator">{mediator.user.last_name}</span>
                            </div>
                        </button>
                        <div style={{marginLeft:"18px"}} onClick={handleDelete}>
                            <TrashIcon/>
                        </div>
                    </div>  
                      
                )
            })}
                {show&&
                    <PopUpGeneral
                    onClose={handleClose}
                    children={infoChoose}
                    />}
        </div>)}

export default MediatorList