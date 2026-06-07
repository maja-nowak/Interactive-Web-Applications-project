package pl.maja.backend_springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.maja.backend_springboot.model.Teacher;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectRequest {
    private Long id;
    private String name;
    private String description;
    private Long teacherId;
}
