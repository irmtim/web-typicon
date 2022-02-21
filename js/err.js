$(document).keyup(function(e){
	if((e.keyCode==10||e.keyCode===13)&&(e.ctrlKey||e.metaKey)){var txt='',txt2='';
	if(window.getSelection){
		if(window.getSelection().toString().length){
			txt=window.getSelection().getRangeAt(0);
			if(txt2=prompt('Комментарий:')){var errnow=new Date();
				txt='<td>'+jd+'-'+jm+'-'+jy+'</td><td>'+(mf?mf.z+mf.v:'')+(m1?(mf?' | ':'')+m1.z+m1.v:'')+(m2?' | '+m2.z+m2.v:'')+(pov1?' | '+pov1.v:'')+(pov2?' | '+pov2.v:'')+'</td><td>'+txt+'</td><td>'+txt2+'</td>';
				if(txt.length<300){var xhr2=new XMLHttpRequest(),formData=new FormData();
						formData.append('txt',txt);formData.append('date',errnow.getTimezoneOffset());
						xhr2.open('POST','ed.php');xhr2.send(formData);xhr2.onload=function(){
					if(xhr2.status!=200){alert('Ошибка')}else{alert(xhr2.response);}}}
				else{alert('Слишком длинный текст! Поменьше бы...');}}
			else{alert('Коммент еще надо. Хотя бы один символ...');}}}}});
