import React, {createContext, useReducer, useContext, useEffect, type ReactNode} from 'react';

type Database = {
    name: string;
    login: string;
    password: string;
};

export type Config = {
    databases: Database[];
    gitlabPath: string;
    idePath: string;
};

export type PatchFile = {
    name: string;
    file: File;
    size?: number
    type: 'pck' | 'zip' | string;
};

export type SelectedPair = { pck: PatchFile | null; zip: PatchFile | null }

export type State = {
    selectedFiles: PatchFile[];
    selectedPair: SelectedPair;
    selectedDb: string;
    isProcessing: boolean;
    logs: string[];
    confirmed: boolean;
    config: Config;
};

export type Action =
    | { type: 'SET_FILES'; payload: PatchFile[] }
    | { type: 'SET_FILE_PAIR'; payload: SelectedPair }
    | { type: 'SET_DB'; payload: string }
    | { type: 'SET_PROCESSING'; payload: boolean }
    | { type: 'ADD_LOG'; payload: string }
    | { type: 'SET_CONFIRMED'; payload: boolean }
    | { type: 'RESET' }
    | { type: 'RESET_FILES' }

const initialState: State = {
    selectedFiles: [],
    selectedPair: {pck: null, zip: null},
    selectedDb: '',
    isProcessing: false,
    logs: [],
    confirmed: false,
    config: {
        databases: [
            {name: 'PROD_DB', login: 'admin', password: 'prod_pass'},
            {name: 'TEST_DB', login: 'tester', password: 'test_pass'}
        ],
        gitlabPath: '/path/to/gitlab',
        idePath: '/path/to/ide'
    }
};

// localStorage (запоминаем последнее состояние)
const loadState = (): State => {
    try {
        const saved = localStorage.getItem('patchState');
        if (!saved) return initialState;

        const parsed = JSON.parse(saved);
        return {
            ...initialState,
            selectedDb: parsed.selectedDb || '',
            confirmed: parsed.confirmed || false,
            logs: parsed.logs || [],
            selectedFiles: parsed.selectedFiles || [],
            selectedPair: parsed.selectedPair || {pck: null, zip: null}
        };
    } catch {
        return initialState;
    }
};

const reducer = (state: State, action: Action): State => {
    let newState;

    switch (action.type) {
        case 'SET_FILES':
            newState = {...state, selectedFiles: action.payload}
            break
        case 'SET_FILE_PAIR':
            newState = {...state, selectedPair: action.payload}
            break
        case 'SET_DB':
            newState = {...state, selectedDb: action.payload}
            break
        case 'SET_PROCESSING':
            newState = {...state, isProcessing: action.payload}
            break
        case 'ADD_LOG':
            newState = {...state, logs: [...state.logs, action.payload]}
            break
        case 'SET_CONFIRMED':
            newState = {...state, confirmed: action.payload}
            break
        case 'RESET_FILES':
            return {
                ...state,
                selectedFiles: [],
                selectedPair: { pck: null, zip: null }
            }
        case 'RESET':
            newState = initialState;
            break
        default:
            return state;
    }

    return newState;
};


const PatchContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null
});


export const PatchProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState, loadState);

    useEffect(() => {
        // Сохранение состояния
    }, [state.selectedDb, state.confirmed, state.logs, state.selectedFiles, state.selectedPair]);

    return (
        <PatchContext.Provider value={{ state, dispatch }}>
            {children}
        </PatchContext.Provider>
    );
};

export const usePatchContext = () => {
    const context = useContext(PatchContext);
    if (!context) {
        throw new Error('usePatchContext должен использоваться в PatchProvider');
    }
    return context;
};