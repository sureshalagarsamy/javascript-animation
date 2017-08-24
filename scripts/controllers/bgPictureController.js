angular.module("bgPictureController", []).controller("bgPictureCtrl", function($http, $rootScope, $scope)
													 {
	console.log("BG Picture page");

	$rootScope.arrowMenu 	= false;
	$rootScope.wheelsMenu 	= false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu 	= false;
	$rootScope.logFile 		= false;
	$rootScope.shellScript 	= false;
	$rootScope.VNCClient 	= false;
	$rootScope.VLCClient 	= false;
	$rootScope.bgPicture 	= true;

	$scope.bgPicture		= {};
	$scope.bgPicture.show	= true;
	$scope.bgPicture.hide	= false;
	$scope.pictureLoaded 	= false;

	$scope.displayData = {};

	$scope.showBGPicture = function()
	{
		$scope.testWebSocket();
		$scope.bgPicture.hide	= true;
		$scope.bgPicture.show	= false;
	}

	$scope.hideBGPicture = function()
	{
		$scope.bgPicture.hide	= false;
		$scope.bgPicture.show	= true;
		$scope.onClose();
	}

	$scope.changePicture = function()
	{
		$scope.doSend();
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
		$scope.pictureLoaded = true;
		$scope.displayData = JSON.parse(evt.data);
		console.log($scope.displayData);
		$scope.$apply();
		$scope.glued = true;
	}

	$scope.onError = function(evt)
	{
		console.log("Error :"+evt.data);
	}

	$scope.doSend = function()
	{
		var JSONStringify = JSON.stringify({"REQUEST":"REQUST_IMAGE"});
		websocket.send(JSONStringify);
	}

	$('#resizeDiv').draggable();

	var wsUri = "wss://echo.websocket.org";

	$('#resizeDiv').resizable({
		start: function(e, ui)
		{

		},
		resize: function(e, ui)
		{
			$("#resizeDiv img").width(ui.size.width-2);
			$("#resizeDiv img").height(ui.size.height-2);
		},
		stop: function(e, ui)
		{	

		}
	});

	$('#resizeDiv').draggable().resizable();
});