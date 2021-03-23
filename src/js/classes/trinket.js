class Trinket {
	constructor(player) {
		this.player = player;
		this.cooldown = 0;
		this.cooldownRemaining = 0;
		this.active = false;
		this.duration = 0;
		this.durationRemaining = 0;
		this.name = "undefined";
		this.sharesCooldown = true;
	}

	ready() {
		return this.cooldownRemaining <= 0;
	}

	use() {
		if (!this.active) {
			this.player.combatLog(this.name + " used");
			for (let stat in this.stats) {
				if (this.player.stats.hasOwnProperty(stat)) {
					this.player.stats[stat] += this.stats[stat];
					this.player.combatLog(stat + " + " + this.stats[stat] + " (now: " + this.player.stats[stat] + ")");
				}
			}
			this.active = true;
			this.durationRemaining = this.duration;
			this.cooldownRemaining = this.cooldown;
		}
	}

	fade() {
		if (this.active) {
			this.player.combatLog(this.name + " faded");
			for (let stat in this.stats) {
				if (this.player.stats.hasOwnProperty(stat)) {
					this.player.stats[stat] -= this.stats[stat];
					this.player.combatLog(stat + " - " + this.stats[stat] + " (now: " + this.player.stats[stat] + ")");
				}
			}
			this.active = false;
		}
	}

	tick(t) {
		this.cooldownRemaining = Math.max(0,this.cooldownRemaining - t);
		this.durationRemaining = Math.max(0,this.durationRemaining - t);
		if (this.active && this.durationRemaining <= 0) {
			this.fade();
		}
	}
}

class RestrainedEssenceOfSapphiron extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Restrained Essence of Sapphiron";
		this.cooldown = 120;
		this.duration = 20;
		this.stats = {
			"spellPower": 130
		}
	}
}

class ShiftingNaaruSliver extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Shifting Naaru Sliver";
		this.cooldown = 90;
		this.duration = 15;
		this.stats = {
			"spellPower": 320
		}
	}
}

class SkullOfGuldan extends Trinket {
	constructor(player) {
		super(player);
		this.name = "The Skull of Gul'dan";
		this.cooldown = 120;
		this.duration = 20;
		this.stats = {
			"hasteRating": 175
		}
	}
}

class HexShrunkenHead extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Hex Shrunken Head";
		this.cooldown = 120;
		this.duration = 20;
		this.stats = {
			"spellPower": 211
		}
	}
}

class IconOfTheSilverCrescent extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Icon of the Silver Crescent";
		this.cooldown = 120;
		this.duration = 20;
		this.stats = {
			"spellPower": 155
		}
	}
}

class ScryersBloodgem extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Scryer's Bloodgem";
		this.cooldown = 90;
		this.duration = 15;
		this.stats = {
			"spellPower": 150
		}
	}
}

class AncientCrystalTalisman extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Ancient Crystal Talisman";
		this.cooldown = 120;
		this.duration = 20;
		this.stats = {
			"spellPower": 104
		}
	}
}

class ArcanistsStone extends Trinket {
	constructor(player) {
	 	super(player);
	 	this.name = "Arcanist's Stone";
	 	this.cooldown = 120;
	 	this.duration = 20;
	 	this.stats = {
	 		"spellPower": 167
	 	}
	}
}

class TerokkarTabletOfVim extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Terokkar Tablet of Vim";
		this.cooldown = 90;
		this.duration = 15;
		this.stats = {
			"spellPower": 84
		}
	}
}

class XirisGift extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Xi'ri's Gift";
		this.cooldown = 90;
		this.duration = 15;
		this.stats = {
			"spellPower": 150
		}
	}
}

class VengeanceOfTheIllidari extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Vengeance of the Illidari";
		this.cooldown = 90;
		this.duration = 15;
		this.stats = {
			"spellPower": 120
		}
	}
}

class FigurineLivingRubySerpent extends Trinket {
	constructor(player) {
		super(player);
		this.name = "Figurine - Living Ruby Serpent";
		this.cooldown = 300;
		this.duration = 20;
		this.stats = {
			"spellPower": 150
		}
	}
}