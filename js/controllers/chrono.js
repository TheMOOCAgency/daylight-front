 localStorage.setItem("ale",true);
                  var time_in_minutes = TotalTime;
                  var current_time = Date.parse(new Date());
                  var deadline = new Date(current_time + time_in_minutes*60*1000);
                  
                  
                  function time_remaining(endtime){
                  	var t = Date.parse(endtime) - Date.parse(new Date());
                  	var seconds = Math.floor( (t/1000) % 60 );
                  	var minutes = Math.floor( (t/1000/60) % 60 );
                  	var hours = Math.floor( (t/(1000*60*60)) % 24 );
                  	var days = Math.floor( t/(1000*60*60*24) );
                  	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
                  }
                  
                  var timeinterval;
                  function run_clock(id,endtime){
                  	var clock = document.getElementById(id);
                  	function update_clock(){
                  		var t = time_remaining(endtime);
                  		clock.innerHTML = t.hours+'h '+t.minutes+'m '+t.seconds+'s';
                  		if(t.total<=0){ clearInterval(timeinterval); }
                  	}
                  	update_clock(); // run function once at first to avoid delay
                  	timeinterval = setInterval(update_clock,1000);
                  }
                  run_clock('clockdiv',deadline);
                  
                  
                  var paused = false; // is the clock paused?
                  var time_left; // time left on the clock when paused
                  
                  function pause_clock(){
                  	if(!paused){
                  		paused = true;
                  		clearInterval(timeinterval); // stop the clock
                  		time_left = time_remaining(deadline).total; // preserve remaining time
                  	}
                  }
                  
                  function resume_clock(){
                  	if(paused){
                  		paused = false;
                  
                  		// update the deadline to preserve the amount of time remaining
                  		deadline = new Date(Date.parse(new Date()) + time_left);
                  
                  		// start the clock
                  		run_clock('clockdiv',deadline);
                  	}
                  }
                  var readyOrNot='not'
                  function pauseMyJob(){ pause_clock();beatBox();
                  
                  }
                  
                  
                  
                  
                  
                  
                  
                  document.getElementById('pausa').onclick = pauseMyJob;
                  
                  function beatBox(){bootbox.dialog({
                  title: 'Le Quiz est actuellement en Pause ',
                  message: "<p>Pour continuer, merci de cliquer sur bouton ci-dessous.</p>",
                  buttons: {
                     
                      ok: {
                          label: "Reprendre le Quiz",
                          className: 'btn-info',
                          callback: function(){
                             resume_clock();
                          }
                      }
                  }
                  });
                  
                  }
                  
                  
                  
                  