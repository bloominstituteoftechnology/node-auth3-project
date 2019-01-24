import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <section className="content">
            <h1>What are JSON Web Tokens?</h1>
            <p>JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.</p>
            <p>Although JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.</p>
            <p>Read more at <a href="https://jwt.io/">https://jwt.io</a></p>
        </section>
    );
};

export default Home;