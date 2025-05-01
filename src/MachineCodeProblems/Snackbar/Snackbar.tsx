import { FC, ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const SnackbarStyles = styled.div<ISnackbarStylesProps>`
  border: 2px solid black;
  background-color: ${({ variant }) => VARIANTS_STYLE_MAP[variant].BG_COLOR};
  color: ${({ variant }) => VARIANTS_STYLE_MAP[variant].TEXT_COLOR};
  padding: 4px 16px;

  position: fixed;
  top: 24px;
  right: ${({ open }) => (open ? "24px" : "-2000px")};
  z-index: 1000;

  transition: right 250ms ease-out;
`;

const BodyWrapperStyles = styled.div`
  display: flex;
  gap: 16px;
`;

const ContentWrapperStyles = styled.div``;

const ActionsWrapperStyles = styled.div`
  .icon {
    cursor: pointer;
  }
`;

/*
    ====================================================== [Interfaces]======================================================
*/

export type TSnackbarPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";
export type TSnackbarVariants = "success" | "failure" | "warning" | "inform";

interface ISnackbarProps {
  open: boolean;
  message: string;
  autoHidedurationMs?: number;
  position?: TSnackbarPosition;
  variant?: TSnackbarVariants;
}

interface ISnackbarStylesProps {
  open: boolean;
  variant: TSnackbarVariants;
}

interface IVariantStyles {
  BG_COLOR: string;
  TEXT_COLOR: string;
}

/*
    ====================================================== [Configs]======================================================
*/

const VARIANTS_STYLE_MAP: Record<TSnackbarVariants, IVariantStyles> = {
  success: {
    BG_COLOR: "lightgreen",
    TEXT_COLOR: "black",
  },
  failure: {
    BG_COLOR: "red",
    TEXT_COLOR: "white",
  },
  warning: {
    BG_COLOR: "lightyellow",
    TEXT_COLOR: "black",
  },
  inform: {
    BG_COLOR: "blue",
    TEXT_COLOR: "white",
  },
};

const DEFAULTS = {
  POSITION: "top-right",
  VARIANT: "success" as TSnackbarVariants,
  DURATION_MS: 5 * 1000,
};

/*
    ====================================================== [Snackbar Component]======================================================
*/

export const Snackbar: FC<ISnackbarProps> = (
  props: ISnackbarProps
): ReactElement => {
  const {
    open,
    message = "",
    autoHidedurationMs = DEFAULTS.DURATION_MS,
    position = DEFAULTS.POSITION,
    variant = DEFAULTS.VARIANT,
  } = props;
  const [showSnackbar, setShowSnackbar] = useState(open);
  const timerRef = useRef<number>(null);

  /*
    Side Effects
  */

  useEffect(() => {
    setShowSnackbar(open);
    handlePropsChange(open);
    return () => clearActiveTimer();
  }, [props]);

  /*
    Side Effect Methods
  */

  const handlePropsChange = (open: boolean) => {
    if (open) {
      timerRef.current = setTimeout(() => {
        setShowSnackbar(false);
      }, autoHidedurationMs);
    } else {
      clearActiveTimer();
    }
  };

  /*
    Action Methods
  */

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    clearActiveTimer();
  };

  /*
    Utility Methods
  */

  const clearActiveTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <SnackbarStyles open={showSnackbar} variant={variant}>
      <BodyWrapperStyles className="body-wrapper">
        <ContentWrapperStyles className="content-wrapper">
          <div className="message-content">{message}</div>
        </ContentWrapperStyles>

        <ActionsWrapperStyles className="actions-wrapper">
          <div className="close-icon icon" onClick={handleCloseSnackbar}>
            X
          </div>
        </ActionsWrapperStyles>
      </BodyWrapperStyles>
    </SnackbarStyles>
  );
};
