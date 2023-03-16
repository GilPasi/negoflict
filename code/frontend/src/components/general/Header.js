import "../../styles/header.css"
import {React} from 'react'

const  Header=({isLarge})=>{


    // __UI properies__
    const titleStyle = {
        fontSize:isLarge ? "var(--font-large)" :"var(--font-medium)"
    }

    const wrapperStyle = {
        display: isLarge ? "flex" : "flex",
        justifyContent: "space-between",
        width: '100%',
    }

    const title = <h1 style={titleStyle} className="header--title" >
                    negoflict
                </h1>
    

    return(
        <div className="header">
            <div style={wrapperStyle}>
                <div className="header--menu">
                    <div >
                        <button className="header--menu-button">
                            <img className="header--menu-img"
                            src="../../../assets/images/menu_symbol.png" 
                            alt="menu symbol"/>  
                        </button>
                    </div>

                <div className="header--menu-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>



                {!isLarge && (
                    <div className="centerizer" >
                        {title}
                </div>)}

            </div>
            {isLarge &&title}

        </div>


    )
}
export default Header
