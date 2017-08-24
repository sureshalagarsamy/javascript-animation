angular.module("VLCClientController", []).controller("VLCClientCtrl", function($http, $rootScope, $scope)
													 {
	console.log("VLC Client page");

	$rootScope.arrowMenu 	= false;
	$rootScope.wheelsMenu 	= false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu 	= false;
	$rootScope.logFile 		= false;
	$rootScope.shellScript 	= false;
	$rootScope.VNCClient 	= false;
	$rootScope.VLCClient 	= true;
	$rootScope.bgPicture 	= false;

	$scope.vlc		= {};
	$scope.vlc.show	= true;
	$scope.vlc.hide	= false;

	$scope.showVideo = function()
	{
		$scope.vlc.hide	= true;
		$scope.vlc.show	= false;
	}

	$scope.hideVideo = function()
	{
		$scope.vlc.hide	= false;
		$scope.vlc.show	= true;
	}


	$('#resizeDiv').resizable({
		start: function(e, ui)
		{

		},
		resize: function(e, ui)
		{
			$("#resizeDiv embed").width(ui.size.width-40);
			$("#resizeDiv embed").height(ui.size.height-40);
		},
		stop: function(e, ui)
		{	

		}
	});

	$('#resizeDiv').draggable().resizable();
});