import "../../styles/components/search_bar.css"

function SearchBar({search , handleClick , handleChange}) {

  return (
    <div className="root search-bar">
      <div  role="search" className="search-bar">
        <label htmlFor="search" className="search-bar--subtitles">Search for stuff</label>
        <input 
          className="search-bar--input"
          id="search" 
          type="search" 
          placeholder="Search..." 
          autoFocus
          required
          onChange={handleChange}
        // value={search || ''}
        />
        <button onClick={handleClick} className="search-bar--btn">find</button>    
      </div>
    </div>
  );
}

export default SearchBar;
