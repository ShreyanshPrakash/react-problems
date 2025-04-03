import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/
const ModalPageStyles = styled.div``;

const ModalStyles = styled.div<
  { open: boolean } & React.HTMLProps<HTMLDivElement>
>`
  width: 100vw;
  height: 100vh;
  display: ${({ open }) => (open ? "block" : "none")};

  z-index: 999;

  position: absolute;
  top: 0%;
  left: 0%;
`;

const BackdropStyles = styled.div<React.HTMLProps<HTMLDivElement>>`
  width: 100%;
  height: 100%;

  background-color: rgba(0,0,0,0.2);

`;

const ModalBodyWrapperStyles = styled.div<React.HTMLProps<HTMLDivElement>>`
  width: 50%;
  height: 50%;
  margin: auto;
  background-color: white;
  border-radius: 12px;

  position: relative;
  top: 25%;
  left: 0%;
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IModalProps {
  open: boolean;
  onClose?: (
    params: IModalCloseParams,
    event: React.MouseEvent<HTMLElement>
  ) => void;
}

interface IModalCloseParams {
  reason: string;
}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [Modal Component]======================================================
*/

export const ModalPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModalClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ModalPageStyles>
      <button onClick={handleOpenModalClick} className="modal-button">
        {openModal ? "Close Modal" : "Open Modal"}
      </button>
      <Modal open={openModal} onClose={handleCloseModal} />
    </ModalPageStyles>
  );
};

export const Modal: FC<IModalProps> = ({
  open,
  onClose,
}: IModalProps): ReactElement => {

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const name = event.currentTarget.getAttribute("name");
    if (name !== "modal-body") {
      onClose?.({ reason: "clickaway" }, event);
    }
  };

  return (
    <ModalStyles open={open} onClick={handleOnClick}>
      <BackdropStyles
        className="backdrop-wrapper"
        name="backdrop"
        onClick={handleOnClick}
      >
        <ModalBodyWrapperStyles
          className="modal-body-wrapper"
          name="modal-body"
          onClick={handleOnClick}
        >
          Hello world
        </ModalBodyWrapperStyles>
      </BackdropStyles>
    </ModalStyles>
  );
};
