import json
import base64
import requests;

albumName = '4QadXMfQOBmshnqPYVNW17aGXPUBp1rFl9jjsnfdUCjJbfqUMyNEWTESTALBUM'
albumKey = '24af1768cc902f65191c51ecf757e549bba56c441700c8fae7eb3180783f6fa3'

# url = 'http://localhost:3000/api/recognizeImage?albumName=4QadXMfQOBmshnqPYVNW17aGXPUBp1rFl9jjsnfdUCjJbfqUMyNEWTESTALBUM&albumKey=24af1768cc902f65191c51ecf757e549bba56c441700c8fae7eb3180783f6fa3'
url = 'http://localhost:3000/api/recognizeImage'

with open("sergio5.jpg", "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read())

payload = {'image': encoded_image, 'albumName': albumName, 'albumKey': albumKey}
r = requests.post(url, data=payload)
print(r.text)
