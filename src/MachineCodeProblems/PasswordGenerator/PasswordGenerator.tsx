import { FC, ReactElement, useState } from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const PasswordGeneratorStyles = styled.div``;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IPasswordGeneratorProps {}

/*
    ====================================================== [Configs]======================================================
*/

/*
    ====================================================== [PasswordGenerator Component]======================================================
*/

export const PasswordGenerator: FC<
  IPasswordGeneratorProps
> = ({}: IPasswordGeneratorProps): ReactElement => {
  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const handleGeneratePasswordClick = () => {
    const random = Math.random() * 10;
    const string = btoa(String(random));

    setGeneratedPassword(string);
  };

  return (
    <PasswordGeneratorStyles>
      <button onClick={handleGeneratePasswordClick}>Generate</button>
      <div className="passowrd-text">{generatedPassword}</div>
      <div className="passowrd-text">{generatedPassword.length}</div>
    </PasswordGeneratorStyles>
  );
};
