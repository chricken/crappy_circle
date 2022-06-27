'use strict';

import calc from './calc.js';

const render = {
    c: false,
    ctx: false,

    angle: 360 * 10,
    bm(angle) {
        return angle / 180 * Math.PI;
    },
    // i steht für irregular
    renderIArc({
        startAngle = 0,
        endAngle = 60,
        startRadius = 220,
        endRadius = 180,
        posX = render.c.width / 2,
        posY = render.c.height / 2,
    } = {}) {
        let c = render.c;
        let ctx = render.ctx;

        ctx.lineWidth = 1;

        ctx.beginPath();
        for (let angle = startAngle; angle < endAngle; angle++) {
            // Anzahl Schleifeniterationen
            let r = endAngle - startAngle;
            // Einzelne Schrittlänge
            r = (endRadius - startRadius) / r;
            // Radius für die Iteration
            r = r * (angle - startAngle) + startRadius;

            ctx.arc(
                posX,
                posY,
                r,
                render.bm(angle),
                render.bm(angle + 1)
            )

        }

        ctx.stroke();
    },

    combineIArcs() {
        let c = render.c;
        let ctx = render.ctx;

        let data = {
            startAngle: 0,
            endAngle: 60,
            startRadius: 100,
            endRadius: 120,
            posX: render.c.width / 2,
            posY: render.c.height / 2
        }

        ctx.moveTo(data.posX + data.startRadius, data.posY)
        render.renderIArc(data)


        for (let i = 1; i < 200; i++) {
            data.startAngle = data.endAngle;
            data.endAngle = data.endAngle + calc.createNumber(10, 20);
            data.startRadius = data.endRadius;
            data.endRadius = data.endRadius + (calc.createNumber(-600, 600) / 100);

            render.renderIArc(data)
        }

    },

    renderCircleStack(numCircles = 10, spread = 10) {
        let c = render.c;
        let ctx = render.ctx;

        ctx.beginPath();
        for (let i = 0; i < numCircles; i++) {
            let z = {
                x: c.width / 2 + calc.createNumber(-spread, spread),
                y: c.height / 2 + calc.createNumber(-spread, spread),
                r: calc.createNumber(200, 230),
            }

            ctx.moveTo(z.x + z.r, z.y);
            ctx.arc(z.x, z.y, z.r, 0, render.bm(360));

        }
        ctx.stroke();
    },
    resize() {
        render.c.width = 600;
        render.c.height = 600;
    },
    init() {
        render.angle = render.bm(render.angle);
        render.c = document.querySelector('canvas');
        render.ctx = render.c.getContext('2d');
        render.resize();
        // render.renderCircleStack(150, 20);
        render.combineIArcs()
    }
}

export default render;