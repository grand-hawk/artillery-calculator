// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use tauri::Manager;

fn main() {
    dotenv::dotenv().ok();

    tauri::Builder::default()
        .setup(|app| {
            let main = app.get_window("main").unwrap();
            let tauri_env = env::var("TAURI_ENV").unwrap_or_else(|_| "production".into());

            // TAURI_ENV gets set during dev but not prod
            if tauri_env != "development" {
                let _ = main.eval("window.location.replace('https://artillery-calculator.com')");
            }

            // use overlay view
            let _ = main.eval("window.localStorage.setItem('overlay-client', 'true')");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
