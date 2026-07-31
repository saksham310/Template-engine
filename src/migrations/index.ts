import * as migration_20260728_122350_initial from './20260728_122350_initial';
import * as migration_20260730_012905_home_global from './20260730_012905_home_global';
import * as migration_20260730_015426_services_order_and_home_services from './20260730_015426_services_order_and_home_services';
import * as migration_20260730_080656_drop_unused_home_fields from './20260730_080656_drop_unused_home_fields';
import * as migration_20260730_081513_pricing_fields from './20260730_081513_pricing_fields';
import * as migration_20260730_084632_drop_feature_icons from './20260730_084632_drop_feature_icons';
import * as migration_20260730_092630_lead_context from './20260730_092630_lead_context';
import * as migration_20260731_065719_drop_editorial_quote from './20260731_065719_drop_editorial_quote';

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
    name: '20260730_081513_pricing_fields',
  },
  {
    up: migration_20260730_084632_drop_feature_icons.up,
    down: migration_20260730_084632_drop_feature_icons.down,
    name: '20260730_084632_drop_feature_icons',
  },
  {
    up: migration_20260730_092630_lead_context.up,
    down: migration_20260730_092630_lead_context.down,
    name: '20260730_092630_lead_context',
  },
  {
    up: migration_20260731_065719_drop_editorial_quote.up,
    down: migration_20260731_065719_drop_editorial_quote.down,
    name: '20260731_065719_drop_editorial_quote'
  },
];
