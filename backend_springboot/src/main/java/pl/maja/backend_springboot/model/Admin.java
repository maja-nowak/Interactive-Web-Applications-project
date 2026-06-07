package pl.maja.backend_springboot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@PrimaryKeyJoinColumn(name = "id")
public class Admin extends User {
    public Admin(String name, String lastName, String username, String email, Role role, String password) {
        super(null, name, lastName, username, email, password, role);
    }
    public Admin(User user) {
        super(
                user.getId(),
                user.getName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }

}
