package pl.maja.backend_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.maja.backend_springboot.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}

