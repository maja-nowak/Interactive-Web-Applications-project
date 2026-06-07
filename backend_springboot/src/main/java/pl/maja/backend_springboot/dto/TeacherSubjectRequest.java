package pl.maja.backend_springboot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherSubjectRequest {
    private Long teacherId;
    private Long subjectId;

    public TeacherSubjectRequest() {}

    public TeacherSubjectRequest(Long teacherId, Long subjectId) {
        this.teacherId = teacherId;
        this.subjectId = subjectId;
    }
}