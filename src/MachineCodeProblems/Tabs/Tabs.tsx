import { TabPanel } from "@/MachineCodeProblems/Tabs/TabPanel";
import { FC, MouseEvent, ReactElement, useMemo, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const TabsStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/
interface ITab {
  index: number;
  label: string;
  name: string;
  conponent: FC<{ index: number }>;
}

interface ITabsProps {
  tabsConfig: Array<ITab>;
}

/*
    ====================================================== [Configs]======================================================
*/

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

/*
    ====================================================== [Tabs Component]======================================================
*/

export const Tabs: FC<ITabsProps> = ({
  tabsConfig = TABS_CONFIG,
}: ITabsProps): ReactElement => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabClick = (event: MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.getAttribute("data-index");
    setActiveTabIndex(Number(index) || 0);
  };

  const ActiveTabComponent = useMemo(
    () => tabsConfig[activeTabIndex].conponent,
    [activeTabIndex]
  );

  return (
    <TabsStyles>
      <div className="tab-buttons-wrapper">
        {tabsConfig.map((config: ITab) => {
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
