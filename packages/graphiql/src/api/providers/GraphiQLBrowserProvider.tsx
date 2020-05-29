import React, { useCallback } from 'react';
import { BrowserState } from '../types';
import {
  BrowserAction,
  BrowserActionTypes,
  queryStringParamsRequestedAction,
  queryStringParamsChangedAction,
} from '../actions/browserActions';
import parseQueryStringURL from '../../utility/parseQueryStringURL';

export type BrowserReducer = React.Reducer<BrowserState, BrowserAction>;

export interface BrowserHandlers {
  changeQueryStringParams: (parameter: string, value: string) => void;
  dispatch: React.Dispatch<BrowserAction>;
}

export const initialState: BrowserState = {};

export const initialContextState: BrowserState & BrowserHandlers = {
  changeQueryStringParams: () => null,
  dispatch: () => null,
  ...initialState,
};

export const BrowserContext = React.createContext<
  BrowserState & BrowserHandlers
>(initialContextState);

export const useBrowserContext = () => React.useContext(BrowserContext);

const browserReducer: BrowserReducer = (state, action) => {
  switch (action.type) {
    case BrowserActionTypes.QueryStringParamsRequested:
      return {
        ...state,
        queryStringParams: parseQueryStringURL(window.location.search),
      };
    case BrowserActionTypes.QueryStringParamsChanged: {
      const { parameter, value } = action.payload;
      return {
        ...state,
        queryStringParams: {
          ...state.queryStringParams,
          [parameter]: value,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export type BrowserProviderProps = {
  children: React.ReactNode;
};
