import { Button, Input } from "@mui/joy";
import XCircleIcon from "./icons/XCircle";
import { useSearchExpressionContext } from "../contexts/SearchExpressionContext";

function SelectionSearch() {
    const { search, setSearchExpression } = useSearchExpressionContext()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchExpression(e.target.value);
    }

    const handleClear = () => {
        setSearchExpression('');
    }

    return (
        <div className="p-4 flex gap-4 justify-between">
            <Input className="flex-grow" value={search} onChange={handleSearch} />
            <Button color="primary" startDecorator={<XCircleIcon />} onClick={handleClear}>Limpiar</Button>
            <Button color="danger" startDecorator={<XCircleIcon />} onClick={handleClear}>Cancelar</Button>
        </div>
    )
}

export default SelectionSearch;