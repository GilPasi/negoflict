import '../../styles/components/popupGeneral.css'
import ExitIcon from './icons/ExitIcon'

const PopUpGeneral = ({children, onClose})=>{
    const {user} = children
    const {email} = user

    let objKey = Object.keys(children)
  




    return(
        <div className='popup-general--container'>
            <span className='popup-general--title'>{`${user.first_name} ${user.last_name}`}</span>
            <ExitIcon onClose={onClose}/>
         
        <div className='popup-general--box'>
            <ul className='popup-general--list-prop'>
                {
                    <li className="popup-general--field"> 
                        <span className='popup-general--key-pop'>Email</span>
                        <span className='popup-general--value-pop'>{email}</span>
                    </li>
                }
                
                {objKey.map((key,index)=>{

                    if(key==='user')return

                    let _key = key.replace("_" , " ")
                    _key = _key[0].toUpperCase() + _key.slice(1)
                    
                    let _value = children[key]
                    
                    //Address Certification course property
                    if(_key === "Certification course"){
                        if(_value === true)
                            _value = "✔"
                        if (_value === false)
                            _value = "✘"
                    }

                    return(
                    <li key={index} className="popup-general--field">
                        <span className='popup-general--key-pop'>{_key}</span>
                        <span className='popup-general--value-pop'>{_value}</span>
                    </li>
                )})}
            </ul>
        </div>
        </div>

    )



}
export default PopUpGeneral