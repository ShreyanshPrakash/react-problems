export const handleTimeProcessing = (startTime: number) => {
  const date = new Date();

  const currentTime = date.getTime();
  const timeElapsed = currentTime - startTime;

  const diffTime = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hrs, 30 mins, 0 secs 1970
  const newDate = new Date(timeElapsed - diffTime);

  const hour = newDate.getHours();
  const min = newDate.getMinutes();
  const sec = newDate.getSeconds();
  const milliSeconds = newDate.getMilliseconds();

  const padHour = String(hour).padStart(2, "00");
  const padMin = String(min).padStart(2, "00");
  const padSec = String(sec).padStart(2, "00");
  const padMillSeconds = String(milliSeconds).padStart(2, "00");

  const template = `${padHour} : ${padMin} : ${padSec}`;

  return {
    hour,
    min,
    sec,
    milliSeconds,
    template,
  };
};

export const handleTimeProcessingUsingTimeDiff = (startTime: number) => {
  let noOfDays = 0;
  const date = new Date();

  const currentTime = date.getTime() - noOfDays * (24 * 60 * 60 * 1000);
  const timeElapsed = currentTime - startTime;

  const hour = Math.floor(timeElapsed / (60 * 60 * 1000));
  const min = Math.floor((timeElapsed / (60 * 1000)) % 60);
  const sec = Math.floor((timeElapsed / 1000) % 60);
  const milliSeconds = Math.floor(timeElapsed / 1);

  const padHour = String(hour).padStart(2, "00");
  const padMin = String(min).padStart(2, "00");
  const padSec = String(sec).padStart(2, "00");
  const padMillSeconds = String(milliSeconds).padStart(2, "00");

  const template = `${padHour} : ${padMin} : ${padSec}`;

  const isHourEquals24 = Math.floor(hour / 24) >= 0;
  if (isHourEquals24) {
    noOfDays++;
  }

  return {
    hour,
    min,
    sec,
    milliSeconds,
    template,
  };
};
