import { TabPanel } from "@/MachineCodeProblems/Tabs/TabPanel";
import { FC, MouseEvent, useMemo, useState } from "react";
import styled from "styled-components";

const TabsStyles = styled.div``;

interface ITab {
  index: number;
  label: string;
  name: string;
  conponent: FC<{ index: number }>;
}

const TABS_CONFIG: Array<ITab> = [
  {
    index: 0,
    label: "Tab 1",
    name: "tab1",
    conponent: TabPanel,
  },
  {
    index: 1,
    label: "Tab 2",
    name: "tab2",
    conponent: TabPanel,
  },
];

export const Tabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabClick = (event: MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.getAttribute("data-index");
    setActiveTabIndex(Number(index) || 0);
  };

  const ActiveTabComponent = useMemo(
    () => TABS_CONFIG[activeTabIndex].conponent,
    [activeTabIndex]
  );

  return (
    <TabsStyles>
      <div className="tab-buttons-wrapper">
        {TABS_CONFIG.map((config: ITab) => {
          const { index, label, name } = config;

          return (
            <>
              <button
                key={index}
                name={name}
                data-index={index}
                onClick={handleTabClick}
              >
                {label}
              </button>
            </>
          );
        })}
      </div>
      <div className="tab-panel-wrapper">
        <ActiveTabComponent index={activeTabIndex} />
      </div>
    </TabsStyles>
  );
};
