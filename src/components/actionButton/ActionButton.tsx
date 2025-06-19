import React from "react";
import {S} from './ActionButton_Styles.ts'
import type {PatchFile} from "../../contexts/PatchContext.tsx";


type ActionButton = {
    handleSubmit: () => void
    isProcessing: boolean
    confirmed: boolean
    selectedFiles: PatchFile[]
    selectedDb: string

}

export const ActionButton: React.FC<ActionButton> = ({
                                                         handleSubmit,
                                                         isProcessing,
                                                         confirmed,
                                                         selectedFiles,
                                                         selectedDb
                                                     }) => {
    return (
        <S.ActionButton
            onClick={handleSubmit}
            disabled={isProcessing || !selectedDb || !selectedFiles.length || !confirmed}
        >
            {isProcessing ? <S.Spinner/> : 'Запустить установку'}
        </S.ActionButton>
    );
};

