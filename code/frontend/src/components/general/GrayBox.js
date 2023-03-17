import '../../styles/case_page.css'


const GrayBox = ({withButtons})=>{


    return(
        <div>
            <div className="cap--description">
            <h6>The problem:</h6>
            <textarea maxLength="200" placeholder={"200 characters"} type="textarea"></textarea>
        </div>
        {withButtons?(
        <div className="cap--description-bot">
            <button id="cap-description-send">Send</button>
            <button id="cap-description-update">Update</button>
        
        </div>):(<div></div>)
}
    </div>

    )

}
export default GrayBox