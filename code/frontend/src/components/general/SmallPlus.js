

const SmallPlus = ({onClick})=>{


    return(
        <div className='small-plus' style={{position:'relative',width:'30px',height:'30px'}} onClick={onClick}>
            <div style={{width:'20px',height:'5px',backgroundColor:'white',position:'absolute',top:'35%',transform:'translate(0,-50%)',boxShadow:'2px 2px 0 rgba(0,0,0,0.2)'}}></div>
            <div style={{width:'5px',height:'20px',backgroundColor:'white',transform:'translate(-50%)',left:'34%', position:'absolute',boxShadow:'2px 2px 0 rgba(0,0,0,0.2)'}}></div>
        </div>
    )
}
export default SmallPlus