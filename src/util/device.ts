const { userAgent = '', platform = '', vendor = '' } = window?.navigator || {};

/**
 * Judge whether is mobile device
 * @returns boolean
 */
export const isMobile = (): boolean => /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);

/**
 * Judge whether is IOS device
 * @returns boolean
 */
export const isIOS = () => /(iPhone|iPad|iPod|iOS|Mac)/i.test(userAgent || platform) && 'ontouchstart' in window;

/**
 * Judge whether is Safari browser
 * @returns boolean
 */
export const isSafari = () => /Safari/i.test(userAgent) && !/CriOS|Chrome/i.test(userAgent) && vendor === 'Apple Computer, Inc.';

/**
 * Get device platform
 * @param userAgent
 * @returns string
 */
export const getDevicePlatform = (agent = userAgent.toLowerCase()): string => {
  if (/windows/.test(agent)) {
    return 'windows';
  } else if (/iphone|ipod/.test(agent)) {
    return 'ios';
  } else if (/ipad/.test(agent)) {
    return 'ipad';
  } else if (/android/.test(agent)) {
    return 'android';
  } else if (/mac/.test(agent)) {
    return 'mac';
  } else {
    return 'others';
  }
};
