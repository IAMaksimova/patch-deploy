import React, {type ChangeEvent} from "react";
import {S} from './ConfigSection_Styles.ts'
import type {Config} from "../../contexts/PatchContext.tsx";


type ConfigSection = {
    selectedDb: string
    handleDbChange: (e: ChangeEvent<HTMLSelectElement>) => void
    isProcessing: boolean
    setConfirmed: (e: ChangeEvent<HTMLInputElement>) => void
    confirmed: boolean
    config: Config
}
export const ConfigSection: React.FC<ConfigSection> = ({
                                                           selectedDb,
                                                           handleDbChange,
                                                           isProcessing,
                                                           setConfirmed,
                                                           confirmed,
                                                           config
                                                       }) => {
    return (
        <S.ConfigSection>
            <S.DbSelect>
                <S.DbLabel>Целевая база данных</S.DbLabel>
                <S.DbDropdown value={selectedDb} onChange={handleDbChange} disabled={isProcessing}>
                    <option value="">-- Выберите БД --</option>
                    {config.databases.map(db => (
                        <option key={db.name} value={db.name}>{db.name}</option>
                    ))}
                </S.DbDropdown>
            </S.DbSelect>

            <S.ConfirmCheck>
                <S.Checkbox
                    type="checkbox"
                    id="confirm"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e)}
                    disabled={isProcessing}
                />
                <S.CheckboxLabel htmlFor="confirm">Подтверждаю установку</S.CheckboxLabel>
            </S.ConfirmCheck>
        </S.ConfigSection>
    );
};
