import glob
import os

import cv2
import imageio  # also requires imageio-ffmpeg
import numpy as np
import pandas as pd
import PIL
import pyllusion as pyl
import skvideo.utils
from matplotlib import pyplot as plt

opencv_classifer = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
stimuli_dir = "C:/Dropbox/vimeo/"

data = []  # Initialize empty list for data
for stim in glob.glob(os.path.join(stimuli_dir, "*.mp4")):
    filename = stim.removeprefix("C:/Dropbox/vimeo\\").removesuffix(".mp4")
    print(filename)

    # Read video
    video = imageio.get_reader(stim, "ffmpeg")

    # Convert to array (time, height, width, channels)
    videodata = np.array([i for i in video])

    # Save first frame
    # print(plt.imshow(videodata[0]))  # Show first frame
    PIL.Image.fromarray(videodata[0]).save(stimuli_dir + "frame/" + filename + ".png")

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
            # "Structure",
            "Saturation",
            "Entropy",
            "Brightness",
            "Luminance",
            "Luminance_Perceived",
            "Faces",
        ]
    }

    # Naturalness score
    # bw = np.empty(videodata.shape[0:3] + (1,), dtype="float32")
    # for frame in range(len(bw)):
    #     bw[frame, :, :, :] = skvideo.utils.rgb2gray(videodata[frame])[0, :, :, :]
    # skvideo.measure.niqe(bw)  # Doesn't work (bug in scikit-video, maybe it'll be fixed in the future)

    # Compute per frame
    for i, frame in enumerate(video):
        if i % 300 != 0:  # Iterate every nth element
            continue
        print(np.round(i / n_frames * 100, 2), "%")

        # Objective characteristics (don't include 'structure' for now)
        scores = pyl.analyze_image(
            frame,
            features=["luminance", "color", "entropy", "colorfulness", "contrast"],
        )
        for key, value in scores.items():
            out[key][i] = value

        # Count heads
        grayImage = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = opencv_classifer.detectMultiScale(grayImage)
        out["Faces"][i] = len(faces)

        # # Visualize
        # import matplotlib.patches as patches
        # fig, ax = plt.subplots()
        # ax.imshow(frame)
        # for (x, y, w, h) in faces:
        #     ax.add_patch(
        #         patches.Rectangle((x, y), w, h, linewidth=1, edgecolor="g", facecolor="none")
        #     )

    # Average all elements
    out = {key: [np.nanmean(value)] for (key, value) in out.items()}

    # Add info
    out["File"] = [filename]
    out["Resolution"] = [str(frame.shape[1]) + "x" + str(frame.shape[0])]
    out["Framerate"] = [n_frames / 30]
    data.append(pd.DataFrame(out))

    pd.concat(data, axis=0).to_csv("data_objective.csv", index=False)
