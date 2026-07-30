import * as migration_20260728_122350_initial from './20260728_122350_initial';
import * as migration_20260730_012905_home_global from './20260730_012905_home_global';
import * as migration_20260730_015426_services_order_and_home_services from './20260730_015426_services_order_and_home_services';

export const migrations = [
  {
    up: migration_20260728_122350_initial.up,
    down: migration_20260728_122350_initial.down,
    name: '20260728_122350_initial',
  },
  {
    up: migration_20260730_012905_home_global.up,
    down: migration_20260730_012905_home_global.down,
    name: '20260730_012905_home_global',
  },
  {
    up: migration_20260730_015426_services_order_and_home_services.up,
    down: migration_20260730_015426_services_order_and_home_services.down,
    name: '20260730_015426_services_order_and_home_services'
  },
];
