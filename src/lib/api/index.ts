import axios from "axios";

const BASE_API_ENDPOINT =
    "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";

export type ErrorResponse = {
    message: string;
    statusCode: number;
};

export type ActionsType = {
    pendingAction?: () => void;
    fulfilledAction?: () => void;
    rejectAction?: () => void;
};

const baseAPI = axios.create({
    baseURL: BASE_API_ENDPOINT,
    headers: window.localStorage.getItem("token")
        ? {
              Authorization: `Bearer ${String(
                  window.localStorage.getItem("token")
              )}`,
          }
        : undefined,
});

export default baseAPI;
