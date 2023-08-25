const updateQuiz = {
  quizId: "64e89a4e1232a138ef2663f3",
  userAnswer: [
    {
      questionId: "64e89ab21232a138ef2663f8",
      correctId: "64e89ab21232a138ef2663f9",
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
