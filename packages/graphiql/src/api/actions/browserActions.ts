export enum BrowserActionTypes {
  QueryStringParamsRequested = 'QueryStringParamsRequested',
  QueryStringParamsChanged = 'QueryStringParamsChanged',
}

export type BrowserAction =
  | QueryStringParamsRequestedAction
  | QueryStringParamsChangedAction;

export const queryStringParamsRequestedAction = () =>
  ({
    type: BrowserActionTypes.QueryStringParamsRequested,
  } as const);

export type QueryStringParamsRequestedAction = ReturnType<
  typeof queryStringParamsRequestedAction
>;

export const queryStringParamsChangedAction = (
  parameter: string,
  value: string,
) =>
  ({
    type: BrowserActionTypes.QueryStringParamsChanged,
    payload: { parameter, value },
  } as const);

export type QueryStringParamsChangedAction = ReturnType<
  typeof queryStringParamsChangedAction
>;
