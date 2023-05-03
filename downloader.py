from pytube import YouTube
import sys

link = sys.argv[1]
if (sys.argv.__sizeof__ == 2):
    resolution = sys.argv[2]
else:
    resolution = "720p"

if (link == "help"):
    print("use youtube video link as 1st param and quality XXXp as 2nd (720p highest)")
else:
    print("downloading...")
    YouTube(link).streams.get_by_resolution(resolution).download()
    print("done")
