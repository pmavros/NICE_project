 /* elements to include */

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
 

const jsPsych = initJsPsych({
    override_safe_mode: true,
    on_finish: function () {
            jsPsych.data.displayData();

            /* redirect to prolific for thank you etc
             disabled during the development */

            // window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX"

        }
    });


    // // capture info from Prolific
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


      /* preload images */
    var preload = {
      type: jsPsychPreload,
      videos: videos
    };
    timeline.push(preload);


    /* define welcome message trial */
    var welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "Welcome to the experiment. Press any key to begin."
    };
    timeline.push(welcome);

    /* define instructions trial */
    var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
        <p>In this experiment, a circle will appear in the center
        of the screen.</p><p>If the circle is <strong>blue</strong>,
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='stimuli/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div style='float: right;'><img src='stimuli/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
      `,
        post_trial_gap: 100
    };

    timeline.push(instructions);

    /* define trial stimuli array for timeline variables */

    // var video_stimuli = [];
    // videos.forEach( function(v) {

    //     video_stimuli.push({ stimulus: v });

    // });

    var video_stimuli = [
        {stimulus: videos[1], data: { test_part: 'test', correct_response: 'f' }}, 
        {stimulus: videos[2], data: { test_part: 'test', correct_response: 'f' }}
    ];

    /* define fixation and test trials */
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

    // video trials 
    // these video files cannot be automatically preloaded because they are passed 
    // into a trial using the jsPsych.timelineVariable function
    // var video_trials = {
    //         type: jsPsychVideoKeyboardResponse,
    //         stimulus: [
    //             video_stimuli[1],
    //             ],//jsPsych.timelineVariable('stimulus') , // can't get this to work properly !!
    //         choices: 'NO_KEYS',  // ['y', 'n'],
    //         data: {
    //             task: 'stimulus',
    //             // perhaps here we ask them a question to ensure they were paying attention
    //             // correct_response: jsPsych.timelineVariable('correct_response')
    //         },
    //         trial_ends_after_video: false // change to true for deployment
    //         // on_finish: function (data) {
    //         //     data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    //         // }
    // }
    // var video = [
    //     path + videos[1]
    // ];
    
    /* define trial stimuli array for timeline variables */
    var test_stimuli = [
        { stimulus: "stimuli/fish.mp4", correct_response: 'y' },
        { stimulus: "stimuli/fish.mp4", correct_response: 'n' }

    ];


    var test = {
      type: jsPsychVideoKeyboardResponse,
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: ['y', 'n']
    };

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

   var sam = {
    type: jsPsychImageButtonResponse, // jsPsychImageSliderResponse, 
    stimulus: ['./src/SAM-vectors-master/sam_valence.png', './src/SAM-vectors-master/sam_arousal.png'],
    maintain_aspect_ratio: true,
    stimulus_width: 1200,
    choices: [1,2,3,4,5,6,7,8,9],
    prompt: "<p>How did you feel while watching the videoclip?</p>",
   };

   var sam = {
    type: jsPsychImageButtonResponse, // jsPsychImageSliderResponse, 
    stimulus: ['./src/SAM-vectors-master/sam_valence.png', './src/SAM-vectors-master/sam_arousal.png'],
    maintain_aspect_ratio: true,
    stimulus_width: 1200,
    choices: [1,2,3,4,5,6,7,8,9],
    prompt: "<p>Please rate your sense of being in this environment, on the following scale from 1 to 7, where 7 represents your normal experience of being in a place.</p>",
   };


var presence = {
      type: jsPsychSurveyLikert,
      questions: {prompt: 'I had a sense of being there in that place', name: 'presence', required: true, labels: likert1to7},        
      randomize_question_order: false
    };
   













    timeline.push(sam);

    var  video_stimuli = [
        { stimulus: ["stimuli/9convert.com - Walking New York City on a Springlike Day Manhattan NYC Waking Tour.mp4_1.mp4"]},
        { stimulus: ["stimuli/9convert.com - Walking New York City on a Springlike Day Manhattan NYC Waking Tour.mp4_2.mp4"]}
     ];

 /* define test procedure */
    var test_procedure = {
        timeline: [ test, sam],
        timeline_variables: video_stimuli,
        repetitions: 2,
        randomize_order: false
    };

     timeline.push(test_procedure);


    // timeline.push(survey);

    /* define debrief */
    // var debrief_block = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: function () {

    //         var trials = jsPsych.data.get().filter({ task: 'response' });
    //         var correct_trials = trials.filter({ correct: true });
    //         var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    //         var rt = Math.round(trials.select('rt').mean());

    //         return `<p>You responded correctly on ${accuracy}% of the trials.</p>
    //       <p>Your average response time was ${rt}ms.</p>
    //       <p>Press any key to complete the experiment. Thank you!</p>`;

    //     }
    // };
    // timeline.push(debrief_block);


    // var final_trial = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: `<p>You've finished the last task. Thanks for participating!</p>
    // <p><a href="https://app.prolific.co/submissions/complete?cc=XXXXXXX">Click here to return to Prolific and complete the study</a>.</p>`,
    //     choices: "NO_KEYS"
    //     }
    // timeline.push(final_trial);

    jsPsych.run(timeline);