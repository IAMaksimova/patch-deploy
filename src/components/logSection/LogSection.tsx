import {S} from './LogSection_Styles.ts'
import React from "react";

export const LogSection: React.FC<{ logs: string[], isProcessing: boolean}> = ({logs, isProcessing}) => {
    return (
        <S.LogSection>
            <S.LogHeader>
                <S.LogTitle>Журнал выполнения</S.LogTitle>
                {logs.length > 0 && <S.LogCounter>{logs.length} событий</S.LogCounter>}
            </S.LogHeader>
            
            <S.LogContent isProcessing={isProcessing}>
                {logs.length > 0 ? (
                    logs.map((log, i) => <S.LogLine key={i}>{log}</S.LogLine>)
                ) : (
                    <S.LogPlaceholder>Здесь будет отображаться процесс установки</S.LogPlaceholder>
                )}
            </S.LogContent>
        </S.LogSection>
    );
};

