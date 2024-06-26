import "../styles/pages/survey_page.css"
import Header from "../components/general/Header"
import ToolBar from "../components/general/ToolBar"
import Button from "../components/general/Button"
import TextArea from "../components/general/TextArea"
import { SATISFATION_OP } from '../utils/data'
import {useState , useRef} from 'react'
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { usePostNewSurveyMutation } from "../store"
import { useSelector } from "react-redux"


const SurveyPage=(duration,stages,interactions , isMediator)=>{
    const [stage, setStage] = useState(1)
    const textFeedbackRef = useRef('')
    const [satLevel , setSatLevel] = useState('0') // 0 for unknown
    const location = useLocation()
    const navigate = useNavigate()
    const {caseId:fullCaseId} = useSelector(state=>state.chat_groups)
    const {id} = useSelector(state=>state.user)
    const [postSurvey] = usePostNewSurveyMutation()

        //Mock values for testing
        // duration="21" 
        // stages="17"
        // interactions="55"
        // isMediator = true

    //Save the user's input in a variable

    const caseId = location.state?.caseId ?? ''




    const handleSignOut=async()=>{
        document.querySelector(".sp--gratitude-bg").style.display="block"
        const data ={case_rate:SATISFATION_OP[satLevel] , note:textFeedbackRef.current.value,user_id:id,case_id:fullCaseId }
        //Backend: save data to DB
        console.log('survey data',data)
        const {data:postData,error} =await postSurvey(data)
        if(error){
            console.log('err',error)
        }
        navigate('/user/cases/?open_close=True',{
            replace:true,
        })
        
    }



    /*All options of the negotiation satisfaction.
      Better to create as a dynamic list
      (easier to add or delete options).*/
    const satisfactionOptions=SATISFATION_OP.map((op,index)=>(
        <label key={index} className="sp--option" >{`${index + 1}.${op}`}
            <input type="radio"
             value={index}
              name="satisfaction"
               onClick={e=>setSatLevel(e.target.value)}
            />
            <span className="checkmark"></span>
        </label>
    ))

    /*The content of this page is depantant on two factors.
    If the person who fills the comment is a user, then the response
    is way shorter and can be completed in a single page.
    If its a mediator it will require two-steps form.
    */

    let content = 0
    if(!isMediator)
        content=(
            <div>
                <h2>Are you satisfied with<br/>the negotiation?</h2>
                <center>{satisfactionOptions}</center>
                <div className="sp--comment">
                    <TextArea
                        title="Comments"
                        parentRef={textFeedbackRef}
                    />
                    <Button 
                        size="medium"
                        text="Send & sign out"
                        onClick={handleSignOut}
                        />
                </div>
            </div>)
            
    else if (stage===1)
       content=(     
            <div>
                <h2>Are you satisfied with<br/>the negotiation?</h2>
                <center>{satisfactionOptions}</center>
                <center className="sp--summary">
                    <p className="sp--stat" value={duration}>Negotiation Duration</p>
                    <p className="sp--stat" value={stages}>Number of Stages</p>
                    <p className="sp--stat" value={interactions}>Number of Interactions</p>
                    <Button length="7em" altitude="2.5em" onClick={()=>(setStage(2))}/>
                </center>
            </div>
            )
    else 
        content=(
            <div className="sp--comment">
                <TextArea 
                    title="Summary and Insights"
                    parentRef={textFeedbackRef}
                />
                <nav className="sp--navigation">
                    <Button
                        length="7em"
                        altitude="2.5em"
                        margin="0.5em"
                        text="Back"
                        
                        onClick={()=>(setStage(1))}
                        />
                    <Button 
                        length="7em" 
                        altitude="2.5em"
                        margin="0.5em"
                        text="Save"
                        onClick={handleSignOut}
                    />
                </nav>
            </div>) 
    return(
    <article className="sp">
        <Header isLarge={false}/>
        <ToolBar conflictName="A political conflict" id={caseId}/>
        {content}
        <div className="sp--gratitude-bg">
            <p className="sp--gratitude-msg">Thank you for your feedback!</p>

        </div>


    </article>)
}
export default SurveyPage