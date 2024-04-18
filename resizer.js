// resizer.js
window.addEventListener('DOMContentLoaded', function() {
    const cy = document.getElementById('cy');
    const resizer = document.querySelector('.resizer');
    let isResizing = false;
    let initialHeight;
    let initialMouseY;

    resizer.addEventListener('mousedown', startResize);

    function startResize(e) {
        isResizing = true;
        initialHeight = cy.offsetHeight;
        initialMouseY = e.clientY;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
        if (!isResizing) return;
        const currentHeight = initialHeight + (e.clientY - initialMouseY);
        cy.style.height = `${currentHeight}px`;
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
    }
});
