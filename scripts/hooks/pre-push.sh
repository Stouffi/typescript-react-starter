#!/bin/sh
if ! yarn check --integrity
then
yarn
fi