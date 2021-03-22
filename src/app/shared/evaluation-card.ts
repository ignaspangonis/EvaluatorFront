export interface EvaluationCard {
  studentId: number;
  qaEvaluationDTO?: {
    participation: number;
    techSkills: number;
    learningPace: number;
    extraMile: number;
    comments?: string[];
    evaluationsCount: number;
    jointEvaluation: number;
  };
  feEvaluationDTO?: {
    participation: number;
    techSkills: number;
    learningPace: number;
    extraMile: number;
    comments?: string[];
    evaluationsCount: number;
    jointEvaluation: number;
  };
  beEvaluationDTO?: {
    participation: number;
    techSkills: number;
    learningPace: number;
    extraMile: number;
    comments?: string[];
    evaluationsCount: number;
    jointEvaluation: number;
  };
}
