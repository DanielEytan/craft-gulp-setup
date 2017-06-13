<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
	'*' => array(
		'cpTrigger' => 'admin',
		'omitScriptNameInUrls' => 'auto',
		'enableCsrfProtection' => true,
		'defaultWeekStartDay' => 1,
    ),
    'craft-gulp-setup.dev' => array(
        'devMode' => true,
        'environmentVariables' => array(
            'basePath' => '/www/sites/craft-gulp-setup.dev/html/',
            'baseUrl'  => 'http://craft-gulp-setup.dev/',
			'siteUrl' => 'http://craft-gulp-setup.dev/',

        )
    ),
    'example.uberspace.com' => array(
        'devMode' => false,
        'environmentVariables' => array(
            'basePath' => '/var/www/virtual/example/',
            'baseUrl'  => 'http://example.uberspace.com/',
			'siteUrl' => 'http://craft-gulp-setup.dev/',
        )
    )
);