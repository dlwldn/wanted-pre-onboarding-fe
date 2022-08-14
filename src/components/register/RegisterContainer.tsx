import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerAPI } from "../../lib/api/user";
import RegisterForm, { FormDataType } from "./RegisterForm";

type Props = {};

const RegisterContainer = (props: Props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        window.localStorage.getItem("token") && navigate("/todo");
    }, []);

    const submitAction = (formData: FormDataType) => {
        registerAPI(formData, {
            pendingAction: () => setIsLoading(true),
            fulfilledAction: () => {
                setIsLoading(false);
                navigate("/");
            },
            rejectAction: () => setIsLoading(false)
        });
    };

    return (
        <Content>
            <h2>회원가입</h2>
            <RegisterForm
                submitButtonText={isLoading ? "처리중" : "회원가입"}
                isLoading={isLoading}
                submitAction={submitAction}
            />
        </Content>
    );
};

export default RegisterContainer;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    > h2 {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 50px;
    }
`;
