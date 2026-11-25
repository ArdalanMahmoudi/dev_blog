#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/6ff68a1abad46fa61da4b2a9e8d3cbdb7d17729c5ec95dc6721eba483ff6979a/contract';
import endContract from '../../snapshots/6ff68a1abad46fa61da4b2a9e8d3cbdb7d17729c5ec95dc6721eba483ff6979a/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/db498e8876217996e0aa2e00268402dcf5de1256425af7473b2fe3c0b3e1e84d/contract';
import startContract from '../../snapshots/db498e8876217996e0aa2e00268402dcf5de1256425af7473b2fe3c0b3e1e84d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('isAdmin', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
