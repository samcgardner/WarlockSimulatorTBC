importScripts(
  './classes/player.js',
  './classes/pet.js',
  './player/stats.js',
  './classes/simulation.js',
  './classes/spell.js',
  './classes/petSpell.js',
  './classes/trinket.js',
  './functions.js',
  './classes/aura.js',
  './classes/petAura.js',
  './classes/damageOverTime.js',
  './items/items.js',
  './items/gems.js'
)

onmessage = function (e) {
  const player = new Player(e.data.player, e.data.itemSlot || null, e.data.itemSubSlot || '', e.data.itemId || null)
  const simulation = new Simulation(player, e.data.simulation,
    (simulationEnd) => {
      this.postMessage({
        event: 'end',
        data: simulationEnd
      })
    },
    (simulationUpdate) => {
      this.postMessage({
        event: 'update',
        data: simulationUpdate
      })
    }
  )
  simulation.start()
}
