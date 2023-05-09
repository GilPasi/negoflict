import "../../styles/components/loading_bar.css"

const LoadinBar = ({progress,task,style }) => {

    const _style = {
        ...style,
        width:`${progress}%`
    }
    return (
        
    <section className="section-loading-bar">
        <div>
            
            <div>
                <label className="loading-bar--task">
                    <div className="loading-dots">
                        <span>{task}</span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </label>
            </div>

            <div className="loading-bar--bar progress"
                role="progress bar"
                value={progress}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{height:'20px',backgroundColor:"var(--green-light)", borderRadius:'2em'}}>

            <div 
                className="loading-bar--filler progress-bar progress-bar-striped bg-success progress-bar-animated"
                 style={_style}/>
            </div>

        </div>
    </section>
    );
  };
  
  export default LoadinBar;
