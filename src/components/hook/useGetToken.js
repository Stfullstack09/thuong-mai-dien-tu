import _ from 'lodash';

import reduxStore from '../../redux';

const useGetToken = () => {
    const StorePersist = reduxStore.getState();

    const isLogin = StorePersist.user.isLoggedIn;

    const token = isLogin
        ? !_.isEmpty(StorePersist) &&
          !_.isEmpty(StorePersist.user) &&
          !_.isEmpty(StorePersist.user.userInfo) &&
          !_.isEmpty(StorePersist.user.userInfo.accessToken) &&
          StorePersist.user.userInfo.accessToken
            ? StorePersist.user.userInfo.accessToken
            : ''
        : '';

    return token;
};

export default useGetToken;
