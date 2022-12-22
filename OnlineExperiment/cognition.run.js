 /* elements to include 

    // integration with prolific - added
    // information sheet
    // consent form
    // instructions
    // task stimuli
    // manipulation check (did they watch the videos?)
    // survey per stimuli
    // psychometric
    // IPC
    // 
    // demographic
    // redirect to prolific
    
*/
 
 
const jsPsych = initJsPsych({
    override_safe_mode: true,
    show_progress_bar: true,
    on_finish: function () {
            jsPsych.data.displayData();

            /* redirect to prolific for thank you etc
            disabled during the development */

            // window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX"

        }
    });
    
    
var images = ['/sam_arousal.png', '/sam_valence.png'];

var preload = {
    type: jsPsychPreload,
    auto_preload: true,
    images: images,
   
}

/* capture info from Prolific */

// var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
// var study_id = jsPsych.data.getURLVariable('STUDY_ID');
// var session_id = jsPsych.data.getURLVariable('SESSION_ID');

// jsPsych.data.addProperties({
//   subject_id: subject_id,
//   study_id: study_id,
//   session_id: session_id
// });

/* create timeline */
var timeline = [];

var sam_images = [
  {image: '/sam_valence.png'},
  {image: '/sam_arousal.png'}
  ];    
  
var test_stimuli = [
  {stimulus: 'https://player.vimeo.com/external/675454989.hd.mp4?s=f659a7fba2ea852b29d57d28e9a5ddbf8e532001&profile_id=169&oauth2_token_id=1594257730'},
  {stimulus: 'https://player.vimeo.com/progressive_redirect/playback/668029847/rendition/1080p?loc=external&signature=0bc7b79f737636d3d48c831e3bcfa613f21f41ab9b6e3838b6e81ea7851f7ee9'},
  {stimulus: `https://player.vimeo.com/progressive_redirect/playback/74002013/rendition/720p?loc=external&signature=ff7705545dff52ec634704c0c92aa8b04292e42b0ef1b745fb5379f0ed8b50fc`},
];
   
    
// /* define welcome message trial */
// var welcome_fun = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: jsPsych.timelineVariable('text'),
// };

// var welcome_text = {
//   timeline: welcome_fun,
//   timeline_variables: [
//     {text: 'Welcome'},
//     {text: 'to'},
//     {text: 'the'},
//     {text: 'experiment!'}
//     ],
//   // randomize_order: true,
//   repetitions:1 // how many times to repeat each stimulus
// }
// timeline.push(welcome_text);

var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome);

    
/* define instructions trial */
var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
  <p>In this experiment, we will show you a number of videos.</p>
  <p>The videos show someone walking in a place (e.g. a street), 
  from a first-person perspective, </p> in other words, as if you were walking. 

  <p> After the end of each video, there are few questions
  <p> Please answer as fast as you can.</p>

  <p>Press any key to begin.</p>
  `,
  post_trial_gap: 100
};

timeline.push(instructions);
    
/* define fixation cross (pre-trials) */
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: function () {
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  },
  data: {
    task: 'fixation'
  }
};

/* define test trial (stimulus presentation */  
var trial = {
  type: jsPsychHtmlSliderResponse,
  stimulus: function() {
    var stim = '<p style="font-size:30px;font-weight:bold;">'+jsPsych.timelineVariable('text')+'</p>';
    var stim = 
    `
    <div style="max-width:600px;"> 
    <video id="myVid" disablepictureinpicture=true muted loop=false crossorigin:anonymous autoplay width = "600">
    <source type="video/mp4" src = `+
    jsPsych.timelineVariable('stimulus')+
    `>
    </video>
    <p>What do you think about the place shown in this video?</p> 
    </div>
    `;

    return stim;
  },
  labels: ['beautiful', 'ugly'],
  prompt: "",
  stimulus_duration: 5000,
  trial_duration: 30000,
  response_ends_trial: true,
  require_movement: true,
  data: {
    task: 'stimulus'
  }

}

/*  
    make the video stop after X time, 
    typically this is done by jspsych 
    but does not work now with the video 
*/  
  
    // video.addEventListener("timeupdate", function(){
    // if(this.currentTime >= 5 * 60) {
    //     this.pause();
    // }
    // });
    
    // var endTime = 0;
    // var video = document.getElementsByTagName("video");
    // const onTimeUpdate = () => {
    // if (video.currentTime >= (endTime - 0.05)) {
    //   video.pause()
    // } else {
    //   window.requestAnimationFrame(onTimeUpdate)
    // }
    // }
    // window.requestAnimationFrame(onTimeUpdate)

/* psychometric scales */

 // survey
    var likert_scale = [ 
      "Strongly Disagree", 
      "Disagree", 
      "Neutral", 
      "Agree", 
      "Strongly Agree"
    ];
    var bipolar_scale_0 = [-3,-2,-1, 0, 1,2,3];
    var bipolar_scale_no0 = [-3,-2,-1, 1,2,3];
    var likert1to7 = [1,2,3,4,5,6,7];


    var ipc_questions = [];
    ipc.forEach( function (item) {
        ipc_questions.push({prompt: item, name: 'IPC', required: true, labels: bipolar_scale_0});
    });
    var ipc = {
      type: jsPsychSurveyLikert,
      questions: ipc_questions,        
      randomize_question_order: false
    };

    
    var ipip6_questions = [];
    ipip6.forEach( function (item) {
        ipip6_questions.push({prompt: item, name: 'IPIP', required: true, labels: bipolar_scale_0});
    });
    var ipip6 = {
          type: jsPsychSurveyLikert,
          questions: ipip6_questions,        
          randomize_question_order: false
        };


    var dsm5_questions = [];
    dsm5.forEach( function (item) {
        dsm5_questions.push({prompt: item, name: 'dsm5', required: true, labels: bipolar_scale_0});
    });
    var dsm5 = {
      type: jsPsychSurveyLikert,
      questions: dsm5_questions,        
      randomize_question_order: false
    };


    var ders_questions = [];
    ders.forEach( function (item) {
        ders_questions.push({prompt: item, name: 'ders', required: true, labels: bipolar_scale_0});
    });
    var ders = {
      type: jsPsychSurveyLikert,
      questions: ders_questions,        
      randomize_question_order: false
    };

    var supps_sf_questions = [];
    supps_sf.forEach( function (item) {
        supps_sf_questions.push({prompt: item, name: 'supps_sf', required: true, labels: bipolar_scale_0});
    });
    var supps_sf = {
      type: jsPsychSurveyLikert,
      questions: supps_sf_questions,        
      randomize_question_order: false
    };

    var bidrsf_questions = [];
    bidrsf.forEach( function (item) {
        bidrsf_questions.push({prompt: item, name: 'bidrsf', required: true, labels: bipolar_scale_0});
    });
    var bidrsf = {
      type: jsPsychSurveyLikert,
      questions: bidrsf_questions,        
      randomize_question_order: false
    };

    var sias6_sf_questions = [];
    sias6_sf.forEach( function (item) {
        sias6_sf_questions.push({prompt: item, name: 'sias6_sf', required: true, labels: bipolar_scale_0});
    });
    var sias6_sf = {
      type: jsPsychSurveyLikert,
      questions: sias6_sf_questions,        
      randomize_question_order: false
    };

    var sps_sf_questions = [];
    sps_sf.forEach( function (item) {
        sps_sf_questions.push({prompt: item, name: 'sps_sf', required: true, labels: bipolar_scale_0});
    });
    var ders = {
      type: jsPsychSurveyLikert,
      questions: sps_sf_questions,        
      randomize_question_order: false
    };


    var nss_sf_questions = [];
    nss_sf.forEach( function (item) {
        nss_sf_questions.push({prompt: item, name: 'nss_sf', required: true, labels: bipolar_scale_0});
    });
    var nss_sf = {
      type: jsPsychSurveyLikert,
      questions: nss_sf_questions,        
      randomize_question_order: false
    };


    // var ipc = {
    //   type: jsPsychSurveyLikert,
    //   questions: ipc_questions,
    //   preamble: `
    //   <div class= "centre">
    //   <p> On the next page is a series of attitude statements. 
    //   Each represents a commmonly held opinion. 
    //   There are no right or wrong answers. 
    //   You will probably agree with some items and disagree with others.
    //   We are interested in the extent to which you agree or disagree with such matters of opinion. 
    //   Read each statement carefully. 
    //   Then indicate the extent to which you agree or disagree by circling the number following each statement.     
    //   First impressions are usually best. 
    //   Read each statement, decide if you agree or disagree and the strength of your opinion, and then circle the appropriate number. 
    //   If you find that the numbers to be used in answering do not adequately reflect your opinion, use the one that is closest to the way you feel. 
    //   </p></div>`,        
    //   randomize_question_order: false
    // };

var sam_procedure = {
    timeline: [
       {
            type: jsPsychImageButtonResponse,
            stimulus: jsPsych.timelineVariable('image'),
            render_on_canvas: true,
            maintain_aspect_ratio: true,
            stimulus_height: 400,
            choices: [1,2,3,4,5,6,7,8,9],
            prompt: "How did you feel?"
        }
    ],
    timeline_variables: [
        { image: '/sam_arousal.png', name: 'sam_arousal' },
        { image: '/sam_valence.png', name: 'sam_valence' }
    ],
    randomize_order: true,
  data: {
    task: 'sam'
  }
}

// Please rate your sense of being in this environment, on the following scale from 1 to 7, where 7 represents your normal experience of being in a place.
var presence = {
  type: jsPsychSurveyLikert,
  questions: [{
    prompt: 'I had a sense of being there in that place.', 
    name: 'presence', 
    required: true, 
    labels: likert_scale

  }],        
  randomize_question_order: false,
  data: {
    task: 'presence'
  }
};
   
/* define test procedure */
var trial_procedure = {
  timeline: [fixation, trial, sam_procedure, presence],
  timeline_variables: test_stimuli,
  randomize_order: true,
  repetitions:1 // how many times to repeat each stimulus
}

timeline.push(trial_procedure);    

/* start the experiment */
jsPsych.run(timeline);