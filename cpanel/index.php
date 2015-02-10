<?php
ini_set('html_errors', 'yes');

require 'bootstrap.php';

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Joomla-Developer Generator Control Panel</title>
		<link rel="stylesheet" href="css/style.css" type="text/css" />
		<link rel="stylesheet" href="css/bootstrap.css" type="text/css" />
	</head>
	<body>
		<div class="container">
			<div class="row">
				
				<div class="span12">
					<h1>Joomla-Developer Generator Control Panel</h1>
				</div>
			
				<div class="span4">
				
					<div class="accordion" id="configurations">
						<div class="accordion-group">
							<div class="accordion-heading">
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#configurations" href="#collapse1">
									Controllers
								</a>
							</div>
							<div id="collapse1" class="accordion-body collapse in">
								<div class="accordion-inner">
									<a id="component" class="add-config btn btn-primary pull-right">+</a>
									No configurations...
								</div>
							</div>
						</div>
						<div class="accordion-group">
							<div class="accordion-heading">
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#configurations" href="#collapse2">
									Table Schemas
								</a>
							</div>
							<div id="collapse2" class="accordion-body collapse">
								<div class="accordion-inner">
									<a id="table" class="add-config btn btn-primary pull-right">+</a>
									No configurations...
								</div>
							</div>
						</div>
						<div class="accordion-group">
							<div class="accordion-heading">
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#configurations" href="#collapse3">
									Plugins
								</a>
							</div>
							<div id="collapse3" class="accordion-body collapse">
								<div class="accordion-inner">
									<a id="plugin" class="add-config btn btn-primary pull-right">+</a>
									No configurations...
								</div>
							</div>
						</div>
						<div class="accordion-group">
							<div class="accordion-heading">
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#configurations" href="#collapse4">
									Templates
								</a>
							</div>
							<div id="collapse4" class="accordion-body collapse">
								<div class="accordion-inner">
									<a id="template" class="add-config btn btn-primary pull-right">+</a>
									No configurations...
								</div>
							</div>
						</div>
						<div class="accordion-group">
							<div class="accordion-heading">
								<a class="accordion-toggle" data-toggle="collapse" data-parent="#configurations" href="#collapse5">
									Modules
								</a>
							</div>
							<div id="collapse5" class="accordion-body collapse">
								<div class="accordion-inner">
									<a id="module" class="add-config btn btn-primary pull-right">+</a>
									No configurations...
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="span8">
				
				</div>
			</div>
		</div>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript">

		</script>
	</body>
</html>