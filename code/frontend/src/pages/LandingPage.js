import { Routes,Route } from "react-router-dom";
import React, {Suspense, lazy} from "react"
import Loader from "../components/general/Loader.js";


const AdminMenu = lazy(()=>import("./roleMenu/admin_menu.js"))
const CreateUserWraper = lazy(()=>import("../components/general/CreateUserWrapper.js"))
const CaseFormPage = lazy(()=>import("./CaseFormPage.js"))
const MediatorMenu = lazy(()=>import("./rolePages/mediator/MediatorMenu.js"))
const CasePage = lazy(()=> import("./CasePage.js")) ;
const ChatPageA = lazy(()=>import('./ChatPage.js'))
const CreateMediatorWrapper = lazy(()=>import('../components/general/CreateMediatorWrapper'))
const Clients = lazy(()=>import('./rolePages/mediator/ClientsPage'))
const CreateSelfUser = lazy(()=>import('./CreateSelfUserPage'))
const SurveyPage = lazy(()=>import('./SurveyPage.js'))





const UserLandingPage = () => {

    return (
        <Suspense fallback={<div><Loader/></div>}>
        <Routes>
            <Route path="/" element = {<CasePage isMediator={false}/>}/>
            <Route path="/chat/*" element={<ChatPageA isMediator={false}/>}/>
            <Route path="/survey_page" element={<SurveyPage />}/>
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
            <Route path="/chat/*" element={<ChatPageA/>}/>
            <Route path="/cases" element={<CasePage isMediator={true}/>}/>
            <Route path="cases/new_case" element={<CaseFormPage/>}/>
            <Route path="create_users" element={<CreateUserWraper/>}/>
            <Route path="/clients" element={<Clients/>}/>
            <Route path="clients/create_user" element={<CreateSelfUser/>}/>
        </Routes>
        </Suspense>
    )
    

}



const SuperUserLandingPage = ()=>{
    

    return(
                <Suspense fallback={<div><Loader/></div>}>
                <Routes>
                    <Route path="/addmediator" element={<CreateMediatorWrapper/>}/>
                    <Route path="/" element={<AdminMenu/>}/>
                </Routes>
                </Suspense>
                
                

            
      
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}