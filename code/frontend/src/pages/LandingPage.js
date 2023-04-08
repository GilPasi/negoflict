import { Routes,Route } from "react-router-dom";
import React, {Suspense, lazy} from "react"

const AdminMenu = lazy(()=>import("./roleMenu/admin_menu.js"))
const CreateUserWraper = lazy(()=>import("../components/general/CreateUserWrapper.js"))
const CaseFormPage = lazy(()=>import("./CaseFormPage.js"))
const MediatorMenu = lazy(()=>import("./rolePages/mediator/MediatorMenu.js"))
const AddMediator = lazy(()=>import('./rolePages/admin/AddMediator'))
const ChatPage = lazy(()=>import('./rolePages/mediator/ChatPage.js'))
const CasePage = lazy(()=> import("./CasePage.js")) ;



const UserLandingPage = () => {

    return (
        <Suspense fallback={<div>loading</div>}>
        <Routes>
            <Route path="/" element = {<CasePage isMediator={false}/>}/>
            <Route path="/chat/*" element={<ChatPage isMediator={false}/>}/>
            {/* <Route path="/" element={}/> */}
        </Routes>
        </Suspense>
    )
}
const MediatorLandingPage = ()=>{
    return (
        <Suspense fallback={<div>loading</div>}>
        <Routes>
            <Route path="/" element={<MediatorMenu/>}/>
            <Route path="/chat/*" element={<ChatPage isMediator={true}/>}/>
            <Route path="/cases" element={<CasePage isMediator={true}/>}/>
            <Route path="cases/new_case" element={<CaseFormPage/>}/>
            <Route path="create_users" element={<CreateUserWraper/>}/>
        </Routes>
        </Suspense>
    )
    

}



const SuperUserLandingPage = ()=>{
    

    return(
                <Suspense fallback={<div>loading</div>}>
                <Routes>
                    <Route path="/addmediator" element={<AddMediator/>}/>
                    <Route path="/" element={<AdminMenu/>}/>
                </Routes>
                </Suspense>
                
                

            
      
    )

}



export {UserLandingPage, MediatorLandingPage, SuperUserLandingPage}