import { Gems } from "./data/Gems";
import { Items } from "./data/Items";
import { Sockets } from "./data/Sockets";
import { GemColor, Item, ItemAndEnchantStruct, ItemSlot, ItemSlotKey, SelectedGemsStruct, Settings, SocketColor, SourcesStruct, SubSlotValue, TalentStore } from "./Types";

export function ItemSlotKeyToItemSlot(forEnchants: boolean, itemSlot: ItemSlotKey, itemSubSlot?: string): ItemSlot {
  switch(itemSlot) {
    case ItemSlotKey.Head: return ItemSlot.head;
    case ItemSlotKey.Neck: return ItemSlot.neck;
    case ItemSlotKey.Shoulders: return ItemSlot.shoulders;
    case ItemSlotKey.Back: return ItemSlot.back;
    case ItemSlotKey.Chest: return ItemSlot.chest;
    case ItemSlotKey.Bracer: return ItemSlot.bracer;
    case ItemSlotKey.Gloves: return ItemSlot.gloves;
    case ItemSlotKey.Belt: return ItemSlot.belt;
    case ItemSlotKey.Legs: return ItemSlot.legs;
    case ItemSlotKey.Boots: return ItemSlot.boots;
    case ItemSlotKey.Ring: return itemSubSlot === '1' ? ItemSlot.ring1 : ItemSlot.ring2;
    case ItemSlotKey.Trinket: return itemSubSlot === '1' ? ItemSlot.trinket1 : ItemSlot.trinket2;
    case ItemSlotKey.Mainhand: return ItemSlot.mainhand;
    case ItemSlotKey.Offhand: return ItemSlot.offhand;
    case ItemSlotKey.Twohand: return forEnchants ? ItemSlot.mainhand : ItemSlot.twohand;
    case ItemSlotKey.Wand: return ItemSlot.wand;
  }
}

export function ItemSlotToItemSlotKey(forEnchants: boolean, itemSlot: ItemSlot): ItemSlotKey {
  switch(itemSlot) {
    case ItemSlot.head: return ItemSlotKey.Head;
    case ItemSlot.neck: return ItemSlotKey.Neck;
    case ItemSlot.shoulders: return ItemSlotKey.Shoulders;
    case ItemSlot.back: return ItemSlotKey.Back;
    case ItemSlot.chest: return ItemSlotKey.Chest;
    case ItemSlot.bracer: return ItemSlotKey.Bracer;
    case ItemSlot.gloves: return ItemSlotKey.Gloves;
    case ItemSlot.belt: return ItemSlotKey.Belt;
    case ItemSlot.legs: return ItemSlotKey.Legs;
    case ItemSlot.boots: return ItemSlotKey.Boots;
    case ItemSlot.ring1: return ItemSlotKey.Ring;
    case ItemSlot.ring2: return ItemSlotKey.Ring;
    case ItemSlot.trinket1: return ItemSlotKey.Trinket;
    case ItemSlot.trinket2: return ItemSlotKey.Trinket;
    case ItemSlot.mainhand: return ItemSlotKey.Mainhand;
    case ItemSlot.offhand: return ItemSlotKey.Offhand;
    case ItemSlot.twohand: return forEnchants ? ItemSlotKey.Mainhand : ItemSlotKey.Twohand;
    case ItemSlot.wand: return ItemSlotKey.Wand;
  }
}

export function itemMeetsSocketRequirements(params: { itemId: number, selectedGems?: SelectedGemsStruct, socketArray?: [string, number][] }): boolean {
  let socketArray = params.socketArray;

  // If the socketArray parameter is undefined then find the array using the selectedGems parameter instead
  if (socketArray === undefined && params.selectedGems === undefined && params.selectedGems) {
    for (const itemSlotKey of Object.keys(params.selectedGems)) {
      const itemSlot = ItemSlotToItemSlotKey(false, itemSlotKey as ItemSlot);
      const itemGemArrays = params.selectedGems[itemSlot];
  
      if (itemGemArrays && itemGemArrays[params.itemId]) {
        socketArray = itemGemArrays[params.itemId];
        break;
      }
    }
  }

  if (socketArray) {
    // Loop through the gems in the item and if any of gems don't match the socket's color or if a gem isn't equipped then return false.
    for (const [key, value] of Object.entries(socketArray)) {
      const currentGemId = value[1];
  
      if (currentGemId === 0) {
        return false;
      }
  
      // Find the item object to get access to the item's socket array to get the socket color
      const gem = Gems.find(e => e.id === currentGemId);
      if (gem) {
        const gemColor = gem.color;
        const item = Items.find(e => e.id === params.itemId);
        if (item && item.sockets && Sockets.find(e => e.color === item.sockets![parseInt(key)])?.validColors.includes(gemColor)) {
          return false;
        }
      }
    }
  
    return true;
  }

  return false;
}

export function getRemainingTalentPoints(talents: TalentStore): number {
  return 61 - Object.values<number>(talents).reduce((a, b) => a + b, 0); // 61 available talent points at lvl 70
}

export function shouldDisplayPetSetting(talents: TalentStore, settings: Settings, requiresAggressivePet: boolean): boolean {
  return (talents.demonicSacrifice === 0 || settings.sacrificePet === 'no') && (requiresAggressivePet || settings.petMode === '1');
}

export function shouldDisplayGemOfSocketColor(socketColor: SocketColor, gemColor: GemColor): boolean {
  return (socketColor === SocketColor.Meta && gemColor === GemColor.Meta) || (socketColor !== SocketColor.Meta && gemColor !== GemColor.Meta);
}

/**
 * Returns an array of items meeting the criteria to be displayed in the item selection table.
 * The item needs to be of the specified item slot, the item's phase needs to be selected, it needs to not be hidden unless the player is showing hidden items
 * and the item needs to not be unique unless it is not equipped in the other item slot (only applicable to rings and trinkets).
 * @param itemSlot 
 * @param itemSubSlot 
 * @param selectedItems 
 * @param sources 
 * @param hiddenItems 
 * @param hidingItems 
 * @returns Item[]
 */
export function getItemTableItems(itemSlot: ItemSlotKey, itemSubSlot: SubSlotValue, selectedItems: ItemAndEnchantStruct, sources: SourcesStruct, hiddenItems: number[], hidingItems: boolean): Item[] {
  return Items.filter((e) => e.itemSlot === itemSlot && sources.phase[e.phase] === true && (!hiddenItems.includes(e.id) || hidingItems) && (!e.unique || (selectedItems[ItemSlotKeyToItemSlot(false, itemSlot, itemSubSlot === '1' ? '2' : '1')] !== e.id)));
}

export function getStdev (array: number[]) {
  if (!array || array.length === 0) { return 0 }
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}