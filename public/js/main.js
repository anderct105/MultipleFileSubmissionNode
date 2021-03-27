var id;

$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser);
	$('.editUser').on('click', changeEdit);
});

function changeEdit(e) {
	e.preventDefault()
	var submit = document.querySelector("input[type='submit']")
	id = $(this).data('id')
	submit.style.display = 'none'
	var editar = document.getElementById("editar")
	editar.style.display = 'block'
	editar.onclick = editUser
	url = '/users/' + id
	fetch(url, {
		method: 'GET'
	}).then(r => r.json()).then(result => {
			$("#first_name").attr('value', result[0].first_name)
			$("#last_name").attr('value', result[0].last_name)
			$("#email").attr('value', result[0].email)
		}
	)
}

function editUser() {
	url = '/users/' + id
	fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({"first_name": $("#first_name").val(), "last_name": $("#last_name").val(), "email": $("#email").val()})
	}).then(window.location.replace('/'))

}

function deleteUser(){

	var confirmation = confirm('Are You Sure?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url:  '/users/delete/'+$(this).data('id')
		}).done(function(response){
			window.location.replace('/')
		});
	} else {
		return false;
	}


}