import {
  Children,
  ComponentProps,
  FC,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
} from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const SwitchCaseStyles = styled.div``;

const CaseStyles = styled.div``;

const DefaultStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface ISwitchCaseProps extends PropsWithChildren {
  value: any;
}

interface ICaseProps extends PropsWithChildren {
  value: any;
}

interface IDefaultProps extends PropsWithChildren {}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [SwitchCase Component]======================================================
*/

export const SwitchCase: FC<ISwitchCaseProps> = ({
  value,
  children,
}: ISwitchCaseProps): ReactElement => {

  const getValidChild = () => {
    if (children && Array.isArray(children)) {
      let defaultCaseChild: ReactElement | null = null;
      let matchedCaseChild: ReactElement | null = null;

      Children.forEach(children, (child) => {
        const { props, type } = child;

        if (type.name === "Case") {
          if (!matchedCaseChild && value === props.value) {
            matchedCaseChild = child;
          }
        } else if (type.name === "Default") {
          defaultCaseChild = child;
        }
        
      });

      return matchedCaseChild || defaultCaseChild;
    }
  };

  return <SwitchCaseStyles>{getValidChild()}</SwitchCaseStyles>;
};

/*
    ====================================================== [Case Component]======================================================
*/

export const Case: FC<ICaseProps> = ({ value }: ICaseProps): ReactElement => {
  return <CaseStyles>{value}</CaseStyles>;
};

/*
    ====================================================== [Default Component]======================================================
*/

export const Default: FC<IDefaultProps> = ({
  children,
}: IDefaultProps): ReactElement => {
  return <DefaultStyles>{children}</DefaultStyles>;
};

/*
    ====================================================== [Runner Component]======================================================
*/

export const SwitchCaseRunner: FC<
  ICaseProps
> = ({}: ICaseProps): ReactElement => {
  return (
    <div>
      <SwitchCase value="1">
        <Case value="1" />
        <Case value="2" />
        <Default>Default match</Default>
      </SwitchCase>
    </div>
  );
};
