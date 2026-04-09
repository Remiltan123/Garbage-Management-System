from flask import Flask, request, jsonify,  render_template
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
from flask_cors import CORS
# from flask_jsglue import JSGlue

app = Flask(__name__)
CORS(app)  # allow React to call API

# Load your trained model
model = load_model("waste_classifier_mobilenetv2.h5")

# Define classes
classes = ['batteries', 'clothes', 'e-waste', 'glass', 'light blubs', 'metal', 'organic', 'paper', 'plastic']


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = Image.open(file).convert("RGB").resize((128, 128))   # resize to model input
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    class_id = np.argmax(prediction)
    confidence = float(np.max(prediction))
    print("Prediction array:", prediction)
    print ("class id", class_id)
    return jsonify({
        "class": classes[class_id],
        "confidence": confidence
    })
  

if __name__ == "__main__":
    app.run(debug=True)
