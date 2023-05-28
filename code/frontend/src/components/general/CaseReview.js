import "../../styles/components/case_review.css"
import {useState} from "react"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAlert from '../../hooks/useAlert';
import { useDeleteGroupMutation } from '../../store';
import { useCloseCaseMutation } from '../../store';

const CaseReview = ({caseId , caseName , creationDate ,caseIndex, caseData})=>{
    
    const [showButtons , setShowButtons] = useState(false)
    const { deletAlert, textAlert } = useAlert();
    const { role } = useSelector((state) => state.user);
    const gotRole = role <= 2 ? 'mediator' : 'user';
    const [deleteGroupsAgora, { data:deleteGroups, error:errorDeleteGroups }] = useDeleteGroupMutation();
    const [closeCase,{data:closeData,error:errorClose}] = useCloseCaseMutation()
    const [step, setStep] = useState('nav')
  
    const path = caseData.id.replaceAll('-', '');
    const { groups } = useSelector((state) => state.groups);
  
    const chatPath = `/${gotRole}/chat/${path}/`;
    
    const handleStart = () => {
        return groups.filter((group) =>
          group.groupname.startsWith(`${caseData.title}_`)
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
        closeCase({summary:summary,caseId:caseData.id })
      };

    let error
    let data
  if (error = errorDeleteGroups || errorClose) {
    console.log('errorr', error);
  }
  if (data = closeData || deleteGroups) {
    console.log('success', data);
  }
    /* =====Design===== */
    const optionsStyles = [
        {top: showButtons ? "0%" : "45%"},
        {top: showButtons ? "100%" : "55%"},
    ]
    const buttonStyle={
        transform:`scale(${showButtons ? "1" : "0"})`,
    }

    return(
    <article className="case-review">
        <div className="case-review--frame case-review--top">
            <h1 className="title-green case-review--conflict-name">
                {caseName}
            </h1>
        </div>


        <div className="case-review--frame case-review--options centerizer">
            <div  className="case-review--options-container" >
                <div
                    className="line case-review--line"
                    id="line-hor"
                    style={optionsStyles[0]}
                    onClick={()=>setShowButtons(true)}
                />


                <button 
                    className="case-review--options-btn" 
                    style={buttonStyle}
                >
                    <Link
                        style={{color:"black" }}
        
                        to={chatPath}
                        state={{    
                            groups: handleStart(),
                            caseId: caseData.id,
                            caseTitle: caseData.title,
                        }}
                    >
                        start
                    </Link>
                </button>
                <div 
                    className="line case-review--line" 
                    id="line-hor" 
                    style={{top:"50%"}}
                    onClick={()=>setShowButtons(true)}
                />

                {gotRole==='mediator'&&<button 
                    className="case-review--options-btn" 
                    style={buttonStyle}
                    onClick={handleClose}
                >
                    finish
                </button>}
                <div 
                    className="line case-review--line" 
                    id="line-hor" 
                    style={optionsStyles[1]}
                    onClick={()=>setShowButtons(true)}
                />
            </div>
        </div>
        <div className="case-review--frame case-review--info">
            <span className="case-review--info-case">
                <strong>Case {caseIndex}</strong>
                <span className="space"/>
                I.D.{caseId}
            </span>
            <span className="case-review--info-date">{creationDate}</span>
        </div>
        <div className="case-review--frame"></div>
    </article>)


}
export default CaseReview