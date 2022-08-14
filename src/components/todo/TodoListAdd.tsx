import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createTodoListAPI } from "../../lib/api/todo";
import { palette } from "../../style/palette";

type Props = {
    getTodoList: () => void;
};

const TodoListAdd = ({ getTodoList }: Props) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTodoListAPI(
            { todo: inputValue },
            {
                fulfilledAction: () => {
                    getTodoList();
                    setInputValue("");
                },
                rejectAction: () => navigate("/"),
            }
        );
    };

    return (
        <TodoAddWrapper onSubmit={onSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={onChangeInput}
                placeholder="내가 할일"
            />
            <button type="submit" disabled={inputValue.length === 0}>
                작성
            </button>
        </TodoAddWrapper>
    );
};

export default TodoListAdd;

const TodoAddWrapper = styled.form`
    position: fixed;
    bottom: 50px;
    left: 50%;
    width: 100%;
    max-width: 500px;
    padding: 0 10px;
    height: 100px;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${palette.blue1};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    > input {
        width: 90%;
        margin-right: 20px;
        height: 40px;
        border-radius: 5px;
        border: none;
        padding: 5px 10px;
        font-size: 16px;
    }

    > button {
        width: 50px;
        height: 40px;
        font-size: 16px;
        font-weight: 700;
        color: ${palette.white};
        transition: 0.3s color;

        :disabled {
            color: ${palette.gray2};
            cursor: not-allowed;
        }
    }
`;
