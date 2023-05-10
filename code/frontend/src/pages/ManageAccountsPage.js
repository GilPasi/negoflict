import "../styles/pages/manage_account_page.css"
import Header from "../components/general/Header.js"
const ManageAccountsPage=()=>{

    return(
    <article className="page map">
        <Header isLarge={false}/>
        <div className="centaerizer">
            <h1 className="title-large">Manage Users</h1>
            <hr/>
            <button className="title-medium">Delete users</button>
            <button className="title-medium">Create users</button>
            <button className="title-medium">Delete Mediator</button>
            <button className="title-medium">Create Mediator</button>


            <h1 className="title-large">Manage Cases</h1>
            <hr/>

            <button className="title-medium">Delete Case</button>
            <button className="title-medium">Create Case</button>

            <button class="button-28" role="button">Button 28</button>
        </div>



    </article>)
}
export default ManageAccountsPage



