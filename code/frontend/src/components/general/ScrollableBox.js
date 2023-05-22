import '../../styles/components/scrollable_box.css'

import TextHolder from './TextHolder'



const ScrollableBox = ({list,withInfo, hasExit})=>{

    return(
        <div className="scrollable-box">

            {list&&list.map(data=>{
                
                const title = `${data?.user?.first_name ?? data?.first_name ?? ''}   ${data?.user?.last_name ?? data?.last_name ?? ''}`
               
                return(
                
                <div key={data?.user?.id ?? data.id}>
                    <h3 key={data?.user?.email ?? data.email} style={{marginTop:'5px',marginBottom:'0'}}>{data?.user?.email ?? data.email ?? ''}</h3>
                    <TextHolder caseData={{title:title}} withInfo={false} hasExit={hasExit}/>
                    
                    </div>)
                    
            })}
        
            
            
            
            
        </div>
    )

}

export default ScrollableBox