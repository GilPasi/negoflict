import { Routes,Route } from "react-router-dom";
import React, {Suspense, lazy} from "react"
import Loader from "../components/general/Loader.js";


const AdminMenu = lazy(()=>import("./roleMenu/AdminMenu.js"))
const CreateUserWraper = lazy(()=>import("../components/general/CreateUserWrapper.js"))
const CaseFormPage = lazy(()=>import("./CaseFormPage.js"))
const MediatorMenu = lazy(()=>import("./rolePages/mediator/MediatorMenu.js"))
const CasePage = lazy(()=> import("./CasePage.js")) ;
const ChatPageA = lazy(()=>import('./ChatPage.js'))
const CreateMediatorWrapper = lazy(()=>import('../components/general/CreateMediatorWrapper'))
const Clients = lazy(()=>import('./rolePages/mediator/ClientsPage'))
const CreateSelfUser = lazy(()=>import('./CreateSelfUserPage'))
const SurveyPage = lazy(()=>import('./SurveyPage.js'))
const MediatorList = lazy(()=>import('./roleMenu/mediatorList'))
const StatisticsPage = lazy(()=>import('./rolePages/admin/StatisticsPage.js'))
const ManageAccountsPage = lazy(()=>import('./rolePages/admin/ManageAccountsPage.js'))
const ChatPageHen = lazy(()=>import('./ChatPageHen.js'))
const AllUsers = lazy(()=>import('./rolePages/admin/allUsers.js'))





const UserLandingPage = () => {

    return (
        <Suspense fallback={<div><Loader/></div>}>
        <Routes>
            <Route path="/chat/*" element={<ChatPageHen isMediator={false}/>}/>
            <Route path="/survey_page" element={<SurveyPage />}/>
            <Route path="/cases/*" element = {<CasePage isMediator={false}/>}/>
            
            {/* <Route path="/" element={}/> */}
        </Routes>
        </Suspense>
    )
}
const MediatorLandingPage = ()=>{
    return (
        <Suspense fallback={<div><Loader/></div>}>
        <Routes>
            <Route path="/" element={<MediatorMenu/>}/>
            {/* <Route path="/chat/*" element={<ChatPage isMediator={true}/>}/> */}
            {/*<Route path="/chat/*" element={<ChatPageA/>}/>*/}
            <Route path="cases/new_case" element={<CaseFormPage/>}/>
            <Route path="cases/*" element={<CasePage isMediator={true}/>}/>
            <Route path="create_users" element={<CreateUserWraper/>}/>
            <Route path="chat/*" element={<ChatPageHen />}/>
            <Route path="/clients" element={<Clients/>}/>
            <Route path="clients/create_user" element={<CreateSelfUser/>} />
        </Routes>
        </Suspense>
    )
    

}



const SuperUserLandingPage = ()=>{
    

    return(
                <Suspense fallback={<div><Loader/></div>}>
                <Routes>
                    <Route path="/addmediator" element={<CreateMediatorWrapper/>}/>
                    <Route path="mediator_list" element={<MediatorList/>}/>
                    <Route path="statistics" element={<StatisticsPage/>}/>
                    <Route path="manage accounts" element={<AllUsers/>}/>
                    <Route path="create_users" element={<CreateUserWraper/>}/>

                    <Route path="/" element={<AdminMenu/>}/>
                </Routes>
                </Suspense>
                
                

            
      
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}