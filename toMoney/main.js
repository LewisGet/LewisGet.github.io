var toMony = {
	id: "toMoney",
	usdToTwd: 30,
    usdToCny: 6,
    cnyToTwd: 4,
	apiUrl: 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("USDTWD", "USDCNY", "CNYTWD")&env=store://datatables.org/alltableswithkeys',
	content: null,
	position: {
		x: 0,
		y: 0
	}
};

document.onmousemove = function (e){
	toMony.position.x = e.pageX;
	toMony.position.y = e.pageY;
}

$(function(){
	init();
});

function init()
{
	$.ajax({
		url: toMony.apiUrl,
		type: "GET",
		dataType: "xml",
		success: function(data){
			var q = $(data).find("Rate");

			toMony.usdToTwd = q[0].textContent;
			toMony.usdToCny = q[1].textContent;
			toMony.cnyToTwd = q[2].textContent;

			flush();
		}
	});
}

function flush()
{
	toMony.content = parseFloat(window.getSelection().toString());

	flushHtml();

	setTimeout("flush();", 1000);
}

function getHtml()
{
	return '' +
		'<div id="' + toMony.id + '" style="background-color: #fff; padding: 15px; position: fixed; top: ' + (toMony.position.y + 10) + 'px; left: ' + toMony.position.x + 'px;">' +
			'<ul style="list-style: none;">' +
				'<li><strong> to Cny : ' + (toMony.content * toMony.usdToCny) + '</strong></li>' +
				'<li><strong> to Usd : ' + (toMony.content / toMony.usdToCny) + '</strong></li>' +
			'</ul>' +
		'</div>';
}

function flushHtml()
{
	$("#" + toMony.id).remove();
	$("body").append(getHtml());
}