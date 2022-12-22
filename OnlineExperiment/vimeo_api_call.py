
import vimeo
# import json
# import config #token is here
# 
# client = vimeo.VimeoClient(
#     token = config.token
# )
# per_page = 100
# answerDataAll = []
# for i in range(12):
#     page=i+1
#     getString = 'https://api.vimeo.com/me/videos?per_page='+str(per_page) + '&page=' + str(page)
#     dataFromServer = client.get(getString).json()['data']
#     answerDataAll.extend(dataFromServer)    
# 
# # creating list of videos
# listOfItems = []
# for item in answerDataAll:
#     listOfItems.append( item ['uri'])
# 
# # creating list of direct links, it is the goal
# listOfUrls = []
# 
# for item in listOfItems:
#     # isolating digits
#     videoID = ""
#     for sign in item:
#         if sign.isdigit():
#             videoID = videoID + sign 
# 
#     requestForDownloading = client.get ('http://player.vimeo.com/video/' + videoID + '/config').json()['request']['files']['progressive']
#     for itm in requestForDownloading:
#         if itm['width']==640:
#             urlForDownloading = itm['url']
#             listOfUrls.append(urlForDownloading)
