const script = document.createElement('script');
script.textContent = `(function () {
	const _setItem = localStorage.setItem.bind(localStorage);

	function normalizeDdid(raw) {
		try {
			const data = JSON.parse(raw);
			if (data && typeof data.ddid === 'string') {
				const [first] = data.ddid.split(':');
				data.ddid = first + ':1';
				return JSON.stringify(data);
			}
		} catch (_) {}
		return raw;
	}

	localStorage.setItem = function (key, value) {
		if (key === 'user-settings') value = normalizeDdid(value);
		return _setItem(key, value);
	};

	const existing = localStorage.getItem('user-settings');
	if (existing) {
		const fixed = normalizeDdid(existing);
		if (fixed !== existing) _setItem('user-settings', fixed);
	}
})();`;
(document.head || document.documentElement).appendChild(script);
script.remove();
