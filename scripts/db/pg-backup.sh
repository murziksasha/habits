#!/bin/sh
# Scheduled Postgres backups: pg_dump -Fc into $BACKUP_DIR, prune old files.
#
#   pg-backup.sh once   -> one dump, then prune, exit
#   pg-backup.sh loop   -> dump every $BACKUP_INTERVAL_SECONDS (default 86400), forever
#
# Connection: standard libpq env (PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
# or DATABASE_URL. Used by the `pg-backup` compose service and on the host.
set -eu

BACKUP_DIR="${BACKUP_DIR:-/backups}"
KEEP_DAYS="${BACKUP_KEEP_DAYS:-14}"
KEEP_MIN="${BACKUP_KEEP_MIN:-3}"
INTERVAL="${BACKUP_INTERVAL_SECONDS:-86400}"
PREFIX="${BACKUP_PREFIX:-eduforge}"

log() { echo "[pg-backup] $(date -u +%Y-%m-%dT%H:%M:%SZ) $*"; }

dump_once() {
  mkdir -p "$BACKUP_DIR"
  ts="$(date -u +%Y%m%dT%H%M%SZ)"
  out="$BACKUP_DIR/${PREFIX}-${ts}.dump"
  tmp="$out.partial"
  if [ -n "${DATABASE_URL:-}" ]; then
    pg_dump -Fc --no-owner --no-acl -f "$tmp" "$DATABASE_URL"
  else
    pg_dump -Fc --no-owner --no-acl -f "$tmp"
  fi
  # A dump that pg_restore cannot list is not a backup.
  pg_restore --list "$tmp" > /dev/null
  mv "$tmp" "$out"
  log "ok $out ($(du -h "$out" | cut -f1))"
  prune
}

# Delete dumps older than KEEP_DAYS, but always keep the newest KEEP_MIN.
prune() {
  # shellcheck disable=SC2012
  ls -1t "$BACKUP_DIR"/"$PREFIX"-*.dump 2>/dev/null | tail -n +"$((KEEP_MIN + 1))" | while read -r f; do
    if [ -n "$(find "$f" -mtime +"$KEEP_DAYS" 2>/dev/null)" ]; then
      rm -f "$f" && log "pruned $f"
    fi
  done
  rm -f "$BACKUP_DIR"/*.partial 2>/dev/null || true
}

case "${1:-once}" in
  once) dump_once ;;
  loop)
    log "every ${INTERVAL}s to $BACKUP_DIR, keep ${KEEP_DAYS}d (min ${KEEP_MIN})"
    while true; do
      dump_once || log "FAILED (will retry next interval)"
      sleep "$INTERVAL"
    done
    ;;
  *) echo "usage: $0 once|loop" >&2; exit 2 ;;
esac
