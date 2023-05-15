import '../../styles/components/scrollable_box.css'

import TextHolder from './TextHolder'



const ScrollableBox = ({list,withInfo, hasExit})=>{

    return(
        <div className="scrollable-box">

            {list&&list.map(data=>{
                
                const title = `${data?.user?.first_name ?? ''}   ${data?.user?.last_name ?? ''}`
               
                return(
                
                <div key={data.user.id}>
                    <h3 key={data.user.email} style={{marginTop:'5px',marginBottom:'0'}}>{data?.user?.email ?? ''}</h3>
                    <TextHolder caseData={{title:title}} withInfo={false} hasExit={hasExit}/>
                    
                    </div>)
                    
            })}
            
            
            
            
        </div>
    )

}

export default ScrollableBox