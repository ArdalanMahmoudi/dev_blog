#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0f93c7d1aee9e350193a3b394750926834c3580f74ec1170648b4ba22208e838/contract';
import endContract from '../../snapshots/0f93c7d1aee9e350193a3b394750926834c3580f74ec1170648b4ba22208e838/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/6ff68a1abad46fa61da4b2a9e8d3cbdb7d17729c5ec95dc6721eba483ff6979a/contract';
import startContract from '../../snapshots/6ff68a1abad46fa61da4b2a9e8d3cbdb7d17729c5ec95dc6721eba483ff6979a/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setNotNull({ schema: 'public', table: 'Post', column: 'content' }),
      this.addUnique({
        schema: 'public',
        table: 'Post',
        constraint: 'Post_slug_key',
        columns: ['slug'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
