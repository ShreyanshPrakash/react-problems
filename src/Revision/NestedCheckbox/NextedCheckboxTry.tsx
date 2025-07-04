import { cloneDeep } from "lodash";
import { FC, useState } from "react";
import { findNodeFromName, updateAncestors, updateDescendants } from "./utils";
import styled from "styled-components";

const Styles = styled.div``;

export interface ICheckboxItem {
  name: string;
  parentName: string;
  checked: boolean;
  level: number;
  children: Array<ICheckboxItem>;
}

const CHECKBOX_CONFIG: Array<ICheckboxItem> = [
  {
    name: "1",
    parentName: "",
    checked: false,
    level: 0,
    children: [
      {
        name: "2",
        parentName: "1",
        checked: false,
        level: 1,
        children: [
          {
            name: "3",
            parentName: "2",
            checked: false,
            level: 2,
            children: [
              {
                name: "4",
                parentName: "3",
                checked: false,
                level: 3,
                children: [],
              },
            ],
          },
          {
            name: "5",
            parentName: "2",
            checked: false,
            level: 2,
            children: [
              {
                name: "6",
                parentName: "5",
                checked: false,
                level: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "7",
    parentName: "",
    checked: false,
    level: 0,
    children: [
      {
        name: "8",
        parentName: "7",
        checked: false,
        level: 1,
        children: [],
      },
    ],
  },
];

export const NestedCheckboxTry = ({ config = CHECKBOX_CONFIG }) => {
  const [checkboxesState, setCheckboxesState] = useState(config);

  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: ICheckboxItem
  ) => {
    const name = event.currentTarget.getAttribute("data-name") || "";
    const checked = event.currentTarget.checked;
    const clonedState = cloneDeep(checkboxesState);
    const checkboxNode = findNodeFromName(name, clonedState);
    if (checkboxNode) {
      checkboxNode.checked = checked;
      updateDescendants(checkboxNode.children, checked);
      updateAncestors(checkboxNode, clonedState);
    }
    setCheckboxesState(clonedState);
  };

  return (
    <Styles>
      <CheckboxRenderer
        config={checkboxesState}
        onChange={handleCheckboxClick}
      />
    </Styles>
  );
};

/*
    ====================================================== [Nested Component]======================================================
*/

interface ICheckboxRendererProps {
  config: Array<ICheckboxItem>;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: ICheckboxItem
  ) => void;
}

export const CheckboxRenderer: FC<ICheckboxRendererProps> = ({
  config = [],
  onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: ICheckboxItem
  ) => {},
}: ICheckboxRendererProps) => {
  return (
    <Styles>
      <div className="wrapper">
        {config.map((item) => {
          const { name, checked, level, children = [] } = item;
          return (
            <div key={name} className="item">
              <div className="item-inner">
                <input
                  type="checkbox"
                  checked={checked}
                  name={name}
                  data-name={name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(event, item)
                  }
                />
                <label>{name}</label>
              </div>
              {children.length > 0 ? (
                <CheckboxRenderer config={children} onChange={onChange} />
              ) : null}
            </div>
          );
        })}
      </div>
    </Styles>
  );
};
