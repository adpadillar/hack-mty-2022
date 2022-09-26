from flask import Flask, Response
from flask import request
from compare_faces import compare_faces
import requests

app = Flask(__name__)


def download_image(url, filename):
    r = requests.get(url, stream=True)
    if r.status_code == 200:
        with open(f"./img/{filename}", 'wb') as f:
            for chunk in r:
                f.write(chunk)


@app.route("/")
def get_compare_faces():
    # Download the images from the URLs
    # Compare the faces
    # Return the result
    image1 = request.args.get('j')
    image2 = request.args.get('k')

    filename_1 = image1.split('=')[-1].lower()
    filename_2 = image2.split('=')[-1].lower()

    # Access control allow origin header

    download_image(image1, f'{filename_1}.jpg')
    download_image(image2, f'{filename_2}.jpg')

    result = compare_faces(
        f"./img/{filename_1}.jpg", f"./img/{filename_2}.jpg")
    resp = Response(f"{result}", content_type="text/plain")
    resp.headers.add("Access-Control-Allow-Origin", "*")

    print("Result: ", result)

    return resp


if __name__ == "__main__":
    from waitress import serve
    print("Server started!")
    serve(app, host="0.0.0.0", port=8080)
