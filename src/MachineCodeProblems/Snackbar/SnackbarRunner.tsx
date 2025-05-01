import { FC, ReactElement, useState } from "react";
import styled from "styled-components";
import { Snackbar, TSnackbarPosition, TSnackbarVariants } from "./Snackbar";

/*
    ====================================================== [Styles]======================================================
*/

const SnackbarStyles = styled.div`
  .actions-wrapper {
    display: flex;
    gap: 24px;
  }
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface ISnackbarProps {}

class SnackbarStateModel {
  open: boolean;
  message: string;
  variant: TSnackbarVariants;
  postion: TSnackbarPosition;

  constructor() {
    this.open = false;
    this.message = "";
    this.variant = "success";
    this.postion = "top-right";
  }
}

/*
    ====================================================== [Configs]======================================================
*/

const ACTIONS_CONFIG = [
  {
    variant: "success",
    postion: "top-right",
    label: "Success/ Top-Right",
  },
  {
    variant: "failure",
    postion: "top-right",
    label: "Failure/ Top-Right",
  },
  {
    variant: "warning",
    postion: "top-right",
    label: "Warning/ Top-Right",
  },
  {
    variant: "inform",
    postion: "top-right",
    label: "Inform/ Top-Right",
  },
];

const DEFAULTS = {
  VARIANT: "success",
  POSITION: "top-right",
};

/*
    ====================================================== [SnackbarRunner Component]======================================================
*/

export const SnackbarRunner: FC<
  ISnackbarProps
> = ({}: ISnackbarProps): ReactElement => {
  const [snackbarState, setSnackbarState] = useState<SnackbarStateModel>(
    new SnackbarStateModel()
  );

  const handleShowSnackbar = (event: React.MouseEvent<HTMLButtonElement>) => {
    const variant =
      event.currentTarget.getAttribute("data-variant") || DEFAULTS.VARIANT;
    const position =
      event.currentTarget.getAttribute("data-postion") || DEFAULTS.POSITION;

    const newStateModel = new SnackbarStateModel();
    newStateModel.open = true;
    newStateModel.message = "This is Snackbar sample message!";
    newStateModel.variant = variant as TSnackbarVariants;
    newStateModel.postion = position as TSnackbarPosition;

    setSnackbarState(newStateModel);
  };

  return (
    <SnackbarStyles>
      <div className="actions-wrapper">
        {ACTIONS_CONFIG.map((item) => {
          const { variant, postion, label } = item;
          return (
            <button
              key={variant}
              onClick={handleShowSnackbar}
              data-variant={variant}
              data-postion={postion}
            >
              {label}
            </button>
          );
        })}
      </div>

      <Snackbar
        open={snackbarState.open}
        message={snackbarState.message}
        variant={snackbarState.variant}
        position={snackbarState.postion}
      />
    </SnackbarStyles>
  );
};
