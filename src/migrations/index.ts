import * as migration_20260728_122350_initial from './20260728_122350_initial';
import * as migration_20260730_012905_home_global from './20260730_012905_home_global';
import * as migration_20260730_015426_services_order_and_home_services from './20260730_015426_services_order_and_home_services';
import * as migration_20260730_080656_drop_unused_home_fields from './20260730_080656_drop_unused_home_fields';
import * as migration_20260730_081513_pricing_fields from './20260730_081513_pricing_fields';

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
    name: '20260730_015426_services_order_and_home_services',
  },
  {
    up: migration_20260730_080656_drop_unused_home_fields.up,
    down: migration_20260730_080656_drop_unused_home_fields.down,
    name: '20260730_080656_drop_unused_home_fields',
  },
  {
    up: migration_20260730_081513_pricing_fields.up,
    down: migration_20260730_081513_pricing_fields.down,
    name: '20260730_081513_pricing_fields'
  },
];
