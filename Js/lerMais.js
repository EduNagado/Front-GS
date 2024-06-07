document.addEventListener("DOMContentLoaded", () => {
    const saibaMaisBtn = document.getElementById("saibaMaisBtn");
    const maisInfo = document.getElementById("maisInfo");

    if (saibaMaisBtn) {
        saibaMaisBtn.addEventListener("click", () => {
            if (maisInfo.style.display === "none") {
                maisInfo.style.display = "block";
                saibaMaisBtn.textContent = "Ler Menos";
            } else {
                maisInfo.style.display = "none";
                saibaMaisBtn.textContent = "Saiba Mais";
            }
        });
    }
});
