#!/bin/sh
# Restore a pg_dump -Fc file into a database. DESTRUCTIVE for the target DB:
# objects in the dump are dropped and recreated (--clean --if-exists).
#
#   pg-restore.sh <file.dump> <target DATABASE_URL> --yes
#
# Without --yes it only lists what the dump contains.
set -eu

file="${1:-}"
target="${2:-}"
confirm="${3:-}"
if [ -z "$file" ] || [ -z "$target" ]; then
  echo "usage: $0 <file.dump> <target DATABASE_URL> [--yes]" >&2
  exit 2
fi
[ -f "$file" ] || { echo "no such file: $file" >&2; exit 2; }

pg_restore --list "$file" > /dev/null
echo "[pg-restore] dump: $file ($(pg_restore --list "$file" | grep -c 'TABLE DATA') tables with data)"
if [ "$confirm" != "--yes" ]; then
  echo "[pg-restore] dry run. Re-run with --yes to replace data in the target database." >&2
  exit 1
fi

pg_restore --clean --if-exists --no-owner --no-acl --single-transaction --exit-on-error -d "$target" "$file"
echo "[pg-restore] restored into target. Next: pnpm migrate (applies any newer migrations), restart api/realtime."
