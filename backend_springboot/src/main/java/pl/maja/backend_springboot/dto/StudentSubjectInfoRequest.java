package pl.maja.backend_springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentSubjectInfoRequest {
    private Long subjectId;
    private String subjectName;
    private String teacherName;
    private Double grade;
}
