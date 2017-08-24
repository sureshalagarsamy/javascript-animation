angular.module("shellScriptController", []).controller("shellScriptCtrl", function($http, $rootScope, $scope)
{
	console.log("shell Script page");

	$rootScope.arrowMenu 	= false;
	$rootScope.wheelsMenu 	= false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu 	= false;
	$rootScope.logFile 		= false;
	$rootScope.shellScript 	= true;
	$rootScope.VNCClient 	= false;
	$rootScope.VLCClient 	= false;
	$rootScope.bgPicture 	= false;

	$scope.shellScript                  = {};
	$scope.shellScript.show         	= true;
	$scope.shellScript.hide             = false;
	$scope.shellScript.clear            = false;
	$scope.shellScript.cmd            	= "";

	$scope.displayData = [];

	$scope.showShellScriptFile = function()
	{
		$scope.testWebSocket();
		$scope.shellScript.clear 	= true;
		$scope.shellScript.hide     = true;
		$scope.shellScript.show     = false;
	}

	$scope.hideShellScriptFile = function()
	{
		$scope.displayData = [];
		$scope.onClose();
		$scope.shellScript.hide     = false;
		$scope.shellScript.show     = true;
		$scope.shellScript.clear 	= false;
		$scope.shellScript.cmd		= "";
	}

	$scope.clearShellScriptFile = function()
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

	}

	$scope.onClose = function(evt)
	{
		websocket.close();
	}

	$scope.onMessage = function(evt)
	{
		$scope.shellScript.cmd  = "";
		$scope.displayData.push(JSON.parse(evt.data));
		$scope.$apply();
		$scope.glued = true;
	}

	$scope.onError = function(evt)
	{
		console.log("Error :"+evt.data);
	}

	$scope.doSend = function(flag)
	{
		console.log(flag);
		websocket.send(flag);
	}

	$scope.getResult = function()
	{
		$scope.doSend($scope.shellScript.cmd);
		console.log($scope.shellScript.cmd);		
	}

	//$('#resizeDiv').draggable();

	var wsUri = "ws://"+window.location.host+"/usecase_6/SystemCommandsServer";
});