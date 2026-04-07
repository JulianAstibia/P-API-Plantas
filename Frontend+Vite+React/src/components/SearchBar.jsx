const SearchBar = ({ query, setQuery, onSearch, loading }) => {
    return (
        <form onSubmit={onSearch} className="d-flex gap-2">
            
            <input 
                type="text"
                placeholder="Buscar Planta"
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button 
                className="btn btn-success"
                disabled={loading}
            >
                {loading ? "..." : "Buscar"}
            </button>

        </form>
    )
}
export default SearchBar