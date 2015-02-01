var js = [];
var css = [];
var casper = require('casper').create();
var link = casper.cli.get(0);

function getScripts() {
	var tags = document.querySelectorAll('script');
	return Array.prototype.map.call(tags, function(e) {
		return e.getAttribute('src');
	});
}

function getStyles() {
	var tags = document.querySelectorAll('link');
	return Array.prototype.map.call(tags, function(e) {
		return e.getAttribute('href');
	});
}

casper.start(link + '?build=true', function() {

});

casper.then(function() {
	// aggregate results for the 'phantomjs' search
	//links = links.concat(this.evaluate(getLinks));
	var temp = this.evaluate(getScripts);

	for (var i = 0; i < temp.length; i++)
	{
		if (temp[i].indexOf('.js') > -1)
		{
			if (temp[i].indexOf('/') !== 0)
			{
				temp[i] = '/' + temp[i];
			}

			if (temp[i].indexOf('jquery') === -1 && temp[i].indexOf('bootstrap') === -1)
			{
				if (temp[i].indexOf('caption') > -1)
				{
					js.push(temp[i].replace('.js','-uncompressed.js'));
				}
				else
				{
					js.push(temp[i].replace('min.',''));
				}
			}
		}
	}

	temp = this.evaluate(getStyles);

	for (var i = 0; i < temp.length; i++)
	{
		if (temp[i].indexOf('.css') > -1)
		{
			if (temp[i].indexOf('/') !== 0)
			{
				temp[i] = '/' + temp[i];
			}

			if (temp[i].indexOf('jquery') === -1 && temp[i].indexOf('bootstrap') === -1)
			{
				css.push(temp[i].replace('min.',''));
			}
		}
	}
});

casper.run(function() {
	// echo results in some pretty fashion
	var json = {
			"js" : js,
			"css" : css
	};

	this.echo(JSON.stringify(json)).exit();
});