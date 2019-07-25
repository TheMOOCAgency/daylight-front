var quizID = '15';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

if(getUrlVars()["quizID"]){
  quizID = getUrlVars()["quizID"];
}

