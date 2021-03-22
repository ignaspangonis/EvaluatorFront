export interface Evaluation {
  mentorId: number;
  studentId: number;
  isEvaluated?: boolean;
  participation: number;
  techSkills: number;
  learningPace: number;
  extraMile: number;
  comment?: string;
}
