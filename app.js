function showJuliaFractal() {
    const popupWidth = 600;
    const popupHeight = 600;
    const popup = window.open('', '', `width=${popupWidth},height=${popupHeight}`);
    
    popup.document.write('<canvas id="fractalCanvas" width="600" height="600"></canvas>');
    
    const canvas = popup.document.getElementById('fractalCanvas');
    const ctx = canvas.getContext('2d');

    drawJuliaFractal(ctx, canvas.width, canvas.height);
}

function drawJuliaFractal(ctx, width, height) {
    const maxIter = 300;
    const zoom = 1;
    const moveX = 0;
    const moveY = 0;

    const cX = -0.7;  // Constant for Julia Fractal
    const cY = 0.27015;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
            let zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
            let i = maxIter;

            while (zx * zx + zy * zy < 4 && i > 0) {
                const tmp = zx * zx - zy * zy + cX;
                zy = 2.0 * zx * zy + cY;
                zx = tmp;
                i--;
            }

            const color = i ? `hsl(${i * 10}, 100%, 50%)` : 'black';
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

