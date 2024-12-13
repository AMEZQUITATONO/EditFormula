import React from "react";
import SelectedExpressionProvider from "../contexts/SelectedExpressionContext";
import SearchExpressionProvider from "../contexts/SearchExpressionContext";
import PaginationContextProvider from "../contexts/PaginationContext";

function RootProvider({ children }: { children: React.ReactNode }) {
    return (
        <SearchExpressionProvider dataExpressions={[]}>
            <SelectedExpressionProvider>
                <PaginationContextProvider>
                    {children}
                </PaginationContextProvider>
            </SelectedExpressionProvider>
        </SearchExpressionProvider>
    )
}

export default RootProvider;