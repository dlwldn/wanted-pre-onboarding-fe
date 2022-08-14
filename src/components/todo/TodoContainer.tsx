import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTodoListAPI, TodoListType } from "../../lib/api/todo";
import TodoList from "./TodoList";
import TodoListAdd from "./TodoListAdd";
import TodoListHeader from "./TodoListHeader";

type Props = {};

const TodoContainer = (props: Props) => {
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState<TodoListType[] | null>(null);

    useEffect(() => {
        getTodoList();
    }, []);

    const getTodoList = () => {
        getTodoListAPI({
            fulfilledAction: setTodoList,
            rejectAction: () => navigate('/')
        })
    };

    return (
        <Wrapper>
            <TodoListHeader />
            {todoList?.length === 0 ? (
                <NoData>할일이 아무것도 없어요 ㅠ_ㅠ</NoData>
            ) : (
                <TodoList
                    todoList={todoList ? todoList : []}
                    getTodoList={getTodoList}
                />
            )}
            <TodoListAdd getTodoList={getTodoList} />
        </Wrapper>
    );
};

export default TodoContainer;

const Wrapper = styled.div`
    position: relative;
`;
const NoData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 250px);
    font-size: 20px;
    font-weight: 700;
`;
