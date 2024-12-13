import CheckIcon from "./components/icons/Check"
import SelectionTable from "./components/SelectionTable"
import SelectionSearch from "./components/SelectionSearch"
import DefinitionSelection from "./components/DefinitionSelection"
import DefinitionForm from "./components/DefinitionForm"
import SimulationForm from "./components/SimulationForm"
import React from "react"
import { useSearchExpressionContext } from "./contexts/SearchExpressionContext"
import { IExpression } from "./types/search-expression"
import { usePaginationContext } from "./contexts/PaginationContext"
import { Step, StepButton, StepIndicator, Stepper } from "@mui/joy"

const steps = ["Selección", "Definición", "Simulación"]

function App() {
  const { page, setActivePage } = usePaginationContext()

  const { setExpressionsData } = useSearchExpressionContext()

  React.useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'formula_').then((response) => {
      response.json().then((data) => {
        setExpressionsData(data.data as IExpression[]);
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg w-[60vw] h-[80vh] max-h-[80vh]">
        <div className="bg-blue-500 rounded-t-lg py-2 px-4">
          <h1 className="font-bold text-white">Construcción Formula</h1>
        </div>
        <div className="bg-slate-200 rounded-b-md">
          {(() => {
            switch (page) {
              case 0:
                return <SelectionSearch />;
              case 1:
                return <DefinitionSelection />;
              case 2:
                return <DefinitionSelection />;
              default:
                return <div>No matching component</div>;
            }
          })()}
        </div>
        <div className="p-4">
          <Stepper sx={{ "width": "100%" }}>
            {steps.map((step, index) => (
              <Step
                key={step}
                indicator={
                  <StepIndicator
                    variant={page <= index ? 'soft' : 'solid'}
                    color={page < index ? 'neutral' : 'primary'}
                    className="p-1"
                  >
                    {page <= index ? index + 1 : <CheckIcon />}
                  </StepIndicator>
                }
                sx={{
                  '&::after': {
                    ...(page > index &&
                      index !== 2 && { bgcolor: 'primary.solidBg' }),
                  },
                }}
              >
                <StepButton onClick={() => setActivePage(index)}>{step}</StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="p-4 bg-slate-200 rounded-md flex-grow overflow-y-auto">
          {(() => {
            switch (page) {
              case 0:
                return <SelectionTable />;
              case 1:
                return <DefinitionForm />;
              case 2:
                return <SimulationForm />;
              default:
                return <div>No matching component</div>;
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default App
