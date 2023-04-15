import '../../styles/components/scrollable_box.css'
import TextHolder from './TextHolder'



const ScrollableBox = ({list})=>{

   

  



    return(
        <div className="scrollable-box">

            {list&&list.map(data=>{
                const title = `${data?.user?.first_name ?? ''}   ${data?.user?.last_name ?? ''}`
               
                return(
                <div key={data.id}>
                    <TextHolder caseData={{title:title}} withInfo={false} />
                    </div>)
            })}
            
            
            
            
        </div>
    )

}

export default ScrollableBox