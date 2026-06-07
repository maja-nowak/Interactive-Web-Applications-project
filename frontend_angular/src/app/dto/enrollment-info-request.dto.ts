interface EnrollmentInfoRequest {
  id: number;
  grade: number | null;
  subject: {
    id: number;
    name: string;
    description: string;
    teacherId: number;
  };
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
}
