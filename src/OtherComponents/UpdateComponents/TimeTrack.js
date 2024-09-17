class TimeTracker {
  constructor() {
    if (!TimeTracker.instance) {
      this.startTime = null;
      this.accumulatedTime = 0;
      this.isActive = false;
      TimeTracker.instance = this;
    }
    return TimeTracker.instance;
  }

  start() {
    if (!this.isActive) {
      this.isActive = true;
      this.startTime = Date.now();
    }
  }

  pause() {
    if (this.isActive) {
      this.accumulatedTime += (Date.now() - this.startTime) / 1000; // Convert to seconds
      this.isActive = false;
    }
  }

  resume() {
    if (!this.isActive) {
      this.isActive = true;
      this.startTime = Date.now();
    }
  }

  stop() {
    if (this.isActive) {
      this.pause();
    }
    return this.formatTimeSpan(this.accumulatedTime);
  }

  reset() {
    this.startTime = null;
    this.accumulatedTime = 0;
    this.isActive = false;
  }

  formatTimeSpan(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}

const instance = new TimeTracker();

export default instance;

export const startTimer = () => {
  instance.start();
}

export const pauseTimer = () => {
  instance.pause();
}

export const resumeTimer = () => {
  instance.resume();
}

export const stopTimer = () => {
  return instance.stop();
}
