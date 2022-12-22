 /* elements to include */

    // integration with prolific - added
    // information sheet
    // consent form
    // instructions
    // task stimuli
    // manipulation check (did they watch the videos?)
    // survey per stimuli
    // psychometric
    // demographic
    // redirect to prolific
 
    /* initialize jsPsych */
    var jsPsych = initJsPsych({
        override_safe_mode: true,
        on_finish: function () {
            jsPsych.data.displayData();

            /* redirect to prolific for thank you etc
             disabled during the development */

            // window.location = "https://app.prolific.co/submissions/complete?cc=XXXXXXX"

        }
    });

    /* create timeline */
    var timeline = [];


    // // capture info from Prolific
    // var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
    // var study_id = jsPsych.data.getURLVariable('STUDY_ID');
    // var session_id = jsPsych.data.getURLVariable('SESSION_ID');

      // jsPsych.data.addProperties({
      //   subject_id: subject_id,
      //   study_id: study_id,
      //   session_id: session_id
      // });

    
    /* define welcome message trial */
    var welcome = {
        type: "html-keyboard-response",
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
    
    // timeline.push(instructions);

    /* start the experiment */
    // jsPsych.run(timeline);


