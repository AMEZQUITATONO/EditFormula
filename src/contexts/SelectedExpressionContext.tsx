import { createContext, FC, ReactNode, useContext, useState } from "react";
import { SelectedExpressionContextType } from "../types/define-expression";

export const SelectedExpressionContext = createContext<SelectedExpressionContextType | null>(null);

const SelectedExpressionProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedExpression, setSelectedExpression] = useState<string>('');

    const setExpressionSelected = (expression: string) => {
        setSelectedExpression(expression);
    }

    return (
        <SelectedExpressionContext.Provider value={{ textExpression: selectedExpression, setExpressionText: setExpressionSelected }}>
            {children}
        </SelectedExpressionContext.Provider>
    )
}

export default SelectedExpressionProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedExpressionContext = () => {
    const context = useContext(SelectedExpressionContext);
    if (!context) {
        throw new Error('useSelectedExpressionContext must be used within a SelectedExpressionProvider');
    }
    return context;
}