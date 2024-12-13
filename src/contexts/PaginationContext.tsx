import { createContext, FC, ReactNode, useContext, useState } from "react";

export type PaginationContextType = {
    page: number;
    setActivePage: (page: number) => void;
}

export const PaginationContext = createContext<PaginationContextType | null>(null);

const PaginationContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [page, setPage] = useState<number>(0);

    const setActivePage = (page: number) => {
        setPage(page);
    }

    return (
        <PaginationContext.Provider value={{ page, setActivePage }}>
            {children}
        </PaginationContext.Provider>
    )
}

export default PaginationContextProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const usePaginationContext = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePaginationContext must be used within a PaginationProvider');
    }
    return context;
}