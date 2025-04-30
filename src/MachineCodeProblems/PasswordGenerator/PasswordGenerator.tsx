import {
  FC,
  FormEvent,
  FormEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const PasswordGeneratorStyles = styled.div``;

const InputItemWrapper = styled.div`
  label {
    display: flex;
    gap: 8px;
  }
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IPasswordGeneratorProps {
  config: Array<IConfig>;
}

interface IConfig {
  type: string;
  name: string;
  label: string;
}

class UserInputModel {
  useLowerCase: boolean;
  useUpperCase: boolean;
  useNumbers: boolean;
  useSpecialCharacters: boolean;
  length: number;

  constructor() {
    this.useLowerCase = false;
    this.useUpperCase = false;
    this.useNumbers = false;
    this.useSpecialCharacters = false;
    this.length = DEFAULTS.PASSWORD_LENGTH;
  }
}

/*
    ====================================================== [Configs]======================================================
*/

const USER_INPUT_FORM_CONFIG: Array<IConfig> = [
  {
    type: "checkbox",
    name: "useLowerCase",
    label: "Use Lower Case",
  },
  {
    type: "checkbox",
    name: "useUpperCase",
    label: "Use Upper Case",
  },
  {
    type: "checkbox",
    name: "useNumbers",
    label: "Use Numbers",
  },
  {
    type: "checkbox",
    name: "useSpecialCharacters",
    label: "Use Special Characters",
  },
];

const DEFAULTS = {
  USER_INPUT_FORM_CONFIG,
  PASSWORD_LENGTH: 16,
};

/*
    ====================================================== [PasswordGenerator Component]======================================================
*/

export const PasswordGenerator: FC<IPasswordGeneratorProps> = ({
  config = DEFAULTS.USER_INPUT_FORM_CONFIG,
}: IPasswordGeneratorProps): ReactElement => {
  const [userInputState, setUserInputState] = useState(new UserInputModel());
  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  /*
    Form Methods
  */

  const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const key = event.target.name;
    let value = event.target.checked;

    if (key === "length") {
      value = event.target.value;
    }

    setUserInputState((prev) => ({ ...prev, [key]: value }));
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = generatePasswordForGivenInput(userInputState);
    setGeneratedPassword(result);
  };

  /*
    Utility Methods
  */

  const generatePasswordForGivenInput = (userInput: UserInputModel) => {
    const lowerCaseChars: string = "abcdefghijklmnopqrstuvwxyz"; // 26
    const upperCaseChars: string = lowerCaseChars.toLocaleLowerCase(); // 26
    const numbers: string = "1234567890"; // 10
    const specialCharacters: string = "!@#$%^&*()_+={}"; // 15

    const {
      length,
      useLowerCase,
      useNumbers,
      useSpecialCharacters,
      useUpperCase,
    } = userInput;

    let combinedString = "";
    combinedString +=  useLowerCase ? lowerCaseChars : "";
    combinedString +=  useUpperCase ? upperCaseChars : "";
    combinedString +=  useNumbers ? numbers : "";
    combinedString +=  useSpecialCharacters ? specialCharacters : "";

    const totalAvailableCharsCount = combinedString.length; // 77 max

    let result = "";

    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * totalAvailableCharsCount);
      const char = combinedString[random] || "";
      result += char;
    }

    return result;
  };

  return (
    <PasswordGeneratorStyles>
      <div className="user-input-wrapper">
        <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
          <div className="form-body">
            {config.map((item) => {
              const { type, label, name } = item;
              return (
                <InputItemWrapper className="input-item-wrapper" key={name}>
                  <label>
                    <input
                      type={type}
                      name={name}
                      checked={Boolean(
                        userInputState[name as keyof UserInputModel]
                      )}
                    />
                    <div>{label}</div>
                  </label>
                </InputItemWrapper>
              );
            })}
            <InputItemWrapper>
              <div>Password Length</div>
              <input
                type="text"
                name="length"
                value={userInputState["length"]}
              />
            </InputItemWrapper>
          </div>
          <button>Generate</button>
        </form>
      </div>
      <div className="passowrd-text">{generatedPassword}</div>
      <div className="passowrd-text">{generatedPassword.length}</div>
    </PasswordGeneratorStyles>
  );
};
