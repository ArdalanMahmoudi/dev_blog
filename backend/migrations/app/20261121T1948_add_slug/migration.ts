#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4a3f11b54386689c421453e86ea1a872a9f7dbd79a4e34120fdc42984da51edc/contract';
import startContract from '../../snapshots/4a3f11b54386689c421453e86ea1a872a9f7dbd79a4e34120fdc42984da51edc/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/db498e8876217996e0aa2e00268402dcf5de1256425af7473b2fe3c0b3e1e84d/contract';
import endContract from '../../snapshots/db498e8876217996e0aa2e00268402dcf5de1256425af7473b2fe3c0b3e1e84d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'Post',
        column: 'slug',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
