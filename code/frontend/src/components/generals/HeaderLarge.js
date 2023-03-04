import {React} from 'react'

const  HeaderLarge=()=>{

    return(
        <div >
            <div className="hl--menu-wrapper">
            <div className="hl--menu">
            <button className="hl-menu-button">
                <img className="header-large--menu-img hl--menu-img"
                src="../../../assets/images/menu_symbol.png" 
                alt="menu symbol"/>  
            </button>
            <div class="hl--menu-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
            </div>


            </div>


             <h1 className="header-large--title">negoflict</h1>
        </div>


    )
}
export default HeaderLarge
