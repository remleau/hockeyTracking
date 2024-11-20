# Tauri + React

This template should help get you started developing with Tauri and React in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

zipalign -v 4 app-release-unsigned.apk app-release-aligned.apk
apksigner sign --ks my-release-key.jks --ks-key-alias my-key --out app-release-signed.apk app-release-aligned.apk
adb install app-release-signed.apk
