angular.module("logFileController", ['luegg.directives']).controller("logFileCtrl", function($http, $rootScope, $scope)
{
	console.log("logFile page");

	$rootScope.arrowMenu 	= false;
	$rootScope.wheelsMenu 	= false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu 	= false;
	$rootScope.logFile 		= true;
	$rootScope.shellScript 	= false;
	$rootScope.VNCClient 	= false;
	$rootScope.VLCClient 	= false;
	$rootScope.bgPicture 	= false;
	
	$scope.logFile                  = {};
	$scope.logFile.show         	= true;
	$scope.logFile.hide             = false;
	$scope.logFile.clear            = false;

	//$scope.logFile.logData = [{id:1,name:'January'}, {id:2,name:'February'}, {id:3,name:'March'},{id:4,name:'April'},{id:5,name:'May'},{id:6,name:'June'},{id:7,name:'July'},{id:8,name:'August'},{id:9,name:'September'},{id:10,name:'October'},{id:11,name:'November'},{id:12,name:'December'}];
	$scope.displayData = [];
	
	$scope.showLogFile = function()
	{
		$scope.testWebSocket();
		$scope.logFile.hide     = true;
		$scope.logFile.show     = false;
	}

	$scope.hideLogFile = function()
	{
		$scope.displayData = [];
		$scope.onClose();
		$scope.logFile.hide     = false;
		$scope.logFile.show     = true;
		$scope.logFile.clear 	= false;
	}
	
	$scope.clearLogFile = function()
	{
		$scope.displayData = [];
	}
	
	$scope.testWebSocket = function()
	{
		websocket 			= new WebSocket(wsUri);
		websocket.onopen 	= function(evt) { $scope.onOpen(evt) };
		websocket.onclose 	= function(evt) { $scope.onClose(evt) };
		websocket.onmessage = function(evt) { $scope.onMessage(evt) };
		websocket.onerror 	= function(evt) { $scope.onError(evt) };
	}

	$scope.onOpen = function(evt)
	{
		$scope.logFile.clear = true;
		$scope.doSend();
		//startInterval = setInterval($scope.doSend,3000);
	}

	$scope.onClose = function(evt)
	{
		//clearInterval(startInterval);
		websocket.close();
	}

	$scope.onMessage = function(evt)
	{
		//$scope.displayData.push(JSON.parse(evt.data));
		$scope.displayData.push(evt.data);
		console.log($scope.displayData);
		$scope.$apply();
		//$scope.glued = true;
	}

	$scope.onError = function(evt)
	{
		console.log("Error :"+evt.data);
	}

	$scope.doSend = function()
	{
		//var JSONStringify = JSON.stringify($scope.logFile.logData[Math.floor(Math.random() * $scope.logFile.logData.length)]);
		//websocket.send(JSONStringify);
		websocket.send("get log info");
	}

	$('#resizeDiv').draggable();
	
	var wsUri = "ws://echo.websocket.org/";
});