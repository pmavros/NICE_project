import glob

import imageio  # also requires imageio-ffmpeg
import numpy as np
import pandas as pd
import pyllusion as pyl
import skvideo.utils
from matplotlib import pyplot as plt

data = []  # Initialize empty list for data
for stim in glob.glob("./*.mp4"):
    print(stim)

    # Read video
    video = imageio.get_reader(stim, "ffmpeg")

    # Convert to array (time, height, width, channels)
    videodata = np.array([i for i in video])

    print(plt.imshow(videodata[0]))  # Show first frame

    # Initialize output
    out = {
        "Redness": np.full(video.count_frames(), np.nan),
        "Greenness": np.full(video.count_frames(), np.nan),
        "Blueness": np.full(video.count_frames(), np.nan),
        "Yellowness": np.full(video.count_frames(), np.nan),
        "RedGreen": np.full(video.count_frames(), np.nan),
        "BlueYellow": np.full(video.count_frames(), np.nan),
        "Colorfulness": np.full(video.count_frames(), np.nan),
        "Contrast": np.full(video.count_frames(), np.nan),
        "Structure": np.full(video.count_frames(), np.nan),
        "Saturation": np.full(video.count_frames(), np.nan),
        "Entropy": np.full(video.count_frames(), np.nan),
        "Brightness": np.full(video.count_frames(), np.nan),
        "Luminance": np.full(video.count_frames(), np.nan),
        "Luminance_Perceived": np.full(video.count_frames(), np.nan),
    }

    # Naturalness score
    # bw = np.empty(videodata.shape[0:3] + (1,), dtype="float32")
    # for frame in range(len(bw)):
    #     bw[frame, :, :, :] = skvideo.utils.rgb2gray(videodata[frame])[0, :, :, :]
    # skvideo.measure.niqe(bw)  # Doesn't work (bug in scikit-video, maybe it'll be fixed in the future)

    # Compute per frame
    for i, frame in enumerate(video):
        if i % 20 != 0:  # Iterate every nth element
            continue
        print(i)
        scores = pyl.analyze_image(frame)
        for key, value in scores.items():
            out[key][i] = value

    # Average all elements
    out = {key: [np.nanmean(value)] for (key, value) in out.items()}

    # Add info
    out["File"] = [stim]
    data.append(pd.DataFrame(out))

    pd.concat(data, axis=0).to_csv("data.csv", index=False)
