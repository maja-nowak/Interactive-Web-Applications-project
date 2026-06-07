package pl.maja.backend_springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Teacher extends User {

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Subject> subjects;

    public Teacher(String name, String lastName, String username, String email, String password, Role role) {
        super(null, name, lastName, username, email, password, role);
    }
    public Teacher(User user) {
        super(
                user.getId(),
                user.getName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
        this.subjects = new ArrayList<>();
    }

}

