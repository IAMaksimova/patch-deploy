import {PatchDeployer} from "./layout/PatchDeployer.tsx";
import {PatchProvider} from "./contexts/PatchContext.tsx";

function App() {

    return (
        <PatchProvider>
            <PatchDeployer/>
        </PatchProvider>
    );
}

export default App
