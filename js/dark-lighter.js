var DarkLighter = function () {

	const items =
		[
			{
				id: "#theme-link",
				light: "css/index.css",
				dark: "css/index.dark.css"
			}
		];

	var setLight = function () {

		for (let i = 0; i < items.length; i++) {
			const elem = document.querySelector(items[i].id);
			elem.href = items[i].light;
		}

		setCookie("theme", "light");

        var label = document.querySelector('#switch-label');
        label.innerHTML = "Светлая";
	}

	var setDark = function () {

		for (let i = 0; i < items.length; i++) {
			const elem = document.querySelector(items[i].id);
			elem.href = items[i].dark;
		}

		setCookie("theme", "dark");
        
        var label = document.querySelector('#switch-label');
        label.innerHTML = "Темная";
	}
	
	var checkPreferences = function () {
		var theme = getCookie("theme");
		if (theme === 'undefined') {
			const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

			if (prefersDarkScheme.matches) {
				setDark();
			} else {
				setLight();
			}
        }
        else if (theme === "light") {
            setLight();
        }
        else {
            setDark();
        }
    }

	var assign = function () {
		checkPreferences();

        var checkbox = document.querySelector('input[name=theme]');

        checkbox.addEventListener('change', function() {
            if(this.checked) {
                trans()
                setDark();
            } else {
                trans()
                setLight();
            }
        })
	}

	let trans = () => {
		document.documentElement.classList.add('transition');
		window.setTimeout(() => {
			document.documentElement.classList.remove('transition')
		}, 1000)
	}
	
	return {
		// public functions
		init: function () {
			assign();
		},
	};
}();