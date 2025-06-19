import React, {useRef, useCallback} from 'react';
import {S} from './PatchDeployer_Styles.ts'
import {UploadSection} from "../components/uploadSection/UploadSection.tsx";
import {ConfigSection} from "../components/configSection/ConfigSection.tsx";
import {ActionButton} from "../components/actionButton/ActionButton.tsx";
import {LogSection} from "../components/logSection/LogSection.tsx";
import {usePatchContext} from "../contexts/PatchContext.tsx";
import {createSimulateProcessing, handleFileUpload, processPatch} from "../handlers/patchHandlers.ts";

export const PatchDeployer = () => {
    const { state, dispatch } = usePatchContext();
    const {
        selectedFiles,
        selectedPair,
        selectedDb,
        isProcessing,
        logs,
        confirmed,
        config
    } = state;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const simulateProcessing = useCallback(createSimulateProcessing(), []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            handleFileUpload(e.target.files, dispatch);

        } catch (error) {
            alert(error instanceof Error ? error.message : 'Ошибка при загрузке файлов');
        }
    };

    const handleDbChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_DB', payload: e.target.value });
    };

    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_CONFIRMED', payload: e.target.checked });
    };

    const handleSubmit = async () => {
        try {
            await processPatch(state, dispatch, simulateProcessing);
        } catch (error) {
            console.error('Ошибка обработки:', error);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <S.DarkContainer>
            <S.GlassCard>
                <S.AppTitle>PatchDeploy System</S.AppTitle>

                <UploadSection
                    handleFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                    triggerFileInput={triggerFileInput}
                    selectedPair={selectedPair}
                    selectedFiles={selectedFiles}
                    disabled={isProcessing}
                />

                <ConfigSection
                    config={config}
                    setConfirmed={handleConfirmChange}
                    confirmed={confirmed}
                    isProcessing={isProcessing}
                    handleDbChange={handleDbChange}
                    selectedDb={selectedDb}
                />

                <ActionButton
                    isProcessing={isProcessing}
                    confirmed={confirmed}
                    selectedDb={selectedDb}
                    selectedFiles={selectedFiles}
                    handleSubmit={handleSubmit}
                />
                {isProcessing && (
                    <S.ProgressWrapper>
                        <S.ProgressInfo>
                            {logs[logs.length - 1] || 'Подготовка к установке...'}
                        </S.ProgressInfo>
                        <S.ProgressBar>
                            <S.ProgressFill progress={Math.min((logs.length / 10) * 100, 100)} />
                        </S.ProgressBar>
                    </S.ProgressWrapper>
                )}
                <LogSection
                    logs={logs}
                    isProcessing={isProcessing}
                />
            </S.GlassCard>
        </S.DarkContainer>
    );
};




