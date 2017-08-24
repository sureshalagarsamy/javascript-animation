angular.module("dragDropController", []).controller("dragDropCtrl", function($http, $rootScope, $scope)
{
	console.log("Drag and drop page");

	$rootScope.arrowMenu 	= false;
	$rootScope.wheelsMenu 	= false;
	$rootScope.graphMenu 	= false;
	$rootScope.logFile 		= false;
	$rootScope.shellScript 	= false;
	$rootScope.VNCClient 	= false;
	$rootScope.VLCClient 	= false;
	$rootScope.bgPicture 	= false;
	$rootScope.dragDropMenu = true;


	$scope.centerAnchor			= true;
	$scope.toggleCenterAnchor	= function () {$scope.centerAnchor = !$scope.centerAnchor}
	$scope.draggableObjects 	= [{name:''}];
	$scope.droppedObjects		= [];	

	$scope.onDropComplete=function(data,evt)
	{
		var index = $scope.droppedObjects.indexOf(data);
		if (index == -1)
		{
			//$scope.droppedObjects.push(data);
			$scope.droppedObjects		= [];
			document.getElementById("myDiv").className = "droppedBG";
		}
	}
	$scope.onDragSuccess=function(data,evt){
		console.log("133","$scope","onDragSuccess1", "", evt);
		var index = $scope.droppedObjects.indexOf(data);
		if (index > -1) {
			$scope.droppedObjects.splice(index, 1);
		}
	}
});