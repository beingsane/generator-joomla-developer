//var casper = require('caspser').create();

var fields = [
	['jform_site_name','jform_admin_email','jform_admin_user','jform_admin_password', 'jform_admin_password2'],
	['jform_db_host', 'jform_db_user', 'jform_db_pass', 'jform_db_name', 'jform_db_prefix'],
	[]
];

var page_1_maps = {
	jform_site_name: 'joomla-dev',
	jform_site_description: 'This is a description of my site.',
	jform_admin_email: 'brian.bolli@arctg.com',
	jform_admin_user: 'admin',
	jform_admin_password: 'test',
	jform_admin_password2: 'test'
};

var page_2_maps = {
	jform_db_type: 'mysqli',
	jform_db_host: 'localhost',
	jform_db_user: 'joomla-dev',
	jform_db_pass: 'joomla-dev',
	jform_db_name: 'joomla-dev',
	jform_db_prefix: 'jdev_'
}

var page_3_maps = {

}

casper.options.verbose = true;
casper.options.logLevel = "debug";
casper.options.viewportSize = {width: 1920, height: 1080};

casper.test.beging('Joomla Instance Installation', 22, function suite(test) {

	casper.start('http://joomla-dev/', function(){
		this.echo('Running initial installation on Joomla instance.')
	});

	casper.waitForSelector('form#adminForm', function(){
		this.capture('media/joomla_installation_page_1_start.png');
		this.fill('form#adminForm', page_1_maps, false);
		this.capture('media/joomla_installation_page_1_end.png');
		this.click('#container-installation div.btn-toolbar div.btn-group a.btn.btn-primary');
	});

	casper.then(function(){
		this.capture('media/joomla_installation_page_2_start.png');
		this.fill('form#adminForm', page_2_maps, false);
		this.capture('media/joomla_installation_page_2_end.png');
		this.click('#container-installation div.btn-toolbar div.btn-group a.btn.btn-primary');
	});

	casper.then(function(){
		this.capture('media/joomla_installation_page_3_start.png');
		this.fill('form#adminForm', page_3_maps, false);
		this.capture('media/joomla_installation_page_3_end.png');
		this.click('#container-installation div.btn-toolbar div.btn-group a.btn.btn-primary');
	});

	casper.run(function(){
		test.done();
	});
})