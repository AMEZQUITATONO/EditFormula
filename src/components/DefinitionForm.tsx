import { Button, Input, List, ListItem, ListItemButton, Textarea } from "@mui/joy";
import DocumentSearchIcon from "./icons/DocumentSearch";
import DocumentCheckIcon from "./icons/DocumentCheck";
import XCircleIcon from "./icons/XCircle";
import PlusIcon from "./icons/Plus";
import MultiplyIcon from "./icons/Multiply";
import ParentesisLeftIcon from "./icons/ParentesisLeft";
import MinusIcon from "./icons/Minus";
import DivideIcon from "./icons/Divide";
import ParentesisRightIcon from "./icons/ParentesisRight";
import data from '../assets/data.json';
import { IFunction, IIdentifier } from "../types/define-expression";
import React, { useState } from "react";
import { useSelectedExpressionContext } from "../contexts/SelectedExpressionContext";
import { usePaginationContext } from "../contexts/PaginationContext";
import { useSearchExpressionContext } from "../contexts/SearchExpressionContext";
import { IExpression } from "../types/search-expression";

function DefinitionForm() {
    const { selectedExpression, setExpressionSelected } = useSearchExpressionContext();
    const { textExpression, setExpressionText } = useSelectedExpressionContext();
    const { page, setActivePage } = usePaginationContext();
    const [helpText, setHelpText] = useState<string>('Texto de ayuda');
    const [functionItems, setFunctionItems] = useState<IFunction[]>([]);
    const [identifierItems, setIdentifierItems] = useState<IIdentifier[]>(data.identifiers);

    React.useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + 'function_').then((response) => {
            response.json().then((data) => {
                setFunctionItems(data.data as IFunction[]);
            })
        })
        fetch(import.meta.env.VITE_API_URL + 'identifier_').then((response) => {
            response.json().then((data) => {
                setIdentifierItems(data.data as IIdentifier[]);
            })
        })
    }, []);

    const handleClick = (value: string) => {
        setExpressionText(`${textExpression} ${value}`.trim());
    }

    const handleSave = () => {
        setExpressionSelected({
            ...selectedExpression,
            expression_: textExpression
        } as IExpression);
        fetch(import.meta.env.VITE_API_URL + 'formula_/' + selectedExpression?.id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...selectedExpression,
                    expression_: textExpression
                })
            }).then((response) => {
                response.json().then((data) => {
                    console.log('Success:', data);
                }).catch((error) => {
                    console.error('Error:', error);
                })
            })
    }

    const handleDeleteAtCursor = () => {
        const textarea = document.querySelector('textarea');
        const start = textarea?.selectionStart;
        const end = textarea?.selectionEnd;

        if (start !== undefined && end !== undefined && start > 0) {
            // Elimina el carácter en la posición del cursor
            const newText = textExpression.slice(0, start - 1) + textExpression.slice(end);
            setExpressionText(newText);

            // Coloca el cursor en la nueva posición
            setTimeout(() => {
                if (textarea) {
                    textarea.setSelectionRange(start - 1, start - 1);
                    textarea.focus();
                }
            }, 0);
        }
    };

    return (
        <>
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="font-bold">Expresión</h4>
                </div>
                <div className="flex gap-2">
                    <Button color="primary" startDecorator={<DocumentSearchIcon />}>Validar</Button>
                    <Button color="success" startDecorator={<DocumentCheckIcon />} onClick={handleSave}>Guardar</Button>
                    <Button color="danger" startDecorator={<XCircleIcon />} onClick={() => setActivePage(page - 1)}>Cancelar</Button>
                </div>
            </div>
            <div className="mt-4 h-[20vh]">
                <Textarea
                    color="primary"
                    minRows={2}
                    variant="outlined"
                    value={textExpression}
                    onChange={(e) => setExpressionText(e.target.value)}
                    className="w-full h-full"
                />
            </div>
            <div className="mt-4 mx-8 flex gap-4 items-center">
                <div>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => setExpressionText(`${textExpression} +`.trim())}><PlusIcon /></Button>
                            <Button onClick={() => setExpressionText(`${textExpression} *`.trim())}><MultiplyIcon /></Button>
                            <Button onClick={() => setExpressionText(`${textExpression} (`.trim())}><ParentesisLeftIcon /></Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => setExpressionText(`${textExpression} -`.trim())}><MinusIcon /></Button>
                            <Button onClick={() => setExpressionText(`${textExpression} /`.trim())}><DivideIcon /></Button>
                            <Button onClick={() => setExpressionText(`${textExpression} )`.trim())}><ParentesisRightIcon /></Button>
                        </div>
                    </div>
                    <div className="flex mt-2">
                        <Button color="danger" className="flex-grow" onClick={handleDeleteAtCursor}>Eliminar</Button>
                    </div>
                </div>
                <div className="flex flex-grow flex-col gap-2">
                    <h5>Funciones</h5>
                    <Input placeholder="Categoría" />
                    <div className="border bg-white rounded-md p-2 overflow-auto h-[20vh]">
                        <List>
                            {functionItems.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemButton onMouseEnter={() => { setHelpText(item.help_ + '. ' + item.description_) }} onMouseLeave={() => { setHelpText('Texto de ayuda') }} onClick={() => { handleClick(item.label_) }}>{item.name_}</ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
                <div className="flex flex-grow flex-col gap-2">
                    <h5>Identificadores</h5>
                    <Input placeholder="Identificador" />
                    <div className="border bg-white rounded-md p-2 overflow-auto h-[20vh]">
                        <List>
                            {identifierItems && identifierItems.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemButton onClick={() => { handleClick(item.value) }}>{item.name}</ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="font-bold">Descripción</h4>
                <p>{helpText}</p>
            </div>
        </>
    )
}

export default DefinitionForm;