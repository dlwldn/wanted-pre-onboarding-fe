import { keyframes } from "styled-components";

const loadingShimmer = keyframes`
    0% {
        background-position: calc(100% * 5) 100%;
    }
    100% {
        background-position: calc(100% * 100) 100%;
    }
`;

const animations = {
    loadingShimmer
}

export default animations;