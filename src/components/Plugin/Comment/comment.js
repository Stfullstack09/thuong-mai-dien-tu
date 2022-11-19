import React from 'react';
import { useEffect } from 'react';

function Comment({ link }) {
    useEffect(() => {
        const fetch = async () => {
            initFacebookSDK();
        };

        fetch();
    }, []);

    const initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: 584691163324326,
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.5', // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    };

    return <div className="fb-comments" data-href={link} data-width="100%" data-numposts="5"></div>;
}

export default Comment;
