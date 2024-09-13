'use client'
import React, { createContext, useState, useContext } from 'react';

export const SearchContext = createContext({
    showSearch: false,
    showUserMenu:false,
    toggleSearch: () => {},
    toggleUserMenu: () => {},
    
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleSearch = () =>{
        setShowSearch(prev => !prev);
        setShowUserMenu(false);
    }
    const toggleUserMenu=() =>{
        setShowUserMenu(prev => !prev);
        setShowSearch(false);
    }
    return (
        <SearchContext.Provider value={{ showSearch, toggleSearch, showUserMenu, toggleUserMenu }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
