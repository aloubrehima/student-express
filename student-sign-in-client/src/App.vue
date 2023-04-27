<template>
  <div id="app">
    
    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable
      v-bind:students="students" 
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted">
    </StudentTable>
    <StudentMessage v-bind:student="mostRecentStudent"></StudentMessage>

  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

export default {
  name: 'app',
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage
  },
  mounted() {
    // load all students - mae request to API
    this.updateStudent
  },
  methods: {
    updateStudent() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      }).catch( () => alert('Unable to fetch student list'))
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () =>{
        this.updateStudents()
      })
      .catch( err => {
        let msg = err.response.data.join(',')
        alert('Error adding student\n' + msg)
      })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present 
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( () => alert('Unable to update student'))
    },
    studentDeleted(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {}
      }).catch( () => alert('Unable to delete student'))
    }
  }
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

</style>
