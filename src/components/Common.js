import { Tabs } from "react-bootstrap";
import styled from "styled-components";

export const CustomTabs = styled(Tabs)`
.nav-link{
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0.1em;
    text-align: center;
    text-transform: uppercase;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    color: #fff;

    &.active{
        color: #495057;
        background-color: #fff;
        border-color: #fff;
    }
}
`;
