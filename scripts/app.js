'use strict';

/**
* @ngdoc overview
* @name mavenirApp
* @description
* # animationApp
*
* Main module of the application.
*/
angular.module('animationApp', ['ngRoute','arrowController','wheelsController','dragDropController','graphController','logFileController','shellScriptController','VNCClientController','VLCClientController','bgPictureController','chartOneController','chartTwoController','chartThreeController','chartFourController','chartFiveController','ngDraggable']).config(function ($routeProvider,$locationProvider)
{
	$routeProvider
		.when("/arrow",			{templateUrl: "views/arrow.html",		controller: "arrowCtrl"  		})
		.when("/wheels",		{templateUrl: "views/wheels.html",		controller: "wheelsCtrl"  		})
		.when("/drag_drop",		{templateUrl: "views/dragDrop.html",	controller: "dragDropCtrl"  	})
		.when("/graph",			{templateUrl: "views/graph.html",		controller: "graphCtrl"  		})
		.when("/logFile",		{templateUrl: "views/logFile.html",		controller: "logFileCtrl"  		})
		.when("/shell_script",	{templateUrl: "views/shellScript.html",	controller: "shellScriptCtrl"	})
		.when("/vnc_client",	{templateUrl: "views/VNCClient.html",	controller: "VNCClientCtrl"  	})
		.when("/vlc_client",	{templateUrl: "views/VLCClient.html",	controller: "VLCClientCtrl"  	})
		.when("/bg_picture",	{templateUrl: "views/bgPicture.html",	controller: "bgPictureCtrl" 	})
		.when("/chart_one",		{templateUrl: "views/chart_one.html",	controller: "chartOneCtrl" 		})
		.when("/chart_two",		{templateUrl: "views/chart_two.html",	controller: "chartTwoCtrl" 		})
		.when("/chart_three",	{templateUrl: "views/chart_three.html",	controller: "chartThreeCtrl"	})
	.when("/chart_four",	{templateUrl: "views/chart_five.html",	controller: "chartFiveCtrl"	})
		/*.when("/chart_five",	{templateUrl: "views/chart_five.html",	controller: "chartFiveCtrl"	})*/
		.otherwise({redirectTo: '/arrow'});
}).run(function($rootScope)
{
	$rootScope.activeMenu = function()
	{
		$rootScope.arrowMenu 	= false;
		$rootScope.wheelsMenu 	= false;
		$rootScope.dragDropMenu = false;
		$rootScope.graphMenu 	= false;
		$rootScope.logFile 		= false;
		$rootScope.shellScript 	= false;
		$rootScope.VNCClient 	= false;
		$rootScope.VLCClient 	= false;
		$rootScope.bgPicture 	= false;
		$rootScope.chart_one 	= false;
		$rootScope.chart_two 	= false;
		$rootScope.chart_three 	= false;
		$rootScope.chart_Four 	= false;
		$rootScope.chart_Five 	= false;
	}
});