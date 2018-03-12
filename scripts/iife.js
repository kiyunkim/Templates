(function() {
  var createWorker = function() {
    var workCount = 0;

    var task1 = function() {
      workCount++;
      console.log('task1 '+workCount);
    }
    var task2 = function() {
      workCount++;
      console.log('task2 '+workCount);
    }

    return {
      job1: task1,
      job2: task2
    }
  };

  var worker = createWorker();

  worker.job1();

}());