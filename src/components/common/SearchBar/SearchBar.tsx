import './SearchBar.css';

const SearchBar = ()=> {
    return(
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <span className="search-icon">&#128269;</span>
            </div>
    )
}
export default SearchBar;