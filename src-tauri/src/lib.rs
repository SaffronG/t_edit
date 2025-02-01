use std::{fs::File, io::Read, path::Path};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn load_file(path: String) -> String {
    let mut buffer = String::new();
    match File::open(Path::new(&path)).unwrap().read_to_string(&mut buffer) {
        Ok(_) => buffer,
        Err(err) => err.to_string(),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![load_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
