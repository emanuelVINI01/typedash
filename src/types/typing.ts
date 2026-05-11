export type Phase = "idle" | "typing" | "results";
export type CharStatus = "pending" | "correct" | "incorrect";
export type RankingPeriod = "day" | "week" | "month" | "all";
export type TypingInputEvent = Pick<
  KeyboardEvent,
  "altKey" | "ctrlKey" | "key" | "metaKey" | "preventDefault"
>;

export interface WpmDataPoint {
  second: number;
  wpm: number;
}
export type TypingEvent = {
  key: string;
  time: number;
  expected: string;
};

export type TypingMetric = {
  id: string;
  wpm: number;
  accuracy: number;
  duration: number;
  logHash: string;
  events: TypingEvent[];
  createdAt: string;
  userId: string;
  userName: string;
};
