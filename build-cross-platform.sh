#!/bin/bash

# Build the Vite app
yarn build

# Build for Linux
yarn electron-builder --linux AppImage