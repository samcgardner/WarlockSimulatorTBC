#ifndef WARLOCK_SIMULATOR_TBC_PLAYER_SETTINGS
#define WARLOCK_SIMULATOR_TBC_PLAYER_SETTINGS

#include <memory>

#include "auras.h"
#include "character_stats.h"
#include "items.h"
#include "sets.h"
#include "talents.h"

struct PlayerSettings {
  Auras& auras;
  Talents& talents;
  Sets& sets;
  CharacterStats& stats;
  Items& items;
  int item_id;
  int meta_gem_id;
  bool equipped_item_simulation;
  bool recording_combat_log_breakdown;
  bool simming_stamina;
  bool simming_intellect;
  bool simming_spirit;
  bool simming_spell_power;
  bool simming_shadow_power;
  bool simming_fire_power;
  bool simming_hit_rating;
  bool simming_crit_rating;
  bool simming_haste_rating;
  bool simming_mp5;
  bool is_aldor;
  int enemy_level;
  int enemy_shadow_resist;
  int enemy_fire_resist;
  int mage_atiesh_amount;
  int totem_of_wrath_amount;
  bool sacrificing_pet;
  bool pet_is_imp;
  bool pet_is_succubus;
  bool pet_is_felguard;
  int ferocious_inspiration_amount;
  int improved_curse_of_the_elements;
  bool using_custom_isb_uptime;
  int custom_isb_uptime_value;
  int improved_divine_spirit;
  int improved_imp;
  int shadow_priest_dps;
  int warlock_atiesh_amount;
  int improved_expose_armor;
  bool is_single_target;
  int enemy_amount;
  bool is_orc;
  int power_infusion_amount;
  int bloodlust_amount;
  int innervate_amount;
  int enemy_armor;
  int expose_weakness_uptime;
  bool improved_faerie_fire;
  bool infinite_player_mana;
  bool infinite_pet_mana;
  bool using_lash_of_pain_on_cooldown;
  bool pet_is_aggressive;
  bool prepop_black_book;
  bool randomize_values;
  bool sim_choosing_rotation;
  bool exalted_with_shattrath_faction;
  int survival_hunter_agility;
  bool has_immolate;
  bool has_corruption;
  bool has_siphon_life;
  bool has_unstable_affliction;
  bool has_searing_pain;
  bool has_shadow_bolt;
  bool has_incinerate;
  bool has_curse_of_recklessness;
  bool has_curse_of_the_elements;
  bool has_curse_of_agony;
  bool has_curse_of_doom;
  bool has_death_coil;
  bool has_shadow_burn;
  bool has_conflagrate;
  bool has_shadowfury;
  bool has_amplify_curse;
  bool has_dark_pact;
  bool has_elemental_shaman_t4_bonus;

  PlayerSettings(Auras& auras, Talents& talents, Sets& sets, CharacterStats& stats, Items& items)
      : auras(auras), talents(talents), sets(sets), stats(stats), items(items) {}
};

#endif