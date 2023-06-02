import "../../styles/components/loader.css"

const Loader=({withLogo,size})=>{
    let circleSize = {borderTop:'6px solid var(--green-dark)', width:'150px',height:'150px'}
    switch (size) {
        case 'small':
            circleSize = {borderTop:'4px solid var(--green-dark)', width:'40px',height:'40px'}
            break;
        case 'medium':
             circleSize = {borderTop:'4px solid var(--green-dark)', width:'100px',height:'100px'}
             break;
        case 'x-small':
            circleSize = {borderTop:'3px solid var(--green-dark)', width:'30px',height:'30px'}
            }

    
    
    return(
        <div className="loader">
            {withLogo&&<h1>NEGOFLICT</h1>}
            <div className="loader--circle" style={circleSize} />
        </div>

    )
}
export default Loader