import { Children, FC, PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";




const Styles = styled.div``;

const SwitchCaseStyles = styled.div``;

const CaseStyles = styled.div``;

const DefaultStyles = styled.div``;

interface ISwitchCaseProps extends PropsWithChildren {
  value: any;
}

interface ICaseProps extends PropsWithChildren {
  value: any;
}

interface IDefaultProps extends PropsWithChildren {}

const SwitchCase: FC<ISwitchCaseProps> = ({value, children}): React.ReactElement => {



    const getChildren = () => {
        if(children && Array.isArray(children)){
            let defaultChild: ReactElement | null = null;
            let matchedCaseChild: ReactElement | null = null;

            Children.forEach(children, (child) => {
                const { type, props } = child;

                if(type.name === "Case"){
                    if(!matchedCaseChild && value === props.value){
                        matchedCaseChild = child;
                    }
                }else if(type.name === "Default"){
                    defaultChild = child;
                }

            })

            return matchedCaseChild || defaultChild;
        }

    }


    return (
        <SwitchCaseStyles>
            {getChildren()}
        </SwitchCaseStyles>
    )
}

const Case: FC<ICaseProps> = ({value}): React.ReactElement => {
    return (
        <CaseStyles>
            Case
            {value}
        </CaseStyles>
    )
}

const Default: FC<IDefaultProps> = (): React.ReactElement => {
    return (
        <DefaultStyles>
            Default
        </DefaultStyles>
    )
}


export const RevSwitchCase = () => {


    return (
        <Styles>
            <SwitchCase value="1">
                <Case value="1" />
                <Case value="2" />
                <Default />
            </SwitchCase>
        </Styles>
    )

}