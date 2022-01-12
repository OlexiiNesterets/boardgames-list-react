import styled from "styled-components";

export const TableRow = ({ name, min, max, className }) => {
    return (
        <Row className={className}>
            <ValueBox>{name}</ValueBox>
            <ValueBox>{min}</ValueBox>
            <ValueBox>{max || '-'}</ValueBox>
        </Row>
    );
};

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
`;

const ValueBox = styled.span`
    display: flex;
    min-width: 30px;
    padding: 15px 20px;
    align-items: center;
    justify-content: center;
    &:first-child {
        margin-right: auto;
        text-align: initial;
        line-height: 1.4;
    }
`;