package pl.maja.backend_springboot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maja.backend_springboot.dto.EnrollmentInfoRequest;
import pl.maja.backend_springboot.dto.GradeRequest;
import pl.maja.backend_springboot.repository.EnrollmentRepository;
import pl.maja.backend_springboot.model.Subject;
import pl.maja.backend_springboot.service.TeacherService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/teachers")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @PutMapping("/enrollments/{id}/grade")
    public ResponseEntity<?> assignGrade(@PathVariable Long id, @RequestBody GradeRequest request) {
        try {
            teacherService.assignGrade(id, request.getGrade());
            return ResponseEntity.ok("Grade assigned successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/subjects")
    public ResponseEntity<List<Subject>> getTeacherSubjects(@PathVariable Long id) {
        try {
            List<Subject> subjects = teacherService.getTeacherSubjects(id);
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{subjectId}/subjects/enrollments")
    public ResponseEntity<List<EnrollmentInfoRequest>> getSubjectEnrollments(@PathVariable Long subjectId) {
        try {
            return ResponseEntity.ok(teacherService.getSubjectEnrollments(subjectId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{teacherId}/subjects/{subjectId}")
    public ResponseEntity<?> stopTeachingSubject(@PathVariable Long teacherId, @PathVariable Long subjectId) {
        try {
            teacherService.stopTeachingSubject(teacherId, subjectId);
            return ResponseEntity.ok("Successfully stopped teaching the subject");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
