export async function postStudents(studentData) {
  try {
    const response = await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;  charset=UTF-8",
      },
      body: JSON.stringify(studentData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Сталася помилка при додаванні студента:", error);
  }
}