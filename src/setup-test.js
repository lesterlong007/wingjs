
global.localStorage = {
  getItem: () => 'val',
  setItem: () => {}
};

global.sessionStorage = {
  getItem: () => 'val',
  setItem: () => {}
};

class ResizeObserver {
  observe() {}
}

global.ResizeObserver = ResizeObserver;
