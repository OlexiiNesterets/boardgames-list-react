import styled from "styled-components";
import { TableRow } from "./row";

export const BoardgameRow = ({ name, min, max }) => {

    return (
        <TableRowStyled name={name} min={min} max={max} />
    );
};

const TableRowStyled = styled(TableRow)`
    &:nth-child(even) {
        background: #ededed;
    }
`;