import type {Action, PatchFile, SelectedPair, State} from "../contexts/PatchContext.tsx";
import React from "react";

type SimulateProcessing = (ms: number) => Promise<void>;

//Поиск пар файлов (.pck и .zip)
export const findFilePairs = (files: PatchFile[]): Record<string, SelectedPair> => {
    const pairs: Record<string, SelectedPair> = {}

    files.forEach(file => {
        const baseName = file.name.replace(/\.(pck|zip)$/, '')
        if (!pairs[baseName]) pairs[baseName] = {pck: null, zip: null}

        if (file.name.endsWith('.pck')) {
            pairs[baseName].pck = file
        } else if (file.name.endsWith('.zip')) {
            pairs[baseName].zip = file
        }
    });

    return Object.fromEntries(
        Object.entries(pairs).filter(([_, pair]) => pair.pck || pair.zip)
    );
};

//Обработка загрузки файлов
export const handleFileUpload = (
    files: FileList | null,
    dispatch: React.Dispatch<Action>
): void => {
    if (!files || files.length === 0) return;

    const patchFiles: PatchFile[] = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.name.endsWith('.pck') ? 'pck' : 'zip',
        file
    }));

    const pairs = findFilePairs(patchFiles);
    const pairNames = Object.keys(pairs);

    if (pairNames.length === 1) {
        dispatch({type: 'SET_FILE_PAIR', payload: pairs[pairNames[0]]})
        dispatch({type: 'SET_FILES', payload: patchFiles})
    } else if (patchFiles.length === 1 && patchFiles[0].type === 'zip') {
        dispatch({
            type: 'SET_FILE_PAIR',
            payload: {pck: null, zip: patchFiles[0]}
        });
        dispatch({type: 'SET_FILES', payload: patchFiles});
    } else {
        throw new Error('Не найдена подходящая пара файлов (.pck + .zip с одинаковыми именами)');
    }
};

//Валидация перед началом обработки
const validateBeforeProcessing = (state: State): void => {
    if (!state.selectedDb) {
        throw new Error('Не выбрана БД для установки!');
    }

    if (!state.selectedPair.pck && !state.selectedPair.zip) {
        throw new Error('Не выбраны файлы поставки!');
    }

    if (!state.confirmed) {
        throw new Error('Не подтверждена установка!');
    }
};

//Определение типа поставки
const getPatchType = (state: State): 'distributor' | 'local' => {
    const isDistributor = state.selectedPair.zip?.name.includes('patch_') ||
        state.selectedPair.zip?.name.includes('SUP')
    return isDistributor ? 'distributor' : 'local';
};


//Проверка файлов поставки
const checkFiles = async (
    state: State,
    dispatch: React.Dispatch<Action>,
    simulateProcessing: SimulateProcessing
): Promise<void> => {
    dispatch({type: 'ADD_LOG', payload: 'Проверка файлов...'});
    await simulateProcessing(1000)

    if (state.selectedPair.pck && state.selectedPair.zip) {
        dispatch({
            type: 'ADD_LOG',
            payload: `Найдена пара файлов: ${state.selectedPair.pck.name} + ${state.selectedPair.zip.name}`
        })
    } else if (state.selectedPair.zip) {
        dispatch({type: 'ADD_LOG', payload: `Найден файл поставки: ${state.selectedPair.zip.name}`})
    }
    dispatch({type: 'ADD_LOG', payload: 'Проверка файлов завершена ✓'})
};


//Проверка цифровой подписи (для дистрибьюторских поставок)
const verifySignature = async (
    dispatch: React.Dispatch<Action>,
    simulateProcessing: SimulateProcessing
): Promise<void> => {
    dispatch({type: 'ADD_LOG', payload: 'Проверка цифровой подписи supply.xhash...'})
    await simulateProcessing(2000);
    dispatch({type: 'ADD_LOG', payload: 'Цифровая подпись верифицирована ✓'})
};

//Подключение к базе данных
const connectToDatabase = async (
    state: State,
    dispatch: React.Dispatch<Action>,
    simulateProcessing: SimulateProcessing
): Promise<void> => {
    const dbConfig = state.config.databases.find(db => db.name === state.selectedDb);
    if (!dbConfig) {
        throw new Error('Конфигурация БД не найдена!')
    }

    dispatch({type: 'ADD_LOG', payload: `Подключение к БД ${state.selectedDb}...`})
    //Здесь можно добавить реальное подключение к БД:
    /*
    try {
      //Oracle
      const connection = await oracledb.getConnection({
        user: dbConfig.login,
        password: dbConfig.password,
        connectString: dbConfig.connectionString // нужно добавить в конфиг
      });

      dispatch({ type: 'SET_DB_CONNECTION', payload: connection }); // нужно добавить в редьюсер
      dispatch({ type: 'ADD_LOG', payload: 'Подключение к БД установлено ✓' });

      // Не забыть закрыть соединение после использования!
      // await connection.close();

    } catch (err) {
      dispatch({ type: 'ADD_LOG', payload: `Ошибка подключения: ${err.message}` });
      throw err;
    }
    */
    await simulateProcessing(1500);
    dispatch({type: 'ADD_LOG', payload: 'Подключение к БД установлено ✓'});
};

//Установка патча
const installPatch = async (
    patchType: 'distributor' | 'local',
    dispatch: React.Dispatch<Action>,
    simulateProcessing: SimulateProcessing
): Promise<void> => {
    dispatch({type: 'ADD_LOG', payload: 'Установка патча...'})

    if (patchType === 'distributor') {
        await simulateProcessing(3000);
        dispatch({type: 'ADD_LOG', payload: 'Установка дистрибьюторского патча...'})
    } else {
        await simulateProcessing(4000);
        dispatch({type: 'ADD_LOG', payload: 'Коммит в GitLab...'})
        await simulateProcessing(2000);
        dispatch({type: 'ADD_LOG', payload: 'Развертывание локального патча...'})
    }
};

//Основная функция обработки поставки
export const processPatch = async (
    state: State,
    dispatch: React.Dispatch<Action>,
    simulateProcessing: SimulateProcessing
): Promise<void> => {
    try {
        validateBeforeProcessing(state)

        dispatch({type: 'SET_PROCESSING', payload: true})
        dispatch({type: 'ADD_LOG', payload: '=== Начало обработки поставки ==='})

        const patchType = getPatchType(state);
        dispatch({
            type: 'ADD_LOG', payload: `Тип: ${patchType === 'distributor'
                ? 'Поставка дистрибьютора (с цифровой подписью)'
                : 'Локальный патч (без цифровой подписи)'}`
        })

        await checkFiles(state, dispatch, simulateProcessing)

        if (patchType === 'distributor') {
            await verifySignature(dispatch, simulateProcessing)
        }

        await connectToDatabase(state, dispatch, simulateProcessing)
        await installPatch(patchType, dispatch, simulateProcessing)

        // Финальные проверки
        dispatch({type: 'ADD_LOG', payload: 'Проверка результатов установки...'})
        await simulateProcessing(1000);
        dispatch({type: 'ADD_LOG', payload: 'Все проверки пройдены успешно ✓'})

        dispatch({type: 'ADD_LOG', payload: '=== Поставка успешно установлена ==='})
        dispatch({type: 'ADD_LOG', payload: `Время: ${new Date().toLocaleTimeString()}`})
        dispatch({type: 'RESET_FILES'})

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        dispatch({type: 'ADD_LOG', payload: `ОШИБКА: ${errorMessage}`})
        dispatch({type: 'ADD_LOG', payload: '=== Процесс прерван из-за ошибки ==='})
        throw error; // Пробрасываем ошибку дальше для обработки в UI
    } finally {
        dispatch({type: 'SET_PROCESSING', payload: false})
    }
};

//Вспомогательная функция для тестирования
export const createSimulateProcessing = (): SimulateProcessing => {
    return (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
};