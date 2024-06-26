import '../../styles/components/text_area.css'



const TextArea = ({withButtons,onChange, name,title,parentRef,value,id})=>{


    return(
        <div style={{position:'relative'}}>
            <div className="ta">
            <h6>{title}</h6>
            <textarea
                name={name}
                onChange={onChange}
                ref={parentRef}
                maxLength="200"
                placeholder={"200 characters"}
                type="textarea"
                value={value}

            />
            <div id={id || ''}></div>
        </div>
        {withButtons&&(
            <div className="ta--bot">
                <button id="ta--send">Send</button>
                <button id="ta--update">Update</button>
            </div>
            )}
    </div>
    )}
export default TextArea