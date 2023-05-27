import "../../styles/components/case_preview.css"
const CaseReview = ({caseId , caseName , creationDate ,caseIndex})=>{
    return(
    <article className="case-preview">

        <div className="case-preview--frame case-preview--top">
            <h1 className="title-green case-preview--conflict-name">
                {caseName}
            </h1>
        </div>


        <div className="case-preview--frame case-preview--options centerizer">
            <button className="case-preview--options-container">
                    <div className="line case-preview--line" id="line-hor" style={{top:"30%"}}/>
                    <div className="line case-preview--line" id="line-hor" style={{top:"50%"}}/>
                    <div className="line case-preview--line" id="line-hor" style={{top:"70%"}}/>
            </button>
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