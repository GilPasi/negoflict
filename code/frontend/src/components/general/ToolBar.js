import {useState} from 'react'
import "../../styles/toolbar.css"

const ToolBar =({conflictName , id})=>{


    const handleSearch =()=>{

    }

    const handleAdd = () =>{

    }
    
    return(
            <div className="tb limiter">
                <div className="tb--header">
                    <div className="tb--add-icon" onClick={handleAdd}>
                        <img src={`../../../assets/images/add_icon_dark.png`}
                        alt="Add member button"  />
                    </div>

                        <div className="tb--title" >
                            <h3 className="tb--name">{conflictName}</h3>
                            <h4 className="tb--id">I.D. {id}</h4>
                        </div>
                        
                        
                        <div className="tb--search-icon" onClick={handleSearch}>
                            <img src={`../../../assets/images/search_icon_dark.png`}
                            alt="Search button" 
                            />
                        </div>
                </div>
            </div>
        
        )
}
export default ToolBar

