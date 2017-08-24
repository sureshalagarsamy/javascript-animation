angular.module("graphController", []).controller("graphCtrl", function($http, $rootScope, $scope)
												 {
	var margin = {top: 30, right: 20, bottom: 30, left: 50};
	var width = 600;
	var height = 270;

	console.log("Graph page");

	$rootScope.arrowMenu                = false;
	$rootScope.wheelsMenu              = false;
	$rootScope.dragDropMenu = false;
	$rootScope.graphMenu = true;
	var dateFlag = 0;
	var myJSONString = [];

	$scope.graph                   = {};
	$scope.graph.show         		= true;
	$scope.graph.hide             = false;


	$scope.generateTwoDigit = function()
	{
		return Math.floor((Math.random() * 100) + 1)+"."+Math.floor((Math.random() * 100) + 1);
	}
	$scope.generateThreeDigit = function()
	{
		return Math.floor((Math.random() * 1000) + 1)+"."+Math.floor((Math.random() * 100) + 1);
	}

	$scope.formGraphData = function()
	{
		myJSONString.push({date: $scope.getNewDate(++dateFlag), close: $scope.generateTwoDigit()});
		return JSON.stringify(myJSONString);
	}

	$scope.showGraph = function()
	{
		$scope.graph.hide     = true;
		$scope.graph.show     = false;
		$scope.formGraphData();
		$scope.testWebSocket();
	}

	$scope.hideGraph = function()
	{
		$scope.graph.hide     = false;
		$scope.graph.show     = true;
		dateFlag = 0;
		myJSONString = [];
		d3.select("#myGraph").select("svg").remove();
		$scope.onClose();
	}

	var wsUri = "ws://echo.websocket.org/";
	var output;

	$scope.init = function()
	{
		output = document.getElementById("output");
		$scope.testWebSocket();
	}

	$scope.testWebSocket = function()
	{
		websocket = new WebSocket(wsUri);
		websocket.onopen = function(evt) { $scope.onOpen(evt) };
		websocket.onclose = function(evt) { $scope.onClose(evt) };
		websocket.onmessage = function(evt) { $scope.onMessage(evt) };
		websocket.onerror = function(evt) { $scope.onError(evt) };
	}

	$scope.onOpen = function(evt)
	{

		$scope.doSend();
		startInterval = setInterval($scope.doSend,3000);

		//$scope.doSend,2000);
	}

	$scope.onClose = function(evt)
	{
		clearInterval(startInterval);
		websocket.close();
	}

	$scope.onMessage = function(evt)
	{
		var myObj = {width:width, height:height};
		$scope.loadGraph(JSON.parse(evt.data),myObj);
	}

	$scope.onError = function(evt)
	{
		//$scope.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
	}

	$scope.doSend = function()
	{
		websocket.send($scope.formGraphData());
	}

	$scope.writeToScreen = function(message)
	{
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = message;
		output.appendChild(pre);
	}

	//$scope.init();
	//$scope.formGraphData();
	//setInterval($scope.doSend(graphData),3000);

	$scope.loadGraph = function(data,obj)
	{
		d3.select("#myGraph").select("svg").remove();
		// Set the dimensions of the canvas / graph
		if(obj.width == undefined)
		{
			var margin = {top: 30, right: 20, bottom: 30, left: 50},
				width = obj.width - margin.left - margin.right,
				height = obj.height - margin.top - margin.bottom;
		}
		else
		{
			var margin = {top: 30, right: 20, bottom: 30, left: 50},
				width = obj.width - margin.left - margin.right,
				height = obj.height - margin.top - margin.bottom;
		}

		// Parse the date / time
		var parseDate = d3.time.format("%d-%b-%y").parse;

		// Set the ranges
		var x = d3.time.scale().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);

		// Define the axes
		var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5);

		var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5);

		// Define the line
		var valueline = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.close); });

		// Adds the svg canvas
		var svg = d3.select("#myGraph")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", 
			  "translate(" + margin.left + "," + margin.top + ")");

		// Get the data

		//d3.select("#myGraph").select("svg").remove();
		//d3.csv("scripts/controllers/graphData.csv", function(error, data)
		//{
		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.close = +d.close;
		});

		// Scale the range of the data
		x.domain(d3.extent(data, function(d) { return d.date; }));
		y.domain([0, d3.max(data, function(d) { return d.close; })]);

		// Add the valueline path.
		svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(data));

		// Add the X Axis
		svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

		// Add the Y Axis
		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);
		/*});*/

		/*var svg = d3.select("body").transition();
		svg.select(".line")   // change the line
		.duration(750)
		.attr("d", valueline(data));*/
	}


	$('#resizeDiv').resizable({
		start: function(e, ui)
		{

		},
		resize: function(e, ui)
		{
			width = ui.size.width;
			height = ui.size.height;
			var myObj = {width:ui.size.width, height:ui.size.height};
			//$scope.loadGraph(JSON.parse($scope.formGraphData()),myObj);
		},
		stop: function(e, ui)
		{	

		}
	});

	$('#resizeDiv').draggable().resizable();

	$scope.getNewDate = function(flag)
	{
		var monthNames = [
			"Jan", "Feb", "Mar",
			"Apr", "May", "Jun", "Jul",
			"Aug", "Sep", "Oct",
			"Nov", "Dec"
		];

		var date = new Date();
		date.setDate(date.getDate()+flag);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear().toString().substr(2,2);

		//console.log(day+"-"+monthNames[monthIndex]+"-"+year);
		return day+"-"+monthNames[monthIndex]+"-"+year;
	}

});
