function toggleText() {
    const textContent = document.getElementById('text-content');
    const moreText = document.getElementById('more-text');
    const toggleBtn = document.getElementById('toggle-btn');

    // Verifica se o texto está escondido ou visível
    if (moreText.classList.contains('hidden')) {
        moreText.classList.remove('hidden');
        textContent.classList.add('show');
        toggleBtn.textContent = 'Leia menos';
    } else {
        moreText.classList.add('hidden');
        textContent.classList.remove('show');
        toggleBtn.textContent = 'Leia mais';
    }
}
