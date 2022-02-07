    console.log("loading stimuli list");
    // to manually preload media files, create an array of file paths for each 
    // media type
    var path = "/Users/panosmavros/Dropbox/FCL_Panos/01_Projects/NICE/NICE_Group-Folder/3_materials/videos/"
    
    var  videos = [
        '9convert.com - Walking New York City on a Springlike Day Manhattan NYC Waking Tour.mp4_1.mp4',
        '9convert.com - Walking New York City on a Springlike Day Manhattan NYC Waking Tour.mp4_2.mp4',
        '9convert.com - Walking New York City on a Springlike Day Manhattan NYC Waking Tour.mp4_3.mp4',
        '9convert.com - Walking New York City on a Springlike Day Manhattan NYC Waking Tour.mp4_4.mp4'
    ];

    var video_stimuli = [];

    videos.forEach(prependPath);

    function prependPath(item, index, arr) {
        item = path + item;
        video_stimuli.push({ stimulus: item, correct_response: 'NO_KEYS' });

    }

    // function prependPath(item, index, arr) {
    //     // item = path + item;
    //     video_stimuli.push(path + item);

    // }
