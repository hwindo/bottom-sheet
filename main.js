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
		this.activate = this.activate.bind(this);
		this.deactivate = this.deactivate.bind(this);
		this.scrim.addEventListener("click", this.deactivate);
		this.handle.addEventListener("click", this.deactivate);
	}
	activate(e) {
		if (e) e.preventDefault();
		this.el.classList.add("active");
	}
	deactivate() {
		this.el.classList.remove("active");
	}
}

const countrySelector = new BottomSheet("country-selector");
document
	.getElementById("country-select-button")
	.addEventListener("click", countrySelector.activate);
