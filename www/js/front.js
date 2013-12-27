$(document).ready(function (){
	$('#add').click(function (){
		var isOpenView = false;
		if ($('form input[name="email"]').attr('readonly') != "readonly") {
			$('form').clearQueue().stop().slideToggle("slow");
		};
		ResetForm();
	});
	LoadData();
});

function LoadData(){
	$.get('/loadData', function (data){
		var table = $('table tbody');
		table.empty();
		$(data).each(function (i, e){
			var line = '<tr>';
			line += '<td>';
			line += '<a id="view" email="'+e.email+'" href="#">View</a>';
			line += '<a id="edit" email="'+e.email+'" href="#">Edit</a>';
			line += '<a id="del" email="'+e.email+'" href="#">Del</a>';
			line += '</td>';
			line += '<td>'+e.name+'</td>';
			line += '<td>'+e.email+'</td>';
			line += '<td>'+e.phone+'</td>';
			line += '</tr>';
			table.append(line);
		});
		LoadEventLink();
	})
}

function LoadEventLink(){
	$('a#view').each(function (i, e){
		var link = $(e);
		var email = link.attr('email');
		link.click(function (){
			ResetForm();
			$.get('/loadData', {email: email}, function (data){
				$('form input').attr('readonly','readonly');
				$('form input[type="submit"]').css('display','none');
				FillForm(data[0]);
			});
		});
	});
	$('a#edit').each(function (i, e){
		var link = $(e);
		var email = link.attr('email');
		link.click(function (){
			ResetForm();
			$.get('/loadData', {email: email}, function (data){
				FillForm(data[0]);
				$('input[name="contactEdit"]').remove();
				$('form').append('<input type="hidden" name="contactEdit" value="'+data[0].email+'">');
			});
		});
	});
	$('a#del').each(function (i, e){
		var link = $(e);
		var email = link.attr('email');
		link.click(function (){
			ResetForm();
			$.get('/loadData', {email: email}, function (data){
				$('form input').attr('readonly','readonly');
				$('form input[type="submit"]').css('display','none');
				FillForm(data[0]);
				var formDel = $('<form method="post" action="/delete"></form>');
				formDel.append('<input type="hidden" name="contactDel" value="'+data[0].email+'">');
				formDel.append('<p>Are you sure you want to delete the record?</p>');
				formDel.append('<input type="submit" value="Yes, I\'m">');
				var bNo = $('<input type="button" value="No, Sorry!">');
				bNo.click(function (){
					$('form').clearQueue().stop().slideToggle("slow");
					ResetForm();
				});
				formDel.append(bNo);
				$('form').append(formDel);
			});
		});
	});
}

function FillForm(data){
	$('input[name="email"]').val(data.email);
	$('input[name="name"]').val(data.name);
	$('input[name="phone"]').val(data.phone);
	$('input[name="address"]').val(data.address);
	$('input[name="city"]').val(data.city);
	if (!$('form').is(':visible')) {
		$('form').clearQueue().stop().slideToggle("slow");
	};
}

function ResetForm(){
	$('input[name="contactEdit"]').remove();
	$('form input[type="text"]').val("");
	$('form input[type="text"]').removeAttr('readonly');
	$('form input[type="submit"]').css('display','block');
	$('form[action="/delete"]').remove();
}