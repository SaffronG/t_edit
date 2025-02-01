const { invoke } = window.__TAURI__.core;

let greetInputEl;
let greetMsgEl;

async function load_file() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsgEl.textContent = await invoke("load_file", { num: Number(greetInputEl.value) });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input")
  greetMsgEl = document.querySelector("#greet-msg")
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = greetInputEl.files[0] // Access the file from the input element

    reader.onload = function (e) {
      let file_output = e.target.result; // Set the file_output variable
      document.getElementById("file_output").innerHTML = file_output;
      console.log(file_output)
    }
    console.log(file_output)
    
    if (file) {
      reader.readAsText(file) // Read the file as text
    } else {
      console.log("No file selected")
    }
  })
})