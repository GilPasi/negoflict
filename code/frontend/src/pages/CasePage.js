import "../styles/case_page.css"
import Header from "../components/general/Header"
import React from "react"

const CasePage =()=>{




    return(

        <article>
            <div className="centerizer cap">
            <Header isLarge={true}/>
                <div className="cap--plus-wrapper">
                    <div className="cap--plus">
                        <div className="cap--line" id="cap--line-ver"></div>
                        <div className="cap--line" id="cap--line-hor"></div>
                    </div>                    
                </div>
                <h1 className="cap--title">Create a new<br/>Case</h1>
                <div className="cap--description">
                    <h6>The problem:</h6>
                    <textarea maxLength="200" placeholder={"200 characters"} type="textarea"></textarea>
                </div>
                <div className="cap--description-bot">
                    <button id="cap-description-send">Send</button>
                    <button id="cap-description-update">Update</button>
                </div>
            </div>



            

            
        </article>
    )
}
export default CasePage
