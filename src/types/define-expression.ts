export interface IFunction {
  id: number;
  function_category_id: string;
  name_: string;
  label_: string;
  quantity_arguments: number;
  data_type_: string;
  length_: number;
  precision_: number;
  status_: string;
  class_: string;
  ind_enable: boolean;
  help_: string;
  description_: string;
  message_: string;
}

export interface IIdentifier {
  id: number;
  name: string;
  value: string;
  type: string;
}

export type SelectedExpressionContextType = {
  textExpression: string;
  setExpressionText: (expression: string) => void;
};
