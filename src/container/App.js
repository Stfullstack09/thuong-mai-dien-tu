import { Routes, Route } from 'react-router-dom';

import HomeRouter from '../router/Home';
import System from '../router/System';
import { path } from '../utils/constant';
import NotFound from './components/Client/components/404NotFound/404NotFound';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={path.home} element={<HomeRouter />} />
                <Route path={path.system} element={<System />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
