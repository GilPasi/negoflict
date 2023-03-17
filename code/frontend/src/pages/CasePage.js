import "../styles/case_page.css"
import Header from "../components/general/Header"
import React from "react"
import MyCases from "./rolePages/mediator/MyCases"
import { Link } from "react-router-dom"

const CasePage =()=>{

    return(
        <article>
            <div className="centerizer cap">
            <Header isLarge={true}/>
                <MyCases/>
                <h1 className="cap--title">Create a new<br/>Case</h1>
                <Link to='new_case'>
                <div className="cap--plus-wrapper">
                    <div className="cap--plus">
                        <div className="cap--line" id="cap--line-ver"></div>
                        <div className="cap--line" id="cap--line-hor"></div>
                    </div>                    
                </div>
                </Link>
                <center>
                    <div className="cap--description">
                        <h6>The problem:</h6>
                        <textarea maxLength="200" placeholder={"200 characters"} type="textarea"></textarea>
                    </div>
                    <div className="cap--description-bot">
                        <button id="cap-description-send">Send</button>
                        <button id="cap-description-update">Update</button>
                    </div>
                </center>            
            </div>
        </article>
    )
}
export default CasePage
