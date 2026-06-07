package pl.maja.backend_springboot.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maja.backend_springboot.dto.SubjectRequest;
import pl.maja.backend_springboot.dto.UserRequest;
import pl.maja.backend_springboot.message.request.SignUpForm;
import pl.maja.backend_springboot.model.Subject;
import pl.maja.backend_springboot.model.User;
import pl.maja.backend_springboot.model.Teacher;
import pl.maja.backend_springboot.model.Student;
import pl.maja.backend_springboot.service.AdminService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return adminService.getAllStudents();
    }

    @GetMapping("/teachers")
    public List<Teacher> getAllTeachers() {
        return adminService.getAllTeachers();
    }

    @GetMapping("/subjects")
    public List<Subject> getAllSubjects() {
        return adminService.getAllSubjects();
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> createSubject(@RequestBody SubjectRequest request) {
        Subject createdSubject = adminService.createSubject(request);
        return ResponseEntity.ok(createdSubject);
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody SubjectRequest request) {
        Subject updatedSubject = adminService.updateSubject(id, request);
        return ResponseEntity.ok(updatedSubject);
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        adminService.deleteSubject(id);
        return ResponseEntity.ok("Subject deleted successfully");
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = adminService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = adminService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/users/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody @Valid UserRequest request) {
        try {
            User admin = adminService.createAdmin(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UserRequest request) {
        try {
            User user = adminService.updateUser(id, request);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            adminService.deleteUser(id);
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/subjects/{subjectId}/assign-teacher")
    public ResponseEntity<?> assignTeacherToSubject(@PathVariable Long subjectId, @RequestParam Long teacherId) {
        try {
            adminService.assignTeacherToSubject(teacherId, subjectId);
            return ResponseEntity.ok("Teacher assigned to subject successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/subjects/{subjectId}/remove-teacher")
    public ResponseEntity<?> removeTeacherFromSubject(@PathVariable Long subjectId) {
        try {
            adminService.removeTeacherFromSubject(subjectId);
            return ResponseEntity.ok("Teacher removed from subject successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}