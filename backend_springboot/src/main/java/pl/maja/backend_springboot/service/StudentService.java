package pl.maja.backend_springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.maja.backend_springboot.dto.StudentSubjectInfoRequest;
import pl.maja.backend_springboot.model.Enrollment;
import pl.maja.backend_springboot.model.Subject;
import pl.maja.backend_springboot.model.Student;
import pl.maja.backend_springboot.repository.EnrollmentRepository;
import pl.maja.backend_springboot.repository.StudentRepository;
import pl.maja.backend_springboot.repository.SubjectRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    public List<StudentSubjectInfoRequest> getEnrolledSubjects(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream()
                .map(enrollment -> {
                    Subject subject = enrollment.getSubject();
                    return new StudentSubjectInfoRequest(
                            subject.getId(),
                            subject.getName(),
                            subject.getTeacher() != null ? subject.getTeacher().getName() : null,
                            enrollment.getGrade()
                    );
                })
                .collect(Collectors.toList());
    }

    public List<Enrollment> getGrades(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public List<Subject> getAllAvailableSubjects() {
        return subjectRepository.findAll();
    }

    public List<StudentSubjectInfoRequest> getAvailableSubjectsForStudent(Long studentId) {
        List<Subject> allSubjects = subjectRepository.findAll();

        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);
        Set<Long> enrolledSubjectIds = enrollments.stream()
                .map(e -> e.getSubject().getId())
                .collect(Collectors.toSet());

        return allSubjects.stream()
                .filter(subject -> !enrolledSubjectIds.contains(subject.getId()))
                .map(subject -> new StudentSubjectInfoRequest(
                        subject.getId(),
                        subject.getName(),
                        subject.getTeacher() != null ? subject.getTeacher().getName() : null,
                        null
                ))
                .collect(Collectors.toList());
    }

    public Enrollment enrollInSubject(Long studentId, Long subjectId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        boolean alreadyEnrolled = enrollmentRepository.findByStudentId(studentId)
                .stream()
                .anyMatch(enrollment -> enrollment.getSubject().getId().equals(subjectId));

        if (alreadyEnrolled) {
            throw new RuntimeException("Student is already enrolled in this subject");
        }

        Enrollment enrollment = new Enrollment(student, subject, null);
        return enrollmentRepository.save(enrollment);
    }

    public void unenrollFromSubject(Long studentId, Long subjectId) {
        Enrollment enrollment = enrollmentRepository.findByStudentId(studentId)
                .stream()
                .filter(e -> e.getSubject().getId().equals(subjectId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollmentRepository.delete(enrollment);
    }
}