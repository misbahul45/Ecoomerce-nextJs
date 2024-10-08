'use client'
import React, { createContext, useState, useContext } from 'react';

export const Context = createContext({
    showSearch: false,
    showUserMenu:false,
    showSidebar: false,
    toggleSearch: () => {},
    toggleUserMenu: () => {},
    toggleSidebar: () => {},
    searching: (e: React.ChangeEvent<HTMLInputElement>) => {},
    search: '',
});

export const useSearch = () => useContext(Context);

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    }

    const toggleSearch = () =>{
        setShowSearch(prev => !prev);
        setShowUserMenu(false);
        setShowSidebar(false);
        setSearch('');
    }
    const toggleUserMenu=() =>{
        setShowUserMenu(prev => !prev);
        setShowSidebar(false);
        setShowSearch(false);
    }

    const searching=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }
    return (
        <Context.Provider value={{ showSearch, toggleSearch, showUserMenu, toggleUserMenu , searching, search, showSidebar, toggleSidebar }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;
