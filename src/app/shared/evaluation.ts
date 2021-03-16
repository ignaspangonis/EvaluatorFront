export interface Evaluation {
  mentorId: string;
  studentId: string;
  isEvaluated: boolean;
  participation?: number;
  techSkills?: number;
  learningPace?: number;
  extraMile?: number;
  comment: string;
}
