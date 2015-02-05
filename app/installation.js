
var casper = require('casper').create({
	viewportSize: {
		width: 1920,
		height: 1080
	},
	verbose: true,
	logLevel: "debug",
	onError: errorEvent
});

function errorEvent(e) {
	this.echo('CasperJS Script Error');
	this.echo(e);
	this.exit();
}

casper.start('http://joomla-developer/');

casper.then(function() {

	// pull token value from DOM
	var token = this.getElementAttribute('form#adminForm input[type="hidden"][name="task"] + input[type="hidden"][value="1"]', 'name');
	this.echo(token);
	this.fill('form#adminForm', {
		'jform[site_name]': 'Joomla Developer Instance',
		'jform[admin_email]': 'info@arctg.com',
		'jform[admin_user]': 'admin',
		'jform[admin_password]': 'test',
		'jform[admin_password2]': 'test',
		'jform[site_metadesc]': '',
		'jform[site_offline]': '0',
	}, false);

});

casper.then(function() {
	this.capture('joomla_installation_page_one.png')
	this.click('div#container-installation div.btn-toolbar div.btn-group a.btn.btn-primary');
});

casper.waitForResource(function testResource(resource) {
		return resource;
	}, function onReceived() {
		this.echo(this.getTitle());
		this.capture('joomla_installation_page_two.png');
	}
);

casper.then(function() {
	// pull token value from DOM
	var token = this.getElementAttribute('form#adminForm input[type="hidden"][name="task"] + input[type="hidden"][value="1"]', 'name');
	this.echo(token);
	this.fill('form#adminForm', {
		'jform[db_type]': 'mysqli',
		'jform[db_host]': 'localhost',
		'jform[db_user]': 'joomladev',
		'jform[db_pass]': 'joomladev',
		'jform[db_name]': 'joomladev',
		'jform[db_prefix]': 'jdev_',
	}, false);
});

casper.then(function() {
	this.capture('joomla_installation_page_three.png')
	this.click('div#container-installation div.btn-toolbar div.btn-group a.btn.btn-primary');
});

casper.waitForResource(function testResource(resource) {
		return resource;
	}, function onReceived() {
		this.echo(this.getTitle());
		this.capture('joomla_installation_page_four.png');
	}
);

casper.run(function() {
	this.echo('Installation Complete').exit();
});