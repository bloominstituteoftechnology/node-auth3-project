import React from 'react';
import PropTypes from 'prop-types';

const User = (props) => {
	return (
		<div>
			<h4>{props.user.username}</h4>
			<p>{`Department: ${props.user.department}`}</p>
			<p>{`Employee ID: ${props.user.id}`}</p>
		</div>
	);
};

User.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.number.isRequired,
		username: PropTypes.string.isRequired,
		department: PropTypes.string.isRequired
	})
};

export default User;
