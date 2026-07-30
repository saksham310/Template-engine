import * as migration_20260728_122350_initial from './20260728_122350_initial';
import * as migration_20260730_012905_home_global from './20260730_012905_home_global';

export const migrations = [
  {
    up: migration_20260728_122350_initial.up,
    down: migration_20260728_122350_initial.down,
    name: '20260728_122350_initial',
  },
  {
    up: migration_20260730_012905_home_global.up,
    down: migration_20260730_012905_home_global.down,
    name: '20260730_012905_home_global'
  },
];
