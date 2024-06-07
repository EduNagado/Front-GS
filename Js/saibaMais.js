document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".card button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const link = button.getAttribute("data-link");
            window.location.href = link;
        });
    });
});
