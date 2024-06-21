// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use native_dialog::MessageDialog;
use tauri::Manager;

const REPO_OWNER: &'static str = "ari-party";
const REPO_NAME: &'static str = "mtc-artillery";

fn main() {
  dotenv::dotenv().ok();

  tauri::Builder
    ::default()
    .setup(|app| {
      let main = app.get_window("main").unwrap();
      let tauri_env = env
        ::var("TAURI_ENV")
        .unwrap_or_else(|_| "production".into());

      if tauri_env == "production" {
        let _ = main.eval(
          "window.location.replace('https://artillery-calculator.com')"
        );

        tauri::async_runtime::spawn(async {
          let octocrab = octocrab::instance();
          let binding = octocrab.repos(REPO_OWNER, REPO_NAME);
          let release_handler = binding.releases();
          let latest_release = release_handler.get_latest().await.unwrap();

          let version_parts: Vec<&str> = latest_release.tag_name
            .split("v")
            .collect();
          let latest_version = version_parts.last().unwrap();
          let current_version = tauri::VERSION;

          if *latest_version != current_version {
            let confirmation = MessageDialog::new()
              .set_type(native_dialog::MessageType::Info)
              .set_title("Artillery overlay")
              .set_text(
                "A new version is available, do you wish to visit the releases page?"
              )
              .show_confirm()
              .unwrap();

            if confirmation {
              let _ = open::that("https://overlay.artillery-calculator.com");
            }
          }
        });
      }

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
