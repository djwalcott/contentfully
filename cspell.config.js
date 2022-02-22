'use strict';

/** @type { import("@cspell/cspell-types").CSpellUserSettings } */
const cspell = {
  description: 'Contentfully cspell settings',
  useGitignore: true,
  words: [
    'Unpadded',
    'Unpublish',
    'reduxjs',
    'Contentfully',
    'MMKV',
    'gorhom',
    'gorhom',
    'Contentful',
    'persistor',
    'gradlew',
  ],
  ignorePaths: [
    'ios/**',
    '**.m4v',
    '**.mp4',
    '**.gradlew',
    '**.jar',
    '**.gradle',
    '**.bzl',
    '**._BUCK',
  ],
  language: 'en-us',
};
module.exports = cspell;
