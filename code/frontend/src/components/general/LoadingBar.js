import "../../styles/components/loading_bar.css"

const LoadinBar = ({progress,task }) => {


    return (
        
    <section className="section-loading-bar">
        <div className="box">
      
        <label className="loading-bar--task">
        <div class="loading-dots">
            <span className="task">{task}</span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
        </label>
            <div className="loading-bar--bar progress" role="progressbar"  value={progress} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height:'30px',backgroundColor:"var(--green-light)", borderRadius:'2em'}}>
                <div className="loading-bar--filler progress-bar progress-bar-striped bg-success progress-bar-animated" style={{width:`${progress}%`}}/>
            </div>
        </div>
    </section>
    );
  };
  
  export default LoadinBar;
