
export async function updateStudents(studentData, id) {
  try {
    const response = await fetch(`http://localhost:3000/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(studentData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Сталася помилка при оновленні студента:", error);
  }
}
