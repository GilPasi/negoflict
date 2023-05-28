import "../../styles/components/case_review.css"
import {useState} from "react"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAlert from '../../hooks/useAlert';
import { useDeleteGroupMutation } from '../../store';
import { useCloseCaseMutation } from '../../store';

const CaseReview = ({ caseName , creationDate ,caseIndex, caseData})=>{
    //================= Hooks and variables ============
    const [showButtons , setShowButtons] = useState(false)
    const { deletAlert, textAlert } = useAlert();
    const { role } = useSelector((state) => state.user);
    const gotRole = role <= 2 ? 'mediator' : 'user';
    const [deleteGroupsAgora, { data:deleteGroups, error:errorDeleteGroups }] = useDeleteGroupMutation();
    const [closeCase,{data:closeData,error:errorClose}] = useCloseCaseMutation()
  
    const path = caseData.id.replaceAll('-', '');
    const { groups } = useSelector((state) => state.groups);
  
    const chatPath = `/${gotRole}/chat/${path}/`;
    

    //================ Functions =======================
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


  
    //================== Design ======================
    const MAX_LENGTH = 21  ,THREE_DOTS_LENGTH = 3
    let name = caseName
    if(caseName.length > MAX_LENGTH)
        name = caseName.slice(0, MAX_LENGTH - THREE_DOTS_LENGTH) + " ..."


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
                {name}
            </h1>
        </div>


        <div className="case-review--frame case-review--options centerizer">
            <div  className="case-review--options-container" style={{cursor: showButtons ?"" :"pointer"}}>
                <div className="case-review--options-box" onClick={()=>setShowButtons(true)}/>
                <div
                    className="line case-review--line"
                    id="line-hor"
                    style={optionsStyles[0]}
                />


                <button 
                    className="case-review--options-btn" 
                    style={buttonStyle}
                >
                    <Link
                        style={{color:"black" , padding:"0 1em" ,}}
        
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
                />

                {gotRole==='mediator'&&<button 
                    className="case-review--options-btn" 
                    style={buttonStyle}
                    onClick={handleClose}
                >
                    exit
                </button>}
                <div 
                    className="line case-review--line" 
                    id="line-hor" 
                    style={optionsStyles[1]}
                />
            </div>
        </div>
        <div className="case-review--frame case-review--info">
            <span className="case-review--info-case">
                <strong>Case {caseIndex}</strong>
                <span className="space"/>
                I.D.{caseData.id.slice(0,7)}{/*slice is too big , show only a couple of first digits */}
            </span>
            <span className="case-review--info-date">{creationDate}</span>
        </div>
    </article>)


}
export default CaseReview