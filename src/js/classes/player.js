class Player {
	static getSettings() {
		return {
			"talents": {
				"suppression": parseInt($("#suppression").attr('data-points')),
				"improvedCorruption": parseInt($("#improvedCorruption").attr('data-points')),
				"improvedLifeTap": parseInt($("#improvedLifeTap").attr('data-points')),
				"improvedCurseOfAgony": parseInt($("#improvedCurseOfAgony").attr('data-points')),
				"amplifyCurse": parseInt($("#amplifyCurse").attr('data-points')),
				"nightfall": parseInt($("#nightfall").attr('data-points')),
				"empoweredCorruption": parseInt($("#empoweredCorruption").attr('data-points')),
				"siphonLife": parseInt($("#siphonLife").attr('data-points')),
				"shadowMastery": parseInt($("#shadowMastery").attr('data-points')),
				"contagion": parseInt($("#contagion").attr('data-points')),
				"unstableAffliction": parseInt($("#unstableAffliction").attr('data-points')),
				"felIntellect": parseInt($("#felIntellect").attr('data-points')),
				"felStamina": parseInt($("#felStamina").attr('data-points')),
				"demonicAegis": parseInt($("#demonicAegis").attr('data-points')),
				"demonicSacrifice": parseInt($("#demonicSacrifice").attr('data-points')),
				"demonicKnowledge": parseInt($("#demonicKnowledge").attr('data-points')),
				"demonicTactics": parseInt($("#demonicTactics").attr('data-points')),
				"improvedShadowBolt": parseInt($("#improvedShadowBolt").attr('data-points')),
				"cataclysm": parseInt($("#cataclysm").attr('data-points')),
				"bane": parseInt($("#bane").attr('data-points')),
				"devastation": parseInt($("#devastation").attr('data-points')),
				"shadowburn": parseInt($("#shadowburn").attr('data-points')),
				"improvedSearingPain": parseInt($("#improvedSearingPain").attr('data-points')),
				"improvedImmolate": parseInt($("#improvedImmolate").attr('data-points')),
				"ruin": parseInt($("#ruin").attr('data-points')),
				"emberstorm": parseInt($("#emberstorm").attr('data-points')),
				"backlash": parseInt($("#backlash").attr('data-points')),
				"conflagrate": parseInt($("#conflagrate").attr('data-points')),
				"shadowAndFlame": parseInt($("#shadowAndFlame").attr('data-points'))
			},
			"stats": characterStats,
			"enemy": {
				"level": $("input[name='target-level']").val(),
				"shadowResist": $("input[name='target-shadow-resistance']").val(),
				"fireResist": $("input[name='target-fire-resistance']").val()
			},
			"rotation": {
				"dots": {
					"immolate": $("#dot-immolate").attr('data-checked') === 'true',
					"corruption": $("#dot-corruption").attr('data-checked') === 'true',
					"siphonLife": $("#dot-siphon-life").attr('data-checked') === 'true',
					"unstableAffliction": $("#dot-unstable-affliction").attr('data-checked') === 'true'
				},
				"fillers": {
					"searingPain": $("#filler-searing-pain").attr('data-checked') === 'true',
					"shadowBolt": $("#filler-shadow-bolt").attr('data-checked') === 'true',
					"incinerate": $("#filler-incinerate").attr('data-checked') === 'true',
				},
				"curses": {
					"curseOfRecklessness": $("#curse-curse-of-recklessness").attr('data-checked') === 'true',
					"curseOfTheElements": $("#curse-curse-of-the-elements").attr('data-checked') === 'true',
					"curseOfDoom": $("#curse-curse-of-doom").attr('data-checked') === 'true',
					"curseOfAgony": $("#curse-curse-of-agony").attr('data-checked') === 'true'
				},
				"finishers": {
					"deathCoil": $("#finisher-death-coil").attr('data-checked') === 'true',
					"shadowburn": $("#finisher-shadowburn").attr('data-checked') === 'true',
				}
			},
		}
	}

	constructor(settings) {
		this.stats = settings.stats;
		this.enemy = settings.enemy;
		this.level = 70;
		this.stats.health = (this.stats.health + (this.stats.stamina * this.stats.staminaModifier) * healthPerStamina) * (1 + (0.01 * settings.talents.felStamina));
		this.stats.mana = (this.stats.mana + (this.stats.intellect * this.stats.intellectModifier) * manaPerInt) * (1 + (0.01 * settings.talents.felIntellect));
		this.stats.critChance = baseCritChancePercent + ((this.stats.critRating + ((this.stats.intellect * this.stats.intellectModifier) * critPerInt)) / critRatingPerPercent) + settings.talents.devastation + settings.talents.backlash + settings.talents.demonicTactics;
		this.stats.shadowModifier *= (1 + (0.02 * settings.talents.shadowMastery));
		this.stats.critChanceMultiplier = 1000;
		this.stats.critChance = Math.round(this.stats.critChance * this.stats.critChanceMultiplier); // Multiply the crit chance in order to use a whole number for RNG calculations.
		this.stats.extraHitChance = this.stats.hitRating / hitRatingPerPercent; // hit percent from hit rating
		this.stats.hitChance = this.getHitChance(parseInt(this.enemy.level)); // The player's chance of hitting the enemy, between 61% and 99%

		console.log("Health: " + Math.round(this.stats.health));
		console.log("Mana: " + Math.round(this.stats.mana));
		console.log("Stamina: " + Math.round(this.stats.stamina * this.stats.staminaModifier));
		console.log("Intellect: " + Math.round(this.stats.intellect * this.stats.intellectModifier));
		console.log("Spell Power: " + this.stats.spellPower);
		console.log("Shadow Power: " + this.stats.shadowPower);
		console.log("Fire Power: " + this.stats.firePower);
		console.log("Crit Chance: " + Math.round((this.stats.critChance / this.stats.critChanceMultiplier) * 100) / 100 + "%");
		console.log("Hit Chance: " + Math.round((this.stats.extraHitChance) * 100) / 100 + "%");
		console.log("Haste: " + Math.round((this.stats.hasteRating / hasteRatingPerPercent) * 100) / 100 + "%");
		console.log("Shadow Modifier: " + Math.round(this.stats.shadowModifier * 100) + "%");
		console.log("Fire Modifier: " + Math.round(this.stats.fireModifier * 100) + "%");
		console.log("MP5: " + this.stats.mp5);
		console.log("Spell Penetration: " + this.stats.spellPen);
	}

	isHit(affliction = false) {
		if (affliction) {
			return (this.random(1,100) <= (Math.min(99,this.hitChance + settings.talents.suppression * 2)));
		} else {
			return (this.random(1,100) <= Math.min(99,this.hitChance));
		}
	}

	isCrit(extraCrit = 0) {
		return (this.random(1,100000) <= (this.stats.critChance + extraCrit * this.stats.critChanceMultiplier));
	}

	random(min,max) {
		return ~~(Math.random() * max) + min;
	}

	// formula from https://web.archive.org/web/20161015101615/https://dwarfpriest.wordpress.com/2008/01/07/spell-hit-spell-penetration-and-resistances/
	getHitChance(targetLevel) {
		if ((targetLevel - this.level) <= 2) {
			return Math.min(99, 100 - (targetLevel - this.level) - 4 + this.stats.extraHitChance);
		} else if ((targetLevel - this.level) == 3) { // target 3 levels above
			return Math.min(99, 83 + this.stats.extraHitChance);
		} else if ((targetLevel - this.level) == 4) { // target 4 levels above
			return Math.min(99, 72 + this.stats.extraHitChance);
		} else { // target 5+ levels above
			return Math.min(99, 61 + this.stats.extraHitChance);
		}
	}
}