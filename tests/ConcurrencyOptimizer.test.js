import test from 'node:test';
import assert from 'node:assert';
import { ConcurrencyOptimizer } from '../src/optimizers/ConcurrencyOptimizer.js';

test('ConcurrencyOptimizer', async () => {
  const concurrency = new ConcurrencyOptimizer(2);
  let runningTasks = 0;
  let maxRunningTasks = 0;

  const task = async () => {
    runningTasks++;
    maxRunningTasks = Math.max(maxRunningTasks, runningTasks);
    await new Promise((resolve) => setTimeout(resolve, 50));
    runningTasks--;
  };

  const tasks = Array(5).fill(task);
  await Promise.all(tasks.map((t) => concurrency.addTask(t)));

  assert.strictEqual(maxRunningTasks, 2, 'Should run at most 2 tasks concurrently');
  assert.strictEqual(runningTasks, 0, 'All tasks should be finished');
});
