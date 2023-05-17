import "../../../styles/pages/statistics_page.css"
import Header from "../../../components/general/Header.js"

const StatisticsPage = (category)=> {
    let ths = [];
    let tds = [{
        first_name : "Avi",
        last_name :  "Ron",
        user_name : "" ,
        role : "negotiator",
        email : "" , 
        phone_number : "054123123", 
        cases: ["e45ab1" , "e45ab2" , "e45ab3"],
        },
        {
            first_name : "Avi",
            last_name :  "Ron",
            user_name : "" ,
            role : "negotiator",
            email : "" , 
            phone_number : "054123123", 
            cases: ["e45acc" , "e45ca78" , "e45a553"],
            },
    
    ]
        switch (category){
            case("messages"):
                ths = ["sender" , "time" , "content"]
                break;
            default :
                ths = ["First Name" , "Last Name" , "User Name" , "Role" , "Creation" , "Cases"] 


        }


        const usersTable = 
            <table className="sp--table">
            <thead>
            <tr>
                {ths.map(cat=>(<th>{cat}</th>))}{/*Category*/}
            </tr>
            </thead>
            <tbody>

                {tds.map(user => <tr>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.user_name}</td>
                    <td>{user.role}</td>
                    <td>{user.phone_number}</td>
                    <td className="sp--cases">
                        {user.cases.map((caseId, caseIndex) => (
                        <li key={caseIndex}>
                            {caseId}
                            <br/>
                        </li>))}
                    </td>
                </tr>)}
            </tbody>
        </table> 
       
    return(
    <article className="page">
        <Header isLarge={false}/>
            <h1 className="title-large">View Users</h1>
            <div className="sp--table-wrapper">
                {usersTable}

            </div>





    </article>)}
export default StatisticsPage