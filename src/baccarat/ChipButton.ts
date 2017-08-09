class ChipButton extends RadioButton {
	public constructor() {
		super();
		this.setSize(96, 96);
		this.setAddPressedTexture("chipAddPressed_png", 146, 146);
	}

	public setButton(display, chip) {
		this.setNormalTexture(display);
		this.setLabel(chip);
		this.setOnClickCallback(function() {
			EventDispatcher.getInstance().sendDataEvent(Events.GET_CURRENT_BET_CHIP_NUM, chip);
		});
	}
}