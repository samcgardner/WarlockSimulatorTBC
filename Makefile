SOURCE_FILE_PATH = src/cpp/bindings.cc src/cpp/life_tap.cc src/cpp/stat.cc src/cpp/rng.cc src/cpp/mana_over_time.cc src/cpp/mana_potion.cc src/cpp/common.cc src/cpp/player.cc src/cpp/simulation.cc src/cpp/spell.cc src/cpp/aura.cc src/cpp/damage_over_time.cc src/cpp/trinket.cc src/cpp/pet.cc src/cpp/pet_spell.cc src/cpp/pet_aura.cc
DEST_FILE_PATH = public/WarlockSim.js
FLAGS = -s EXPORT_NAME="WarlockSim" -O3 --bind --no-entry -s ASSERTIONS=2 -s NO_FILESYSTEM=1 -s MODULARIZE=1 -s ALLOW_MEMORY_GROWTH=1

all: $(SOURCE_FILE_PATH)
	em++ $(SOURCE_FILE_PATH) -o $(DEST_FILE_PATH) $(FLAGS)