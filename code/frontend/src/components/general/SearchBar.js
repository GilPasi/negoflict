import "../../styles/components/search_bar.css"

function SearchBar({search , handleClick , handleChange}) {

  return (
<div  role="search" className="search-bar">
  <label for="search" className="search-bar--subtitles">Search for stuff</label>
  <input 
  id="search" 
  type="search" 
  placeholder="Search..." 
  autofocus
  required
  onChange={handleChange}
  value={search}
   />
  <button onClick={handleClick} className="search-bar--btn">find</button>    
</div>
  );
}

export default SearchBar;
