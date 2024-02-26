import { getClientWidth, getScreenRate, Toast, copy, setTitle, isElementFullInParentViewport, isElementFullInViewport } from '../dom.ts';

describe('getClientWidth', () => {
  it('should return the client width of the document body', () => {
    jest.spyOn(window.document.body, 'clientWidth', 'get').mockReturnValue(500);
    expect(getClientWidth()).toBe(500);
  });

  it('should return the client width of the document element if body width is not available', () => {
    jest.spyOn(window.document.body, 'clientWidth', 'get').mockReturnValue(undefined);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(600);
    expect(getClientWidth()).toBe(600);
  });

  it('should return the inner width of the window if document element width is not available', () => {
    jest.spyOn(window.document.body, 'clientWidth', 'get').mockReturnValue(undefined);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(undefined);
    window.innerWidth = 700;
    expect(getClientWidth()).toBe(700);
  });

  it('should return a default width of 375 if all other values are not available', () => {
    Object.defineProperty(window, 'innerWidth', { value: undefined });
    expect(getClientWidth()).toBe(375);
  });
});

describe('getScreenRate', () => {
  it('should return the ratio of current screen width to 375', () => {
    expect(getScreenRate()).toBe(1);
  });
});

describe('Toast', () => {
  it('should create a toast element and append it to the target element', () => {
    const target = document.createElement('div');
    Toast.info('Test', 2, target);
    expect(target.childElementCount).toBe(1);
  });

  it('should create a toast element and append it to the document body if no target element is provided', () => {
    document.body.innerHTML = '';
    Toast.info('Test', 2);
    expect(document.body.childElementCount).toBe(1);
  });

  it('should remove the toast element after the specified duration', () => {
    jest.useFakeTimers();
    const target = document.createElement('div');
    Toast.info('Test', 2, target);
    jest.advanceTimersByTime(2000);
    expect(target.childElementCount).toBe(0);
  });

  it('should call info method to show toast with the provided text and duration', () => {
    const spy = jest.spyOn(Toast, 'info');
    Toast.success('Success', 2);
    expect(spy).toHaveBeenCalledWith('Success', 2);
  });

  it('should call info method to show toast with the provided text and duration', () => {
    const spy = jest.spyOn(Toast, 'info');
    Toast.fail('Failed', 2);
    expect(spy).toHaveBeenCalledWith('Failed', 2);
  });
});

describe('copy', () => {
  it('should copy the provided text to the clipboard', () => {
    const ele = document.createElement('textarea');
    document.execCommand = jest.fn();
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();

    copy('Test');

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(document.body.appendChild).toHaveBeenCalledWith(ele);
    expect(document.body.removeChild).toHaveBeenCalledWith(ele);
  });

  it('should show success toast if showTip is true', () => {
    const spy = jest.spyOn(Toast, 'info');
    copy('Test', true);
    expect(spy).toHaveBeenCalledWith('Copy successfully!');
  });

  it('should show success toast When language is Chinese', () => {
    jest.spyOn(navigator, 'language', 'get').mockReturnValue('zh-CN');
    const spy = jest.spyOn(Toast, 'info');
    copy('Test', true);
    expect(spy).toHaveBeenCalledWith('复制成功!');
  });
});

describe('setTitle', () => {
  it('should set the document title to the provided value', () => {
    document.title = '';
    setTitle('New Title');
    expect(document.title).toBe('New Title');
  });

  it('should create an iframe element and append it to the document body', () => {
    document.body.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display: none; width: 0; height: 0;';
    iframe.src = '';
    document.body.appendChild = jest.fn();
    setTitle('New Title');
    expect(document.body.appendChild).toHaveBeenCalledWith(iframe);
  });
});

describe('isElementFullInParentViewport', () => {
  it('should return true if the element is fully revealed within the parent element', () => {
    const parentElement = document.createElement('div');
    const element = document.createElement('div');
    Object.defineProperty(element, 'parentElement', { value: parentElement });
    parentElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100
    }));
    element.getBoundingClientRect = jest.fn(() => ({
      top: 10,
      left: 10,
      bottom: 90,
      right: 90
    }));
    expect(isElementFullInParentViewport(element)).toBe(true);
  });

  it('should return false if the element is not fully revealed within the parent element', () => {
    const parentElement = document.createElement('div');
    const element = document.createElement('div');
    parentElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      bottom: 100,
      right: 100
    }));
    element.getBoundingClientRect = jest.fn(() => ({
      top: 10,
      left: 10,
      bottom: 110,
      right: 110
    }));

    expect(isElementFullInParentViewport(element)).toBe(false);
  });

  it('should return false if the element or parent element is not available', () => {
    expect(isElementFullInParentViewport(null)).toBe(false);
    expect(isElementFullInParentViewport(document.createElement('div'))).toBe(false);
  });
});

describe('isElementFullInViewport', () => {
  it('should return true if the element is fully revealed within the viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 10,
      left: 10,
      bottom: 90,
      right: 90
    }));
    window.innerHeight = 100;
    window.innerWidth = 100;

    expect(isElementFullInViewport(element)).toBe(true);
  });

  it('should return false if the element is not fully revealed within the viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 10,
      left: 10,
      bottom: 110,
      right: 110
    }));
    window.innerHeight = 100;
    window.innerWidth = 100;

    expect(isElementFullInViewport(element)).toBe(false);
  });

  it('should return false if the element is not available', () => {
    expect(isElementFullInViewport(null)).toBe(false);
  });

  it('should return true if the element is not fully revealed within the viewport', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = jest.fn(() => ({
      top: 10,
      left: 10,
      bottom: 110,
      right: 110
    }));
    window.innerHeight = undefined;
    window.innerWidth = undefined;
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(120);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(120);
    expect(isElementFullInViewport(element)).toBe(true);
  });
});
