export const ValidateInput = (type, val) => {
	let regPhone = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
	let regEmail = /^[^\s@]+@[^\s@]+$/;
	switch (type) {
		case "phone":
			return regPhone.test(val);
			break;
		case "email":
			return regEmail.test(val);
			break;
		default:
			break;
	}
};
