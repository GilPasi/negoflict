import "../../styles/components/loading_bar.css"

const LoadinBar = ({progress,task }) => {

    //Avoid overflowed elements and content
    let fillerLength = progress
    fillerLength = fillerLength > 100 ? 100 : fillerLength
    fillerLength = fillerLength < 0 ? 0 : fillerLength

    return (
    <section>
        <label className="loading-bar--task">{task}...</label>
            <div className="loading-bar--bar"  value={fillerLength}>
                <div className="loading-bar--filler" style={{width:`${fillerLength}%`}}/>
            </div>
    </section>
    );
  };
  
  export default LoadinBar;