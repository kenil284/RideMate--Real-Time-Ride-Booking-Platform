let notificationAudio = null;
let isSoundUnlocked = false;
let isSoundEnabled = false;

export const prepareNotificationSound = () => {
  if (!notificationAudio) {
    notificationAudio = new Audio("/captain-request-notification-calm-urgent-7sec.mp3");
    notificationAudio.volume = 1;
    notificationAudio.preload = "auto";
    notificationAudio.load();
  }
};

export const enableNotificationSound = async () => {
  try {
    prepareNotificationSound();

    notificationAudio.currentTime = 0;

    await notificationAudio.play();

    notificationAudio.pause();
    notificationAudio.currentTime = 0;

    isSoundUnlocked = true;
    isSoundEnabled = true;


    return true;
  } catch (error) {

    return false;
  }
};

export const disableNotificationSound = () => {
  isSoundEnabled = false;

};

export const playRideRequestSound = async () => {
  try {
    prepareNotificationSound();

    if (!isSoundUnlocked || !isSoundEnabled) {

      return;
    }

    notificationAudio.currentTime = 0;
    await notificationAudio.play();

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }


  } catch (error) {

  }
};

export const stopRideRequestSound = () => {
  if (!notificationAudio) return

  notificationAudio.pause()
  notificationAudio.currentTime = 0

  if (navigator.vibrate) {
    navigator.vibrate(0)
  }


}