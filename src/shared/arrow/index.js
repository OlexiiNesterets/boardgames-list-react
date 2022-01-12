import styled from "styled-components";
import { ReactComponent as ArrowSvg } from "../../assests/iconmonstr-arrow-19.svg";

export const Arrow = ({ isAscending, ...p }) => {
    return <SortArrow $isAscending={isAscending} {...p} />
};

const SortArrow = styled(ArrowSvg).attrs(({ $isAscending }) => ({ 'data-ascending': $isAscending }))`
    position: absolute;
    top: 3px;
    right: -17px;
    display: inline-block;
    width: 13px;
    height: 13px;
    transform: rotate(90deg);
    fill: #ff141c;
    transition-property: transform;
    transition-duration: 0.4s;
    &[data-ascending=true] {
        top: 2px;
        transform: rotate(-90deg);
        fill: #43db43;
    }
`;