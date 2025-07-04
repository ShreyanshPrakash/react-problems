import { ComponentOne, ComponentTwo } from "@/Revision/Tabs/Components";
import React, { FC, useMemo, useState } from "react";
import styled from "styled-components";

const Styles = styled.div``;

interface ITabConfigItem {
  label: string;
  name: string;
  component: FC<{}>;
}

const TAB_CONFIG: Array<ITabConfigItem> = [
  {
    label: "Comp 1",
    name: "0",
    component: ComponentOne,
  },
  {
    label: "Comp 2",
    name: "1",
    component: ComponentTwo,
  },
];

export const TabRevision = ({ config = TAB_CONFIG }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (event: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(event.currentTarget.getAttribute("data-name"));
    setActiveTabIndex(name);
  };

  const ActiveComponent = useMemo(() => {
    return config[activeTabIndex].component;
  }, [activeTabIndex]);

  return (
    <Styles>
      <div className="wrapper">
        <div className="tab-buttons-wrapper">
          {config.map((item, index) => {
            const { label, name } = item;
            return (
              <div key={label} data-name={name} onClick={handleTabChange}>
                {label}
              </div>
            );
          })}
        </div>
        <div className="tab-panel-wrapper">
          <ActiveComponent />
        </div>
      </div>
    </Styles>
  );
};
