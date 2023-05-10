import '../../styles/components/popupGeneral.css'


const PopUpGeneral = ({children, onClose})=>{
    const {user} = children
    const {email} = user

    let objKey = Object.keys(children)
  




    return(
        <div className='popUpContiner'>
            <span className='title-full-name'>{`${user.first_name} ${user.last_name}`}</span>
            <button className='btn-close' onClick={onClose}>
            <div className='exit-div-box'>
                <div className='exit-biv-p1'></div>
                <div className='exit-div-left-right'></div>
                <div className='exit-div-right-left'></div>

            </div>

            </button>
         
        <div className='popUpBox'>
            <ul className='list-prop'>
                {
                    <li>
                        <span className='key-pop'>Email</span>
                        <span className='value-pop'>{email}</span>
                    </li>
                }
                
                {objKey.map((key,index)=>{
                    if(key!=='user')
                    
                    return(
                    <li key={index}>
                        <span className='key-pop'>{key}</span>
                        <span className='value-pop'>{children[key]}</span>
                    </li>
                    )

                })}
            </ul>
        </div>
        </div>

    )



}
export default PopUpGeneral