export interface DateCounterState {
  count: number;
  step: number;
}

export interface DateCounterAction {
  type: string;
  payload?: number;
}
