import '../../styles/components/info_box.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GeneralInfoBox from './generalInfoBox';
import useAlert from '../../hooks/useAlert';
import { useDeleteGroupMutation } from '../../store';
import { useCloseCaseMutation } from '../../store';

const InfoBox = ({ obj, size }) => {
  const { deletAlert, textAlert } = useAlert();
  const { role } = useSelector((state) => state.user);
  const gotRole = role <= 2 ? 'mediator' : 'user';
  const [deleteGroupsAgora, { data:deleteGroups, error:errorDeleteGroups }] = useDeleteGroupMutation();
  const [closeCase,{data:closeData,error:errorClose}] = useCloseCaseMutation()

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

  return (
    <div className="ib" style={size}>
      <GeneralInfoBox obj={obj} size={size} />
      {obj.is_active&&

      <div className="btns-box">
        <Link
          to={chatPath}
          state={{
            groups: handleStart(),
            caseId: obj.id,
            caseTitle: obj.title,
          }}
        >
          <button className="ib--start">start chat</button>
        </Link>
        
        {gotRole==='mediator'&&
        <button className="ib--start" onClick={handleClose}>
          close case
        </button>
}
      </div>}
    </div>
  );
};
export default InfoBox;
