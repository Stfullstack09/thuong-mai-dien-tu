import { Routes, Route } from 'react-router-dom';
import HomeRouter from '../router/Home';

import { path } from '../utils/constant';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={path.home} element={<HomeRouter />} />
            </Routes>
        </div>
    );
}

export default App;
