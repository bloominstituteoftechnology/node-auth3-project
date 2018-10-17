import React from 'react';

const User = props => {
	const { user } = props;
	return(
		<div>
			<p>ID: { user.id }</p>
			<p>Username: { user.username }</p>
			<p>Department: { user.department }</p>
		</div>
	);
};

export default User;
