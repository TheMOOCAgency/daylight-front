var scorm = pipwerks.SCORM;
var lmsConnected = false;
var score = 0;
var stopTwo = 0;
function handleError(msg){
  
}

function initCourse(){
	//scorm.init returns a boolean
	lmsConnected = scorm.init();

	//If the scorm.init function succeeded...
	if(lmsConnected){
	scorm.set("cmi.completion_status","incomplete");
	scorm.set("cmi.core.lesson_status","incomplete");
	scorm.set("cmi.success_status","failed");
	scorm.set("cmi.objectives.n.success_status","failed");


		//Let's get the completion status to see if the course has already been completed
		var completionstatus = scorm.get("cmi.core.score.raw");
		//If the course has already been completed...
		if(completionstatus == "completed" || completionstatus == "passed"){
			 //...let's display a message and close the browser window
			 handleError("You have already completed this course. You do not need to continue.");
		}
		//Now let's get the username from the LMS
		var learnername = scorm.get("cmi.core.student_name");
		//If the name was successfully retrieved...
		if(learnername){
		 //...let's display the username in a page element named "learnername"
		 /*document.getElementById("learnername").innerHTML = learnername; //use the name in the form*/
		}
		//If the course couldn't connect to the LMS for some reason...
	} else {
	//... let's alert the user then close the window.
	handleError("Error: Course could not connect with the LMS");
	}
}
function setComplete(){

	if(lmsConnected && stopTwo==1){
	
		scorm.set("cmi.core.lesson_status","completed");
		// scorm.set("cmi.core.success_status","completed");
		scorm.set("cmi.suspend_data", 'data');
		
		var scormScore=parseInt(localStorage.getItem('masterScore'))
		console.log("scormScore est égal à ..-.."+scormScore)
		scorm.set("cmi.core.score.raw", scormScore); 
		
		function began(){
		if(scormScore>50){ console.log("READY TO RUMBLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");scorm.set("cmi.core.lesson_status","passed");
		scorm.set("cmi.core.success_status","passed"); scorm.quit();stopTwo=5}
		else{scorm.quit();stopTwo=5}
	
		
	}
	began()
	}
}














