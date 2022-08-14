import axios, { AxiosError } from "axios";
import baseAPI, { ActionsType, ErrorResponse } from ".";

export type FormDataType = {
    email: string;
    password: string;
};

type LoginActionType = Omit<ActionsType, "fulfilledAction"> & {
    fulfilledAction?: (data: { access_token: string }) => void;
};

export const loginAPI = (data: FormDataType, actions: LoginActionType) => {
    const {
        pendingAction = () => {},
        fulfilledAction = () => {},
        rejectAction = () => {},
    } = actions;

    pendingAction();
    baseAPI
        .post("/auth/signin", data)
        .then((res) => {
            fulfilledAction(res.data);
        })
        .catch((err: AxiosError) => {
            authRejectAction(err, rejectAction);
        });
};

export const registerAPI = (data: FormDataType, actions: ActionsType) => {
    const {
        pendingAction = () => {},
        fulfilledAction = () => {},
        rejectAction = () => {},
    } = actions;

    pendingAction();
    baseAPI
        .post("/auth/signup", data)
        .then((res) => {
            fulfilledAction();
        })
        .catch((err: AxiosError) => {
            authRejectAction(err, rejectAction);
        });
};

export const authRejectAction = (
    err: AxiosError,
    redirectAction: () => void
) => {
    if (axios.isAxiosError(err) && err.response) {
        redirectAction();
        window.alert((err.response?.data as ErrorResponse).message);
    }
};
