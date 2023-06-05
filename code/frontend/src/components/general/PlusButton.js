import { Link } from "react-router-dom"
import "../../styles/components/plus_button.css"
const PlusButton=({to})=>{
    return(
    <Link to={to} >
        <button className="plus-container">
            <div className="plus">
                <div className="line line-ver"/>
                <div className="line line-hor"/>
            </div>
        </button>
    </Link>
    )
}
export default PlusButton