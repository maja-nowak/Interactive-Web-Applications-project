package pl.maja.backend_springboot.message.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

@Getter
@Setter
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private String username;
    private Collection<? extends GrantedAuthority> authorities;
    private Long id;

    public JwtResponse(String token, String username, Collection<? extends GrantedAuthority> authorities, Long id) {
        this.token = token;
        this.username = username;
        this.authorities = authorities;
        this.id = id;
    }
}

