// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use native_dialog::{ MessageDialogBuilder, MessageLevel };
use tauri::{ async_runtime::spawn, Manager };
use version_compare::{ compare_to, Cmp };

const REPO_OWNER: &'static str = "grand-hawk";
const REPO_NAME: &'static str = "artillery-calculator";
const REMOTE_URL: &'static str = "https://artillery-calculator.com";
const DOWNLOAD_URL: &'static str = "https://download.artillery-calculator.com";

async fn check_for_updates(current_version: String) {
  println!("Fetching latest version...");

  let octocrab = octocrab::instance();
  let binding = octocrab.repos(REPO_OWNER, REPO_NAME);
  let release_handler = binding.releases();

  match release_handler.get_latest().await {
    Ok(latest_release) => {
      let version_parts: Vec<&str> = latest_release.tag_name
        .split("v")
        .collect();
      let latest_version = version_parts.last().unwrap();

      println!("Current version: {}", current_version);
      println!("Latest version: {}", latest_version);

      if compare_to(latest_version, current_version, Cmp::Gt).unwrap_or(false) {
        let confirmation = MessageDialogBuilder::default()
          .set_level(MessageLevel::Info)
          .set_title("Artillery overlay")
          .set_text(
            "A new version is available, do you wish to visit the download page?"
          )
          .confirm()
          .spawn().await
          .unwrap_or(false);

        if confirmation {
          let _ = open::that(DOWNLOAD_URL);
        }
      }
    }

    Err(e) => {
      eprintln!("check_for_updates: {}", e);
    }
  }
}

fn main() {
  tauri::Builder
    ::default()
    .setup(|app| {
      let main = app.get_webview_window("main").unwrap();

      // `tauri dev` builds debug, `tauri build` builds release
      let production = !cfg!(debug_assertions);

      println!("Production: {}", production);

      if production {
        let version = app.package_info().version.to_string();

        spawn(async move {
          check_for_updates(version).await;
        });

        let _ = main.eval(
          &format!("window.location.replace('{}')", REMOTE_URL)
        );
      }

      Ok(())
    })
    .invoke_handler(tauri::generate_handler![])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
