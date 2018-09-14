import React from "react";
import style from "./SignUp.module.css";

const Form = ({
	username,
	password,
	department,
	handleSubmit,
	handleChange,
	type,
	name,
}) => (
	<div className={style.card}>
		<h1>{name}</h1>
		<form action="" onSubmit={handleSubmit}>
			<div className={style.inputGroup}>
				<input
					className={style.input}
					type="text"
					placeholder="Username"
					name="username"
					onChange={handleChange}
					value={username}
				/>
			</div>
			<div className={style.inputGroup}>
				<input
					className={style.input}
					type="text"
					placeholder="Password"
					name="password"
					value={password}
					onChange={handleChange}
					autoComplete="off"
				/>
			</div>
			{type === "signUp" && (
				<div className={style.inputGroup}>
					<input
						className={style.input}
						type="text"
						placeholder="Department"
						name="department"
						value={department}
						onChange={handleChange}
						autoComplete="off"
					/>
				</div>
			)}
			<button>Submit</button>
		</form>
	</div>
);

export default Form;
