package pl.maja.backend_springboot.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.maja.backend_springboot.security.jwt.JwtProvider;
import pl.maja.backend_springboot.message.request.SignUpForm;
import pl.maja.backend_springboot.message.request.LoginForm;
import pl.maja.backend_springboot.message.response.ResponseMessage;
import pl.maja.backend_springboot.message.response.JwtResponse;
import pl.maja.backend_springboot.model.User;
import pl.maja.backend_springboot.model.Student;
import pl.maja.backend_springboot.model.Teacher;
import pl.maja.backend_springboot.model.Admin;
import pl.maja.backend_springboot.model.Role;
import pl.maja.backend_springboot.model.RoleName;
import pl.maja.backend_springboot.repository.UserRepository;
import pl.maja.backend_springboot.repository.RoleRepository;
import pl.maja.backend_springboot.security.services.UserPrinciple;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/auth")
public class AuthRESTController {

    private DaoAuthenticationProvider daoAuthenticationProvider;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;

    @Autowired
    public AuthRESTController(DaoAuthenticationProvider daoAuthenticationProvider,
                              UserRepository userRepository, RoleRepository roleRepository,
                              PasswordEncoder passwordEncoder, JwtProvider jwtProvider) {
        this.daoAuthenticationProvider = daoAuthenticationProvider;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
        Authentication authentication = daoAuthenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities(), userDetails.getId()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken."), HttpStatus.BAD_REQUEST);
        }

        String strRole = signUpRequest.getRole();
        Role role;
        User user;

        switch (strRole.toLowerCase()) {
            case "role_admin":
                return new ResponseEntity<>("Registering as admin is forbidden.", HttpStatus.BAD_REQUEST);
            case "role_teacher":
                role = roleRepository.findByName(RoleName.ROLE_TEACHER)
                        .orElseThrow(() -> new RuntimeException("Fail -> Cause: Teacher Role not found."));
                user = new Teacher(signUpRequest.getName(), signUpRequest.getLastName(),
                        signUpRequest.getUsername(), signUpRequest.getEmail(),
                        passwordEncoder.encode(signUpRequest.getPassword()), role);
                break;
            case "role_student":
            default:
                role = roleRepository.findByName(RoleName.ROLE_STUDENT)
                        .orElseThrow(() -> new RuntimeException("Fail -> Cause: Student Role not found."));
                user = new Student(signUpRequest.getName(), signUpRequest.getLastName(),
                        signUpRequest.getUsername(), signUpRequest.getEmail(),
                        role, passwordEncoder.encode(signUpRequest.getPassword()));
                break;
        }

        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully."), HttpStatus.OK);
    }
}