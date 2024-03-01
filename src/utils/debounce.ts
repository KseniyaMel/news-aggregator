const debounce = (method: (...args: any[]) => any, timeout = 1500) => {
	let timer: any;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			method(...args);
		}, timeout);
	};
};

export default debounce;
