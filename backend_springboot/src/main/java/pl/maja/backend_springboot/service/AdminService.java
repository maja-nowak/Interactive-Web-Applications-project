package pl.maja.backend_springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.maja.backend_springboot.dto.SubjectRequest;
import pl.maja.backend_springboot.dto.UserRequest;
import pl.maja.backend_springboot.model.*;
import pl.maja.backend_springboot.repository.*;
import pl.maja.backend_springboot.security.services.UserPrinciple;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public Subject createSubject(SubjectRequest request) {
        Teacher teacher = null;
        if (request.getTeacherId() != null) {
            teacher = teacherRepository.findById(request.getTeacherId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
        }

        Subject subject = new Subject(request.getName(), request.getDescription(), teacher, null);
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, SubjectRequest request) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        subject.setName(request.getName());
        subject.setDescription(request.getDescription());
        if (request.getTeacherId() != null) {
            assignTeacherToSubject(request.getTeacherId(), id);
        } else {
            subject.setTeacher(null);
        }
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    public void assignTeacherToSubject(Long teacherId, Long subjectId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        subject.setTeacher(teacher);
        subjectRepository.save(subject);
    }

    public void removeTeacherFromSubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        subject.setTeacher(null);
        subjectRepository.save(subject);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User createAdmin(UserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken: " + request.getUsername());
        }

        Role role = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Admin role not found."));

        if (request.getPassword() == null) {
            throw new RuntimeException("Provide password ");
        }
        if (request.getName() == null) {
            throw new RuntimeException("Provide name ");
        }
        if (request.getUsername() == null) {
            throw new RuntimeException("Provide username ");
        }
        if (request.getEmail() == null) {
            throw new RuntimeException("Provide email");
        }
        if (request.getLastName() == null) {
            throw new RuntimeException("Provide last name");
        }

        User admin = new User(
                request.getName(),
                request.getLastName(),
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                role
        );

        return userRepository.save(admin);
    }

    public User updateUser(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (request.getName() != null) {
            user.setName(request.getName().trim());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName().trim());
        }
        if (request.getUsername() != null && !request.getUsername().trim().isEmpty()) {
            userRepository.findByUsername(request.getUsername().trim())
                    .ifPresent(existingUser -> {
                        if (!existingUser.getId().equals(id)) {
                            throw new RuntimeException("Username already exists: " + request.getUsername());
                        }
                    });
            user.setUsername(request.getUsername().trim());
        }
        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            user.setEmail(request.getEmail().trim());
        }

        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            user.setPassword(request.getPassword());
        }

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        UserPrinciple currentUser = (UserPrinciple) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (currentUser.getId().equals(id)) {
            throw new RuntimeException("You cannot delete your own account.");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (user.getRole().getName() == RoleName.ROLE_STUDENT) {
            studentRepository.deleteById(id);
        } else if (user.getRole().getName() == RoleName.ROLE_TEACHER) {
            List<Subject> teacherSubjects = subjectRepository.findByTeacherId(id);
            for (Subject subject : teacherSubjects) {
                subject.setTeacher(null);
                subjectRepository.save(subject);
            }
            teacherRepository.deleteById(id);
        }

        userRepository.deleteById(id);
    }

}