import "../../styles/components/case_review.css"
import {useState} from "react"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAlert from '../../hooks/useAlert';
import { useDeleteGroupMutation } from '../../store';
import { useCloseCaseMutation } from '../../store';
import { getPermName } from "../../utils/permissions";

const CaseReview = ({ caseName , creationDate ,caseCategory, caseData, openClose})=>{
    //================= Hooks and variables ============
    const [showButtons , setShowButtons] = useState(false)
    const { deletAlert, textAlert } = useAlert();
    const { role } = useSelector((state) => state.user);
    const gotRole = getPermName({role:role});
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
    console.log('error', error);
  }
  if (data = closeData || deleteGroups) {
    console.log('success', data);
  }



    //================== Design ======================
    const MAX_LENGTH = 21  ,THREE_DOTS_LENGTH = 3
    let name = caseName
    if(caseName.length > MAX_LENGTH)
        name = caseName.slice(0, MAX_LENGTH - THREE_DOTS_LENGTH) + " ..."

    const LINES_GAP = showButtons ? 35 : 7;
    const OPTIONS_GAP = 50

    const linesStyle = [
        {
            top: `${50 - LINES_GAP}%`
        },
        {
            top: `${50 + LINES_GAP}%`
        
        },
    ]
    const optionsStyle = [
        {transform:`translateY(${-100 - OPTIONS_GAP}%) scale(${showButtons ? "1" : "0"})`},
        {transform:`translateY(${ 100 - OPTIONS_GAP}%) scale(${showButtons ? "1" : "0"})`},
    ]
    

    

    return(
    <article className="case-review">
        <div className="case-review--frame case-review--top">
            <h1 className="title-green case-review--conflict-name">
                {name}
            </h1>
        </div>

        <div className="case-review--frame case-review--options">
        {openClose?<div>
                <div 
                    className="case-review--options-box"
                    onClick={()=>setShowButtons(prevShow=>!prevShow)}
                    style={{height: showButtons ? "10%" :"100%"}}
                 />
                <div
                    className="line case-review--line "
                    style={linesStyle[0]}
                />
      
                <Link
                    className="case-review--options-btn" 
                    style={optionsStyle[0]}
                    to={chatPath}
                    state={{    
                        groups: handleStart(),
                        caseId: caseData.id,
                        caseTitle: caseData.title,
                        caseCategory:caseCategory
                    }}
                >
                    start
                </Link>

                <div 
                    className="line case-review--line  " 
                    style={{
                        top:"50%",
                        width:showButtons &&"50px",
                    }}
                />

                {gotRole==='mediator'&&<button 
                    className="case-review--options-btn" 
                    style={optionsStyle[1]}
                    onClick={handleClose}
                >
                    exit
                </button>}
                <div
                    className="line case-review--line  "
                    style={linesStyle[1]}
                />
            </div>:
            //Hen add save logic
            <button className="case-review--options-btn">
                save
            </button>}
        </div>
        <div className="case-review--frame case-review--info">
                <strong>{caseCategory}</strong>
                I.D.{caseData.id.slice(0,7)}
                
                {/*slice is too big , show only a couple of first digits */}
            <span className="case-review--info-date">{creationDate}</span>
        </div>
    </article>)


}
export default CaseReview