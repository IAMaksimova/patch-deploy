import React, {type RefObject} from 'react';
import {S} from './UploadSection_Styles.ts'
import type {PatchFile, SelectedPair} from "../../contexts/PatchContext.tsx";


type UploadSection = {
    triggerFileInput: () => void
    selectedFiles: PatchFile[]
    fileInputRef: RefObject<HTMLInputElement | null>
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    selectedPair: SelectedPair
    disabled?: boolean
}

export const UploadSection: React.FC<UploadSection> = ({
                                                           triggerFileInput,
                                                           selectedFiles,
                                                           fileInputRef,
                                                           handleFileChange,
                                                           selectedPair,
                                                           disabled = false
                                                       }) => {
    const [isDragActive, setIsDragActive] = React.useState(false);

    const handleDrag = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragOut = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange({
                target: { files: e.dataTransfer.files }
            } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleClick = () => {
        if (!disabled) {
            triggerFileInput();
        }
    };

    return (
        <S.UploadSection>
            <S.UploadLabel>Выберите файлы поставки</S.UploadLabel>
            <S.DropZone
                onClick={handleClick}
                active={selectedFiles.length > 0 || isDragActive}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                disabled={disabled}  
            >
                {disabled ? (
                    <div style={{flexWrap: 'wrap', textAlign: 'center'}}>
                        <S.UploadIcon>⏳</S.UploadIcon>
                        <S.DropMessage>Идет обработка файлов...</S.DropMessage>
                    </div>
                ) : selectedPair.pck || selectedPair.zip ? (
                    <S.FileList>
                        {selectedPair.pck && <S.FileItem> <S.FileIcon>📁</S.FileIcon>{selectedPair.pck.name}</S.FileItem>}
                        {selectedPair.zip && <S.FileItem><S.FileIcon>📁</S.FileIcon>{selectedPair.zip.name}</S.FileItem>}
                        {!selectedPair.pck && <S.FileItem>Файл .pck не найден</S.FileItem>}
                        {!selectedPair.zip && <S.FileItem>Файл .zip не найден</S.FileItem>}
                    </S.FileList>
                ) : (
                    <div style={{flexWrap: 'wrap', textAlign: 'center'}}>
                        <S.UploadIcon>↑</S.UploadIcon>
                        <S.DropMessage>Перетащите .pck и .zip или кликните для выбора</S.DropMessage>
                    </div>
                )}
                <S.HiddenInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".pck,.zip"
                    style={{display: 'none'}}
                    disabled={disabled}  // Отключаем input
                />
            </S.DropZone>
        </S.UploadSection>
    );
};

