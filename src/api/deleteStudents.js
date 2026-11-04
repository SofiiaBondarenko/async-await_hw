export async function deleteStudents(id) {
  try {
    const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Сталася помилка при видаленні студентів:", error);
  }
}