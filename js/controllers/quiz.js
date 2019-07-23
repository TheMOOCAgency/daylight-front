var stopPop = false;
var time = 99999;
var listElemA
var listElemB
var showListElMark
var showListElAns
var bindMyNestVar
var userAns = [];
var localStorageJs = Object.keys(localStorage);
var rodes

(function() {


    angular
        .module("turtleFacts")
        .controller("quizCtrl", QuizController);

    QuizController.$inject = ['quizMetrics', 'DataService'];


    function QuizController(quizMetrics, DataService) {

        var vm = this;
        vm.feedBack = false;
        vm.feedBackQuest = true;
        vm.feedBackGood = false;
        vm.feedBackWrong = false;
        vm.checkCorrectAnwer = checkCorrectAnwer;
        vm.testOf = testOf;
        vm.testOfQuart = testOfQuart;
        vm.timeSet = timeSet;
        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.questionAnswered = questionAnswered;
        vm.questionAnswered2 = questionAnswered2;
        vm.questionAnswered3 = questionAnswered3;
        vm.prevtest = prevtest;
        vm.setActiveQuestion = setActiveQuestion;
        // vm.setActiveQuestionMen = setActiveQuestionMen;
        vm.setMarkQuestion = setMarkQuestion;
        vm.setAllQuestion = setAllQuestion;
        vm.setAnsweredQuestion = setAnsweredQuestion;
        vm.selectAnswer = selectAnswer;
        vm.selectNoAnswer = selectNoAnswer;
        vm.finaliseAnswers = finaliseAnswers;
        vm.reloadTime = reloadTime;
        vm.activeQuestion = 0;
        vm.error = false;
        vm.finalise = false;
        vm.submit = true;
        vm.showPrev = false;
        vm.progressTimeBar = true;
        vm.quesTime = 60;
       
        var numQuestionsAnswered = 0;
        var rootMyQuest = 0;
        var rootMyQuestCompt = 0;
        var listMyMarked = false
        var listMyAnswered = false
        var listMyAll = false
        vm.quesImgShow = false;

        vm.listMyMarked = listMyMarked;
        vm.listMyAnswered = listMyAnswered;
        vm.listMyAll = listMyAll;
        listElemA = jQuery('.listMyRideA')
        listElemB = jQuery('.listMyRideB')

        var numberQUestion = 9999;
		
		vm.chronoButton=DataService.chronoButton
		vm.pauseButton=DataService.pauseButton
		vm.setShuffle=DataService.setShuffle
		vm.showResultConfig=DataService.showResultConfig	
		
		
		 vm.showResultConfig = DataService.showResultConfig;
		

        showListElMark = function() {
            for (var i = 0; i < numberQUestion; i++) {

                if (localStorage.getItem('mark' + i) == true || localStorage.getItem('mark' + i) == 'true')

                {
                    listElemA = jQuery('.listMyRideA');
                    $(listElemA[i]).css('font-size', '15px');
                } else {
                    $(listElemA[i]).css('font-size', ' 0px')
                }
            }

        }

        showListElAns = function() {
            for (var i = 0; i < numberQUestion; i++) {


                if (localStorage.getItem('questAns' + i) == true || localStorage.getItem('questAns' + i) == 'true')

                {
                    listElemA = jQuery('.listMyRideB');
                    $(listElemA[i]).css('font-size', ' 0px')
                }

                if (localStorage.getItem('questAns' + i) == false || localStorage.getItem('questAns' + i) == 'false' || localStorage.getItem('questAns' + i) == 'null' || localStorage.getItem('questAns' + i) == null || localStorage.getItem('questAns' + i) == 'undefined' || localStorage.getItem('questAns' + i) == undefined)

                {
                    listElemA = jQuery('.listMyRideB');
                    $(listElemA[i]).css('font-size', ' 15px')
                }

            }


        }



        $('.closeMeFor').click(function() {
            $(this).parent().fadeOut('slow');
            listMyMarked = false
            listMyAnswered = false
            listMyAll = false
        })

        function fadeMyDad() {
            $('.closer').fadeOut('slow');
            listMyMarked = false
            listMyAnswered = false
            listMyAll = false
        }




        function setMarkQuestion() {
            if (listMyMarked == true) {
                listMyMarked = false;
                $('#listOfMark').hide();
            } else {
                listMyMarked = true;
                listMyAnswered = false
                listMyAll = false
                $('#listOfMark').show();
                $('#listOfAnswer').hide();
                $('#listOfAll').hide();
                showListElMark();
            };

        }

        function setAnsweredQuestion() {
            if (listMyAnswered == true) {
                listMyAnswered = false
                $('#listOfAnswer').hide();
            } else {
                listMyAnswered = true
                listMyMarked = false
                listMyAll = false
                $('#listOfAnswer').show();
                showListElAns();
                $('#listOfMark').hide();
                $('#listOfAll').hide();
            }

        }

        function setAllQuestion() {
            if (listMyAll == true) {
                listMyAll = false
                listMyMarked = false
                listMyAnswered = false
                $('#listOfAll').hide();
            } else {
                listMyAll = true
                listMyMarked = false
                listMyAnswered = false
                $('#listOfAll').show();
                $('#listOfMark').hide();
                $('#listOfAnswer').hide();

            }

        }


        function prevtest() {
            if (activeWear < 1) {
                $('#showPrev').hide()
            }
        }

        function setActiveQuestion(index) {
            activeWear;
            if (activeWear == 0) {
                $('#showPrev').hide()
            }
            if (activeWear = !0) {
                $('#showPrev').show()
            }




            fadeMyDad()
            if (index === undefined) {
                var breakOut = false;

                var quizLength = DataService.quizQuestions.length - 1;

                while (!breakOut) {

                    vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;

                    if (vm.activeQuestion === 0) {
                        vm.error = false;
                    }

                    if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
                        breakOut = true;
                    }
                }
            } else {

                vm.activeQuestion = index;
                activeWear = vm.activeQuestion;

                markActive = 'mark' + activeWear
                var jiro = localStorage.getItem(markActive);

                function makePee() {
                    if (jiro == false || jiro == "false" || jiro == "null" || jiro == null) {
                        document.getElementById("subscribeNews").checked = false;

                    }
                    if (jiro == true || jiro == "true") {
                        document.getElementById("subscribeNews").checked = true;

                    }
                }
                makePee()
            }



        }


        var time = DataService.quesTime;
        var initialOffset = '440';
        var i = 1
        var interval = setInterval(function() {



        }, 1000);

        function timeSet() {
            myStopFunction();
            time = DataService.quesTime;
            reloadTime();

        }

        function closePop() {
            $(".popup").animate({
                width: "15%",
                opacity: 0,
            }, 1500);
            $(".popup").hide();
        }

        function myStopFunction() {

        }


        function reloadTime() {
            $('.timeLess').val(0);
        }



        function testTrue() {
            // if (i == time + 1 && vm.finalise == false && stopPop == false) {
            // time = DataService.quesTime;
            // $(".popup").show();
            // $(".popup").animate({
            // width: "15%",
            // opacity: 1,
            // }, 1500);
            // $(".questCol").hide();
            // time = 0;
            // $('.circle_animation').css('stroke-dashoffset', 0);
            // $('.timerText').text(0);
            // initialOffset = '440';
            // stopPop = true;
            // } else {
            // time = 999;
            // }


        }


        function addTenLimit() {


            var checkStop = parseInt(localStorage.getItem("stop"));
            var limit = parseInt(localStorage.getItem("limit"));
            localStorage.setItem("limit", 121);
        }

        function questionAnswered() {
            localStorageJs = Object.keys(localStorage)
            var ArrayCount = []

            for (var r = 0; r < TotalBindQuest; r++) {

                if (localStorage.getItem('questAns' + r == true) || localStorage.getItem('questAns' + r) == 'true') {
                    ArrayCount.push(r);
                    jQuery("#bindMyNest").text(ArrayCount.length)
                }

            }

            bindMyNestVar = parseInt(localStorage.getItem("rootMyQuestCompt"))
            if (isNaN(bindMyNestVar)) {
                bindMyNestVar = 0
            }
            jQuery("#bindMyNestTot").text(TotalBindQuest);


            if (DataService.quizQuestions[vm.activeQuestion].selected == null) {
                DataService.quizQuestions[vm.activeQuestion].selected = 999;
            }
            rootMyQuest = rootMyQuest + 1;
            localStorage.setItem("rootMyQuest", rootMyQuest)

            vm.submit = false;

        };

        function questionAnswered2() {


            if (vm.finalise == false) {
                vm.feedBack = false;
                vm.feedBackQuest = true;
                vm.submit = true;
                var quizLength = DataService.quizQuestions.length;
                numQuestionsAnswered = 0;

                for (var x = 0; x < quizLength; x++) {
                    if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                        numQuestionsAnswered++;
                        if (numQuestionsAnswered >= quizLength) {
                            for (var i = 0; i < quizLength; i++) {
                                if (DataService.quizQuestions[i].selected === null) {
                                    setActiveQuestion(activeWear + 1);
                                    return;
                                }
                            }

                            vm.error = false;
                            vm.finalise = true;
                        }
                    }
                }

            }
        }

        function dontDisplayPrev() {
            $('#showPrev').hide();
        }

        function questionAnswered3() {
            questionAnswered()

            if (vm.finalise == false) {
                vm.feedBack = false;
                vm.feedBackQuest = true;
                vm.submit = true;
                var quizLength = DataService.quizQuestions.length;
                numQuestionsAnswered = 0;

                for (var x = 0; x < quizLength; x++) {
                    if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                        numQuestionsAnswered++;
                        if (numQuestionsAnswered >= quizLength) {
                            for (var i = 0; i < quizLength; i++) {
                                if (DataService.quizQuestions[i].selected === null) {
                                    var menoManStop = activeWear - 1;
                                    if (menoManStop <= 0) {
                                        menoManStop = 0;
                                        dontDisplayPrev();
                                    }
                                    setActiveQuestion(menoManStop);
                                    return;
                                }
                            }

                            vm.error = false;
                            vm.finalise = true;
                        }
                    }
                }

            }
        }

        function testOfQuart() {

        };

        function testOf() {
            if (vm.finalise == false) {
                setTimeout(testOfQuart, 500)
            }
        };
        var increQuest = 0;

        function checkCorrectAnwer(index) {

            index = DataService.quizQuestions[vm.activeQuestion].selected;
            if (index + 1 === DataService.correctAnswers[vm.activeQuestion]) {
                increQuest = increQuest + 1;
                vm.feedBack = true;
                vm.feedBackQuest = false;
                vm.feedBackGood = true;
                vm.feedBackWrong = false;
            } else {
                // DataService.quizQuestions[vm.activeQuestion].selected = 99;
                $('.bg-info').addClass('bg-info-false');
                vm.feedBack = true;
                vm.feedBackQuest = false;
                vm.feedBackGood = false;
                vm.feedBackWrong = true;

            }

        }


        function selectAnswer(index) {

            if (DataService.quizQuestions[vm.activeQuestion].selected == index) {
                localStorage.setItem('questAns' + activeWear, false);
                rootMyQuestCompt = rootMyQuestCompt - 1;
                localStorage.setItem("rootMyQuestCompt", rootMyQuestCompt);


                DataService.quizQuestions[vm.activeQuestion].selected = null;
                index = null;
                userAns[activeWear] = null;
            } else {
                DataService.quizQuestions[vm.activeQuestion].selected = index;
                userAns[activeWear] = index + 1;


                var testStock = DataService.quizQuestions[vm.activeQuestion].selected;
                rootMyQuestCompt = rootMyQuestCompt + 1;
                localStorage.setItem("rootMyQuestCompt", rootMyQuestCompt);
                localStorage.setItem('questAns' + activeWear, true)
            }



        }

        function selectNoAnswer(index) {
            DataService.quizQuestions[vm.activeQuestion].selected = index;
        }

        function finaliseAnswers() {
            stopTwo = 1;
            vm.finalise = false;
            numQuestionsAnswered = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);
            quizMetrics.numCorrect = increQuest;
        }
    }


})();