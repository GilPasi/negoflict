import '../../styles/components/ChatChanges.css'


export const ChatChangesNotifications = ({position, msg, intersept})=>{


const fixedPosition = parseFloat(position)+168 + intersept ?? 0

    



    return(
        <div className='changes-head' style={{top:`${fixedPosition}px`}}>
            <span className='changes-notification'>{msg}</span>
        </div>
    )





}