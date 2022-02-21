var DarkLighter = function () {

    var withCookies = false;

    const lightTheme = {
        id: "#theme-link",
        cssLink: "css/index.css",
        cookie: "light",
        text: "Светлая",
        checked: false
    };

    const darkTheme = {
        id: "#theme-link",
        cssLink: "css/index.dark.css",
        cookie: "dark",
        text: "Темная",
        checked: true
    };

    var setTheme = function(theme) {
        const elem = document.querySelector(theme.id);
        elem.href = theme.cssLink;

        if (withCookies) {
            setCookie("theme", theme.cookie);
        }

        var label = document.querySelector('#switch-label');
        label.innerHTML = theme.text;
        var checkbox = document.querySelector('input[name=theme]');
        checkbox.checked = theme.checked;
    }
	
	var checkPreferences = function () {
		var theme = getCookie("theme");
		if (theme === 'undefined') {
			const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

			if (prefersDarkScheme.matches) {
				setTheme(darkTheme);
			} else {
				setTheme(lightTheme);
			}
        }
        else if (theme === "light") {
            setTheme(lightTheme);
        }
        else {
            setTheme(darkTheme);
        }
    }

	var assign = function () {
		checkPreferences();

        var checkbox = document.querySelector('input[name=theme]');

        checkbox.addEventListener('change', function() {
            if(this.checked) {
                trans()
                setTheme(darkTheme);
            } else {
                trans()
                setTheme(lightTheme);
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
		init: function (cookies) {
            withCookies = (cookies !== 'undefined') && cookies;
			assign();
		},

        saveState: function() {
            var checkbox = document.querySelector('input[name=theme]');
            setCookie("theme", (checkbox.checked) ? "dark" : "light");
        },

        clearState: function() {
            document.cookie = 'theme=; max-age=-1;'
        }
	};
}();