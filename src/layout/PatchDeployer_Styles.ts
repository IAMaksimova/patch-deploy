import styled from "styled-components";

const DarkContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 110vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    width: 100vw;
`;

const GlassCard = styled.div`
    background: rgba(25, 29, 36, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    padding: 18px;
    width: 100%;
    max-width: 40vw;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 110vh;
`;

const AppTitle = styled.h1`
    color: #e2e8f0;
    text-align: center;
    font-weight: 500;
    font-size: 24px;
`;


const ProgressWrapper = styled.div`
    margin-top: 24px;
`;

const ProgressInfo = styled.div`
    color: #a0aec0;
    font-size: 13px;
    margin-bottom: 8px;
    text-align: center;
`;

const ProgressBar = styled.div`
    width: 100%;
    background-color: #2d3748;
    border-radius: 100px;
    height: 6px;
    overflow: hidden;
`;

const ProgressFill = styled.div<{progress: number}>`
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, #6ca9dd 0%, #38b2ac 100%);
    width: ${props => props.progress}%;
    transition: width 0.4s ease-out;
`;

export const S = {
    DarkContainer,
    GlassCard,
    AppTitle,
    ProgressWrapper,
    ProgressBar,
    ProgressInfo,
    ProgressFill
}