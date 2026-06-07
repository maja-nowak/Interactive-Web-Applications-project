export interface StudentSubjectInfoRequest {
  subjectId: number;
  subjectName: string;
  teacherName: string | null;
  grade: number | null;
}
