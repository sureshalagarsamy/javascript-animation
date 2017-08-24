angular.module("chartTwoController", []).controller("chartTwoCtrl", function($http, $rootScope, $scope, $timeout)
{
	console.log("3D Chart-2");
	$rootScope.activeMenu();
	$rootScope.chart_two 	= true;
	
	$(function () {
		$('#container').highcharts({
			chart: {
				type: 'column',
				margin: 75,
				options3d: {
					enabled: true,
					alpha: 15,
					beta: 15,
					depth: 110
				}
			},
			plotOptions: {
				column: {
					depth: 40,
					stacking: true,
					grouping: false,
					groupZPadding: 10
				}
			},
			series: [{
				data: [1, 2, 4, 3, 2, 4],
				stack: 0
			}, {
				data: [5, 6, 3, 4, 1, 2],
				stack: 0
			}, {
				data: [7, 9, 8, 7, 5, 8],
				stack: 1
			}]
		});
	});

});