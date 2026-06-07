package pl.maja.backend_springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentInfoRequest {
    private Long id;
    private Double grade;

    private SubjectRequest subject;
    private StudentRequest student;
}
