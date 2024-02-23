/**
 * Get the width of screen
 * @returns number
 */
export const getClientWidth = (): number => {
  const docBody = window.document.body;
  const docEl: HTMLElement = document.documentElement;
  return docBody.clientWidth || docEl.clientWidth || window.innerWidth || 375;
};

/**
 * Get the ratio of current screen width to standard screen
 * @returns number
 */
export const getScreenRate = () => getClientWidth() / 375;

/**
 * Toast tips
 */
export const Toast = {
  info(text: string, duration = 2, parentElement?: HTMLElement) {
    const target = parentElement || document.body;
    const toast = document.createElement('div');
    toast.innerText = text;
    toast.style.position = parentElement ? 'absolute' : 'fixed';
    toast.style.left = '50%';
    toast.style.top = '50%';
    toast.style.maxWidth = '150px';
    toast.style.lineHeight = '20px';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.padding = '8px 15px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '12px';
    toast.style.color = '#ffffff';
    toast.style.zIndex = '99999';
    target.appendChild(toast);
    setTimeout(() => {
      target.removeChild(toast);
    }, duration * 1000);
  },
  success(text: string, duration = 2) {
    this.info(text, duration);
  },
  fail(text: string, duration = 2) {
    this.info(text, duration);
  }
};

/**
 * Copy text
 * @param text
 * @param showTip
 */
export const copy = (text: string, showTip = true): void => {
  const ele = document.createElement('textarea');
  ele.value = text;
  document.body.appendChild(ele);
  ele.select();
  document.execCommand('copy');
  document.body.removeChild(ele);

  if (showTip) {
    const isCN = /^zh/.test(navigator.language);
    const successTip = isCN ? '复制成功!' : 'Copy successfully!';
    Toast.info(successTip);
  }
};

/**
 * Set website title
 * @param tile
 */
export const setTitle = (tile: string) => {
  document.title = tile;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'display: none; width: 0; height: 0;';
  iframe.src = '';

  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    }, 0);
  };
  iframe.addEventListener('load', listener);
  document.body.appendChild(iframe);
};

/**
 * Judge a element whether is revealed fully into parent element
 * @param element
 * @returns boolean
 */
export const isElementFullInParentViewport = (element: HTMLElement) => {
  const parentElement = element?.parentElement;
  if (!element || !parentElement) {
    return false;
  }
  const elementRect = element.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();

  return elementRect.top >= parentRect.top && elementRect.bottom <= parentRect.bottom && elementRect.left >= parentRect.left && elementRect.right <= parentRect.right;
};

/**
 * Judge a element whether is revealed fully in viewport
 * @param element
 * @returns boolean
 */
export const isElementFullInViewport = (element: HTMLElement) => {
  if (!element) {
    return false;
  }
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= windowHeight && rect.right <= windowWidth;
};
