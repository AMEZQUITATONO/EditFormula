import { createContext, FC, ReactNode, useContext, useState } from "react";
import { IExpression, SearchExpressionContextType } from "../types/search-expression";

export const SearchExpressionContext = createContext<SearchExpressionContextType | null>(null);

const SearchExpressionProvider: FC<{ children: ReactNode, dataExpressions: IExpression[] }> = ({ children, dataExpressions }) => {
    const [search, setSearch] = useState<string>('');
    const [expressions, setExpressions] = useState<IExpression[]>(dataExpressions);
    const [selectedExpression, setSelectedExpression] = useState<IExpression | null>(null);

    const setSearchExpression = (search: string) => {
        setSearch(search);
    }

    const setExpressionsData = (expressions: IExpression[]) => {
        setExpressions(expressions);
    }

    const getExpressionsData = () => {
        return expressions;
    }

    const setExpressionSelected = (expression: IExpression) => {
        setSelectedExpression(expression);
    }

    return (
        <SearchExpressionContext.Provider value={{ search, setSearchExpression, expressions, setExpressionsData, getExpressionsData, selectedExpression, setExpressionSelected }}>
            {children}
        </SearchExpressionContext.Provider>
    )
}

export default SearchExpressionProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchExpressionContext = () => {
    const context = useContext(SearchExpressionContext);
    if (!context) {
        throw new Error('useSearchExpressionContext must be used within a SearchExpressionProvider');
    }
    return context;
}