import { Table } from "@mui/joy";
import { useSearchExpressionContext } from "../contexts/SearchExpressionContext";

function DefinitionSelection() {
    const { selectedExpression } = useSearchExpressionContext();

    return (
        <div className="p-4">
            <Table borderAxis="none"
                size="md"
                variant="soft">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Expresión</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedExpression && (
                        <tr>
                            <td>{selectedExpression.id}</td>
                            <td>{selectedExpression.formula_code}</td>
                            <td>{selectedExpression.expression_}</td>
                            <td>{selectedExpression.date}</td>
                            <td>{selectedExpression.status_}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default DefinitionSelection;