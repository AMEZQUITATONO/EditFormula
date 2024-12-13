import { Input, Table } from "@mui/joy";
import { useSelectedExpressionContext } from "../contexts/SelectedExpressionContext";
import data from '../assets/data.json';
import { useSearchExpressionContext } from "../contexts/SearchExpressionContext";
import formatNumber from "../utils/formatNumber";

function SimulationForm() {
    const { textExpression } = useSelectedExpressionContext();
    const { selectedExpression } = useSearchExpressionContext();
    const identifierItems = data.identifiers.filter((item) => textExpression.includes(item.value));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const formattedValue = formatNumber(Number(rawValue), 2);
        e.target.value = formattedValue; // Establece el valor formateado directamente en el input
    };

    return (
        <>
            <h4 className="font-bold">Valores identificadores</h4>
            <div className="mt-4 mx-4">
                <Table borderAxis="none"
                    size="md"
                    variant="soft">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo Dato</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {identifierItems.map((item) => (
                            <tr>
                                <td>{item?.name}</td>
                                <td>{item?.type}</td>
                                <td><Input onChange={handleInputChange} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="mt-4">
                <h4 className="font-bold">Resultado</h4>
                <div className="flex gap-2 mx-4">
                    <div className="flex flex-grow gap-2">
                        <h5>Tipo Dato</h5>
                        <p>{selectedExpression?.data_type}</p>
                    </div>
                    <div className="flex flex-grow gap-2">
                        <h5>Valor</h5>
                        <p>{formatNumber(10000, 2)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SimulationForm;