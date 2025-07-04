import styled from "styled-components"


const Styles = styled.div``;

interface IAccordionItem{
    title: string;
    itemList: Array<String>;
}

const ACCORDION_CONFIG = [
    {
        title: "Tittle One",
        itemList: [
            "line One",
            "Line Two",
        ]
    },
    {
        title: "Tittle One",
        itemList: [
            "line One",
            "Line Two",
        ]
    }
]

export const AccordionRevision = ({
    config = ACCORDION_CONFIG,
}) => {

    return (
        <Styles>
            
        </Styles>
    )

}