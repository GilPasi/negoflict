import '../../styles/components/ChatChanges.css'


export const ChatChangesNotifications = ({position, msg, intersept})=>{

console.log('position',position)
const fixedPosition = parseFloat(position)+168 + intersept ?? 0
console.log('popopop',fixedPosition)
    



    return(
        <div className='changes-head' style={{top:`${fixedPosition}px`}}>
            <span className='changes-notification'>{msg}</span>
        </div>
    )





}