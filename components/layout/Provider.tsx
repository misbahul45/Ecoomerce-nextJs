'use client'
import React, { createContext, useState, useContext } from 'react';

export const Context = createContext({
    showSearch: false,
    showUserMenu:false,
    toggleSearch: () => {},
    toggleUserMenu: () => {},
    searching: (e: React.ChangeEvent<HTMLInputElement>) => {},
    search: '',
});

export const useSearch = () => useContext(Context);

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleSearch = () =>{
        setShowSearch(prev => !prev);
        setShowUserMenu(false);
        setSearch('');
    }
    const toggleUserMenu=() =>{
        setShowUserMenu(prev => !prev);
        setShowSearch(false);
    }

    const searching=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }
    return (
        <Context.Provider value={{ showSearch, toggleSearch, showUserMenu, toggleUserMenu , searching, search }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;
