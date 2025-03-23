import { Counter } from "@/MachineCodeProblems/Counter";
import { FC, MouseEvent, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const AccordionStyles = styled.div`

    .button-text-wrapper {
        width: 240px;
        display: flex;
        justify-content: space-between;
    }

`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IAccordionItem {
  titleText: string;
  name: string;
  Component: FC;
}

interface IAccordionProps {
  accordionConfig: Array<IAccordionItem>;
}

/*
    ====================================================== [Configs]======================================================
*/

const ACCORDION_CONFIG: Array<IAccordionItem> = [
  {
    titleText: "Accordion 1",
    name: "accordion1",
    Component: Counter,
  },
  {
    titleText: "Accordion 2",
    name: "accordion2",
    Component: Counter,
  },
];

/*
    ====================================================== [Accordion Component]======================================================
*/

export const Accordion: FC<IAccordionProps> = ({
  accordionConfig = ACCORDION_CONFIG,
}: IAccordionProps): ReactElement => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(-1);

  const handleAccordionItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const index = event.currentTarget.getAttribute("data-index");
    let newActiveIndex = Number(index);
    if (newActiveIndex === activeAccordionIndex) {
      newActiveIndex = -1;
    }
    setActiveAccordionIndex(newActiveIndex);
  };

  return (
    <AccordionStyles>
      <div className="accordion-wrapper">
        {accordionConfig.map((config: IAccordionItem, index) => {
          const { name, titleText, Component } = config;

          return (
            <div key={titleText} className="accordion-item-wrapper">
              <button
                name={name}
                className="accordion-title"
                data-index={index}
                onClick={handleAccordionItemClick}
              >
                <div className="button-text-wrapper">
                  <span>{titleText}</span>
                  {activeAccordionIndex === index ? (
                    <span>-</span>
                  ) : (
                    <span>+</span>
                  )}
                </div>
              </button>
              {activeAccordionIndex === index ? (
                <div className="accordion-content-body">
                  <Component />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </AccordionStyles>
  );
};
