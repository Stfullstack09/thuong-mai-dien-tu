import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';

import HomeRouter from '../router/Home';
import { path } from '../utils/constant';
import NotFound from './components/Client/components/404NotFound/404NotFound';
import Loading from '../components/loading/loading';
import PluginAll from '../components/Plugin/PluginAll';
import Cart from './components/Client/cart/cart';
import RouterCheckOut from './components/Client/checkout/RouterCheckOut';
import Dashboard from './components/Client/Dashboard/dashboard';
import DetailOrder from './components/Client/DetailOrder';
import DetailPost from './components/Client/components/DetailPost';

import './App.scss';
import StyleWrapper from '../Styles';
import Profile from './components/Client/profile';

function App() {
    const System = lazy(() => import('../router/System'));

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
        <StyleWrapper>
            <div className="App">
                <PluginAll />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path={path.home} element={<HomeRouter />} />
                        <Route path={path.system} element={<System />} />
                        <Route path={path.cart} element={<Cart />} />
                        <Route path={path.checkout} element={<RouterCheckOut />} />
                        <Route path={path.profile} element={<Profile />} />
                        {isLoggedIn ? (
                            <Route path={path.dashboard} element={<Dashboard />} />
                        ) : (
                            <Route path="*" element={<NotFound />} />
                        )}
                        <Route path={path.detailOrder} element={<DetailOrder />} />
                        <Route path={path.detailPost} element={<DetailPost />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </StyleWrapper>
    );
}

export default App;
