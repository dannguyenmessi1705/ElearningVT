# Get answers
const result = [];
const courseId = window.location.href.split("/").pop();
const checkboxes = document.querySelectorAll("div.checkbox");
// Duyệt qua từng checkbox
checkboxes.forEach((checkbox) => {
  const input = checkbox.querySelector(
    'input[type="radio"], input[type="checkbox"]'
  ); // Lấy input
  const icon = checkbox.querySelector("i.fa.fa-check"); // Lấy icon

  // Nếu có icon và input
  if (input) {
    const name = input.name; // Lấy name từ input

    // Tạo hoặc lấy entry trong result
    let existingEntry = result.find((item) => item.id === name);

    if (!existingEntry) {
      // Nếu chưa tồn tại, tạo mới
      existingEntry = {
        id: name,
        answers: [],
      };
      result.push(existingEntry);
    }
    if (icon) {
      existingEntry.answers.push(Number.parseInt(input.value));
    }
  }
});
fetch(`http://localhost:3000/questions/${courseId}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(result),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });


# Fill answers
(async () => {
  const data = await (
    await fetch(
      `http://localhost:3000/questions/4a092982-095e-4cb3-a702-41dd3fd61e71`
    )
  ).json();
  console.log(data);
  data.forEach(({ id, answers }) => {
    answers.forEach((answer) => {
      const e = document.querySelector(
        `input[name="${id}"][value="${answer}"]`
      );
      if (e && !e.checked) e.click();
    });
  });
})();