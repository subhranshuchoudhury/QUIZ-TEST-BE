const updateQuiz = {
  quizId: "64e886683f56ffab35e1560c",
  question: {
    question: "Who is the developer of the application?",
    options: [
      {
        option: "Subhranshu",
        is_correct: true,
      },
      {
        option: "Helsinki",
        is_correct: false,
      },
      {
        option: "Tokyo",
        is_correct: false,
      },
      {
        option: "Professor",
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTg4MzRjMWEzM2JiNzEwYzQzNjFhZSIsImlhdCI6MTY5Mjk2MDMyMSwiZXhwIjoxNjkzMDQ2NzIxfQ.WkoxJprU4pX_0nLUSDcx6c7HAVRWFlbbWx8u92F5q-s",
  },
  body: JSON.stringify(updateQuiz),
};

fetch("https://quiz-test-be.vercel.app/api/add-quiz-question", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
