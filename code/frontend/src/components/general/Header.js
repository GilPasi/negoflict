import "../../styles/header.css"
import {React} from 'react'

const  HeaderLarge=({isLarge})=>{


    // __UI properies__
    const titleStyle = {
        fontSize:isLarge ? "var(--font-large)" :"var(--font-medium)"
    }

    const wrapperStyle = {
        display: isLarge ? "block" : "flex",
        justifyContent: "space-between",
        width: '100%',
        right:'0' 
    }

    return(
        <div className="header">
            <div style={wrapperStyle}>

            <div className="header--menu">

                <button className="header--menu-button">
                    <img className="header--menu-img"
                    src="../../../assets/images/menu_symbol.png" 
                    alt="menu symbol"/>  
                </button>
                
                <div class="header--menu-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            
            </div>



                {isLarge && (
                
                <div className="centerizer" >
                    <h1 style={titleStyle} className="header--title">
                            negoflict
                    </h1>
                    
                </div>)}
                    
                {!isLarge &&<h1 style={titleStyle} className="header--title" >
                            negoflict
                </h1>}
                    

            </div>

        </div>


    )
}
export default HeaderLarge
