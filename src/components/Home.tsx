import { useState } from "react";
import styled from "styled-components";



const WrapperStyles = styled.div``;


export const Home = () => {

    const [customState, setCustomState] = useState(0);
    const [customAnotherState, setCustomANotherState] = useState(0);

    const handleClick = () => {
        setCustomState(customState + 1);
    }

    const handleAnotherClick = () => {
        setCustomANotherState((prev) => prev + 1);
    }

    return (
        <WrapperStyles>
            Hello Home
            <button onClick={handleClick}>Click</button>
            <button onClick={handleAnotherClick}>Another</button>
            <div>
                <div>Custom State : {customState}</div>
                <div>ANother State : {customAnotherState}</div>
            </div>
        </WrapperStyles>
    )
}