import '../../styles/components/text_area.css'



const TextArea = ({withButtons,onChange, name,title,parentRef})=>{


    return(
        <div>
            <div className="ta">
            <h6>{title}</h6>
            <textarea
                name={name}
                onChange={onChange}
                ref={parentRef}
                maxLength="200"
                placeholder={"200 characters"}
                type="textarea"

            />
        </div>
        {withButtons?(
        <div className="ta--bot">
            <button id="ta--send">Send</button>
            <button id="ta--update">Update</button>
        
        </div>):(<div></div>)
}
    </div>

    )

}
export default TextArea