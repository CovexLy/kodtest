const address = "http://localhost:8080";
var xhr_list = new XMLHttpRequest();
var xhr_del = new XMLHttpRequest();
var xhr_upd = new XMLHttpRequest();
var editID = 0;

xhr_list.addEventListener("load", function(event) {
	var obj = JSON.parse(this.response);
	const page = document.querySelector('#list');
	if(obj.length < 1){
		ons.notification.toast('The card list is currently empty.', {timeout: 2000});
		return;
	}
	
	var first = true;
	var u_list = document.createElement("ul");
	u_list.classList += 'list list--material cardWrapper';
	for(const it in obj) {
		var item = obj[it];
		u_list.appendChild(newCard(item['id'], item['name'], item['surName'], item['telephone'], item['email'], item['image'], first));
		first = false;
	}
	page.children[1].innerHTML = '';
	page.children[1].appendChild(u_list);
	console.log("load complete");
});

xhr_del.addEventListener("load", function(event) {
	xhr_list.dispatchEvent(new Event("load"));
});

document.addEventListener('init', function(event) {
	if(event.target.matches('#list')) {
		xhr_list.open("GET", address + "/cards");
		xhr_list.send();
	}
}, false);

var _first = true;
const swap = (page) => {
	const nav = document.querySelector('#navigator');
	if(_first) {
		nav.pushPage(page);
		_first = false;
	}
	else if(nav.topPage.id+".html" != page) {
		nav.replacePage(page);
	}
	else {
		nav.popPage();
		_first = true;
	}
}

const submit = () => {
	var form = [document.querySelector('#f_name'),
				document.querySelector('#f_surName'),
				document.querySelector('#f_tel'),
				document.querySelector('#f_email'),
				document.querySelector('#f_image')];
	for(const f in form){
		if(form[f].value.length < 1){
			ons.notification.toast("Please fill out every field", {timeout:2000});
			return;
		}
	}
	//post(address + "/cards", {name: form[0].value, surName: form[1].value, telephone: form[2].value, email: form[3].value, image:form[4].value});
	xhr_upd.open("POST", address + "/cards");
	xhr_upd.setRequestHeader('Accept','application/json', 'Content-Type','application/json')
	xhr_upd.send(JSON.stringify({name: form[0].value, surName: form[1].value, telephone: form[2].value, email: form[3].value, image:form[4].value}));
}

/* https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
 */
function post(path, params, method='POST') {
	const form = document.createElement('form');
	form.method = method;
	form.action = path;
	
	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			const hiddenField = document.createElement('input');
			hiddenField.type = 'hidden';
			hiddenField.name = key;
			hiddenField.value = params[key];
			
			form.appendChild(hiddenField);
		}
	}

	document.body.appendChild(form);
	form.submit();
}

const handleEdits = (event) => {
	var target = event.target.id.split("_");
	var type = target.shift();
	var id = target.pop();
	if(type == 'del'){
		xhr_del.open("DELETE", address + "/cards/" + id);
		xhr_del.send();
	}
	else if(type =='edit'){
		editID = id;
		swap('edit.html');
	}
}

const newCard = (id, name, surName, telephone, email, image, gap) => {
	var l_item = document.createElement("li");
	l_item.classList += 'list-item list-item--material';
	l_item.id = 'card_' + id;
	
	var div_img = document.createElement("div");
	div_img.classList += 'list-item__left list-item--material__left';
	
	var img = document.createElement("img");
	img.classList += 'list-item__thumbnail list-item--material__thumbnail';
	img.src = 'https://placekitten.com/g/42/41';
	
	var info = document.createElement("div");
	info.classList += 'list-item__center list-item--material__center';
	
	var args = [name+" "+surName, "Tel: " + telephone, "E-mail: " + email]
	for(const i in args) {
		var element = document.createElement("div");
		element.classList.add((i==0)? 'list-item__title' : 'list-item__subtitle');
		element.classList.add((i==0)? 'list-item--material__title' : 'list-item--material__subtitle');
		element.innerHTML = args[i];
		info.appendChild(element);
	}
	
	var edit = document.createElement("div");
	edit.classList += 'list-item__right list-item--material__right';
	var edit_i = ['zmdi-edit', 'zmdi-delete'];
	for(const i in edit_i) {
		var edit_but = document.createElement("button");
		edit_but.id = ((i==0)? 'edit_' : 'del_') + id;
		edit_but.classList += 'fab fab--mini';
		edit_but.style.marginLeft = "10px";
		edit_but.addEventListener("click", handleEdits);
		
		var e_i = document.createElement("i");
		e_i.classList += 'zmdi ' + edit_i[i];
		e_i.id = ((i==0)? 'edit_i_' : 'del_i_') + id;
		
		edit_but.appendChild(e_i);
		edit.appendChild(edit_but);
	}
	
	div_img.appendChild(img);
	l_item.appendChild(div_img);
	l_item.appendChild(info);
	l_item.appendChild(edit);
	return l_item;
}