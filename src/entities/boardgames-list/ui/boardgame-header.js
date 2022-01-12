import styled from "styled-components";
import { BoardgameHeaderRow } from ".";

export const BoardgameHeader = ({ header, sortArrow, activeHeader, setActiveHeader, setAscending, isAscending, className, ...props }) => {

    const handleClick = () => {
        setActiveHeader?.(header);
        setAscending(val => (activeHeader.name === header.name) ? !val : true);
    };

    return (
        <HeaderBox {...props} className={className}
            onClick={handleClick}>
            <Name $isActive={activeHeader.name === header.name} $isAscending={isAscending}>{header.name} {sortArrow && <>{sortArrow}</>}</Name>
        </HeaderBox>
    );
}

const HeaderBox = styled.div`
    font-weight: bold;
    ${BoardgameHeaderRow} & {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 30px;
        padding: 15px 20px;
        &:first-child {
            flex: 1;
            justify-content: flex-start;
        }
    }
`;

const Name = styled.span.attrs(({ $isActive, $isAscending }) => ({
    'data-ascending': $isAscending,
    'data-active': $isActive,
}))`
    position: relative;

    &[data-active=true][data-ascending=true] {
        color: #43db43;
    }

    &[data-active=true][data-ascending=false] {
        color: #ff141c;
    }
`;