import "../styles/pages/case_page.css"
import Header from "../components/general/Header"
import React from "react"
import MyCases from "./rolePages/mediator/MyCases"
import { Link } from "react-router-dom"
import GrayBox from "../components/general/TextArea"


const CasePage =()=>{

    return(
        <article className="cap">
            <Header isLarge={true}/>
                <MyCases/>
                <h1 className="cap--title">Create a new<br/>Case</h1>
                <Link to="new_case">
                <div className="cap--plus-wrapper">
                    <div className="cap--plus">
                        <div className="cap--line" id="cap--line-ver"></div>
                        <div className="cap--line" id="cap--line-hor"></div>
                    </div>                    
                </div>
                </Link>
        </article>
    )
}
export default CasePage
