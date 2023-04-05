import "../../styles/components/header.css"
import {React} from 'react'

const  Header=({isLarge})=>{


    // __UI properies__
    const titleStyle = {
        fontSize:isLarge ? "2em" :"var(--font-medium)",
        margin:isLarge ? "0.5em 0.5em 2em 0.5em" : "0.5em",
        
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
                    <div className="" >
                        {title}
                </div>
                )}

            </div>
            <center>
                {isLarge &&title}

            </center>

        </div>


    )
}
export default Header
