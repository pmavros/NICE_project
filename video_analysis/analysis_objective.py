import glob
import os

import imageio  # also requires imageio-ffmpeg
import numpy as np
import pandas as pd
import pyllusion as pyl
import skvideo.utils
from matplotlib import pyplot as plt

stimuli_dir = "C:/Dropbox/vimeo/"

data = []  # Initialize empty list for data
for stim in glob.glob(os.path.join(stimuli_dir, "*.mp4")):
    print(stim)

    # Read video
    video = imageio.get_reader(stim, "ffmpeg")

    # Convert to array (time, height, width, channels)
    videodata = np.array([i for i in video])

    print(plt.imshow(videodata[0]))  # Show first frame

    n_frames = video.count_frames()

    # Initialize output
    out = {
        x: np.full(n_frames, np.nan)
        for x in [
            "Redness",
            "Greenness",
            "Blueness",
            "Yellowness",
            "RedGreen",
            "BlueYellow",
            "Colorfulness",
            "Contrast",
            "Structure",
            "Saturation",
            "Entropy",
            "Brightness",
            "Luminance",
            "Luminance_Perceived",
        ]
    }

    # Naturalness score
    # bw = np.empty(videodata.shape[0:3] + (1,), dtype="float32")
    # for frame in range(len(bw)):
    #     bw[frame, :, :, :] = skvideo.utils.rgb2gray(videodata[frame])[0, :, :, :]
    # skvideo.measure.niqe(bw)  # Doesn't work (bug in scikit-video, maybe it'll be fixed in the future)

    # Compute per frame
    for i, frame in enumerate(video):
        if i % 100 != 0:  # Iterate every nth element
            continue
        print(np.round(i / n_frames * 100, 2), "%")
        scores = pyl.analyze_image(frame)
        for key, value in scores.items():
            out[key][i] = value

    # Average all elements
    out = {key: [np.nanmean(value)] for (key, value) in out.items()}

    # Add info
    out["File"] = [stim]
    out["Resolution"] = [str(frame.shape[1]) + "x" + str(frame.shape[0])]
    out["Framerate"] = [n_frames / 30]
    data.append(pd.DataFrame(out))

    pd.concat(data, axis=0).to_csv("data_objective.csv", index=False)
