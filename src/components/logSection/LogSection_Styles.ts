import styled from "styled-components";

const LogSection = styled.section`
    margin-top: 4vh;
`;

const LogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const LogTitle = styled.h3`
    color: #e2e8f0;
    font-size: 16px;
    font-weight: 500;
`;

const LogCounter = styled.span`
    color: #718096;
    font-size: 12px;
    background-color: rgba(113, 128, 150, 0.2);
    padding: 2px 8px;
    border-radius: 100px;
`;

const LogContent = styled.div<{isProcessing: boolean}>`
    background-color: #1a202c;
    border-radius: 8px;
    padding: 16px;
    min-height: 150px;
    max-height: ${props => props.isProcessing ? '18vh' : '28vh'};
    overflow-y: auto;
    font-family: 'SF Mono', 'Roboto Mono', monospace;
    font-size: 13px;
    color: #cbd5e0;
    border: 1px solid #2d3748;
`;

const LogLine = styled.div`
    margin-bottom: 6px;
    white-space: pre-wrap;
    line-height: 1.5;
`;

const LogPlaceholder = styled.div`
    color: #4a5568;
    font-style: italic;
    text-align: center;
    padding: 20px;
`;

export const S = {
    LogSection,
    LogHeader,
    LogTitle,
    LogCounter,
    LogContent,
    LogLine,
    LogPlaceholder
}