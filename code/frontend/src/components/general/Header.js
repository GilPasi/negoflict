import "../../styles/components/header.css"
import { Link } from "react-router-dom"
 

const  Header=({isLarge , unconnected})=>{


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
                    <div >
                        <button className="header--menu-button">
                            <img className="header--menu-img"
                            src="../../../assets/images/menu_symbol.png" 
                            alt="menu symbol"/>  
                        </button>
                    </div>

                <div className="header--menu-content" style={{zIndex:'2000'}}>
                    {/* Hen: route propely  */}
                    <Link state={{logout:true}} to="/login">Log out</Link>
                    <Link to="/">Enter chat</Link>
                    <Link to="">Settings</Link>
                </div>
            </div>}

                {!isLarge && <div>{title}</div>}

            </div>
            <center>
                {isLarge &&title}
            </center>

        </div>


    )
}
export default Header
