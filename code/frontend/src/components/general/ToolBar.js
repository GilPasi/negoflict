import "../../styles/components/toolbar.css"
import Loader from './Loader'
const ToolBar =({conflictName , id , handleAdd})=>{

    const handleSearch =()=>{

    }

    
    return(
        <div className="tb">
            <div className="tb--btn" 
            onClick={handleAdd}
            >
                <img 
                src={`../../../assets/images/add_icon_dark.png`}
                className="tb--btn-img"
                alt="Add member button"  />
            </div>

                <div className="tb--title" >
                    <h3 className="tb--name">{conflictName}</h3>
                    {id?<h4 className="tb--id">I.D. {id}</h4>:<Loader size='small' withLogo={false}/>}
                </div>
                
                
                <div className="tb--btn" onClick={handleSearch}>
                    <img src={`../../../assets/images/search_icon_dark.png`}
                    alt="Search button" 
                    className="tb--btn-img"
                    />
                </div>
        </div>
        
        )
}
export default ToolBar

