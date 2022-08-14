import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
    validateEmail,
    validatePW,
    ValidationStatus,
} from "../../lib/util/validation";
import Button from "../common/Button";
import Input from "../common/Input";

type Props = {
    submitButtonText: string;
    isLoading: boolean;
    submitAction: (formData: FormDataType) => void;
};
export type FormDataType = {
    email: string;
    password: string;
};
type FormDataValidation = {
    email: ValidationStatus;
    password: ValidationStatus;
};

const RegisterForm = ({ submitButtonText, isLoading, submitAction }: Props) => {
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    });
    const [formDataValidation, setFormDataValidation] =
        useState<FormDataValidation>({
            email: "idle",
            password: "idle",
        });
    const registerDisabled = useMemo(() => {
        return (
            formDataValidation.email !== "valid" ||
            formDataValidation.password !== "valid" ||
            isLoading
        );
    }, [formDataValidation.email, formDataValidation.password, isLoading]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitAction(formData);
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            email: e.target.value,
        });
        setFormDataValidation({
            ...formDataValidation,
            email: "idle",
        });
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            password: e.target.value,
        });
        setFormDataValidation({
            ...formDataValidation,
            password: "idle",
        });
    };

    const checkEmail = () => {
        setFormDataValidation({
            ...formDataValidation,
            email: validateEmail(formData.email),
        });
    };

    const checkPassword = () => {
        setFormDataValidation({
            ...formDataValidation,
            password: validatePW(formData.password),
        });
    };

    return (
        <Form onSubmit={onSubmit}>
            <Input
                type="text"
                placeholder="이메일"
                value={formData.email}
                onChange={onChangeEmail}
                onBlur={checkEmail}
                validation={formDataValidation.email}
                validationMessage="이메일 형식을 제대로 입력해주세요."
            />
            <Input
                type="password"
                placeholder="비밀번호 (8자리 이상)"
                value={formData.password}
                onChange={onChangePassword}
                onBlur={checkPassword}
                validation={formDataValidation.password}
                validationMessage="비밀번호는 8자리 이상입니다."
            />

            <div>
                <Button
                    text={submitButtonText}
                    type="submit"
                    disabled={registerDisabled}
                />
            </div>
        </Form>
    );
};

export default RegisterForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    width: 100%;
    max-width: 400px;
    padding: 0 15px;
    > div {
        margin-bottom: 20px;
    }
    > div:last-of-type {
        margin-top: 50px;
    }
`;
