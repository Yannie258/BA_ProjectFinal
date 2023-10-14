import sys
import json
import matplotlib.pyplot as plt
import numpy as np

"""https://matplotlib.org/stable/gallery/index.html"""

font = {'fontname':'Calibri'}

colors = ["#f39100", "#ffc245"]

if __name__ == "__main__":
    data = json.loads(sys.argv[1])
    plt.rc('font', size=15)          # controls default text sizes
    plt.rc('axes', titlesize=15)     # fontsize of the axes title
    plt.rc('axes', labelsize=15)    # fontsize of the x and y labels
    plt.rc('xtick', labelsize=10)    # fontsize of the tick labels
    plt.rc('ytick', labelsize=14)    # fontsize of the tick labels
    plt.rc('legend', fontsize=11)    # legend fontsize
    plt.rc('figure', titlesize=15)  # fontsize of the figure title
    chartTitle = data["title"]
    chartFilename = data["filename"] + '.png'
    chartData = data["data"]
    chartLabels = chartData["labels"]
    chartDataSets = chartData["datasets"]

    x = np.arange(len(chartLabels))  # the label locations
    width = 0.75  # the width of the bars

    fig, ax = plt.subplots()
    
    startPosBar = x + width/75
    # if len(chartLabels) > 1:
    #     startPosBar = x - (len(chartLabels) * (width / len(chartLabels)))/2
    

    for idx in range(len(chartDataSets)):
        obj = chartDataSets[idx]
        rects = ax.bar(startPosBar, obj["data"], width, label=obj["label"], color=colors[idx])
        startPosBar = startPosBar + width
        ax.bar_label(rects, padding=3)


    ax.set_ylabel(chartData["ylabel"])
    ax.set_title(chartTitle)
    ax.set_xticks(x, chartLabels)
    # Delete Frame
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    fig.tight_layout()
    #ax.legend()
    plt.title(chartTitle)
    fig.set_size_inches(19, 8, forward=False)
    plt.savefig("./imgs/" + chartFilename, dpi=350)


    print(chartFilename)
    sys.stdout.flush()
