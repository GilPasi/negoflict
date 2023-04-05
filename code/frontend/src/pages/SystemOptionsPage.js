import "../styles/system_options_page.css"
import Header from "../components/general/Header"
import Button from "../components/general/Button"
const SystemOptionsPage=()=>{
    const BROAD_LEN = "90%"
    const MARGIN = "0.5em 0 0.5em 0"
    
    return(
        <article className="sop">
            <Header isLarge={true}/>
            <h2>
                Hello<br/>
                <span style={{fontWeight:"var(--weight-medium)"}}>System Options</span>
            </h2>
                <Button
                    text="Add Mediator"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />
                <Button
                    text="Mediators Accounts"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />
                <Button
                    text="Closed Cases"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />
                <Button
                    text="Open Cases"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />
                <Button
                    text="Mediator Screen"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />
                <Button
                    text="Message Mediator"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />
                <Button
                    text="Statistics"
                    margin={MARGIN} 
                    length={BROAD_LEN}
                />

        </article>
    )
}
export default SystemOptionsPage