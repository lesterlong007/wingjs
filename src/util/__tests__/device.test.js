import {
    isMobile,
    isIOS,
    isSafari,
    getDevicePlatform,
  } from '../device';
  
  describe('isMobile', () => {
    it('should return true for mobile devices', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
        writable: true,
      });
      const result = isMobile();
      expect(result).toBe(true);
    });
  
    it('should return false for non-mobile devices', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        writable: true,
      });
      const result = isMobile();
      expect(result).toBe(false);
    });
  });
  
  describe('isIOS', () => {
    it('should return true for iOS devices', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
        writable: true,
      });
  
      Object.defineProperty(window, 'ontouchstart', {
        value: true,
        writable: true,
      });
      const result = isIOS();
      expect(result).toBe(true);
    });
  
    it('should return false for non-iOS devices', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        writable: true,
      });
  
      delete window.ontouchstart;
      const result = isIOS();
      expect(result).toBe(false);
    });
  });
  
  describe('isSafari', () => {
    it('should return true for Safari browser', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
        writable: true,
      });
  
      Object.defineProperty(window.navigator, 'vendor', {
        value: 'Apple Computer, Inc.',
        writable: true,
      });
      const result = isSafari();
      expect(result).toBe(true);
    });
  
    it('should return false for non-Safari browsers', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
        writable: true,
      });
  
      Object.defineProperty(window.navigator, 'vendor', {
       value: 'Google Inc.',
        writable: true,
      });
  
      const result = isSafari();
      expect(result).toBe(false);
    });
  });
  
  describe('getDevicePlatform', () => {
    it('should return the correct platform for different user agents', () => {
      expect(getDevicePlatform('mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/96.0.4664.93 safari/537.36')).toBe('windows');
      expect(getDevicePlatform('mozilla/5.0 (iphone; cpu iphone os 14_5 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/14.1 mobile/15e148 safari/604.1')).toBe('ios');
      expect(getDevicePlatform('mozilla/5.0 (ipad; cpu os 14_5 like mac os x) applewebkit/605.1.15 (khtml, like gecko) version/14.1 mobile/15e148 safari/604.1')).toBe('ipad');
      expect(getDevicePlatform('mozilla/5.0 (android 10; mobile; rv:68.0) gecko/68.0 firefox/68.0')).toBe('android');
      expect(getDevicePlatform('mozilla/5.0 (macintosh; intel mac os x 10_15_7) applewebkit/605.1.15 (khtml, like gecko) version/15.0 safari/605.1.15')).toBe('mac');
      expect(getDevicePlatform('unknown')).toBe('others');
    });
  });