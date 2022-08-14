import React from "react";
import styled from "styled-components";
import { palette } from "../../style/palette";

type Props = {
    text: string;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    onClick?: () => void;
};

const Button = ({ text, disabled, type = "button", onClick }: Props) => {
    return (
        <AuthButton type={type} onClick={onClick} disabled={disabled}>
            {text}
        </AuthButton>
    );
};

export default Button;

const AuthButton = styled.button`
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    color: ${palette.green1};

    :disabled {
        color: ${palette.gray3};
        cursor: not-allowed;
    }
`;
