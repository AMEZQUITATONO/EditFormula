export interface IExpression {
  id: number;
  evaluation_type_id: number;
  formula_code: string;
  version_: number;
  level_: number;
  data_type: string;
  length_: number;
  precision_: number;
  status_: string;
  ind_enable: boolean;
  expression_: string;
  error_message: string;
  date: string;
}

export type SearchExpressionContextType = {
  search: string;
  setSearchExpression: (search: string) => void;
  expressions: IExpression[];
  setExpressionsData: (expressions: IExpression[]) => void;
  getExpressionsData: () => IExpression[];
  selectedExpression: IExpression | null;
  setExpressionSelected: (expression: IExpression) => void;
};
