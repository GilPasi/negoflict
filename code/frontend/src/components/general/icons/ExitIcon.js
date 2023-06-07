import '../../../styles/components/ExitIcon.css'


const ExitIcon = ({onClose,style})=>{

    return(

        <button className='btn-close' onClick={onClose}>
        <div className='exit-div-box' style={style}>
            <div className='exit-biv-p1'></div>
            <div className='exit-div-left-right'></div>
            <div className='exit-div-right-left'></div>

        </div>

        </button>

    )
}
export default ExitIcon