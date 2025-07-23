makeCreateActive = document.querySelector(".create-new");
makePasswordActive = document.querySelector(".password-button");
modalPassword = document.querySelector(".password-modal");
modalCreate = document.querySelector(".create-modal");
modalWrong = document.querySelector("wrong-modal");
modalConfig = document.querySelector("config-modal");
closeModalButtons = document.querySelectorAll(".modal-background");

function openCreateModal() { //opens modal
    modalCreate.classList.add("is-active");
}

function openConfigModal() { //opens modal
    modalConfig.classList.add("is-active");
}

function openPasswordModal() { //opens modal
    modalPassword.classList.add("is-active");
}

function openWrongModal() { //opens modal
    modalWrong.classList.add("is-active");
}

function closeModal() { //opens modal
    modalCreate.classList.remove("is-active");
    modalPassword.classList.remove("is-active");
    modalWrong.classList.remove("is-active");
    modalConfig.classList.remove("is-active");

}

closeModalButtons.forEach(button => { //chatgpt fix
    button.onclick = closeModal;
});

makeCreateActive.onclick = openCreateModal;
makePasswordActive.onclick = openPasswordModal;
closeModalButtons.onclick = closeModal;

window.addEventListener("DOMContentLoaded", () => { //chatgpt function
    const flag = document.getElementById("wrong-flag");
    console.log("TEST");
    if (flag && flag.dataset.wrong === "true") {
        console.log("TEST");
        openWrongModal();
    }
});

function processContents(contents) {
    // write code to process the file here


    // contents is a string
    // write the processed file to the fileData variable
}


//download file
const downloadLink = document.querySelector(".download-link");

function downloadFile() {
    // using "rawData" as exportable data here. Swap for whatever should be exported
    let rawData = "This string will be written to file";


    let data = new Blob([rawData], { type: 'text/plain' });


    let url = window.URL.createObjectURL(data);
    downloadLink.href = url;
}


downloadLink.onclick = downloadFile;