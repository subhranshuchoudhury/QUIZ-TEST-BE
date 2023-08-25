const updateQuiz = {
  quizId: "64e886683f56ffab35e1560c",
  userAnswer: [
    {
      questionId: "64e886fb3f56ffab35e15611",
      correctId: "64e886fb3f56ffab35e15612",
    },
    {
      questionId: "64e887673f56ffab35e1561f",
      correctId: "64e887673f56ffab35e15620",
    },
  ],
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTg4N2IxM2Y1NmZmYWIzNWUxNTYyNyIsImlhdCI6MTY5Mjk2MDcwOCwiZXhwIjoxNjkzMDQ3MTA4fQ.C0NjbW9GXPniy3oDismSwHNEbzPLtMrGZbcOidqzzAg",
  },
  body: JSON.stringify(updateQuiz),
};

fetch("https://quiz-test-be.vercel.app/api/get/quiz/analyze", options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.error(err));
