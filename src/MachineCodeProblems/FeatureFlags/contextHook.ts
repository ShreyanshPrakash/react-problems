import { IInitialContext } from "./types";
import { createContext, useContext } from "react";


export const initialContext: IInitialContext = {
  showTitle: true,
};

export const MyFeatureFlagContext = createContext(initialContext);

export const useMyFeatureContext = () => {
  const context = useContext(MyFeatureFlagContext);

  if (!context) {
    throw new Error("context is null");
  }
  return context;
};