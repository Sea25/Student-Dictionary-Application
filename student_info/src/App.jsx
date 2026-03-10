import { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [students, setStudents] = useState([])

  const handleAddStudent = (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedDepartment = department.trim()

    if (!trimmedName || !trimmedDepartment) {
      alert('Please enter both student name and department.')
      return
    }

    const newStudent = {
      id: crypto.randomUUID(),
      name: trimmedName,
      department: trimmedDepartment,
    }

    setStudents((prev) => [...prev, newStudent])
    setName('')
    setDepartment('')
  }

  const handleDeleteStudent = (id) => {
    const student = students.find((s) => s.id === id)
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student?.name ?? 'this student'}?`,
    )

    if (!confirmed) return

    setStudents((prev) => prev.filter((studentItem) => studentItem.id !== id))
  }

  return (
    <div className="app-container">
      <h1>Student Dictionary Application</h1>

      <form className="student-form" onSubmit={handleAddStudent}>
        <div className="form-group">
          <label htmlFor="student-name">Student Name</label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-department">Department</label>
          <input
            id="student-department"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </div>

        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      <section className="students-section">
        <h2>Students</h2>
        {students.length === 0 ? (
          <p className="empty-state">No students added yet.</p>
        ) : (
          <ul className="students-list">
            {students.map((student) => (
              <li key={student.id} className="student-item">
                <div className="student-details">
                  <span className="student-name">{student.name}</span>
                  <span className="student-department">
                    ({student.department})
                  </span>
                </div>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App