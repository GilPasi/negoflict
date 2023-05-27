import '../../styles/components/info_box.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useState} from 'react'
import GeneralInfoBox from './generalInfoBox';
import AddUserPage from '../../pages/AddUserPage';
import useAlert from '../../hooks/useAlert';
import { useDeleteGroupMutation } from '../../store';
import { useCloseCaseMutation } from '../../store';


const InfoBox = ({ obj, isOpen,hasExit }) => {
  const { deletAlert, textAlert } = useAlert();
  const { role } = useSelector((state) => state.user);
  const gotRole = role <= 2 ? 'mediator' : 'user';
  const [deleteGroupsAgora, { data:deleteGroups, error:errorDeleteGroups }] = useDeleteGroupMutation();
  const [closeCase,{data:closeData,error:errorClose}] = useCloseCaseMutation()
  const [step, setStep] = useState('nav')

  const path = obj.id.replaceAll('-', '');
  const { groups } = useSelector((state) => state.groups);

  const chatPath = `/${gotRole}/chat/${path}/`;




  const handleStart = () => {
    return groups.filter((group) =>
      group.groupname.startsWith(`${obj.title}_`)
    );
  };

  const handleClose = async () => {
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
    closeCase({summary:summary,caseId:obj.id })
  };
let error
let data
  if (error = errorDeleteGroups || errorClose) {
    console.log('errorr', error);
  }
  if (data = closeData || deleteGroups) {
    console.log('success', data);
  }

  const infoSize = {
    transform : `scaleY(${isOpen? '1' : '0'})`,
    position: isOpen ? "static" : "absolute",
    margin: isOpen ? "2.5em 0em" : "0em",

}

const aup = <AddUserPage window='small' isMediator={false} side='A' goBack={()=>setStep('nav')}/>

  return (
      <div className="ib" style={infoSize}>
        {step ==='nav' ? 
          <div className='centerizer'>
            <GeneralInfoBox obj={obj} size={infoSize} />
              {obj.is_active&&
                <div>
                  <Link
                    to={chatPath}
                    state={{
                      groups: handleStart(),
                      caseId: obj.id,
                      caseTitle: obj.title,
                    }}
                  >
                    <button className="ib--btn">enter</button>
                  </Link>

                  {gotRole==='mediator'&&
                  <button className="ib--btn" onClick={handleClose}>
                    finish
                  </button>}

                  {/* Currently disabled */}

                  {/* {gotRole==='mediator'&& 
                  <button 
                    className="ib--btn"
                    onClick={()=>setStep('aup')}
                  >
                    add
                  </button>} */}

                </div>}
              </div>
            :aup}
          </div>
      );
    };
export default InfoBox;

