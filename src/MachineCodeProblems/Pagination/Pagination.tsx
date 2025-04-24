import { FC, MouseEvent, ReactElement, useMemo, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const PaginationStyles = styled.div``;

const ButtonBox = styled.button<IButtonBoxProps>`
  background-color: ${({ active }) =>
    active ? BUTTON_COLORS.active : BUTTON_COLORS.inActive};
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IPaginationProps {
  totalPages: number;
  activePageNumber: number;
}

interface IButtonBoxProps {
  active: boolean;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  totalPages: 10,
  activePageIndex: 0,
};

const BUTTON_COLORS = {
  active: "#493490",
  inActive: "#1a1a1a",
};

/*
    ====================================================== [Pagination Component]======================================================
*/

export const Pagination: FC<IPaginationProps> = ({
  totalPages = 10,
  activePageNumber = 1,
}: IPaginationProps): ReactElement => {
  const [activePage, setActivePage] = useState(activePageNumber);

  const buttonNumberList = useMemo(() => {
    const updateIndex = (item: number) => item + 1;
    const list = Array.from(Array(totalPages).keys(), updateIndex);
    return list;
  }, [totalPages]);

  const isPageActive = (pageNumber: number) => {
    const isActive = activePage === pageNumber;
    return Boolean(isActive);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    setActivePage(Number(name));
  };

  return (
    <PaginationStyles>
      <div>
        {buttonNumberList.map((item) => (
          <ButtonBox
            key={item}
            name={String(item)}
            active={isPageActive(item)}
            onClick={handleButtonClick}
          >
            {item}
          </ButtonBox>
        ))}
      </div>
    </PaginationStyles>
  );
};
