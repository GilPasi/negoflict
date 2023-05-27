import "../../styles/components/case_preview.css"
import { useEffect  , useState} from "react"
import Button from "./Button"
const CaseReview = ({caseId , caseName , creationDate ,caseIndex})=>{
    
    const [showButtons , setShowButtons] = useState(false)
    // useEffect(()=>{
        
    //         const tooltip = document.querySelector("#case-preview--tooltip") 
    //         const button = document.querySelector(".case-preview--options-container")
    //         button.addEventListener("click" , () => tooltip.show() )
    // },[])

    const optionsStyles = [
        {top: showButtons ? "0%" : "45%"},
        {top: showButtons ? "100%" : "55%"},
    ]
    const buttonStyle={transform:`scale(${showButtons ? "1" : "0"})`}

    return(
    <article className="case-preview">
        {/* <dialog id="case-preview--tooltip">asaa</dialog> */}

        <div className="case-preview--frame case-preview--top">
            <h1 className="title-green case-preview--conflict-name">
                {caseName}
            </h1>
        </div>


        <div className="case-preview--frame case-preview--options centerizer">
            <div role="clickable" className="case-preview--options-container" onClick={()=>setShowButtons(true)}>
                <div
                    className="line case-preview--line"
                    id="line-hor"
                    style={optionsStyles[0]}
                />
                <button 
                    className="case-preview--options-btn" 
                    style={buttonStyle}>
                        start
                </button>
                <div 
                    className="line case-preview--line" 
                    id="line-hor" 
                    style={{top:"50%"}}/>

                <button
                    onClick={console.log("dddd")}
                    className="case-preview--options-btn" 
                    style={buttonStyle}>
                        finish
                    </button>
                <div 
                    className="line case-preview--line" 
                    id="line-hor" 
                    style={optionsStyles[1]}
                />
            </div>
        </div>
        <div className="case-preview--frame case-preview--info">
            <span className="case-preview--info-case">
                <strong>Case {caseIndex}</strong>
                <span className="space"/>
                I.D.{caseId}
            </span>
            <span className="case-preview--info-date">{creationDate}</span>
        </div>
        <div className="case-preview--frame"></div>
    </article>)


}
export default CaseReview