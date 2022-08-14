import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteTodoListAPI, editTodoListAPI, TodoListType } from "../../lib/api/todo";
import { palette } from "../../style/palette";
import ListItemSkeleton from "./ListItemSkeleton";

type Props = {
    listItem: TodoListType;
    getTodoList: () => void;
};
type EditValueType = {
    todo: string;
    isCompleted: boolean;
};

const TodoListItem = ({
    listItem: { id, todo, isCompleted },
    getTodoList,
}: Props) => {
    const navigate = useNavigate();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<EditValueType>({
        todo,
        isCompleted,
    });

    const onChangeEditInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEditValue({
            ...editValue,
            todo: e.target.value,
        });
    };

    const onChangeEditCheck = (e: ChangeEvent<HTMLInputElement>) => {
        setEditValue({
            ...editValue,
            isCompleted: e.target.checked,
        });
    };

    const onClickEdit = () => {
        setIsEditMode(true);
    };

    const onClickEditCancel = () => {
        setIsEditMode(false);
        setEditValue({
            todo,
            isCompleted,
        });
    };

    const onClickEditConfirm = () => {
        if (todo === editValue.todo && isCompleted === editValue.isCompleted) {
            onClickEditCancel();
            return;
        }

        editTodoListAPI({ id: id,  todo: editValue.todo, isCompleted: editValue.isCompleted}, {
            pendingAction: () => setIsLoading(true),
            fulfilledAction: () => {
                getTodoList();
                setIsLoading(false);
                setIsEditMode(false);
            },
            rejectAction: () => navigate("/")
        })
    };

    const onClickDelete = () => {
        deleteTodoListAPI({ id }, {
            pendingAction: () => setIsLoading(true),
            fulfilledAction: () => {
                getTodoList();
                setIsLoading(false);
            },
            rejectAction: () => navigate("/")
        })
    };

    if (isLoading) {
        return <ListItemSkeleton />;
    }

    return (
        <Todo isCompleted={isCompleted}>
            {isEditMode && (
                <input
                    type="checkbox"
                    checked={editValue.isCompleted}
                    onChange={onChangeEditCheck}
                />
            )}
            <div>
                {isEditMode ? (
                    <input
                        type="text"
                        value={editValue.todo}
                        onChange={onChangeEditInput}
                    />
                ) : (
                    <p title={todo}>{todo}</p>
                )}
                <div>
                    {isEditMode ? (
                        <>
                            <button type="button" onClick={onClickEditConfirm}>
                                완료
                            </button>
                            <button type="button" onClick={onClickEditCancel}>
                                취소
                            </button>
                        </>
                    ) : (
                        <>
                            <button type="button" onClick={onClickEdit}>
                                수정
                            </button>
                            <button type="button" onClick={onClickDelete}>
                                삭제
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Todo>
    );
};

export default TodoListItem;

const Todo = styled.li<{ isCompleted: boolean }>`
    height: 80px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 3px 5px ${palette.gray1};
    display: flex;
    align-items: center;

    p {
        width: 100%;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-decoration: ${({ isCompleted }) => isCompleted && "line-through"};
        text-decoration-color: ${({ isCompleted }) =>
            isCompleted && palette.red1};
        text-decoration-thickness: ${({ isCompleted }) => isCompleted && "3px"};
    }

    > div {
        margin-left: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
