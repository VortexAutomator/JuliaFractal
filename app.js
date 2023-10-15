let angle = 0;

function openPopup() {
    const popupWindow = window.open("", "_blank", "width=800,height=800");
    
    const canvas = popupWindow.document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    popupWindow.document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cx = Math.sin(angle) * 0.6;
        const cy = Math.cos(angle) * 0.6;
        
        drawJulia(canvas, ctx, cx, cy);

        angle += 0.02;
        requestAnimationFrame(animate);
    }

    animate();
}

function drawJulia(canvas, ctx, cx, cy) {
    const width = canvas.width;
    const height = canvas.height;
    
    const zoom = 200;
    const moveX = 0;
    const moveY = 0;

    const maxIter = 300;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
            let zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
            let i = maxIter;
            
            while (zx * zx + zy * zy < 4 && i > 0) {
                const tmp = zx * zx - zy * zy + cx;
                zy = 2.0 * zx * zy + cy;
                zx = tmp;
                i--;
            }
            
            const color = getColor(i);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function getColor(iterations) {
    if (iterations === 0) return 'black';
    
    const frequency = 0.016;
    const r = Math.sin(frequency * iterations + 0) * 127 + 128;
    const g = Math.sin(frequency * iterations + 2) * 127 + 128;
    const b = Math.sin(frequency * iterations + 4) * 127 + 128;

    return `rgb(${r},${g},${b})`;
}


