const createQuiz = {
  name: "TEST - 1",
  start_time: new Date(),
  end_time: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // * add 1 hour to start_time and set it to end_time
  duration: 60,
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-access-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTg4MzRjMWEzM2JiNzEwYzQzNjFhZSIsImlhdCI6MTY5Mjk2MDMyMSwiZXhwIjoxNjkzMDQ2NzIxfQ.WkoxJprU4pX_0nLUSDcx6c7HAVRWFlbbWx8u92F5q-s",
  },
  body: JSON.stringify(createQuiz),
};

fetch("https://quiz-test-be.vercel.app/api/create-quiz", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
