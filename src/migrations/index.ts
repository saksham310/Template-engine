import * as migration_20260803_144128_initial from './20260803_144128_initial';

export const migrations = [
  {
    up: migration_20260803_144128_initial.up,
    down: migration_20260803_144128_initial.down,
    name: '20260803_144128_initial'
  },
];
