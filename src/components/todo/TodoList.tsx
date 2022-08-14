import styled from "styled-components";
import { TodoListType } from "../../lib/api/todo";
import { palette } from "../../style/palette";
import TodoListItem from "./TodoListItem";

type Props = {
    todoList: TodoListType[];
    getTodoList: () => void;
};

const TodoList = ({ todoList, getTodoList }: Props) => {
    return (
        <TodoListWrapper>
            {todoList.map((item) => {
                return (
                    <TodoListItem
                        key={item.id}
                        listItem={item}
                        getTodoList={getTodoList}
                    />
                );
            })}
        </TodoListWrapper>
    );
};

export default TodoList;

const TodoListWrapper = styled.ul`
    height: calc(100vh - 250px);
    overflow: auto;

    &::-webkit-scrollbar {
        width: 10px;
        padding: 2px 0px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${palette.gray1};
        border-radius: 20px;
        background-clip: padding-box;
        border-width: 2px;
        border-color: transparent;
        border-style: solid;
    }
    &::-webkit-scrollbar-track {
        border-width: 0 0 0 1px;
        border-style: solid;
        border-color: ${palette.gray1};
    }
`;
