// Add the stats from all the items the user has equipped from previous sessions
for (let itemSlot in selectedItems) {
	for (let slot in items) {
		for (let item in items[slot]) {
			if (items[slot][item].id == selectedItems[itemSlot]) {
				modifyStatsFromItem(items[slot][item], 'add');
				break;
			}
		}
	}
}

// Same as above but for enchants\
for (let itemSlot in selectedEnchants) {
	for (let slot in enchants) {
		for (let enchant in enchants[slot]) {
			if (enchants[slot][enchant].id == selectedEnchants[itemSlot]) {
				modifyStatsFromEnchant(enchants[slot][enchant].id, 'add');
				break;
			}
		}
	}
}

// Add stats from gems in equipped items
for (itemSlot in selectedItems) {
	let itemID = selectedItems[itemSlot];
	if (selectedGems[itemSlot] && selectedGems[itemSlot][itemID]) {
		for (gemID of selectedGems[itemSlot][itemID]) {
			if (gemID !== null) {
				modifyStatsFromGem(gemID, 'add');
			}
		}
	}
}

// Add stats from the player's selected race
let currentRace = $("#race-dropdown-list").val();
if (currentRace == "gnome") {
	characterStats.intellectModifier *= 1.05;
}
for (let stat in raceStats[currentRace]) {
	if (characterStats.hasOwnProperty(stat)) {
		characterStats[stat] += raceStats[currentRace][stat];
	}
}

// Use previous simulation's result on the sidebar
$("#avg-dps").text(localStorage['avgDps'] || "");
$("#min-dps").text(localStorage['minDps'] || "");
$("#max-dps").text(localStorage['maxDps'] || "");
if (localStorage['simulationDuration']) {
	$("#sim-length-result").text(localStorage['simulationDuration'] + "s");
}


refreshCharacterStats();
$("#race-dropdown-list").data("currentRace", currentRace); // Store the currently selected race to know the user's previous race when changing in the dropdown list.
$("#race").text($("#race-dropdown-list").children("option:selected").text()); // Set the player's race at the top of the sidebar (just a visual description)
loadItemsBySlot(localStorage['selectedItemSlot'] || "mainhand", (localStorage['selectedItemSubSlot'] || ""));
let newItemSelector = "#item-slot-selection-list li[data-slot='" + (localStorage['selectedItemSlot'] || "mainhand") + "']";
if (localStorage['selectedItemSubSlot']) newItemSelector += "[data-subslot='" + localStorage(selectedItemSubSlot) + "']";
$(newItemSelector).attr('data-selected', 'true');