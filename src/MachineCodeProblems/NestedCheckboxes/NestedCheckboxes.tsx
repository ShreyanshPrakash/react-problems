import React, { FC, ReactElement, useState } from "react";
import styled from "styled-components";
import { cloneDeep } from "lodash";
import {
  findTheNodeWithNodeName,
  udpateDescendants,
  updateAncestors,
} from "./NestedCheckboxes.utils";

const NESTED_LEFT_MARGIN_MULTIPLIER: number = 32;

/*
    ====================================================== [Styles]======================================================
*/

const NestedCheckboxesStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .checkbox-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const CheckboxItemStyles = styled.div<any>`
  display: flex;
  gap: 8px;
  margin-left: ${({ level }) => `${level * NESTED_LEFT_MARGIN_MULTIPLIER}px`};

  .checkbox-input {
    height: 20px;
    width: 20px;
  }

  .checkbox-label {
    font-size: 18px;
  }
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface INestedCheckboxesProps {
  checkboxesConfig: Array<INestedCheckboxItem>;
  isChildren?: boolean;
  level?: number;
  parentState?: Record<any, any>;
  onCheckboxClicked?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checkboxItem: INestedCheckboxItem
  ) => void;
}

export interface INestedCheckboxItem {
  name: string;
  parentName: string;
  checked: boolean;
  level: number;
  children?: Array<INestedCheckboxItem>;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULT_CHECKBOX_CONFIG: Array<INestedCheckboxItem> = [
  {
    name: "checkbox1",
    parentName: "",
    checked: false,
    level: 0,
    children: [
      {
        name: "child1",
        parentName: "checkbox1",
        checked: false,
        level: 1,
      },
      {
        name: "child2",
        parentName: "checkbox1",
        checked: false,
        level: 1,
        children: [
          {
            name: "child2Child1",
            parentName: "child2",
            checked: false,
            level: 2,
          },
          {
            name: "child2Child2",
            parentName: "child2",
            checked: false,
            level: 2,
          },
        ],
      },
      {
        name: "child3",
        parentName: "checkbox1",
        checked: false,
        level: 1,
      },
      {
        name: "child4",
        parentName: "checkbox1",
        checked: false,
        level: 1,
        children: [
          {
            name: "child4child1",
            parentName: "child4",
            checked: false,
            level: 2,
          },
          {
            name: "child4child2",
            parentName: "child4",
            checked: false,
            level: 2,
          },
        ],
      },
    ],
  },
];

/*
    ====================================================== [Template Component]======================================================
*/

export const NestedCheckboxes: FC<INestedCheckboxesProps> = ({
  checkboxesConfig = DEFAULT_CHECKBOX_CONFIG,
  isChildren = false,
}: INestedCheckboxesProps): ReactElement => {
  const [checkboxState, setCheckboxState] =
    useState<Array<INestedCheckboxItem>>(checkboxesConfig);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkboxItem: INestedCheckboxItem
  ) => {
    const checked = event.currentTarget.checked;
    const name = event.currentTarget.name;
    const macthedNode = findTheNodeWithNodeName(name, checkboxState); // checkboxItem
    if (macthedNode) {
      macthedNode.checked = checked;
      udpateDescendants(macthedNode.children || [], checked);
      updateAncestors(macthedNode, checked, checkboxState);
    }

    setCheckboxState(cloneDeep(checkboxState));
  };

  return (
    <NestedCheckboxesStyles>
      <NestedComponentHelper
        checkboxesConfig={checkboxState}
        onCheckboxClicked={handleCheckboxChange}
      />
    </NestedCheckboxesStyles>
  );
};

/*
    ====================================================== [Nested Component]======================================================
*/

export const NestedComponentHelper: FC<INestedCheckboxesProps> = ({
  checkboxesConfig,
  isChildren = false,
  onCheckboxClicked = () => {},
}: INestedCheckboxesProps): ReactElement => {
  return (
    <NestedCheckboxesStyles>
      {checkboxesConfig.map((item: INestedCheckboxItem) => {
        const { name, checked, level, children = [] } = item;

        return (
          <div key={name} className="checkbox-wrapper">
            <CheckboxItemStyles isChild={isChildren} level={level}>
              <input
                type="checkbox"
                className="checkbox-input"
                name={name}
                checked={checked}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onCheckboxClicked(event, item)
                }
              />
              <label className="checkbox-label">{name}</label>
            </CheckboxItemStyles>

            {children.length > 0 ? (
              <NestedComponentHelper
                checkboxesConfig={children}
                onCheckboxClicked={onCheckboxClicked}
              />
            ) : null}
          </div>
        );
      })}
    </NestedCheckboxesStyles>
  );
};
