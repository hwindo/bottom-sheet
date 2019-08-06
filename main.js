import "./style.scss";

/**
 * Bottom Sheet
 * @author Windo <herwindo.artono@go-jek.com>
 */
class BottomSheet {
    constructor(id) {
        this.id = id;
        this.el = document.getElementById(id);
        this.scrim = this.el.querySelector(".c-bottom-sheet__scrim");
        this.handle = this.el.querySelector(".c-bottom-sheet__handle");
        this.sheet = this.el.querySelector(".c-bottom-sheet__sheet");
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);

        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.drag = this.drag.bind(this);

        this.scrim.addEventListener("click", this.deactivate);
        this.handle.addEventListener("click", this.deactivate);

        this.sheetActive = false;
        this.currentY;
        this.initialY;
        this.yOffset = 0;

        this.sheet.addEventListener("mousedown", this.dragStart);
        this.sheet.addEventListener("mouseleave", this.dragEnd);
        this.sheet.addEventListener("mouseup", this.dragEnd);
        this.sheet.addEventListener("mousemove", this.drag);

        this.sheet.addEventListener("touchstart", this.dragStart);
        this.sheet.addEventListener("touchend", this.dragEnd);
        this.sheet.addEventListener("touchmove", this.drag);
    }
    activate(e) {
        if (e) e.preventDefault();
        this.el.classList.add("active");
    }
    deactivate(translateY) {
        if (!translateY) {
            this.sheet.style.setProperty("--translateY", `translateY(201px)`);
        } else {
            this.sheet.style.setProperty(
                "transition",
                `transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
            );
            this.sheet.style.setProperty(
                "--translateY",
                `translateY(${translateY}px)`
            );
        }

        this.el.classList.remove("active");
    }
    dragStart(e) {
        this.sheetActive = true;
        this.sheet.classList.add("active");

        if (e.type === "touchstart") {
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialY = e.clientY - this.yOffset;
        }
        this.sheet.style.setProperty("--translateY", `translateY(0)`);
        this.sheet.style.setProperty("transition", `unset`);
    }
    dragEnd(e) {
        this.sheetActive = false;
        this.sheet.classList.remove("active");

        this.yOffset = 0;

        this.initialY = this.currentY;
        this.sheet.style.setProperty(
            "transition",
            `transform 150ms cubic-bezier(0.4, 0, 0.2, 1)`
        );
        this.sheet.style.setProperty(
            "--translateY",
            `translateY(${this.currentY}px)`
        );
    }
    drag(e) {
        if (!this.sheetActive) return;
        e.preventDefault();

        if (e.type === "touchmove") {
            this.currentY = e.touches[0].clientY - this.initialY;
        } else {
            this.currentY = e.clientY - this.initialY;
        }

        this.yOffset = this.currentX;

        if (this.currentY <= -40) {
            this.currentY = -41 + this.currentY / 10;
        } else if (this.currentY <= -60) {
            this.currentY = -60;
        } else if (this.currentY >= 210) {
            this.deactivate(this.currentY);
            return;
        }

        this.sheet.style.setProperty(
            "--translateY",
            `translateY(${this.currentY}px)`
        );

        console.log({
            sheetActive: this.sheetActive,
            initialY: this.initialY,
            currentY: this.currentY
        });
    }
}

const bottomSheet = new BottomSheet("country-selector");
document
    .getElementById("country-select-button")
    .addEventListener("click", bottomSheet.activate);

window.bottomSheet = bottomSheet;
