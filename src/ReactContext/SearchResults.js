import React, { createContext, useState } from 'react'

export const searchResultContext = createContext()

const SearchResultsProvider = (props) => {
    const { children } = props
    const [searchResults, setSearchResults] = useState([])

    return (
        <searchResultContext.Provider
            value={{
                searchResults,
                setSearchResults,
            }}
        >
            {children}
        </searchResultContext.Provider>
    )
}


export default SearchResultsProvider