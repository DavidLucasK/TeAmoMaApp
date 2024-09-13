// src/context/AppContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface AppContextProps {
    user: number | null;
    setUser: React.Dispatch<React.SetStateAction<number | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<number | null>(null);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
