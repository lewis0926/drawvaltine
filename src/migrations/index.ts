import * as migration_20260124_023249 from './20260124_023249';

export const migrations = [
  {
    up: migration_20260124_023249.up,
    down: migration_20260124_023249.down,
    name: '20260124_023249',
  },
];
