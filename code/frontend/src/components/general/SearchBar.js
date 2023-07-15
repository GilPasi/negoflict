import "../../styles/components/search_bar.css"

function SearchBar({search , handleClick , handleChange}) {



  return (
    <div className="search-bar">
      <div className="search-bar--container">
        <input placeholder="Search..." className="search-bar--in" onChange={handleChange}/>      
        <button className="search-bar--btn" onClick={handleClick}>find</button>
      </div>
    </div>
  );
}

export default SearchBar;
