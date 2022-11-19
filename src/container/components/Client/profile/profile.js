import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import './profile.scss';

function Profile() {
    const params = useParams();

    console.log(params.email);

    return (
        <div className="profile-wrapper">
            <Header />
        </div>
    );
}

export default Profile;
