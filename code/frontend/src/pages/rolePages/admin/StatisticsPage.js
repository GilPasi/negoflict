import "../../../styles/pages/statistics_page.css"
import Header from "../../../components/general/Header.js"
import {useState} from "react"

const StatisticsPage = (category)=> {
    const usersThs = ["First Name" , "Last Name" , "User Name" , "Role" , "Creation" , "Cases"]
    const messagesThs = ["sender" , "party", "time" , "content" , "case"]

    const usersTds = [{
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
        {
        first_name : "Avi",
        last_name :  "Ron",
        user_name : "" ,
        role : "negotiator",
        email : "" , 
        phone_number : "054123123", 
        cases: ["e45acc" , "e45ca78" , "e45a553"],
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

    const messagesTds = [
        {
            case_id :"3e5772" , 
            sender_first_name : "Avi", 
            sender_last_name : "Ron",
            side : "A" , 
            send_time :"13:50 01/02/2023" , 
            content : "What does the fox says?" ,



        },
        {
            case_id :"3e5772" , 
            sender_first_name : "Eli", 
            sender_last_name : "Copter",
            side : "M" , 
            send_time :"13:52 01/02/2023" , 
            content : "Ding ding ding ding ding!" ,



        },

    ]
    const pre = " "
    const usersTable = 
            <table className="sp--table">
            <thead>
            <tr>
                {usersThs.map(cat=>(<th>{cat}</th>))}{/*Category*/}
            </tr>
            </thead>
            <tbody>

                {usersTds.map(user => <tr>
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
        const messagesTable =                 
            <table className="sp--table">
                <thead>
                    <tr>
                        {messagesThs.map(cat=>(<th>{cat}</th>))}{/*Category*/}
                    </tr>
                </thead>
            <tbody>
            {messagesTds.map(msg => <tr>
                <td>{msg.sender_first_name}{pre}{msg.sender_last_name}</td>
                <td>{msg.side}</td>
                <td>{msg.send_time}</td>
                <td>{msg.content}</td>
                <td>{msg.case_id}</td>
            </tr>)}
        </tbody>
    </table> 
    const [currentTable ,setCurrentTable] = useState(0)

    return(
    <article className="page middle sp">
        <Header isLarge={false}/>
             <h1 className="title-large">View Users</h1>
                <div className="middle">
                    <button 
                        class="sp--arrow-btn"
                        onClick={()=>setCurrentTable(1)}
                        id="sp--right-arrow"
                    >
                        <span class="left-arm"/>
                        <span class="right-arm"/>
                        <span class="arrow-slide"/>
                    </button>
                    <button
                        class="sp--arrow-btn"
                        onClick={()=>setCurrentTable(0)}
                        id="sp--left-arrow"
                    >
                    <span class="left-arm"/>
                    <span class="right-arm"/>
                    <span class="arrow-slide"/>
                </button>

                </div>
           
                <div className="sp--table-scope">
                     <div className="sp--table-wrapper" style={{transform:`translate(calc(${currentTable}*100%))`}}>
                        <div className="sp--table-container">
                            {usersTable}
                        </div>
                    
                        <div className="sp--table-container">
                            {messagesTable }
                        </div>
                   
                    </div> 
                </div>

    </article>)}
export default StatisticsPage