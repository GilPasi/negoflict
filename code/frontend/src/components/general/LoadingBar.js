import "../../styles/components/loading_bar.css"

const LoadinBar = ({progress,task }) => {


    return (
        
    <section className="section-loading-bar">
        <div>
        <div className="box">
      
        <label className="loading-bar--task">
        <div className="loading-dots">
            <span>{task}</span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
        </label>
        </div>

            <div className="loading-bar--bar progress" role="progressbar"  value={progress} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height:'20px',backgroundColor:"var(--green-light)", borderRadius:'2em'}}>
                <div className="loading-bar--filler progress-bar progress-bar-striped bg-success progress-bar-animated" style={{width:`${progress}%`}}/>
            </div>
        </div>
    </section>
    );
  };
  
  export default LoadinBar;
