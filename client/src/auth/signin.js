import React from 'react';

class Signin extends React.Component {
    state = {
        username: '',
        password: ''
    };

    render() {
        return (
            <form onSubmitHadler={this.submitHandler}>
                <div>
                    {/* <label htmlForm="Username" /> */}
                    <label>Username</label>
                    <input value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text"
                    />
                </div>
                <div>
                    {/* <label htmlForm="password" /> */}
                    <label>Password</label>
                    <input value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text"
                    />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>
            </form>

        );
    }

    submitHandler = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:5000/api/login', this.state)
            .then(response => {
                console.log('response', response.data);
            })
            .catch(err => console.log('bad Panda'));
    };

    inputChangeHandler = event => {
        console.log('changing', event.target.name);
        const { name, value } = event.target;

        this.setState({ [name]: value });
    };
}

export default Signin;