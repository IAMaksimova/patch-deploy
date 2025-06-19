import styled from "styled-components";

const UploadSection = styled.section``;

const DropZone = styled.div<{ active: boolean, disabled?: boolean }>`
    border: 2px dashed ${props => props.active ? '#45A19F' : '#4a5568'};
    border-radius: 12px;
    padding: 40px 20px;
    background-color: ${props => props.active ? 'rgba(66, 153, 225, 0.05)' : 'transparent'};
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed ${props => props.active ? '#00fff7' : '#ccc'};
    background-color: ${props => props.active ? 'rgba(0,255,247,0.14)' : 'transparent'};
    transition: all 0.3s ease;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.6 : 1};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
        background-color: ${props =>
                props.disabled ? 'inherit' :
                        props.active ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    }
`;

const UploadLabel = styled.div`
    color: #a0aec0;
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
`;

const DropMessage = styled.div`
    color: #718096;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const UploadIcon = styled.span`
    font-size: 24px;
    color: #00fff7;
`;

const FileList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 90%;
`;

const FileItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e2e8f0;
    background-color: rgba(74, 85, 104, 0.3);
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
`;

const FileIcon = styled.span`
    font-size: 16px;
`;

const HiddenInput = styled.input`
    display: none;
`;

export const S = {
    UploadSection,
    DropZone,
    DropMessage,
    UploadLabel,
    UploadIcon,
    FileList,
    FileItem,
    FileIcon,
    HiddenInput
}