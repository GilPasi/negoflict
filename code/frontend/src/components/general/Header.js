import "../../styles/components/header.css"
import { Link } from "react-router-dom"
import PopUpGeneral from "./PopUpGeneral"
import {useState} from 'react'
 

const  Header=({isLarge , unconnected, withoutLinks})=>{

    const[showSettings , setShowSettings] = useState (false)
    const [infoChoose, setInfoChoose] = useState({aaa:"aa"})

    const mockSelf = [{
        first_name:"avi" ,
        las_name:"ron"
    }]

    // __UI properies__
    const titleStyle = {
        fontSize:isLarge ? "2em" :"var(--font-medium)",
        margin:isLarge ? "0.5em 0.5em 2em 0.5em" : "0.25em",
        
    }

    const wrapperStyle = {
        display: 'flex',
        justifyContent: "space-between",
        width: '100%',
    }

    const title = <h1 style={titleStyle} className="header--title" >negoflict</h1>
    

    return(
        <div className="header">
            <div style={wrapperStyle}>
            {!unconnected && 
                <div className="header--menu">
                    {!withoutLinks&&
                    <div>
                    <div >
               
                    
                        <button className="header--menu-button">
                            <img className="header--menu-img"
                            src="../../../assets/images/menu_symbol.png" 
                            alt="menu symbol"/>  
                        </button>
                    </div>
               
                <div className="header--menu-content" style={{zIndex:'2000'}}>
                
                    <Link state={{logout:true}} to="/login">Log out</Link>
                    <Link to="/">Enter chat</Link>
                    <Link onClick={()=>setShowSettings(true)}>Settings</Link>
                </div>
                </div>
                }
            </div>}

                {!isLarge && <div>{title}</div>}

            </div>
            <center>
                {isLarge &&title}
            </center>

            {showSettings&&
                    <PopUpGeneral
                    onClose={()=>{}}
                    //Hen connect to the user's self info
                    children={mockSelf}
            />}

        </div>


    )
}
export default Header
