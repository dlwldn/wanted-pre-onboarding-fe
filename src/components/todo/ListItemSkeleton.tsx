import React from "react";
import styled from "styled-components";
import animations from "../../style/animation";
import { palette } from "../../style/palette";

type Props = {};

const ListItemSkeleton = (props: Props) => {
    return <Skeleton />;
};

export default ListItemSkeleton;

const Skeleton = styled.li`
    width: 100%;
    height: 80px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${palette.gray2};
    background-color: #f6f7f9;
    background-image: linear-gradient(
        90deg,
        #f6f7f9 0,
        #f1f1f1 20%,
        #f6f7f9 40%,
        #f6f7f9
    );
    background-size: 99% 100%;
    background-repeat: no-repeat;
    animation-name: ${animations.loadingShimmer};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 1ms;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
`;
