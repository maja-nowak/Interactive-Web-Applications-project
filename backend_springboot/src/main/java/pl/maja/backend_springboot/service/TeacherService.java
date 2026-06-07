package pl.maja.backend_springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.maja.backend_springboot.dto.EnrollmentInfoRequest;
import pl.maja.backend_springboot.dto.StudentRequest;
import pl.maja.backend_springboot.dto.SubjectRequest;
import pl.maja.backend_springboot.model.Enrollment;
import pl.maja.backend_springboot.model.Subject;
import pl.maja.backend_springboot.repository.EnrollmentRepository;
import pl.maja.backend_springboot.repository.SubjectRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    public void assignGrade(Long enrollmentId, Double grade) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setGrade(grade);
        enrollmentRepository.save(enrollment);
    }

    public List<Subject> getTeacherSubjects(Long teacherId) {
        return subjectRepository.findByTeacherId(teacherId);
    }

    public void stopTeachingSubject(Long teacherId, Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        if (subject.getTeacher() == null || !subject.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Teacher is not assigned to this subject");
        }

        subject.setTeacher(null);
        subjectRepository.save(subject);
    }

    public List<EnrollmentInfoRequest> getSubjectEnrollments(Long subjectId) {
        List<Enrollment> enrollments = enrollmentRepository.findBySubjectId(subjectId);
        return enrollments.stream()
                .map(this::convertToEnrollmentInfoRequest)
                .collect(Collectors.toList());
    }

    private EnrollmentInfoRequest convertToEnrollmentInfoRequest(Enrollment enrollment) {
        SubjectRequest subjectDto = new SubjectRequest(
                enrollment.getSubject().getId(),
                enrollment.getSubject().getName(),
                enrollment.getSubject().getDescription(),
                enrollment.getSubject().getTeacher().getId()
        );

        StudentRequest studentDto = new StudentRequest(
                enrollment.getStudent().getId(),
                enrollment.getStudent().getName(),
                enrollment.getStudent().getLastName()
        );

        return new EnrollmentInfoRequest(
                enrollment.getId(),
                enrollment.getGrade(),
                subjectDto,
                studentDto
        );
    }
}
