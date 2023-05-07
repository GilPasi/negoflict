import { Link } from "react-router-dom"
import "../../styles/components/plus_button.css"
const PlusButton=({to})=>{
    return(
    <Link to={to} >
        <button className="plus-container">
            <div className="plus">
                <div className="line" id="line-ver"/>
                <div className="line" id="line-hor"/>
            </div>
        </button>
    </Link>
    )
}
export default PlusButton