//picture wiggle code

const footerName = document.getElementById("footer-name");
const profilePicture = document.querySelector("#about img");

footerName.addEventListener("click", () => {
    profilePicture.classList.remove("wiggle");

    // Restart animation if clicked repeatedly
    void profilePicture.offsetWidth;

    profilePicture.classList.add("wiggle");
});