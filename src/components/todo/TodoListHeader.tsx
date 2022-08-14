import React from "react";
import styled from "styled-components";
import { palette } from "../../style/palette";

type Props = {};

const TodoListHeader = (props: Props) => {
    return (
        <Header>
            <h2>TODOLIST</h2>
        </Header>
    );
};

export default TodoListHeader;

const Header = styled.div`
    padding: 0 10px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.blue1};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: ${palette.white};
    font-size: 30px;
    font-weight: 700;
`;
