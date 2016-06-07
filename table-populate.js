// var btn = document.getElementById('Populate_button');
/////////////////////////////////////////////////////////////////////

// Function to map random number generated to their categorical values in column type 

// Returns a random number
function randBetween(low, high){
	val = Math.floor(Math.random() * high) + low;  
	return val;
}

// Below are the function to map the column values to randomly generated numbers

function Occupancy_Type(code){
	switch(code){
		case 1: return "Schools"; 
		case 2: return "Childcare facilities";
		case 3: return "Adult Assisted Living"; 
		case 4: return "Hospitals"; 
		case 5: return "Jails"; 
		case 6: return "Night clubs & bars"; 
		case 7: return "Gas Stations"; 
		case 8: return "Office buildings"; 
		case 9: return "High rise apartments"; 
		case 10: return "Factories"; 
		case 11: return "Restaurants";
		case 12: return "Mercantile"; 
		case 13: return "Storage Facilities"; 
		case 14: return "Religious Assemblies"; 
	}
}

function Neighborhood_Incomes(code){
	switch(code){
		case 1: return "Income - Affluent"; 
		case 2: return "Income - Mid-income";
		case 3: return "Income - Working Middle Class"; 
		case 4: return "Income - Poor"; 
		case 5: return "Income - Very Poor"; 
	}
}

function Last_Inspected(code){
	switch(code){
		case 1: return "Inspected within the last 6 months"; 
		case 2: return "Inspected within the past 6-12 months";
		case 3: return "Inspected within the last 1 to 2 years"; 
		case 4: return "Inspected within the last 2 to 3 years"; 
		case 5: return "never been inspected (or > 36 months)"; 
	}
}


function Fire_Protection_Systems(code){
	switch(code){
		case 1: return "FP System - Very Good"; 
		case 2: return "FP System - Good";
		case 3: return "FP System - Moderate"; 
		case 4: return "FP System - Bad"; 
		case 5: return "FP System - Very Bad"; 
	}
}

function Institutional_Occupancy(code){
	switch(code){
		case 1: return "Fully self evacuate "; 
		case 2: return "Self Evacuate with mobility impaired";
		case 3: return "Can evcuate a large number of mobility impaired occupants with supervision"; 
		case 4: return "Difficulties to evacuate mobility impaired occupants with supervision"; 
		case 5: return "Cannot evacuate"; 
	}
}

function Building_Fire_Vulnerability(code){
	switch(code){
		case 1: return "Non-Combustible"; 
		case 2: return "Limited Combustible";
		case 3: return "Combustible"; 
		case 4: return "Free Burning"; 
		case 5: return "Rapid Burning"; 
	}
}

function Likely_FD_Suppression_Outcome(code){
	switch(code){
		case 1: return "Contained within Building of Origin"; 
		case 2: return "Exposure Beyond the Building of Origin";
		case 3: return "Require Major Deployment"; 
		case 4: return "Extreme Resistance to Control"; 
		case 5: return "Hazardous to Fire fighting Activities"; 
	}
}

function Economic_Impact(code){
	switch(code){
		case 1: return "With No Economic Impact"; 
		case 2: return "With Low Economic Impact";
		case 3: return "With Moderate Economic Impact"; 
		case 4: return "With High Economic Impact"; 
		case 5: return "With Very High Economic Impact"; 
	}
}

////////////////////////////////////////////////////////////////////////

//Filling the HTML Table with values 

var jsonArr = [];

function UpdateTable() {

    for (var i = 0; i < 50; i++) {
		var row_arr = [];
        for (var j = 0; j < 9; j++) {
            tmp = "" + i + j;
            tmp_value = "";
			switch(j) {
				case 0:
				tmp_value = i+1
				break;
				
				case 1:
				tmp_value = Occupancy_Type(randBetween(1,14));
				break;
				
				case 2:
				tmp_value = Neighborhood_Incomes(randBetween(1,5));
				break;

				case 3:
				tmp_value = Last_Inspected(randBetween(1,5));
				break;
				
				case 4:
				tmp_value = Fire_Protection_Systems(randBetween(1,5));
				break;

				case 5:
				tmp_value = Institutional_Occupancy(randBetween(1,5));
				break;

				case 6:
				tmp_value = Building_Fire_Vulnerability(randBetween(1,5));
				break;

				case 7:
				tmp_value = Likely_FD_Suppression_Outcome(randBetween(1,5));
				break;

				case 8:
				tmp_value = Economic_Impact(randBetween(1,5));
				break;

			}
			
			row_arr.push(tmp_value);
        }
		jsonArr.push({
			ID : row_arr[0],
			Occupancy_Type : row_arr[1],
			Neighborhood_Incomes : row_arr[2],
			Last_Inspected : row_arr[3],
			Fire_Protection_Systems : row_arr[4],
			Institutional_Occupancy : row_arr[5],
			Building_Fire_Vulnerability : row_arr[6],
			Likely_FD_Suppression_Outcome : row_arr[7],
			Economic_Impact : row_arr[8],
			Inspect : 0
		});
    }
}

UpdateTable();


var ViewModel = function() {	
	this.scenarios = ko.observableArray(jsonArr);
}

ko.applyBindings(new ViewModel());

// Save the responses to csv file
function getCounter(x){	
  
	var count = jsonArr.filter(value => value.Inspect == true).length;
	if(count > 20 )
	{
		
		
		x.checked = false;
		
		for (var i=0; i<jsonArr.length; i++) {
			if (jsonArr[i].ID == x.attributes['rowid'].value) {
			jsonArr[i].Inspect = 0;
  
  }
}
		
		$('#counter').html(jsonArr.filter(value => value.Inspect == true).length);	
		
		alert('You cannot select more than 20 properties. Please uncheck some properties!');		
		
	}
	else
	{
		$('#counter').html(jsonArr.filter(value => value.Inspect == true).length);	
		$("#counterModal").modal("show");

                setTimeout(function () {                   
                    $("#counterModal").modal("hide");
                }, 600);
	}


}


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
			
			if(arrData[i][index] == true)
			{
				row += '"1",';
			}
			else if(arrData[i][index] == false)
			{
				row += '"0",';
			}
			else
			{
            row += '"' + arrData[i][index] + '",';
			}
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


    


function onExportCSVClicked() {
	JSONToCSVConvertor(jsonArr, /* $('#name_box').val() + */ "PIP_Tool_Survey", true);
	
		 //exportTableToCSV.apply(this, [$('#content>table'), 'export.csv']);
	//console.log(jsonArr);
    // alasql("SELECT * INTO CSV('result.csv',{headers:true}) FROM ?", [true_percentage],function(user){console.log("This Experiment was run by : "+user)}
};

