String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

function checkEmptystr(my_arr){
   for(var i=0;i<my_arr.length;i++){
       if(my_arr[i] === "")   
          return false;
   }
   return true;
}


function getValues()
{
	var d = new Date();
	var n = d.getTime();
	var all_values = {}
	var ques = document.getElementById("question_text").value;
	var respvalues = document.getElementById("respval").value;
	all_values['user_ques'] = ques;
	all_values['radval'] = "";
	all_values['response_values'] = respvalues;
    var elements = document.getElementsByName("radio1");
    for (var i = 0, l = elements.length; i < l; i++)
    {
        if (elements[i].checked)
        {
            all_values['radval'] = elements[i].value;
        }
    }
    if (all_values['radval'] == "" || all_values['user_ques'] == ""){
    	alert('Question 1 and/or 2 not answered. Please answer the questions.');
    }
    else{
    	if (all_values['radval'] == "Text Input"){
    		var jsonTasks = JSON.stringify(all_values);
    		sessionStorage.setItem( '{0}'.format(String(n)), jsonTasks )
    		alert("Question has been saved and the page will be refreshed to enter a new question.");
			location.reload(); 
    	}
    	else{
    		if (all_values['response_values'] == ""){
    			alert('Question 3 not answered. Please provide the appropriate values.');
    		}
    		else{
    			var splitresp = all_values['response_values'].split(";");
    			
    			if (splitresp.length == 1){
					alert('Only one value entered for Question 3. Please enter at least 2 values.');    			
    			}
    			else{
    				all_values['response_values'] = splitresp;
    				var checkarr = checkEmptystr(all_values['response_values']);
    				if (checkarr == false){
    					alert('One of the values in Question 3 is an empty string. Please check and try again.');
    				}
    				else{
    					var jsonTasks2 = JSON.stringify(all_values);
    					sessionStorage.setItem( '{0}'.format(String(n)), jsonTasks2 )
    					alert("Question has been saved and the page will be refreshed to enter a new question.");
						location.reload();
    				}
    				
    			}
    		
    		}
    	
    	}
    }
}


function resultsFunc(){
	var questionsarray = [];
	var x = document.getElementById("resultform");
	for (var i=0; i<x.length-1; i++){
		questionsarray.push(x.elements[i].name);
	}
	var unique_ques = questionsarray.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	var dropdowns = {};
	var question_radio = {};
	var radio_check = [];
	var question_checkbox = {};
	var checkbox_check = []; 
	var textfield = {};	
	for (var k in unique_ques){
		var radio_true = [];
		var checkbox_true = [];
		for (var i=0; i<x.length-1; i++){
			if (x.elements[i].name == unique_ques[k]){
				if (x.elements[i].type == "select-one"){
					dropdowns[unique_ques[k]]= x.elements[i].value;
				}
				if (x.elements[i].type == "radio"){
					radio_check.push(unique_ques[k]);
					if (x.elements[i].checked == true){
						radio_true.push(x.elements[i].value);
					}
				}
				if (x.elements[i].type == "checkbox"){
					checkbox_check.push(unique_ques[k]);
					if (x.elements[i].checked == true){
						checkbox_true.push(x.elements[i].value);
					}
				}
				if (x.elements[i].type == "text"){
					if (x.elements[i].value == ""){
						textfield[unique_ques[k]] = x.elements[i].value;
					}
					else{
						textfield[unique_ques[k]] = x.elements[i].value;
					}
					
				}
			
			}
		}
		if (radio_true.length != 0){
			question_radio[unique_ques[k]] = radio_true[0];
		}
		if (checkbox_true.length != 0){
			question_checkbox[unique_ques[k]] = checkbox_true;
		}
	}
	var uniq_radio_check = radio_check.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	var uniq_checkbox_check = checkbox_check.filter(function(item, i, ar){ return ar.indexOf(item) === i; });	
	if (Object.keys(question_radio).length != uniq_radio_check.length || Object.keys(question_checkbox).length != uniq_checkbox_check.length){
		alert("Please make selection(s) for radio button and/or check-box responses.");
	}
	if (Object.keys(question_radio).length == uniq_radio_check.length && Object.keys(question_checkbox).length == uniq_checkbox_check.length){
			var empty_input = [];
			if (Object.keys(textfield).length != 0){
				for (var val in textfield){
					if (textfield[val] == ""){
						empty_input.push(1)
					}
				}
		}
		if (empty_input.length != 0){
			alert("Text field is empty for a question. Please provide the appropriate answer.");
		}
		else{	
		document.body.innerHTML = "";
		document.write("<html>");
		document.write("<head><title>Questionnaire</title></head>");
		document.write("<body>");
		document.write("<font color=#1346AD size=+3>Survey Application Results</font>"+"<br>"+"<br>");
		
		if (Object.keys(textfield).length != 0){
			for (var val in textfield){
				document.write("Question: "+val.replace(/_/g," ")+"<br>");
				document.write("Answer: "+textfield[val]+"<br>"+"<br>");
			}
		}
		if (Object.keys(dropdowns).length != 0){
			for (var val in dropdowns){
				document.write("Question: "+val.replace(/_/g," ")+"<br>");
				document.write("Answer: "+dropdowns[val]+"<br>"+"<br>");
			}
		}
		if (Object.keys(question_radio).length != 0){
			for (var val in question_radio){
				document.write("Question: "+val.replace(/_/g," ")+"<br>");
				document.write("Answer: "+question_radio[val]+"<br>"+"<br>");
			}
		}
		if (Object.keys(question_checkbox).length != 0){
			for (var val in question_checkbox){
				document.write("Question: "+val.replace(/_/g," ")+"<br>");
				document.write("Answer: "+String(question_checkbox[val])+"<br>"+"<br>");
			}
		}
		document.write("</body>");
		document.write("</html>");
		}
	}
}


function testPrint() {
	if (sessionStorage.length == 0){
		alert("You must at least enter one question for the survey!")
	}
	else{
	document.write("<html>");
	document.write("<head><title>Questionnaire</title></head>");
	document.write("<body>");
	document.write("<font color=#1346AD size=+3>Survey Application Form</font>"+"<br>"+"<br>");
	document.write('<form action="" id="resultform">')
	for (var i = 0; i < sessionStorage.length; i++){
    	var test = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
    	var splitdoub = test["user_ques"].replace(/\s/g,"_");
		document.write("<br>"+"Question {0}:".format(String(i+1))+"\t"+test["user_ques"]+"<br>");
		if (test["radval"] == "Dropdown"){
			document.write("<select name="+splitdoub+">");
			for (var j in test["response_values"]){
				document.write('<option value={0}>{1}</option>'.format(test["response_values"][j],test["response_values"][j]));
			}
			document.write("</select>"+"<br>");	
		}
		else if (test["radval"] == "Radio Button"){
			for (var j in test["response_values"]){
				document.write('<input type="radio" name='+splitdoub+' value='+JSON.stringify(test["response_values"][j])+'>'+JSON.stringify(test["response_values"][j])+'<br>');
			}
		}
		else if (test["radval"] == "Check Box"){
			for (var j in test["response_values"]){
				document.write('<input type="checkbox" name='+splitdoub+' value='+JSON.stringify(test["response_values"][j])+'>'+JSON.stringify(test["response_values"][j])+'<br>');
			}
		}
		else if (test["radval"] == "Text Input"){
			document.write('<input type="text" name='+splitdoub+'>'+'<br>'+'<br>');
			}
    }
    document.write('<br><button type="button" onclick= "resultsFunc()" >Submit Survey!</button><br>');
    document.write("</form>");
	document.write("</body>");
	document.write("</html>");
	}
}
