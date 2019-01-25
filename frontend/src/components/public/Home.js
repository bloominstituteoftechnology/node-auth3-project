import React from 'react';

const Home = (props) => {
    return (
        <section className="content">
            {localStorage.getItem('jwt') ?
            <img src="https://i.pinimg.com/236x/07/a3/d0/07a3d05d16754d5bc7f427b4c0ddf6be.jpg" /> :
            <img src="http://catplanet.org/wp-content/uploads/2014/09/Cats-as-error-message-401.jpg" />}
            {/* <h1>What are JSON Web Tokens?</h1>
            <p>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.</p>
            <p>Although JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.</p>
            <p>Read more at <a href="https://jwt.io/">https://jwt.io</a></p> */}
        </section>
    );
};

export default Home;