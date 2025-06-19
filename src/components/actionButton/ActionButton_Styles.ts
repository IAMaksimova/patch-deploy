import styled from "styled-components";

const ActionButton = styled.button`
    width: 100%;
    padding: 14px;
    border-radius: 8px;
    border: none;
    background: #45A19F;
    color: white;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 16px;

    &:hover:not(:disabled) {
        background: #55c1bf;
        box-shadow: 0 4px 12px #3b8785;
    }

    &:disabled {
        background: #4a5568;
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

const Spinner = styled.div`
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 2px solid white;
    width: 18px;
    height: 18px;
    animation: spin 1s linear infinite;

    outline: 2px solid #00fff7;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const S = {
    ActionButton,
    Spinner
}