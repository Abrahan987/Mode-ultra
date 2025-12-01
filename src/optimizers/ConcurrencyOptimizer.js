class ConcurrencyOptimizer {
  constructor(maxConcurrency = 5) {
    this.maxConcurrency = maxConcurrency;
    this.queue = [];
    this.runningTasks = 0;
    this.activePromises = [];
  }

  addTask(task) {
    const promise = new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          await task();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    this.activePromises.push(promise);
    this.run();
    return promise;
  }

  async run() {
    while (this.runningTasks < this.maxConcurrency && this.queue.length > 0) {
      this.runningTasks++;
      const taskToRun = this.queue.shift();
      try {
        await taskToRun();
      } catch (error) {
        console.error('Error in task:', error);
      } finally {
        this.runningTasks--;
        this.run();
      }
    }
  }

  async whenIdle() {
    await Promise.all(this.activePromises);
    this.activePromises = [];
  }
}

export { ConcurrencyOptimizer };
