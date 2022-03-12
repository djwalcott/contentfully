const mmkvMock: any = {
  __INTERNAL_MOCK_STORAGE__: {},

  set: jest.fn(async (key, value) => {
    mmkvMock.__INTERNAL_MOCK_STORAGE__[key] = value;

    return null;
  }),

  getString: jest.fn(async key => {
    const result: unknown = mmkvMock.__INTERNAL_MOCK_STORAGE__[key]
      ? mmkvMock.__INTERNAL_MOCK_STORAGE__[key]
      : null;

    return result;
  }),

  delete: jest.fn((key: string) => _removeItem(key)),

  clearAll: jest.fn(_clearAll),
  getAllKeys: jest.fn(_getAllKeys),
};

async function _removeItem(key: string) {
  if (mmkvMock.__INTERNAL_MOCK_STORAGE__[key]) {
    delete mmkvMock.__INTERNAL_MOCK_STORAGE__[key];
  }
}

async function _clearAll() {
  mmkvMock.__INTERNAL_MOCK_STORAGE__ = {};

  return null;
}

async function _getAllKeys() {
  return Object.keys(mmkvMock.__INTERNAL_MOCK_STORAGE__);
}

jest.fn(() => mmkvMock);

module.exports = {
  MMKV: jest.fn(() => mmkvMock),
};

export {};
