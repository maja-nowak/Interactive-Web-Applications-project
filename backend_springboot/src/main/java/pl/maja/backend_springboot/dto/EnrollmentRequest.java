package pl.maja.backend_springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
public class EnrollmentRequest {
    private Long studentId;
    private Long subjectId;

    public EnrollmentRequest() {}

    public EnrollmentRequest(Long studentId, Long subjectId) {
        this.studentId = studentId;
        this.subjectId = subjectId;
    }
}
