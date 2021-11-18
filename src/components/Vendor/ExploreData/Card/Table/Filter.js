export default class Filter {
	static byIndex({ index = [], search = "", date = [] }) {
		try {
			if (index.length <= 0) {
				throw Error("Index Cannot be Empty");
			}
			index = index.join(",").toLowerCase();

			if (date.length === 0) {
				return search.split(" ").every((e) => index.includes(e.toLowerCase()));
			} else if (search === "") {
				return date.some((e) => index.includes(e.toLowerCase()));
			} else {
				return (
					search.split(" ").every((e) => index.includes(e.toLowerCase())) &&
					date.some((e) => index.includes(e))
				);
			}
		} catch (error) {
			throw Error(error.message);
		}
	}
}
