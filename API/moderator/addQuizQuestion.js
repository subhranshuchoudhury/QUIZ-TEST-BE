const updateQuiz = {
  quizId: "64e89a4e1232a138ef2663f3",
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTg5OTE4MTIzMmExMzhlZjI2NjNlNyIsImlhdCI6MTY5Mjk2NTM1MiwiZXhwIjoxNjkzMDUxNzUyfQ.KCpCSdeAYlq49u9lc2cNFWUEAoEVgLN4g0ALXFLCbjg",
  },
  body: JSON.stringify(updateQuiz),
};

fetch("https://quiz-test-be.vercel.app/api/add-quiz-question", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
