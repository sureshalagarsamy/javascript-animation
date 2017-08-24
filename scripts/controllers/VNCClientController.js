angular.module("VNCClientController", []).controller("VNCClientCtrl", function($http, $rootScope, $scope)
{
	console.log("VNC Client page");

	$rootScope.arrowMenu 	= false;
	$rootScope.wheelsMenu 	= false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu 	= false;
	$rootScope.logFile 		= false;
	$rootScope.shellScript 	= false;
	$rootScope.VNCClient 	= true;
	$rootScope.VLCClient 	= false;
	$rootScope.bgPicture 	= false;
});