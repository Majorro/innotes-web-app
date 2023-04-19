import type { AuthData } from "$lib/pages/auth/model/AuthData";

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface ValidationErrors {
	emailErrorText: string;
	passwordErrorText: string;
	passwordConfirmErrorText: string;
	hasErrors: boolean;
}

export function validateAuthData(authData: AuthData): ValidationErrors {
	const emailErrorText = validateEmail(authData.email);
	const passwordErrorText = validatePassword(authData.password);
	const passwordConfirmErrorText = validateConfirmPassword(
		authData.password,
		authData.passwordConfirm
	);

	return {
		emailErrorText: emailErrorText,
		passwordErrorText: passwordErrorText,
		passwordConfirmErrorText: passwordConfirmErrorText,
		hasErrors: !!(emailErrorText || passwordErrorText || passwordConfirmErrorText)
	};
}

function validateEmail(email: string): string {
	if (!email) {
		return "Email is required!";
	}
	if (!email.toLowerCase().match(emailRegex)) {
		return "Email is invalid!";
	}
	return "";
}

function validatePassword(password: string): string {
	if (!password) {
		return "Password is required!";
	}
	if (password.length < 4) {
		return "Password length must be at least 4 characters";
	}
	return "";
}

function validateConfirmPassword(password: string, confirmPassword: string): string {
	if (!confirmPassword) {
		return "Password confirmation is required!";
	}
	if (confirmPassword !== password) {
		return "Passwords do not match!";
	}
	return "";
}
