





 // angular
        // .module("turtleFacts")
        // .controller("JsCtrl", JsController);

 // function JsController(quizMetrics, DataService) {

        // var vm = this;
        // vm.feedBack = false;
        // vm.feedBackQuest = true;
        // vm.feedBackGood = false;
		// vm.feedBackWrong = false;
		// vm.dataService = DataService;
		// var time = DataService.quesTime;
        // var initialOffset = '440';
        // var i = 1
        // var interval = setInterval(function() {
            // $('.circle_animation').css('stroke-dashoffset', initialOffset - (i * (initialOffset / time)));
            // $('.timerText').text(i);
            // if (i == time + 1 && vm.finalise==false) {
                // clearInterval(interval);$(".popup").show();
				// $(".popup").animate({width: "40%",opacity: 1,}, 1500 );
				// $(".questCol").hide();
            // }
            // i++;
        // }, 1000);
		// }




function fadeOutInQuest(){$( ".startQuest" ).hide();$( ".startQuest" ).fadeToggle("slow");$("#progressbar1").show();}
function fadeOutInfeedBack(){$( ".feedBack" ).hide();$( ".feedBack" ).fadeToggle("slow");};
function closePop(){$(".popup").animate({width: "40%",opacity: 0,}, 1500 );$(".popup").hide();}

