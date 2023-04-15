import '../../styles/components/info_box.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GeneralInfoBox from './generalInfoBox';
import useAlert from '../../hooks/useAlert';

const InfoBox = ({obj,size})=>{
  const {deletAlert} = useAlert()
    const {role} = useSelector(state=>state.user)
    const gotRole = role<=2?'mediator':'user'; 

 
    const path = obj.id.replaceAll('-','')
    const {groups} = useSelector(state=>state.groups)
    
    const chatPath = `/${gotRole}/chat/${path}`

    const handleStart = ()=>{
     return groups.filter(group => group.groupname.startsWith(`${obj.title}_`))
    }
    const handleClose =async ()=>{
      const isDismissed = await deletAlert({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        confirmText: 'Yes, I`m sure!',
      }) //if the user dismissed and not press delete
      const groups =handleStart()
      //finish closing groups
      //{groupid} delete from agora
      //and close case at server
    }



    return (
        <div className="ib" style={size}>
          <GeneralInfoBox 
          obj={obj}
          size={size}
          />

          <div className='btns-box'>
            <Link to={chatPath} state={{ groups: handleStart() ,caseId:obj.id, caseTitle:obj.title}}>
                <button className='ib--start'>start chat</button>
            </Link>
            <button className='ib--start' onClick={handleClose}>close case</button>

          </div>
          
        </div>
      );
    };
export default InfoBox