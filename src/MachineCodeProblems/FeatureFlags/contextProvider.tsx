import { initialContext, MyFeatureFlagContext } from "./contextHook";
import { IMyFeatureContextProviderProps } from "./types";
import { FC, useState } from "react";

export const MyFeatureContextProvider: FC<
  React.PropsWithChildren<IMyFeatureContextProviderProps>
> = ({ value, children }) => {
  const [contextState, setContextState] = useState(value || initialContext);

  return (
    <MyFeatureFlagContext.Provider value={contextState}>
      {children}
    </MyFeatureFlagContext.Provider>
  );
};
