import {useState} from 'react'

const ToolBar =({conflictName , id})=>{


    const handleSearch =()=>{

    }

    const handleAdd = () =>{

    }
    
    return(
            <div className="toolbar">
                <div className="toolbar--header">
                    <div className="toolbar--add-icon" onClick={handleAdd}>
                        <img src={`../../../assets/images/add_icon_dark.png`}
                        alt="Add member button"  />
                    </div>

                        <div className="toolbar--title" >
                            <h3 className="toolbar--name">{conflictName}</h3>
                            <h4 className="toolbar--id">I.D. {id}</h4>
                        </div>
                        
                        
                        <div className="toolbar--search-icon" onClick={handleSearch}>
                            <img src={`../../../assets/images/search_icon_dark.png`}
                            alt="Search button" 
                            />
                        </div>
                </div>
            </div>
        
        )
}
export default ToolBar

