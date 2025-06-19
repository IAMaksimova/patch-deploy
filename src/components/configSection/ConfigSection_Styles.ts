import styled from "styled-components";

const ConfigSection = styled.section`
    display: grid;
    gap: 20px;
    margin-top: 28px;
`;

const DbSelect = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const DbLabel = styled.label`
    color: #a0aec0;
    font-size: 14px;
    font-weight: 500;
`;

const DbDropdown = styled.select`
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #4a5568;
    background-color: #2d3748;
    color: #e2e8f0;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #4299e1;
        box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const ConfirmCheck = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
`;

const Checkbox = styled.input`
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid #4a5568;
    background-color: #2d3748;
    cursor: pointer;

    &:checked {
        background-color: #4299e1;
        border-color: #4299e1;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const CheckboxLabel = styled.label`
    color: #e2e8f0;
    font-size: 14px;
    cursor: pointer;
`;

export const S = {
    ConfigSection,
    DbSelect,
    DbLabel,
    DbDropdown,
    ConfirmCheck,
    Checkbox,
    CheckboxLabel
}