import { async } from 'q';
import { useEffect } from 'react';
import { GetOneUser } from '../../../../services';
import Header from '../components/Header/Header';

import './Home.scss';

function HomePage() {
    const handleClickAPI = async () => {
        const Res = await GetOneUser(2);

        if (Res && Res.errCode === 0) {
            console.log('check data  responsive :', Res.data);
        } else {
            console.log('check data responsive failed');
        }
    };

    useEffect(() => {
        const Fetch = async () => {
            const Res = await GetOneUser(2);

            if (Res && Res.errCode === 0) {
                console.log('check data  responsive :', Res.data);
            } else {
                console.log('check data responsive failed');
            }
        };

        Fetch();
    }, []);

    return (
        <div className="home-page">
            <Header />
            <p onClick={handleClickAPI}></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p id="home-page-test"></p>
        </div>
    );
}

export default HomePage;
