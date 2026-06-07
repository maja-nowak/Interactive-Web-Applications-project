package pl.maja.backend_springboot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maja.backend_springboot.dto.EnrollmentRequest;
import pl.maja.backend_springboot.dto.StudentSubjectInfoRequest;
import pl.maja.backend_springboot.model.Enrollment;
import pl.maja.backend_springboot.model.Subject;
import pl.maja.backend_springboot.service.StudentService;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{id}/subjects")
    public List<StudentSubjectInfoRequest> getEnrolledSubjects(@PathVariable Long id) {
        return studentService.getEnrolledSubjects(id);
    }

    @GetMapping("/{id}/grades")
    public List<Enrollment> getGrades(@PathVariable Long id) {
        return studentService.getGrades(id);
    }

    @GetMapping("/subjects/available")
    public List<Subject> getAllAvailableSubjects() {
        return studentService.getAllAvailableSubjects();
    }

    @GetMapping("/{id}/subjects/available")
    public List<StudentSubjectInfoRequest> getAvailableSubjectsForStudent(@PathVariable Long id) {
        return studentService.getAvailableSubjectsForStudent(id);
    }

    @PostMapping("/{id}/enroll")
    public ResponseEntity<?> enrollInSubject(@PathVariable Long id, @RequestBody EnrollmentRequest request) {
        try {
            Enrollment enrollment = studentService.enrollInSubject(id, request.getSubjectId());
            return ResponseEntity.ok(enrollment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}/unenroll")
    public ResponseEntity<?> unenrollFromSubject(@PathVariable Long id, @RequestBody EnrollmentRequest request) {
        try {
            studentService.unenrollFromSubject(id, request.getSubjectId());
            return ResponseEntity.ok("Successfully unenrolled from subject");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}