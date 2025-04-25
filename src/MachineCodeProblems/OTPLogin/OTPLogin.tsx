import {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

/*
    ====================================================== [Styles]======================================================
*/

const OTPLoginStyles = styled.div``;

const OTPInput = styled.input<IOTPInputProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
`;

/*
    ====================================================== [Interfaces]======================================================
*/

interface IOTPLoginProps {
  count: number;
  size: string;
}

interface IOTPInputProps {
  height: string;
  width: string;
  fontSize: string;
}

interface IOTPInputBoxProps {
  item: number;
  size: string;
  isActive: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/*
    ====================================================== [Configs]======================================================
*/

const DEFAULTS = {
  count: 3,
};

const OTPSizes: Record<any, any> = {
  small: {
    height: "20px",
    width: "20px",
    fontSize: "18px",
  },
  medium: {
    height: "40px",
    width: "40px",
    fontSize: "32px",
  },
  large: {
    height: "60px",
    width: "60px",
    fontSize: "50px",
  },
};

/*
    ====================================================== [OTPLogin Component]======================================================
*/

export const OTPLogin: FC<IOTPLoginProps> = ({
  count = 3,
  size = "medium",
}: IOTPLoginProps): ReactElement => {
  const [activeOtpInputIndex, setActiveOtpInputIndex] = useState(0);

  const countList = useMemo(() => {
    const list = Array.from(Array(count).keys());
    return list;
  }, [count]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    let updatedIndex = Number(name) + 1;
    if (!value) {
      updatedIndex = Number(name) - 1;
    }
    setActiveOtpInputIndex(updatedIndex);
  };

  return (
    <OTPLoginStyles>
      <div className="wrapper">
        {countList.map((item) => (
          <OTPInputBox
            key={item}
            onChange={handleInputChange}
            item={item}
            size={size}
            isActive={item === activeOtpInputIndex}
          />
        ))}
      </div>
    </OTPLoginStyles>
  );
};

/*
    ====================================================== [OTPInputBox Component]======================================================
*/

const OTPInputBox: FC<IOTPInputBoxProps> = ({
  item,
  size,
  onChange,
  isActive = false,
}: IOTPInputBoxProps): ReactElement => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      inputRef?.current?.focus();
    }
  }, [isActive]);

  return (
    <OTPInput
      key={item}
      ref={inputRef}
      name={String(item)}
      height={OTPSizes[size].height}
      width={OTPSizes[size].width}
      fontSize={OTPSizes[size].fontSize}
      onChange={onChange}
    />
  );
};
