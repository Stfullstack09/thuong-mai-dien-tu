import { Routes, Route } from 'react-router-dom';
import StyleWrapper from '../Styles';
import { lazy, Suspense } from 'react';

import HomeRouter from '../router/Home';
import { path } from '../utils/constant';
import NotFound from './components/Client/components/404NotFound/404NotFound';
import './App.scss';
import Loading from '../components/loading/loading';
import PluginAll from '../components/Plugin/PluginAll';

function App() {
    const System = lazy(() => import('../router/System'));

    return (
        <StyleWrapper>
            <div className="App">
                <PluginAll />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path={path.home} element={<HomeRouter />} />
                        <Route path={path.system} element={<System />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </StyleWrapper>
    );
}

export default App;
