export class StopWatchStateModel {
  isRunning: boolean;
  hour: number;
  min: number;
  sec: number;
  milliSeconds: number;
  template: string;
  constructor() {
    this.isRunning = false;
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.milliSeconds = 0;
    this.template = "";
  }
}


