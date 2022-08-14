import axios, { AxiosError } from "axios";
import baseAPI, { ActionsType, ErrorResponse } from ".";

export type TodoListType = {
    id: number;
    todo: string;
    isCompleted: boolean;
    userId: number;
};

type GetTodoActionsType = Omit<ActionsType, "fulfilledAction"> & {
    fulfilledAction?: (response: TodoListType[]) => void;
};

export const getTodoListAPI = (actions: GetTodoActionsType) => {
    const {
        pendingAction = () => {},
        fulfilledAction = () => {},
        rejectAction = () => {},
    } = actions;

    pendingAction();
    baseAPI
        .get<TodoListType[]>("/todos")
        .then((res) => {
            fulfilledAction(res.data);
        })
        .catch((err: AxiosError) => {
            todoRejectAction(err, rejectAction);
        });
};

export const createTodoListAPI = (
    data: { todo: string },
    actions: ActionsType
) => {
    const {
        pendingAction = () => {},
        fulfilledAction = () => {},
        rejectAction = () => {},
    } = actions;

    pendingAction();
    baseAPI
        .post("/todos", data)
        .then(() => {
            fulfilledAction();
        })
        .catch((err: AxiosError) => {
            todoRejectAction(err, rejectAction);
        });
};

export const editTodoListAPI = (
    data: { id: number; todo: string; isCompleted: boolean },
    actions: ActionsType
) => {
    const {
        pendingAction = () => {},
        fulfilledAction = () => {},
        rejectAction = () => {},
    } = actions;
    const { id, todo, isCompleted } = data;

    pendingAction();
    baseAPI
        .put(`/todos/${id}`, {
            todo,
            isCompleted,
        })
        .then((res) => {
            fulfilledAction();
        })
        .catch((err: AxiosError) => {
            todoRejectAction(err, rejectAction);
        });
};

export const deleteTodoListAPI = (
    data: { id: number },
    actions: ActionsType
) => {
    const {
        pendingAction = () => {},
        fulfilledAction = () => {},
        rejectAction = () => {},
    } = actions;
    const { id } = data;

    pendingAction();
    baseAPI
        .delete(`/todos/${id}`)
        .then((res) => {
            fulfilledAction();
        })
        .catch((err: AxiosError) => {
            todoRejectAction(err, rejectAction);
        });
};

export const todoRejectAction = (
    err: AxiosError,
    redirectAction: () => void
) => {
    if (axios.isAxiosError(err) && err.response) {
        if ((err.response?.data as ErrorResponse).statusCode === 401) {
            redirectAction();
            window.localStorage.removeItem("token");
        }
    }
};
