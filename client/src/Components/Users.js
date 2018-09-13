import React from "react";

const Users = ({ users }) => (
	<div>
		{users.map(user => (
			<p>{user.username}</p>
		))}
	</div>
);

export default Users;
