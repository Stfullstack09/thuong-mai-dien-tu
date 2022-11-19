import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetToken } from '../../../components/hook';

import { LogoutServices } from '../../../services';
import * as actions from '../../.../../.././store/actions';
import Redirect from '../../../router/components/redirect';

function Logout() {
    const Token = useGetToken('accessToken');
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.user.userInfo) || {};
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const [isLogOut, setIsLogOut] = useState(isLoggedIn);

    useEffect(() => {
        const FetCh = async () => {
            if (isLogOut) {
                const Res = await LogoutServices(userInfo.id, Token);

                if (Res && Res.errCode === 0) {
                    localStorage.removeItem('accessToken');
                    dispatch(actions.processLogout());
                }
            }
        };

        FetCh();
    }, [userInfo.id, Token, dispatch, isLogOut]);

    useEffect(() => {
        setIsLogOut(isLoggedIn);
    }, [isLoggedIn]);

    return <div>{!isLogOut && <Redirect link="/" />}</div>;
}

export default Logout;
