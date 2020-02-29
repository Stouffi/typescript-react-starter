#!/bin/sh
if yarn yarn-deduplicate -fl
then
echo "INFO: No duplicates found. Pursuing..."
else
echo "INFO: Lockfile contains duplicates! deduplicating..."
yarn yarn-deduplicate
echo "INFO: Lockfile deduplicated. Reinstalling..."
yarn
fi