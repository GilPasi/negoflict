import "../../styles/components/loader.css"

const Loader=({withLogo,size})=>{
    let circleSize = {width:'150px',height:'150px'}
    switch (size) {
        case 'small':
            circleSize = {width:'40px',height:'40px'}
            break;
        case 'medium':
             circleSize = {width:'100px',height:'100px'}
             break;
            }

    
    
    return(
        <div className="loader">
            {withLogo&&<h1>NEGOFLICT</h1>}
            <div className="circle" style={circleSize} />
        </div>

    )
}
export default Loader