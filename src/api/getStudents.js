export async function getStudents() {
  try {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Сталася помилка при отриманні студентів:", error);
  }
}