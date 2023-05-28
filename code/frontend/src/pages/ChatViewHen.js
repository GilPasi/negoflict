import '../styles/pages/chat_page.css'
import {useEffect, useState} from "react";
import Header from "../components/general/Header";
import ToolBar from "../components/general/ToolBar";
import GroupSwitch from "../components/general/GroupSwitch";


const ChatViewHen = ({
                         caseId,
                         handleShuttle,
                         role,
                         centerGroup,
                         category,
                         caseTitle,


                     }) => {
    //state===================================================================================================
    const [size, setSize] = useState(window.innerHeight);
    //===================================================================================================

    //variables===================================================================================================
    const FOOTER_SIZE = 125 , HEADER_SIZE = 297.281-0.11298*window.innerHeight//Found by linear approximation
    const isMediator = role==='mediator'
    const caseIdView = caseId.slice(-7)
    //===================================================================================================

    useEffect(()=>{
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    },[])


         const handleResize = () => {
        setSize(window.innerHeight);
         }


    return(
        <article
            className='page cp'
            style={{
                position:'relative',
                height:`${size}px`,
                // width:'100vh',
                display:'grid',
                backgroundColor:'red',
                gridTemplateRows:`${HEADER_SIZE}px 1fr ${FOOTER_SIZE}px`,
            }}>

            <header className='cp--header'>
                <Header isLarge={false} unconnected={true} withoutLinks={true}/>
                <ToolBar
                    isChat={true}
                />
                <GroupSwitch/>

            </header>

            <div>

            </div>



        </article>
    )

}
export default ChatViewHen