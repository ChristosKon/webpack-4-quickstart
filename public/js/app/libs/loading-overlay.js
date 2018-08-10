const transitionDelay = 200;
const availableColors = [
    '#9c27b0',
    '#7c4dff',
    '#ec407a',
    '#e57373',
    '#03a9f4',
    '#7cb342',
    '#00897b',
    '#9e9d24',
    '#ffc107',
    '#f44336',
];

function getRandomColor() {
    return availableColors[Math.floor(Math.random() * availableColors.length)];
}

class Overlay {
    constructor(parent) {
        let bounce1, bounce2;

        this.parent = parent;

        this.view = document.createElement('div');
        this.view.style.position = 'absolute';
        this.view.style.zIndex = 100;
        this.view.style.opacity = 0;
        this.view.style.left = 0;
        this.view.style.right = 0;
        this.view.style.bottom = 0;
        this.view.style.top = 0;
        this.view.style.backgroundColor = getRandomColor();
        this.view.style.transition = `opacity ${transitionDelay}ms ease-in`;

        this.spinner = document.createElement('div');
        this.spinner.classList.add('sk-double-bounce');
        this.spinner.style.position = 'absolute';
        this.spinner.style.top = '50%';
        this.spinner.style.left = '50%';
        this.spinner.style.margin = '0 auto%';
        this.spinner.style.transform = 'translate3d(-50%, -100%, 0px)';

        bounce1 = document.createElement('div');
        bounce1.style.backgroundColor = '#fff';
        bounce1.classList.add('sk-child');
        bounce1.classList.add('sk-double-bounce1');

        bounce2 = document.createElement('div');
        bounce2.style.backgroundColor = '#fff';
        bounce2.classList.add('sk-child');
        bounce2.classList.add('sk-double-bounce2');

        this.spinner.appendChild(bounce1);
        this.spinner.appendChild(bounce2);

        this.view.appendChild(this.spinner);
    }

    remove(cb) {
        this.view.style.opacity = 0;
        setTimeout(() => {
            this.parent.removeChild(this.view);
            this.parent = null;
            if (typeof cb === 'function') {
                cb();
            }
        }, transitionDelay);
    }
}

export default function createLoadingOverlay(parent) {
    var overlay = new Overlay(parent);

    parent.appendChild(overlay.view);
    overlay.view.style.opacity = 1;

    return overlay;
}
