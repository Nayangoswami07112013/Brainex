from flask import Flask, render_template
from data.questions import questions

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html", questions=questions)

@app.route("/result/<int:score>")
def result(score):
    return render_template("result.html", score=score, questions=questions)

if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)