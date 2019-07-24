// variable à Régler pour le nombre de questions
// variable à Régler pour le nombre de questions
var quizReglageNumber;
// variable à Régler pour le nombre de questions
// variable à Régler pour le nombre de questions

var quizQuestions = [];
var listShuffle;

var correctAnswers = [];
var correctAnswersB = [];

var qArray = '';
var bArray = '';
var dopamine;
var loadQuestion;
var loadAnswers;
var maxQuest = 20;
var maxQuestConfig;

// from configJson
// from configJson
// from configJson
var chronoButton;
var pauseButton;
var setShuffle;
var showResultConfig = true; //TODO error always true
var passScore;
// from configJson
// from configJson
// from configJson

var dataObj;

var qArray = '';
var bArray = '';

function trueForce() {
  $.ajax({
    url: `https://firestore.googleapis.com/v1/projects/daylight-dev2/databases/(default)/documents/quiz/${quizID}`,
    type: 'GET',
    dataType: 'html',
    header: 'Content-Type: application/json',
    cache: false,
    processData: false,
    success: function(data) {
      var quiz = JSON.parse(data).fields.config.mapValue.fields;
      const questionsSetId = parseInt(quiz.questionsSetId.integerValue);

      $.ajax({
        url: `https://firestore.googleapis.com/v1/projects/daylight-dev2/databases/(default)/documents/questions/${questionsSetId}`,
        type: 'GET',
        dataType: 'html',
        header: 'Content-Type: application/json',
        cache: false,
        processData: false,
        success: function(data) {
          const questionsSource = JSON.parse(data).fields;

          // qNameFile = quiz.question_file_name.stringValue;
          // aNameFile = quiz.answers_file_name.stringValue;
          maxQuestConfig =
            questionsSource.quizQuestionList.arrayValue.values.length; // not quiz_n_questionsMax anymore
          quizReglageNumber = parseInt(quiz.quiz_n_questions.integerValue);
          chronoButton = quiz.chronoButton.booleanValue;
          pauseButton = quiz.pauseButton.booleanValue;
          setShuffle = quiz.setShuffle.booleanValue;
          if (chronoButton == false || chronoButton == 'false') {
            chronoButton == false;
          }
          if (pauseButton == false || pauseButton == 'false') {
            pauseButton == false;
          }
          if (setShuffle == false || setShuffle == 'false') {
            setShuffle == false;
          }
          if (chronoButton == true || chronoButton == 'true') {
            chronoButton == true;
            $('#chronos').attr('style', ' visibility:visible');
          }
          if (pauseButton == true || pauseButton == 'true') {
            pauseButton == true;
            $('#pausa').attr('style', ' visibility:visible');
          }
          if (setShuffle == true || setShuffle == 'true') {
            setShuffle == true;
          }

          showResultConfig = quiz.showResultConfig.booleanValue;
          passScore = parseInt(quiz.passScore.integerValue);
          loadQuestion(questionsSetId);
          loadAnswers(questionsSetId);

          var maxQuest = quizReglageNumber;

          if (
            maxQuest == 0 ||
            maxQuest == 'undefined' ||
            maxQuest == 'null' ||
            maxQuest == null
          ) {
            maxQuest = quizReglageNumber;
          }

          for (var i = 0; i < maxQuestConfig; i++) {
            list[i] = i; // 0 to 100
          }
          listShuffleBrut = shuffle(list);
          listShuffle = listShuffleBrut.slice(0, maxQuest);
        }
      });
    }
  });
}

function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    {
      if (setShuffle == true) {
        j = Math.floor(Math.random() * (i + 1));
      }
      if (setShuffle == false) {
        j = i;
      }

      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  return array;
}

var list = new Array();

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}

var number = getUrlVars()['numbers'];
var quesTime = 1;

(function() {
  angular.module('turtleFacts').factory('DataService', DataService);

  function DataService() {
    dataObj = {
      turtlesData: turtlesData,
      quizQuestions: quizQuestions,
      correctAnswers: correctAnswers,
      quesTime: quesTime,
      configArray: configArray,
      chronoButton: chronoButton,
      pauseButton: pauseButton,
      setShuffle: setShuffle,
      showResultConfig: showResultConfig,
      passScore: passScore,
      configArray2: configArray2
    };

    return dataObj;
  }

  // function postOrPreTexan() {
  //   var beBack;
  //   if (postOrPre == 'Pre') {
  //     beBack = 'pre';
  //   } else {
  //     beBack = 'post';
  //   }
  //   return beBack;
  // }

  // var masterQuestIMGURL =
  //   imgUrl + 'quiz' + quizID + '/' + postOrPreTexan() + '/';
  // var masterAnswerIMGURL =
  //   imgUrl + 'quiz' + quizID + '/' + postOrPreTexan() + '/';
  // var masterAnswerSongURL = 'ressourses/son/';
  // var masterQuestionSongURL = 'ressourses/son/';

  dopamine = function() {
    correctAnswers.length = quizReglageNumber;
    for (i = 0; i < listShuffle.length; i++) {
      correctAnswers[i] = parseInt(bArray[listShuffle[i]].integerValue); // also modified for firestore rest api architecture
    }
  };

  trueForce();

  loadQuestion = function(questionsSetId) {
    $.ajax({
      url: `https://firestore.googleapis.com/v1/projects/daylight-dev2/databases/(default)/documents/questions/${questionsSetId}`,
      type: 'GET',
      dataType: 'html',
      header: 'Content-Type: application/json',
      cache: false,
      processData: false,
      success: function(data) {
        const questionsSource = JSON.parse(data).fields;
        qArray = questionsSource.quizQuestionList.arrayValue.values;
        aArray = questionsSource.answersList.arrayValue.values;

        for (var i = 0; i < listShuffle.length; i++) {
          quizQuestions.push({
            type: 'text',
            text:
              qArray[listShuffle[i]].mapValue.fields.question_prequel
                .stringValue,
            possibilities: [
              {
                answer:
                  qArray[listShuffle[i]].mapValue.fields.possibilities
                    .arrayValue.values[0].stringValue
              },
              {
                answer:
                  qArray[listShuffle[i]].mapValue.fields.possibilities
                    .arrayValue.values[1].stringValue
              },
              {
                answer:
                  qArray[listShuffle[i]].mapValue.fields.possibilities
                    .arrayValue.values[2].stringValue
              },
              {
                answer:
                  qArray[listShuffle[i]].mapValue.fields.possibilities
                    .arrayValue.values[3].stringValue
              }
            ],
            question_id: i + 1,
            question_id_true: parseInt(
              qArray[listShuffle[i]].mapValue.fields.question_id.integerValue
            ),
            selected: null,
            correct: null,
            feedBack:
              qArray[listShuffle[i]].mapValue.fields.feedback.stringValue,
            questionImgUrl:
              qArray[listShuffle[i]].mapValue.fields.imageURLQB.stringValue,
            // masterQuestIMGURL +
            // 'q' +
            // parseInt(parseInt([listShuffle[i]]) + 1) +
            // '.png',
            answerImgUrl:
              qArray[listShuffle[i]].mapValue.fields.imageURLQE.stringValue,
            // masterQuestIMGURL +
            // 'r' +
            // parseInt(parseInt([listShuffle[i]]) + 1) +
            // '.png',
            questionImgContain: qArray[listShuffle[i]].questionImgContain // TODO ??
          });
          // console.log(
          //   qArray[listShuffle[i]].mapValue.fields.imageURLQB.stringValue
          // );

          quizQuestions[0].selected = true;

          if (qArray[i].selected == 1) {
            quizQuestions[i].selected = true;
          }
          if (qArray[i].selected == 0) {
            quizQuestions[i].selected = null;
          }
        }
      }
    });
  };

  loadAnswers = function(questionsSetId) {
    $.ajax({
      url: `https://firestore.googleapis.com/v1/projects/daylight-dev2/databases/(default)/documents/questions/${questionsSetId}`,
      type: 'GET',
      dataType: 'html',
      header: 'Content-Type: application/json',
      cache: false,
      processData: false,
      success: function(data) {
        const questionsSource = JSON.parse(data).fields;

        //qArray = x.quiz1a; //undefined, no "quiz1a" in firestore data
        bArray = questionsSource.answersList.arrayValue.values;

        // Not use because bArray === correctAnswersB
        // correctAnswersB = $.map(bArray, function(value, listShuffle) {
        //   return value;
        // });

        dopamine();

        for (var i = 0; i < listShuffle.length; i++) {
          correctAnswers[i] = parseInt(bArray[listShuffle[i]].integerValue);
        }
      }
    });
  };

  var turtlesData = [
    {
      type: 'GHPSJ',
      image_url: 'http://www.hpsj.fr/wp-content/uploads/2015/01/vue-nuit.jpg',
      locations: "UN STATUT SPÉCIFIQUE, FRUIT D'UNE HISTOIRE",
      // size: "Up to 1.5m and up to 300kg",
      // lifespan: "Over 80 years",
      // diet: "Herbivore",
      description:
        "Le Groupe hospitalier Paris Saint-Joseph (GHPSJ) est un hôpital privé à but non lucratif, Établissement de Santé Privé d'Intérêt Collectif (ESPIC).Il est issu en 2006 de la fusion de trois hôpitaux du sud parisien fondés au 19ème siècle qui sont Saint-Joseph, Notre Dame de Bon Secours et Saint-Michel auxquels s'ajoute l'Institut de Formation en Soins Infirmiers (IFSI).Le GHPSJ est administré par la Fondation hôpital Saint-Joseph."
    }
    // ,{
    // type: "Loggerhead Turtle",
    // image_url: "http://i.telegraph.co.uk/multimedia/archive/02651/loggerheadTurtle_2651448b.jpg",
    // locations: "Tropical and subtropical oceans worldwide",
    // size: "90cm, 115kg",
    // lifespan: "More than 50 years",
    // diet: "Carnivore",
    // description: "Loggerhead turtles are the most abundant of all the marine turtle species in U.S. waters. But persistent population declines due to pollution, shrimp trawling, and development in their nesting areas, among other factors, have kept this wide-ranging seagoer on the threatened species list since 1978. Their enormous range encompasses all but the most frigid waters of the world's oceans. They seem to prefer coastal habitats, but often frequent inland water bodies and will travel hundreds of miles out to sea."
    // }
  ];
})();
