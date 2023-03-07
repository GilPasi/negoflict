
const ToolBar =({conflictName , id})=>{

    const handleSearch =()=>{


    }

    const handleAdd = () =>{


    }
    const handleShuttle = () =>{


    }

    return(<div className="toolbar--container">
        <div className="toolbar--add-icon" onClick={handleAdd}>
            <img src={`../../../assets/images/add_icon_dark.png`}
                 />
        </div>

            <div className="toolbar--title" >
                <h3 className="toolbar--name">{conflictName}</h3>
                <h4 className="toolbar--id">I.D. {id}</h4>
            </div>
            
            
            <div className="toolbar--search-icon" onClick={handleSearch}>
                <img src={`../../../assets/images/search_icon_dark.png`}
                 />
            </div>

            <div toolbar--group>
                <button onClick={handleShuttle}>Party A</button>
                <button onClick={handleShuttle}>Main</button>
                <button onClick={handleShuttle}>Party B</button>

            </div>

        </div>)
}
export default ToolBar

