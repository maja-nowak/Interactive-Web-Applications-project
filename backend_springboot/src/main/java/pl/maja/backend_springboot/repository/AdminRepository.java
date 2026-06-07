package pl.maja.backend_springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.maja.backend_springboot.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
}
