var day, date, month, year, jd, jm, jy, men, trans = [], okt, trd, min, mob, m1, m2, mf, mt, pov1, pov2, jst, glas, week, jpp, jnp, dbp, dap, hram, hrid, hv,
	lang, wr, fsize, bg, save, space = ' <span class="n">·</span> ',
	months = [, 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
	color = ['norm all', 'norm black', 'bold black', 'norm red', 'bold red', 'bold red', 'bold red', 'bold red', 'bold red big'],
	zn_title = ['аллилуйная', 'без знака', 'шестиричная', 'славословие', 'полиелей', 'бдение', 'великий праздник'],
	news = '<p class="title">▲<br><strong>Инструкция:</strong> выбрать день и празднуемых святых, нажать Зеленую кнопку.</p><p class="title">Настройки в меню <span class="butt butt__blue">≡</span>, подробная информация в Help <span class="butt red">?</span>.</p><p class="title">Все новости, вопросы, замечания, предложения, обсуждение и прочее<br><a href="https://vk.com/webtypikon">в группе vk.com/webtypikon</a>.</p><!-- <p class="title bold">ПОСЛЕДНИЕ СУЩЕСТВЕННЫЕ ИЗМЕНЕНИЯ:</p><p class="bu red bold">05.01.2022 — наконец-то появилась Литургия!</p><p class="bu">23.08.2021 — теперь размер шрифта тоже сохраняется.</p><p class="bu">05.10.2021 — можно менять фон.</p><p class="bu">23.08.2021 — теперь размер шрифта тоже сохраняется.</p><p class="bu">19.08.2021 — в праздник Преображения Господня программа WebTypikon тоже немного преобразилась. Теперь можно <strong>сворачивать / разворачивать всё</strong> (или почти всё). А еще появилось меню, в котором можно выбрать (и сохранить) один из 4 вариантов «свёрнутости» по умолчанию. <a href="https://vk.com/webtypikon?w=wall-205599956_74">Подробнее...</a></p><p class="bu">30.07.2021 — в тестовом режиме добавили функцию сворачивания / разворачивания отдельных служб и их частей. В дальнейшем будем совершенствовать. Просьба <a href="https://vk.com/webtypikon?w=wall-205599956_49">оставлять отзывы.</a></p><p class="bu">22.07.2021 — добавили «Службу общу Пресвятыя Богородицы ради святаго Ея образа». <a href="https://vk.com/webtypikon?w=wall-205599956_43">Подробнее...</a></p><p class="bu">12.07.2021 в полночь проект вышел в свет. <a href="https://vk.com/webtypikon?w=wall-205599956_3">Подробнее...</a></p> -->',
	today = new Date(); today.setHours(today.getHours() + 8.5);//webр
// today=new Date(2020,12-1,14+13);//webз
function sGray(a, d) { if (a) { a.removeClass().addClass('gray'); if (d) a.prop('disabled', true); } }
function sColor(a, c, v) {
	c = c || c === 0 || 1; if (a) {
		a.removeClass().addClass(color[c]);
		if ((v || v === 0) && !(a.find('[value="' + v + '"]').is(':disabled'))) a.val(v);
	}
}
function sel(a, i) { document.getElementById(a).selectedIndex = i }
function checkdot(a) { var b; return a && (b = a[a.length - 1] == '.' || b == ',') ? '' : '.' }
function hMenu() { if ($('#menu').is(":visible")) { $('#menu').hide() } }
function getCookie(n) { var matches = document.cookie.match(new RegExp("(?:^|; )" + n.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return matches ? decodeURIComponent(matches[1]) : undefined; }
function setCookie(n, v, d) { d = d || 30; var sd = new Date(Date.now() + d * 864e5); sd = sd.toUTCString(); document.cookie = n + '=' + v + '; expires=' + sd; }
$(document).ready(function () {
	DarkLighter.init();
	var fmin = 2, fmax = 10, fprev, tags = $('#info,#text,.font-size-value');
	hram = document.getElementById('hr').selectedIndex;
	if (lang = getCookie('lang')) $('#lang').val(lang); else lang = $('#lang').val() || 'csluni';
	if (wr = getCookie('wr')) $('#wr').val(wr); else wr = $('#wr').val() || 1;
	bg = getCookie('bg') || 'bg0'; $('#bg .' + bg).addClass('cur'); $('body,#menu').addClass(bg);
	if (fsize = getCookie('fsize')) {
		fprev = fsize; $('.font-size-value').html(fsize);
		if (fsize > 1) tags.toggleClass('f' + fsize);
	} else fsize = fprev = 1;
	if (save = getCookie('save')) { $('#save')[0].checked = true; setCookie('save', true); setCookie('lang', lang); setCookie('wr', wr); setCookie('bg', bg); }
	var $sv1 = $('#sv1'), $sv2 = $('#sv2'), $zn1 = $('#zn1'), $zn2 = $('#zn2'), $hr = $('#hr'), $pov1 = $('#pov1'), $pov2 = $('#pov2'),
		style = document.getElementById('newstyle').checked, jdn = newJdn(today, style), cal = new Calendar(style); cal.change(jdn);
	$('#scrollup').fadeOut(0);
	$('#lang').addClass($('#lang').find(":selected").attr('class'));
	function newJdn(opt, st) {
		var j = new jDate(+opt.getFullYear(), +opt.getMonth() + 1, +opt.getDate(), true);
		if (!st) j = new jDate(j.jymd.y, j.jymd.m, j.jymd.d, false); return j
	}
	function m1m2rw() {
		function check(a, b, c) {
			function checkdbp(a) { var x = a.find(':selected'); return x.attr('dbp') ? 'dbp' + x.attr('dbp') : (x.attr('dap') ? 'dap' + x.attr('dap') : null) }
			if (a.val()) { if (b = men[checkdbp(a) || 'm' + jm + 'd' + jd][a.val()]) { if (!b.v) b.v = a.val(); if (c || c === 0) b.z = c.val() } } else b = null; return b
		}
		m1 = check($sv1, m1, $zn1); m2 = check($sv2, m2, $zn2); pov1 = check($pov1, pov1); pov2 = check($pov2, pov2);
		if (m1 && m1.zlim) { $zn1.find('option').prop('disabled', true).slice(m1.zlim[0], m1.zlim[1] + 1).prop('disabled', false); }
		else { $zn1.find('option').prop('disabled', false).last().prop('disabled', true) }
		if (m2 && m2.zlim) { $zn2.find('option').prop('disabled', true).slice(m2.zlim[0], m2.zlim[1] + 1).prop('disabled', false); }
		else { $zn2.find('option').prop('disabled', false).last().prop('disabled', true) }
	}
	function wrall(a) {
		var wrap = {
			'v': 64, 'vbeg': 96, 'ps103': 96, 'vektv': 96, 'vmolsv': 125, 'vkaf': 120, 'vblam': 96, 'vblam1': 96, 'vant1': 96, 'vant': 104, 'vant2': 104, 'vant3': 104, 'vksl': 104, 'vksl1': 104, 'vksl2': 104, 'vksl3': 104, 'vektm1': 96, 'vektm': 120, 'vektm2': 120, 'vektm3': 120, 'psstg': 96, 'psstgst': 120, 'stg': 64, 'vhode': 96, 'vhodk': 96, 'svete': 96, 'vprok': 64, 'val': 64, 'vpar': 64, 'vpars': 64, 'vpar1': 64, 'vpars1': 64, 'vpar2': 64, 'vpars2': 64, 'vpar3': 64, 'vpars3': 64, 'spodobi': 96, 'vektp': 96, 'stl': 88, 'vlit': 120, 'stv': 64, 'nineotp': 96, 'vtrisv': 96, 'vtr': 64, 'vtrs': 64, 'vhleb': 120, 'vps33': 96, 'vtrch': 64, 'vekts': 96, 'vend': 96, 'vefrem': 96, 'vtrisvend': 96, 'votp': 64, 'vmnog': 96, 'vbili': 92, 'vtrili': 92, 'vtrilis': 92, 'vendili': 124, 'votpili': 92, 'vmnogili': 124,
			'vl': 64, 'vlekm': 96, 'vltrsv': 96, 'vlpr': 64, 'vlap': 64, 'vlal': 64, 'vlev': 64, 'vleks': 96, 'vleku': 96, 'vleko': 96, 'vlekv1': 96, 'vlekv2': 96, 'vlhp': 96, 'vlhei': 96, 'vlvvh': 96, 'vlekp1': 96, 'vlver': 96, 'vlevk': 96, 'vldos': 96, 'vlzdo': 64, 'vlevk2': 96, 'vlekp2': 96, 'vlot': 96, 'vlpot': 96, 'vlpr4': 64, 'vlpri': 96, 'vlppri': 96, 'vlekb': 96, 'vlzmol': 96, 'vlblag': 96, 'vlps33': 96, 'vlpotp': 96, 'vlotp': 64, 'vlpootp': 64, 'vlmno': 96,
			'p': 68, 'pm': 68, 'pv': 64, 'pbeg': 124, 'ppart1': 124, 'p6ps': 124, 'snami': 124, 'ptrp': 124, 'pveruu': 124, 'pmolst': 124, 'ptrisv1': 124, 'ptr1': 64, 'ptrp1': 92, 'pend1': 124, 'ppart2': 124, 'pps50': 124, 'pps101': 124, 'pman': 124, 'ptrisv2': 124, 'pkd': 92, 'ptrp2': 92, 'pend2': 124, 'ppart3': 124, 'pps69': 124, 'pps142': 124, 'pslav': 124, 'pkan': 92, 'pkans': 92, 'pp': 92, 'ppo': 92, 'ppo3': 92, 'ppo6': 92, 'ppo9': 92, 'ppp': 92, 'ppp3': 92, 'ppp6': 92, 'pp1': 92, 'pp2': 92, 'pp3': 92, 'pp1p': 92, 'pp2p': 92, 'pp3p': 92, 'pp4': 92, 'pp5': 92, 'pp6': 92, 'pp4p': 92, 'pp5p': 92, 'pp6p': 92, 'pp7': 92, 'pp8': 92, 'pp9': 92, 'pp7p': 92, 'pp8p': 92, 'pp9p': 92, 'pdost': 124, 'ptrisv': 124, 'ptrisv3': 124, 'ptrm': 92, 'ptrp3': 92, 'gdsil': 124, 'pend': 124, 'pefrem': 124, 'ptrisvend': 124, 'pmol': 124, 'potp': 92, 'pprosti': 124, 'chbeg': 124,
			'm': 68, 'mv': 68, 'ms': 68, 'md': 68, 'mpash': 64, 'mbeg': 124, 'mps50': 124, 'mkaf': 124, 'mveruu': 124, 'mkan': 92, 'mp': 92, 'mpo': 92, 'mpo3': 92, 'mpo6': 92, 'mpp': 92, 'mpp3': 92, 'mpp6': 92, 'mp1': 92, 'mp2': 92, 'mp3': 92, 'mp1p': 92, 'mp2p': 92, 'mp3p': 92, 'mp4': 92, 'mp5': 92, 'mp6': 92, 'mp4p': 92, 'mp5p': 92, 'mp6p': 92, 'mp7': 92, 'mp8': 92, 'mp9': 92, 'mp7p': 92, 'mp8p': 92, 'mp9p': 92, 'mtrisv': 124, 'mtr': 92, 'mtr1': 124, 'mend': 124, 'mend1': 124, 'mefrem': 124, 'mmol': 124, 'mpart2': 124, 'mps120': 124, 'mtrisv2': 124, 'mtr2': 124, 'mkd': 92, 'mekts': 124, 'motp': 124, 'mprosti': 124,
			'u': 64, 'u2ps': 124, 'u6ps': 96, 'umolsv': 125, 'uektv': 96, 'ubg': 96, 'ual': 64, 'utroi': 64, 'utrb': 64, 'utrbal': 64, 'utrbs': 64, 'ukaf': 64, 'uektm': 120, 'uektu': 96, 'ukafp': 64, 'ukaf1': 120, 'usdk1': 80, 'uektm1': 120, 'ukafp1': 64, 'ukaf2': 120, 'usdk2': 80, 'uektm2': 120, 'ukafp2': 64, 'ukaf3': 120, 'usdk3': 88, 'uektm3': 96, 'ukafp3': 64, 'upol': 96, 'unep': 120, 'uneps': 96, 'utrnep': 96, 'utrneps': 96, 'uektu1': 96, 'uvel': 64, 'uvels': 64, 'uvelss': 64, 'uip': 64, 'usdp': 64, 'usdps': 64, 'usdpp': 64, 'usdpps': 64, 'ustep': 64, 'usteps': 64, 'ustant': 64, 'ustant1': 64, 'ustant2': 72, 'ustant3': 72, 'ustant4': 72, 'uprok': 64, 'uev': 64, 'uvhv': 96, 'upo50': 64, 'uspasi': 96, 'ups50': 96, 'ukan': 64, 'ukans': 64, 'up': 64, 'upo': 64, 'upo3': 64, 'upo6': 64, 'upo9': 64, 'upp': 64, 'upp3': 64, 'upp6': 64, 'upp9': 64, 'up1': 64, 'up2': 64, 'up3': 64, 'up1p': 64, 'up2p': 64, 'up3p': 64, 'uektm4': 96, 'up4': 64, 'up5': 64, 'up6': 64, 'up4p': 64, 'up5p': 64, 'up6p': 64, 'uektm5': 96, 'uektu2': 96, 'chest': 96, 'up7': 64, 'up8': 64, 'up9': 64, 'up7p': 64, 'up8p': 64, 'up9p': 64, 'uektm6': 96, 'udost': 96, 'pssth': 96, 'pssthst': 120, 'sth': 64, 'uslavvel': 96, 'uslavvd': 96, 'stc': 64, 'uektp': 96, 'stu': 64, 'blago': 96, 'utrisv': 96, 'utr': 64, 'utrs': 64, 'utrch': 64, 'uekts': 96, 'uend': 96, 'uefrem': 96, 'uotp': 64, 'umnog': 96, 'ustev': 64,
			'hs': 96, 'hps': 96, 'htr': 64, 'htrs': 64, 'ht': 96, 'hb': 96, 'htrc': 64, 'hpar': 64, 'hst': 96, 'htrisv': 96, 'httr': 96, 'httrs': 96, 'hkd': 64, 'he': 96, 'hefr': 96, 'hmol': 96, 'hrash': 96, 'hotp': 64, 'hmnog': 96, 'h1': 64, 'h1m': 96, 'hs1': 96, 'hps1': 96, 'htr1': 64, 'htrs1': 64, 'ht1': 96, 'hb1': 96, 'htrc1': 64, 'hpar1': 64, 'hst1': 96, 'htrisv1': 96, 'httr1': 96, 'hkd1': 64, 'he1': 96, 'hefr1': 96, 'hmol1': 96, 'hrash1': 96, 'hotp1': 64, 'hmnog1': 96, 'h3': 64, 'h3m': 96, 'hs3': 96, 'hps3': 96, 'htr3': 64, 'htrs3': 64, 'ht3': 96, 'hb3': 96, 'htrc3': 64, 'hpar3': 64, 'hst3': 96, 'htrisv3': 96, 'httrs3': 96, 'hkd3': 64, 'he3': 96, 'hefr3': 96, 'hmol3': 96, 'h6': 64, 'h6m': 96, 'hs6': 96, 'hps6': 96, 'htr6': 64, 'htrs6': 64, 'ht6': 96, 'hb6': 96, 'htrc6': 64, 'hpar6': 64, 'hst6': 96, 'htrisv6': 96, 'httrs6': 96, 'hkd6': 64, 'he6': 96, 'hefr6': 96, 'hmol6': 96, 'hrash6': 104, 'hrash61': 104, 'hrash62': 104, 'hmnog6': 96, 'h9': 64, 'h9m': 96, 'hs9': 96, 'hps9': 96, 'htr9': 64, 'htrs9': 64, 'ht9': 96, 'hb9': 96, 'htrc9': 64, 'hpar9': 64, 'hst9': 96, 'htrisv9': 96, 'httrs9': 96, 'hkd9': 64, 'he9': 96, 'hefr9': 96, 'hmol9': 96,
			'l': 64, 'lbeg': 96, 'lekv': 96, 'lant': 96, 'lant1': 96, 'lant2': 96, 'lant3': 96, 'lekm': 96, 'lekm1': 96, 'lekm2': 96, 'les': 96, 'lbl': 64, 'lmvh': 96, 'lvh': 64, 'ltrkd': 64, 'ltrsv': 96, 'ltrsi': 64, 'lpr': 64, 'lap': 64, 'lal': 64, 'lev': 64, 'leks': 96, 'leku': 96, 'leko': 96, 'lekv1': 96, 'lekv2': 96, 'lhp': 96, 'lhei': 96, 'lvvh': 96, 'lekp1': 96, 'lver': 96, 'levk': 96, 'ldos': 96, 'lzdo': 64, 'levk2': 96, 'lekp2': 96, 'lot': 96, 'lpot': 96, 'lpr4': 64, 'lpri': 96, 'lppri': 96, 'lekb': 96, 'lzmol': 96, 'lblag': 96, 'lps33': 96, 'lpotp': 96, 'lotp': 64, 'lmno': 96,
			'i': 66, 'ips': 98, 'ies': 98, 'ibl': 66, 'ipr': 66, 'iap': 66, 'ial': 66, 'iev': 66, 'ikd': 66, 'ipom': 98, 'iver': 98, 'iosl': 98, 'iot': 98, 'ie': 98, 'iefr': 98, 'iktr': 98, 'imol': 98, 'ips33': 98, 'idost': 98, 'ipotp': 98, 'iotp': 98
		};
		$(".wrap_").each(function () {
			var id = $(this).attr('id').slice(1);
			if (wrap[id] && wrap[id] & a) {
				$(this).find('p').hide(); $(this).find('.hide').fadeOut(0);
				$(this).find('.show').fadeIn(0); $(this).first().find('.wr_').removeClass('wh').addClass('ws');
			}
			else {
				$(this).find('p').show(); $(this).find('.show').fadeOut(0);
				$(this).find('.hide').fadeIn(0); $(this).first().find('.wr_').removeClass('ws').addClass('wh');
			}
		});
		return false
	}
	$(document).click(function () { hMenu() });
	$("body").on("click", "#calendar a.common", function () {
		jdn = new jDate(year, month, +this.innerHTML, style);
		cal.change(jdn); blur(this); return false
	});
	$("body").on("click", "#calendar a.othermonth", function () {
		jdn = new jDate(+this.getAttribute('year'), +this.getAttribute('month'), +this.innerHTML, style);
		cal.change(jdn); blur(this); return false
	});
	$("body").on("change", "#month", function () {
		jdn = new jDate(year, +this.value, 1, style);
		if (date > jdn.getldate()) jdn = new jDate(year, +this.value + 1, 0, style); else jdn = new jDate(year, +this.value, date, style);
		cal.change(jdn); blur(this); return false
	});
	$("body").on("change", "#year", function () {
		jdn = new jDate(+this.value, month, date, style);
		cal.change(jdn); blur(this); return false
	});
	$("body").on("change", ".style input", function () {
		style = document.getElementById('newstyle').checked;
		jdn = style ? new jDate(jdn.gymd.y, jdn.gymd.m, jdn.gymd.d, style) : new jDate(jdn.jymd.y, jdn.jymd.m, jdn.jymd.d, style);
		cal.change(jdn, style); blur(this); return false
	});
	$("body").on("click", "#switchday a", function () {//window.scrollTo(0,0);
		switch ($(this).parent().attr('class')) {
			case 'prev': jdn = new jDate(year, month, date - 1, style); break;
			case 'today': today = new Date(); today.setHours(today.getHours() + 8.5); jdn = newJdn(today, style); break;
			case 'next': jdn = new jDate(year, month, date + 1, style); break;
		}
		cal.change(jdn); blur(this); return false
	});
	$("body").on("click", "a.next,a.prev", function () {//window.scrollTo(0,0);
		x = $(this).attr('class') == 'next' ? 1 : -1; jdn = new jDate(year, month, date + x, style);
		cal.change(jdn); blur(this); return false
	});
	$("#lang").on("change", function () {
		lang = $(this).val(); if (save) setCookie('lang', lang);
		$(this).removeClass().addClass($(this).find(":selected").attr('class'));
		//cal.callBu();//webз
		return false
	});
	$("#wr").on("change", function () { wr = $(this).val(); if (save) setCookie('wr', wr); wrall(wr); return false });
	$("#save").change(function () {
		var tmp = { 'save': save, 'lang': lang, 'wr': wr };
		if (this.checked) { save = true; for (var k in tmp) setCookie(k, tmp[k]); } else { save = false; for (var k in tmp) document.cookie = k + '=; max-age=-1;' }
	});
	$("body").on("change", "#sv1,#sv2", function () {
		var zn = $(this).children(':selected').attr('z') || 1, x = $(this).attr('zn') == 1 ? 1 : 2, y = x == 1 ? 2 : 1, sv = $(this).val(), oth1 = '';
		$('#zn' + x).val(zn).attr('title', zn_title[zn]); sColor($(this), zn); sColor($('#sv' + x + ',#zn' + x), zn); if ($('#sv1 :selected').html() == $('#sv2 :selected').html() || (oth1 = $('#sv1 :selected').attr('other')) == $('#sv2 :selected').val() || $('#sv2 :selected').attr('other') == $('#sv1 :selected').val()) { sel('sv2', 0); sel('zn2', 1); sGray($('#sv2,#zn2')); }
		if (oth1 == hv || sv == hv) { $('#zn' + x).val(5); }
		else if (hrid != hram) {
			x = $('#sv1>option[value="' + hv + '"],#sv2>option[value="' + hv + '"],#sv1>option[other="' + hv + '"]');
			if (x.is('[h]')) x.hide().prop('disabled', true); sel('hr', hram); hv = $hr.val();
		}
		if ($pov1.val() == sv) { sel('pov1', 0) } else if ($pov2.val() == sv) { sel('pov2', 0) } m1m2rw(); cal.checkBu();
		//cal.callBu();//webз
		$(this).blur(); return false
	});
	$("body").on("change", "#zn1,#zn2", function () {
		var zn = $(this).val(), sv = $(this).attr('sv');
		if ($('#sv' + sv).val()) {
			$(this).attr('title', zn_title[zn]);
			sColor($('#sv1,#zn1'), $zn1.val()); sColor($('#sv2,#zn2'), $zn2.val()); m1m2rw();
			if (hrid != hram && zn < 5) {
				x = $('#sv1>option[value="' + hv + '"],#sv2>option[value="' + hv + '"]');
				if (x.is('[h]')) x.hide().prop('disabled', true); sel('hr', hram); hv = $hr.val()
			} cal.checkBu();
			//cal.callBu();//webз
			$(this).blur()
		}
		else { sel('zn' + sv, 1) } return false
	});
	$("body").on("change", "#hr", function () {
		x = $('#sv1>option[value="' + hv + '"],#sv2>option[value="' + hv + '"]'); if (x.is('[h]')) x.hide().prop('disabled', true);
		hv = $(this).val(), hrid = document.getElementById('hr').selectedIndex;
		if (hrid < 8) hram = hrid;
		if (hrid > 7) {
			if ($hr.find('option:selected').is('[hr2]')) {
				var hr2 = $hr.find('option:selected').attr('hr2');
				if ($sv1.find('option').is('[value="' + hr2 + '"]')) {
					$sv1.find('option[value="' + hr2 + '"]').prop('selected', true);
					$sv2.find('option[value="' + hv + '"]').prop('selected', true);
				}
				else {
					$sv1.find('option[value="' + hv + '"]').prop('selected', true);
					$sv2.find('option[value="' + hr2 + '"]').prop('selected', true);
				}
				sColor($('#sv1,#sv2'), 5); sColor($('#zn1'), 5, 5); sColor($('#zn2'), 5, 5); m1m2rw();
			}
			else if ($('#sv1>option').is('[value="' + hv + '"]')) {
				$('#sv1>option[value="' + hv + '"]').show().removeAttr('disabled').prop('selected', true);
				m1m2rw(); var z1 = m1 && m1.zlim ? m1.zlim[1] : 5; sel('sv2', 0); sel('zn2', 1); sGray($('#sv2,#zn2'));
				sColor($('#sv1,#zn1'), z1); $('#zn1').val(z1); $('#sv1>option[other="' + hv + '"]').show();
			}
			else if ($('#sv2>option').is('[value="' + hv + '"]')) {
				$('#sv2>option[value="' + hv + '"]').show().removeAttr('disabled').prop('selected', true);
				m1m2rw(); var z2 = m2 && m2.zlim ? m2.zlim[1] : 5; sColor($('#sv2,#zn2'), z2); $('#zn2').val(z2);
			}
			var $p1t = $('#pov1 :selected'), $p2t = $('#pov2 :selected'), $sv1t = $('#sv1 :selected'), $sv2t = $('#sv2 :selected');
			if ($p1t.val() == $sv1t.val() || $p1t.attr('other') == $sv1t.val()
				|| $p1t.val() == $sv2t.val() || $p1t.attr('other') == $sv2t.val()) { sel('pov1', 0) }
			if ($p2t.val() == $sv1t.val() || $p2t.attr('other') == $sv1t.val()
				|| $p2t.val() == $sv2t.val() || $p2t.attr('other') == $sv2t.val()) { sel('pov2', 0) }
			m1m2rw();
		} cal.checkBu();
		//cal.callBu();//webз
		$(this).blur(); return false
	});
	$("body").on("change", "#pov1,#pov2", function () {
		var $p1t = $('#pov1 :selected'), $p2t = $('#pov2 :selected'), $sv1t = $('#sv1 :selected'), $sv2t = $('#sv2 :selected');
		if ($p1t.val() == $sv1t.val() || $p1t.attr('other') == $sv1t.val()) { sel('pov1', 0) }
		else if ($p2t.val() == $sv1t.val() || $p2t.attr('other') == $sv1t.val()
			|| $p2t.val() && $p2t.val() == $p1t.val() || $p2t.attr('other') == $p1t.val()) { sel('pov2', 0) }
		else {
			if (($p1t.val() == $sv2t.val() || $p1t.attr('other') == $sv2t.val() || $p2t.val() == $sv2t.val()
				|| $p2t.attr('other') == $sv2t.val()) && $sv2.find('option[value=""]')) { sel('sv2', 0); sel('zn2', 1); sGray($('#sv2,#zn2')) }
			m1m2rw(); cal.checkBu();
			//cal.callBu();//webз
		} $(this).blur(); return false
	});
	// $("html,body").on("click",".kan",function(){hMenu();$('.kan_pesn,.kan_text,.kan').toggle();return false});
	$('html,body').on('click', '.pesn a', function () { hMenu(); if (!$(this).hasClass('active')) { var p = $(this).parent(), x = '.' + this.hash.slice(1); p.siblings('.kan').hide(); p.siblings(x).show(); p.children('a').removeClass('active'); $(this).addClass('active'); } return false; });
	$("body").on("click", "#show", function () {
		hMenu(); cal.callBu(); blur(this); $(this).prop('disabled', true);
		setTimeout(function () { $(this).prop('disabled', false) }.bind(this), 3000); return false
	});
	$("html,body").on("click", "#menu,#menu-but", function (e) {
		e.stopPropagation();
		if ($('#menu').is(":visible")) { $('#menu').hide() } else { $('#menu').show(); } return false
	})
		.on("click", "#menu > *", function (e) { e.stopPropagation(); });
	$('.plus-button').click(function () {
		if (fsize < fmax) {
			fsize++;
			tags.toggleClass((fprev > 1 ? 'f' + fprev + ' ' : '') + 'f' + fsize); fprev = fsize;
			$('.font-size-value').html(fsize); if (save) setCookie('fsize', fsize);
		} return false
	});
	$('.minus-button').click(function () {
		if (fsize > fmin) {
			fsize--; tags.toggleClass((fprev > 1 ? 'f' + fprev + ' ' : '') + 'f' + fsize); fprev = fsize;
			$('.font-size-value').html(fsize); if (save) setCookie('fsize', fsize);
		}
		else { tags.removeClass('f2'); fsize = fprev = 1; $('.font-size-value').html(fsize); if (save) setCookie('fsize', fsize); } return false
	});
	$('#bg li').click(function () {
		$('#bg .cur').removeClass('cur'); $('body,#menu').removeClass(bg);
		bg = $(this).attr('class'); $(this).addClass('cur'); $('body,#menu').addClass(bg); if (save) setCookie('bg', bg); return false;
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > 400) { $('#scrollup').fadeIn(); }
		else { $('#scrollup').fadeOut(); } return false
	});
	$("html,body").on("click", "#scrollup", function () {
		hMenu(); var top = $('#text').offset().top;
		$('html,body').animate({ scrollTop: top }, 200); return false
	});
	$("html,body").on("click", "a.hide", function (e) {
		hMenu(); var x = e.target.hash;
		$(x).find('p').hide(); $(x).find('.hide').fadeOut(0); $(x).find('.show').fadeIn(0);
		$(x).first().find('.wr_').removeClass('wh').addClass('ws'); return false
	});
	$("html,body").on("click", "a.show", function (e) {
		hMenu(); var x = e.target.hash;
		$(x).find('p').show(); $(x).find('.show').fadeOut(0); $(x).find('.hide').fadeIn(0);
		$(x).first().find('.wr_').removeClass('ws').addClass('wh'); return false
	});
});
function Calendar(st) {
	this.st = st,
		this.fillDate = function (j) {
			day = +j.day, date = +j.ymd.d, month = +j.ymd.m, year = +j.ymd.y, jd = +j.jymd.d, jm = +j.jymd.m, jy = +j.jymd.y,
				jpp = j.jpp, jnp = j.jnp, dbp = j.dbp, dap = j.dap, glas = j.glas;
		},
		this.change = function (j, st) {
			hMenu(); var chall = false;
			if (st !== undefined) { if (this.st != st) chall = true; this.st = st; men = new Menology(j); men.mrk(); }
			if (year != j.ymd.y) { this.changeYear(j); men = new Menology(j); men.mrk(); chall = true; }
			if (month != j.ymd.m) { this.changeMonth(j.ymd.m); chall = true; }
			this.fillDate(j); this.changeDate(j, chall);
		},
		this.changeYear = function (j) {
			var t = '', y = j.ymd.y, i = y - (y > 10 ? 10 : 0), k = y + 11;
			for (; i < k; i++) { t += '<option value="' + i + '"' + (i == y ? ' class="bold" selected="selected"' : '') + '>' + i + ' - ' + j.key(i) + '' + '</option>'; } $('#year').html(t)
		},
		this.changeMonth = function (m) {
			var t = '', i = 1,
				mn = [, 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
			for (; i < 13; i++) { t += '<option value="' + i + '"' + (i == m ? ' selected="selected"' : '') + '>' + mn[i] + '</option>'; } $('#month').html(t)
		},
		this.changeDate = function (j, chall) {
			m1 = m2 = mf = pov1 = pov2 = null, min = [null, null, null];
			var fd = j.getfday(), ld = j.getldate(), pd = new jDate(year, month, 2 - fd, this.st), sv0 = [null, true, true], t = '', arr,
				rdsv = [[], [], [], []], t_title, s_great, spec, glas_off = dbp < 9 || dap < 9 || dap == 40 || dap == 50 ? false : true,
				sign = ['', '', '(:. ', '((:. ', '+ ', '(+ ', '(+) ', '(+) ', ''], dayNS = [, 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
				dayN = [, 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
				t_info = '<p class="date_j">' + dayN[day] + ', ' + j.jymd.d + ' ' + months[j.jymd.m] + ' ' + j.jymd.y + ' г. по стар. ст.<br><span class="date_g">(' + j.gymd.d + ' ' + months[j.gymd.m] + ' ' + (j.jymd.y != j.gymd.y ? j.gymd.y + ' г.' : '') + ' по нов. ст.)</span></p>',
				info = ['', '', '', '', '', '', '', '', ''], sv_t = '<option class="norm gray" value="" selected="selected">-</option>',
				pov_t = '<option value="">-</option>';
			sGray($('#sv1,#sv2')); $('#sv1,#sv2').html(sv_t); $('#hr optgroup:last ~ option').remove();
			$('#pov1,#pov2').html(pov_t); $('#zn1,#zn2').each(function () {
				$(this).val(1).children('option:lt(6)').prop('disabled', false); $(this).children('option:last').prop('disabled', true);
			});
			if (j.week) info[0] = (day < 2 ? 'Неделя' : dayN[day]) + (dbp > 70 ? ' ' + j.week + '‑' + (day < 2 ? 'я по ' : 'й седмицы по ') + (dap < 51 ? 'Пасхе' : 'Пятидесятнице') : '');
			function fill(jd, arr, triod) {
				var zn, l, sv, hpov, weekday = '';
				for (var key in arr) {
					if (key == 'hpov') hpov = true;
					else if (key != 'z') {
						x = arr[key], zn = x.z === 0 || x.z ? x.z : 1, l = x.l || 0, sv = x.sv || key; if (jd.week) weekday = jd.dap < 51
							? (jd.day == 1 ? 'Неделя ' + jd.week + '-я' : dayN[jd.day] + ' ' + jd.week + '-й седмицы') + ' по Пасхе'
							: (jd.day == 1 ? 'Неделя ' + jd.week + '-я' : dayN[jd.day] + ' ' + jd.week + '-й седмицы') + ' по Пятидесятнице';
						if (triod && key != 'note') { t_title += (t_title ? checkdot(t_title) + ' ' : weekday + (weekday && !x.h ? ', ' : '')) + (!x.h ? sign[zn] + (x.vt || sv || key).replace(/<[^>]+>/g, '') + (x.n || x.nc ? ' (' + (x.nc || '') + (x.n && x.nc ? '; ' : '') + (x.n || '') + ')' : '') : ''); if (zn > 5) s_great = true }
						else if ((zn > 3 || triod) && !x.other && !x.pov && !x.h && key != 'note') { t_title += (t_title ? checkdot(t_title) + ' ' : '') + sign[zn] + key + (x.n || x.nc ? ' (' + (x.nc || '') + (x.n && x.nc ? '; ' : '') + (x.n || '') + ')' : ''); if (zn > 5) s_great = true }
						if (jd.ymd.m == month && jd.ymd.d == date && !(triod && x.h)) {
							if (key == 'note') info[8] += (info[8] ? space : '') + arr.note;
							if (x.pov && !x.other && (x.pov > 1)) { if (x.dsv) info[6] += (info[6] ? space : '') + (zn > 1 ? '<span class="' + color[zn] + '">' : '') + sign[zn] + sv + (zn > 1 ? '</span>' : '') + (x.n || x.nc ? ' <span class="n">(' + (x.nc || '') + (x.n && x.nc ? '; ' : '') + (x.n || '') + ').</span>' : checkdot(sv)); }
							else if ((!x.other || x.l) && key != 'note' && !(x.hram && !x.dsv && x.z < 4)) {
								info[7] = spec.t ? spec.t + checkdot(spec.t) : '';
								info[l] += (info[l] ? (l == 0 ? (x.rsv || !x.dsv ? ', ' : checkdot(info[l]) + ' ') : space) : '') + (zn > 1 ? '<span class="' + color[zn] + '">' : '') + sign[zn] + sv + (zn > 1 ? '</span>' : '') + (x.n || x.nc ? ' <span class="n">(' + (x.nc || '') + (x.n && x.nc ? '; ' : '') + (x.n || '') + ')</span>' : '') + (l == 0 ? '' : checkdot(sv)); info[8] += x.note || ''
							}
							if (triod && key != 's') { if (x.dbp) dbp = x.dbp; else if (x.dap) dap = x.dap }
							else if (key != 'note') { if (x.rsv) { rdsv[0].push([x, key, zn]) } else { rdsv[x.dsv || x.f ? 1 : 2].push([x, key, zn]) } }
						}
					}
				}
				if (jd.ymd.m == month && jd.ymd.d == date && !triod) { fillSv(rdsv, hpov) }
			}
			function fillSv(rdsv, hpov) {
				var q1 = 0, q2 = 0, q3 = 0;
				for (var i = 0; i < rdsv[0].length; i++) {
					var arr = rdsv[0][i][0], key = rdsv[0][i][1], zn = rdsv[0][i][2], xdb = arr.dbp ? ' dbp="' + arr.dbp + '"' : '', xda = arr.dap ? ' dap="' + arr.dap + '"' : '';
					if (!arr.other) {
						if (q1++ < 2) {
							q2++; var a = '#sv' + q1, b = '#zn' + q1;
							if (sv0[q1]) { $(a).children().eq(0).remove(); sv0[q1] = null }
							sColor($(a), zn); $(a).append('<option value="' + key + '" z="' + zn + '" r="' + arr.r + '"'
								+ (arr.other ? ' other="' + arr.other + '"' : '') + xdb + xda + ' class="' + color[zn] + '" selected="selected">'
								+ sign[zn] + (xdb || xda ? arr.vt : key) + '</option>');
							$(b).val(zn).attr('title', zn_title[zn]); sColor($(b), zn); min[q1] = arr; min[q1].v = min[q1].v || key;
							if (z1 = min[q1].zlim) { if (!z1[1]) z1[1] = z1[0] > 5 ? 6 : 5; $(b + '>option').prop('disabled', true).slice(z1[0], z1[1] + 1).removeAttr('disabled') }
						}
					}
					else {
						$('#sv' + (q1 > 0 ? q1 : 1)).append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + 'other="' + arr.other + '"'
							+ xdb + xda + 'class="' + color[zn] + '">' + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>');
					}
					if (!arr.nohr && !arr.other) $('#hr').append('<option value="' + (arr.hr ? arr.hr : key) + '"z="' + zn + '"r="' + arr.r + '"'
						+ (arr.hr2 ? 'hr2="' + arr.hr2 + '"' : '') + '>' + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (arr.hr ? arr.hr : (xdb || xda ? arr.vt : key)) + '</option>')
				}
				for (var i = 0; i < rdsv[1].length; i++) {
					var arr = rdsv[1][i][0], key = rdsv[1][i][1], zn = rdsv[1][i][2], xdb = arr.dbp ? ' dbp="' + arr.dbp + '"' : '', xda = arr.dap ? ' dap="' + arr.dap + '"' : '';
					if (arr.f && !arr.h) { mf = arr; mf.v = mf.v || key; }
					else if (arr.pov) {
						q3++;
						$('#pov1').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '')
							+ xdb + xda + (arr.dsv && q3 == 1 ? 'selected="selected">' : '>') + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (xdb || xda ? arr.vt : key) + '</option>');
						$('#pov2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '')
							+ xdb + xda + (arr.dsv && q3 == 2 ? 'selected="selected">' : '>') + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (xdb || xda ? arr.vt : key) + '</option>');
						if (q3 == 1) { pov1 = arr; pov1.v = pov1.v || key; } if (q3 == 2) { pov2 = arr; pov2.v = pov2.v || key; }
						if (arr.pov < 2) {
							if (q1 < 1) {
								$('#sv1').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"'
									+ (arr.other ? 'other="' + arr.other + '"' : '') + xdb + xda + (arr.h ? 'h="h"style="display:none"' : '') + 'class="' + color[zn] + '">' + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>');
							}
							$('#sv2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"'
								+ (arr.other ? 'other="' + arr.other + '"' : '') + xdb + xda + (arr.h ? 'h="h"style="display:none"' : '') + 'class="' + color[zn] + '">' + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>');
						}
					}
					else if (q1 < 2) {
						q2++; var b = '#zn' + q2; if (sv0[1]/* &&!arr.vsv */) { if (!mf || mf.z < 3) $('#sv1').children().eq(0).remove(); sv0[1] = null }
						if (q2 < 3) { sColor($('#sv' + q2), zn); sColor($(b), zn, zn); $(b).attr('title', zn_title[zn]) }
						if (q1 < 1) $('#sv1').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"'
							+ (arr.other ? 'other="' + arr.other + '"' : '') + xdb + xda + 'class="' + color[zn] + (q2 == 1 ? '"selected="selected"' : '"') + (arr.h ? 'h="h"style="display:none">' : '>') + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>');
						$('#sv2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '')
							+ xdb + xda + 'class="' + color[zn] + (q2 == 2 ? '"selected="selected"' : '"') + (arr.h ? 'h="h"style="display:none">' : '>') + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>'); min[q2] = arr; min[q2].v = min[q2].v || key;
						if (z2 = min[q2].zlim) {
							if (!z2[1]) z2[1] = 5;
							$(b + '>option').prop('disabled', true).slice(z2[0], z2[1] + 1).removeAttr('disabled');
						}
						if (!arr.hpov && !arr.h && !hpov && !arr.zlim) $('#pov1,#pov2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? ' other="' + arr.other + '"' : '') + ' class="' + color[zn] + '">' + sign[zn] + key + '</option>');
					}
					if (!arr.nohr && !arr.other && (!arr.pov || arr.pov < 2 || arr.hram)) $('#hr').append('<option value="' + (arr.hr ? arr.hr : key)
						+ '"z="' + zn + '"r="' + arr.r + '"' + (arr.hr2 ? 'hr2="' + arr.hr2 + '"' : '') + '>' + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '')
						+ (arr.hr ? arr.hr : (xdb || xda ? arr.vt : key)) + '</option>')
				}
				for (var i = 0; i < rdsv[2].length; i++) {
					var arr = rdsv[2][i][0], key = rdsv[2][i][1], zn = rdsv[2][i][2], xdb = arr.dbp ? ' dbp="' + arr.dbp + '"' : '', xda = arr.dap ? ' dap="' + arr.dap + '"' : '';
					if (arr.pov == 2) { $('#pov1,#pov2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '') + xdb + xda + '>' + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (xdb || xda ? arr.vt : key) + '</option>') }
					else {
						if (q1 < 2) {
							if (q1 < 1) {
								$('#sv1').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"'
									+ (arr.other ? 'other="' + arr.other + '"' : '') + xdb + xda + 'class="' + color[zn] + '"' + (arr.h ? 'h="h" style="display:none" disabled="disabled">' : '>') + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>')
							}
							$('#sv2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '')
								+ xdb + xda + 'class="' + color[zn] + '"' + (arr.h ? 'h="h" style="display:none" disabled="disabled">' : '>') + sign[zn] + (xdb || xda ? arr.vt : key) + '</option>')
						}
						if (!arr.hpov && !arr.h && !hpov && !arr.zlim) $('#pov1,#pov2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"'
							+ (arr.other ? 'other="' + arr.other + '"' : '') + xdb + xda + '>' + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (xdb || xda ? arr.vt : key) + '</option>')
					}
					if (!arr.nohr && !arr.other) $('#hr').append('<option value="' + (arr.hr ? arr.hr : key) + '"z="' + zn + '"r="' + arr.r + '"'
						+ (arr.hr2 ? 'hr2="' + arr.hr2 + '"' : '') + '>' + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (arr.hr ? arr.hr : (xdb || xda ? arr.vt : key)) + '</option>');
				}
				for (var i = 0; i < rdsv[3].length; i++) {
					var arr = rdsv[3][i][0], key = rdsv[3][i][1], zn = rdsv[3][i][2], xdb = arr.dbp ? ' dbp="' + arr.dbp + '"' : '', xda = arr.dap ? ' dap="' + arr.dap + '"' : ''; if (arr.dsv) q3++;
					$('#pov1').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '')
						+ xdb + xda + (arr.dsv && q3 == 1 ? 'selected="selected">' : '>') + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (xdb || xda ? arr.vt : key) + '</option>');
					$('#pov2').append('<option value="' + key + '"z="' + zn + '"r="' + arr.r + '"' + (arr.other ? 'other="' + arr.other + '"' : '')
						+ xdb + xda + (arr.dsv && q3 == 2 ? 'selected="selected">' : '>') + (arr.d && arr.nc ? '(' + arr.nc + ') ' : '') + (xdb || xda ? arr.vt : key) + '</option>');
					if (arr.dsv) { if (q3 == 1) { pov1 = arr; pov1.v = pov1.v || key; } if (q3 == 2) { pov2 = arr; pov2.v = pov2.v || key } }
				}
			}
			if (chall) {
				t = '<table><thead><tr>';
				for (var i = 1; i < 8; i++) { t += '<th><span ' + (i == 1 ? 'class="sunday"' : '') + 'title="' + dayN[i] + '">' + dayNS[i] + '</span></th>'; }
				t += '</tr></thead><tbody>'; nRows = Math.ceil((ld + fd) / 7);
				for (var i = 0; i < nRows; i++) {
					t += '<tr>';
					for (var k = 0; k < 7; k++) {
						s_great = false, spec = men.check(pd), t_title = '';
						if (arr = men[pd.dbp < pd.dap ? 'dbp' + pd.dbp : 'dap' + pd.dap]) fill(pd, arr, true);
						if (arr = men['m' + pd.jymd.m + 'd' + pd.jymd.d]) fill(pd, arr);
						t += '<td><a' + (pd.ymd.m != month ? '' : ' id="cur' + pd.ymd.d + '"') + ' class="' + (pd.ymd.m != month ? 'othermonth' : pd.ymd.d == date ? 'chosen' : 'common') + (pd.day == 1 ? ' sunday' : '') + (s_great ? ' great' : '') + (spec.s ? ' ' + spec.s : '') + '"' + (pd.ymd.m != month ? ' month="' + pd.ymd.m + '" year="' + pd.ymd.y + '"' : '') + (t_title || spec.t ? ' title="' + t_title + (t_title && spec.t ? checkdot(t_title) + ' ' : '') + spec.t + '"' : '') + ' href="#">' + pd.ymd.d + '</a></td>'; pd = new jDate(pd.ymd.y, pd.ymd.m, pd.ymd.d + 1, this.st)
					} t += '</tr>'
				}
				t += '</tbody></table>'; $('div.calendar-body').html(t);
			}
			else {
				spec = men.check(j); $('#calendar a.chosen').removeClass('chosen').addClass('common');
				$('#cur' + date).removeClass('common').addClass('chosen');
				if (arr = men[j.dbp < j.dap ? 'dbp' + j.dbp : 'dap' + j.dap]) fill(j, arr, true);
				if (arr = men['m' + j.jymd.m + 'd' + j.jymd.d]) fill(j, arr)
			}
			for (var i = 0; i < info.length; i++) {
				t_info += info[i] ? '<p class="svv' + (!i ? ' info0' : '') + (i < 3 ? ' info1' : '') + (i == 8 ? ' em' : '') + '">'
					+ (i == 8 ? '<strong>Примечание:</strong> ' : (i == 6 ? '<strong>На повечерiи:</strong> ' : '')) + info[i] + (!i ? checkdot(info[i]) + (glas && glas_off ? ' Глас ' + glas + '‑й.' : '') : '') + '</p>' : ''
			}
			$('#info').html(t_info); hv = $('#hr').val(); m1 = min[1] ? min[1] : null; m2 = min[2] ? min[2] : null; this.checkBu();
		}
	this.checkBu = function () {
		var x = 1, y = 2, zt = 0;
		if ((dbp < 71 || dap < 58) && men[mt = dbp < dap ? 'dbp' + dbp : 'dap' + dap]) {
			mt = men[mt] ? men[mt] : mt; if (mt.z) zt = mt.z; else if (mt.f && mt.f.z) zt = mt.f.z
		} else mt = null;
		// $('#text').html(news); 
		$('#sv1,#sv2,#zn1,#zn2').removeClass().removeAttr('disabled');
		if (m1) $('#sv1,#zn1').addClass(color[m1.z]); if (m2) $('#sv2,#zn2').addClass(color[m2.z]);
		function rang(r) { switch (r) { case 'prGd': r = 7; break; case 'B': case 'prB': r = 6; break; case 'Krst': r = 5; break; case 'ott': r = 4; break; case 'svv': r = 4; break; case 'angl': r = 3; break; case 'Ioan': r = 2; break; case 'IoakAn': r = 1.5; break; default: r = 1 }return r }
		var r1 = m1 && m1.r ? rang(m1.r) : 0; var r2 = m2 && m2.r ? rang(m2.r) : 0;
		if (!m1 && m2) { m1 = m2; r1 = r2; r2 = 0; m2 = null; x = 2; y = 1; } else if (m1 && m2 && (r2 > r1 || r1 == r2 && m2.z > m1.z || m2.sv2 && m1.r != 'ott')) {
			var tmp = m1; m1 = m2; m2 = tmp; tmp = r1; r1 = r2; r2 = tmp; x = 2; y = 1
		}
		if (m1 && r1 == 6 && m1.z == 1) m1.z = 4; if (m2 && r2 == 6 && m2.z == 1) m2.z = 4;
		if (m1 && m1.sv2 && !(m2 && m2.r == 'ott')) { m2 = null; sGray($('#sv' + y + ',#zn' + y), true) }
		else if (m2 && m2.sv2 && !(m1 && m1.r == 'ott')) { m1 = null; sGray($('#sv' + x + ',#zn' + x), true) }
		if (day == 1) {
			if (dbp < 71) {
				if (m1 && !m1.dbp && (m1.z < 4 && (zt > 3 || !m1.otd) || mf && m1.z < 4 && !m1.otd || zt > 6 && hv != m1.v && hv != m1.other)) {
					m1 = null; sGray($('#sv' + x + ',#zn' + x))
				}
				if (m2 && ((!m2.dbp || m1 && m1.z > 3) && (m2.z < 4 && (zt > 3 || !m2.otd) || mf || zt > 5) || zt > 2 && m2.z <= zt)) {
					m2 = null; sGray($('#sv' + y + ',#zn' + y))
				}
			}
			else if (dap < 58) {
				if (zt > 4) { m2 = null; sGray($('#sv2,#zn2'), true); if (zt > 7) { m1 = null; sGray($('#sv1,#zn1'), true) } }
				if (m1 && !m1.dap && (m1.z < 4 || zt > 6 && hv != m1.v && hv != m1.other)) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
				if (m2 && m1 && (m1.dap || m1.z >= m2.z) && zt >= m2.z) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
			}
			if (mf) {
				if (mf.z > 6) { m1 = m2 = null; sGray($('#sv' + x + ',#zn' + x + ',#sv' + y + ',#zn' + y), true) }
				else if (mf.z == 3 && !mf.bu) {
					m2 = null; sGray($('#sv' + y + ',#zn' + y), true);
					if (m1 && m1.r != 'ott' && m1.z < 4 && !m1.otd) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
				}
				else if (m1 &&/* m1.r!='ott' */r1 < 4 && m2 && r2 < 4/* m2.r!='ott' */) { m2 = null; sGray($('#sv' + y + ',#zn' + y), true) }
				else if (m1 && r1 > 3/* m1.r=='ott' */ && m2 && m2.z < 4) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
				else if (m2 && r2 > 3/* m2.r=='ott' */ && m1 && m1.z < 4) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
			}
			else if (m1 && (m1.r == 'ott' || m1.r == 'svv') && (!m2 || m2 && m2.z < 4 && !m2.ott)) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
		}
		else {
			if (dbp < 71 || dap < 58) {
				if (zt) {
					if (zt > 7) { if (mf && mf.z < 7) mf = null; m1 = m2 = null; sGray($('#sv' + x + ',#zn' + x + ',#sv' + y + ',#zn' + y), true) }
					else if (zt > 6) {
						if (dap < 58) { if (m1.z < 4) { m1 = null; sGray($('#sv1,#zn1')) } m2 = null; sGray($('#sv2,#zn2'), true); }
						else {
							mf = null;
							if (m1) {
								if (m1.zlim || r1 == 6) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
								else { m1.z = 1; sel('zn' + x, 1); sColor($('#sv' + x + ',#zn' + x), 1) }
							}
							if (m2) {
								if (m2.zlim || r2 == 6) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
								else { m2.z = 1; sel('zn' + y, 1); sColor($('#sv' + y + ',#zn' + y), 1) }
							}
						}
					}
					else if (zt > 5) {
						if (mf && mf.z < 7) mf = null; m2 = null; sGray($('#sv' + y + ',#zn' + y), true);
						if (m1 && m1.v != hv && hv != m1.other) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
					}
					else if (zt > 4) {
						m2 = null; sGray($('#sv' + y + ',#zn' + y), true);
						if (m1) {
							if (m1.z > 3 && m1.v != hv && hv != m1.other) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
							else if (m1.z < 4) { m1.z = 1; sel('zn' + x, 1); sColor($('#sv' + x + ',#zn' + x), 1) }
						}
					}
					else if (zt > 3) {
						if (mf && (mf.z < 3 || dbp < 9 && mf.z < 7)) mf = null; m2 = null; sGray($('#sv' + y + ',#zn' + y), true);
						if (m1 && m1.v != hv && hv != m1.other) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
					}
					else if (zt > 2) {
						if (m1 && !m1.dap && m1.z < 4) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) }
						if (m1 && !m1.dap || m2 && m2.z < 4) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
					}
				}
				else {
					if (dbp < 56) {
						if (dbp > 50) if (m2 && m2.z < 4) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
						else if (m1 && m2 && m1.z > 3) { m2 = null; sGray($('#sv' + y + ',#zn' + y)) }
						else if (m1 && m2 && m2.z > 3) { m1 = null; sGray($('#sv' + y + ',#zn' + y)) }
					}
					else if (dap < 58) { if (m1.z < 1) { m1.z = 1; sel('zn' + x, 1); sColor($('#sv' + x + ',#zn' + x), 1) } }
				}
			}
			if (mf) {
				if (mf.z > 6) { m1 = m2 = null; sGray($('#sv' + x + ',#zn' + x + ',#sv' + y + ',#zn' + y), true) }
				else if (mf.z > 3) { if (m1 && m1.z > 3) { m2 = null; sGray($('#sv' + y + ',#zn' + y), true) } }
				else if (mf.z == 3 && !mf.bu) {
					if (m1) { if (m1.z > 3) { m2 = null; sGray($('#sv' + y + ',#zn' + y), true) } else if (!m1.otd) { m1 = null; sGray($('#sv' + x + ',#zn' + x)) } }
					if (m2 && !m2.otd) { m2 = null; sGray($('#sv' + y + ',#zn' + y)); }
				}
			}
		}
		if (!m1 && m2) { m1 = m2; m2 = null; }
		// this.callBu();//webз
	}
	this.callBu = function () {
		var xhr = new XMLHttpRequest(), formData = new FormData();
		formData.append('m', JSON.stringify({ 'glas': glas, 'day': day, 'jpp': jpp, 'jnp': jnp, 'dbp': dbp, 'dap': dap, 'date': jd, 'month': jm, 'year': jy, 'mf': mf, 'm1': m1, 'm2': m2, 'mt': mt, 'hram': hv, 'pov1': pov1, 'pov2': pov2, 'lang': lang, 'wr': +wr }));
		$('#text').html('<p class="title red bold">Подождите, пока загрузятся богослужебные указания и текст службы.</p>');
		xhr.open('POST', 'https://webtypikon.ru/bu.php', true);
		xhr.send(formData); 
		xhr.onload = function () {
			if (xhr.status != 200) { alert(xhr.status + ': ' + xhr.statusText) } else { $('#text').html(xhr.response); }
		}
	}
}
//alert(JSON.stringify(x));