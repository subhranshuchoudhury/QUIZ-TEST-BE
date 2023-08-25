const updateQuiz = {
  quizId: "64e84aa3d35efd192e97744f",
  question: {
    question: "What is the capital of India?",
    options: [
      {
        option: "New Delhi",
        is_correct: true,
      },
      {
        option: "Mumbai",
        is_correct: false,
      },
      {
        option: "Kolkata",
        is_correct: false,
      },
      {
        option: "Chennai",
        is_correct: false,
      },
    ],
  },
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTgzZDU0NjQxMTY0NTdiMDZhMmEzOCIsImlhdCI6MTY5Mjk0MjI0NSwiZXhwIjoxNjkzMDI4NjQ1fQ.lAa0PRtqWavdt1dAnmMY_g9sDJs21SqUDENe_tBPOY8",
  },
  body: JSON.stringify(updateQuiz),
};

fetch("http://localhost:5000/api/add-quiz-question", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
