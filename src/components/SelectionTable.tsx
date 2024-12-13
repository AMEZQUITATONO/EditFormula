import { Button, Table } from "@mui/joy"
import { useSearchExpressionContext } from "../contexts/SearchExpressionContext";
import React from "react";
import { useSelectedExpressionContext } from "../contexts/SelectedExpressionContext";
import { usePaginationContext } from "../contexts/PaginationContext";
//import { SearchExpressionContextType } from "../contexts/types/search-expression";

function SelectionTable() {
    const { expressions, search, setExpressionSelected } = useSearchExpressionContext();
    const { setExpressionText } = useSelectedExpressionContext();
    const { page, setActivePage } = usePaginationContext();

    const filteredExpressions = React.useMemo(() => {
        if (!Array.isArray(expressions) || expressions.length === 0) {
            return [];
        } else {
            return expressions.filter((expression) => {
                const filteredName = expression.formula_code.toLowerCase().includes(search.toLowerCase());
                const filteredExpression = expression.expression_.toLowerCase().includes(search.toLowerCase());
                return filteredName || filteredExpression;
            });
        }
    }, [expressions, search]);

    return (
        <Table
            borderAxis="bothBetween"
            size="md"
            variant="soft"
        >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Expresión</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {filteredExpressions.map((expression) => (
                    <tr key={expression.id}>
                        <td>{expression.id}</td>
                        <td>{expression.formula_code}</td>
                        <td>{expression.expression_}</td>
                        <td>{expression.date}</td>
                        <td>{expression.status_}</td>
                        <td>
                            <Button onClick={() => { setExpressionSelected(expression); setExpressionText(expression.expression_); setActivePage(page + 1) }}>Editar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default SelectionTable