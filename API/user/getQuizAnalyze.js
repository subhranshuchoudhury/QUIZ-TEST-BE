const updateQuiz = {
  quizId: "64e84aa3d35efd192e97744f",
  userAnswer: [
    {
      questionId: "64e84d506763cec4adb1f6ce",
      correctId: "64e84ef29e13133069cd840c",
    },
  ],
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

fetch("http://localhost:5000/api/get/quiz/analyze", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.error(err));
