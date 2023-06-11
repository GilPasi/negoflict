import '../../styles/components/iconImgeUser.css'


const IconImageUser = ({setting})=>{


    return(
      <div className={`box-icon-user-image${setting?'-setting':''}`}>
        <div  className='icon-head'></div>
        <div className='icon-body'></div>
      </div>
    )
}

export default IconImageUser