import { Routes, Route } from 'react-router-dom';

import HomeRouter from '../router/Home';
import System from '../router/System';
import { path } from '../utils/constant';
import NotFound from './components/Client/components/404NotFound/404NotFound';
import StyleWrapper from '../Styles';

function App() {
    return (
        <StyleWrapper>
            <div className="App">
                <Routes>
                    <Route path={path.home} element={<HomeRouter />} />
                    <Route path={path.system} element={<System />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </StyleWrapper>
    );
}

export default App;
