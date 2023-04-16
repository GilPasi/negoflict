import '../../styles/components/info_box.css'



const GeneralInfoBox = ({obj, size})=>{

  const date = new Date(obj['create_at'])
  const create_at = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  const id = obj['id'].slice(-7)


  const modObj = {
      Id:id,
      create_at:create_at,
      Title:obj['title'],
      Category:obj['category'],
      Sub_category:obj['sub_category'],
      Problem_brief:obj['problem_brief'],
      Is_active:obj['is_active']?'active':'not-active'
              }
      if(!obj['is_active']){
        modObj = {...modObj,['Close_at']:obj['close_at'],['Summary']:obj['summary']}
      }
    const objKeys = Object.keys(modObj)
    
    return(
        <div className='list-box'>
            <ul>
            {objKeys.map((key, index) => {
              return(
                <li className='tr' key={index}>
                <span className='tr-key'>{key}</span>
                <span className='tr-value'>{modObj[key]}</span>
              </li>
            )})}
          </ul>
        </div>
    )

}

export default GeneralInfoBox

