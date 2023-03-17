import '../styles/add_user_page.css'
import Header from '../components/general/Header.js'
import ToolBar from '../components/general/ToolBar.js'

const AddUserPage =()=>{

    const id = 100777
        return(

        <div className="aup">
            <Header size={"small"}/>
            <ToolBar conflictName="A politiacal conflict" id={id}/>
            

        </div>

    )}

export default AddUserPage