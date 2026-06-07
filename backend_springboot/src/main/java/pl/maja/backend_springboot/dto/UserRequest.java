package pl.maja.backend_springboot.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    @Size(min = 3, max = 50)
    private String username;

    private String role;

    @Size(min = 6, max = 40)
    private String password;

    private String name;

    private String lastName;

    @Email
    private String email;
}
