

const vowels = [
    { letter: '𑌅', label: 'a' }, { letter: '𑌆', label: 'ā' }, { letter: '𑌇', label: 'i' }, { letter: '𑌈', label: 'ī' },
    { letter: '𑌉', label: 'u' }, { letter: '𑌊', label: 'ū' }, { letter: '𑌋', label: 'ṛ' }, { letter: '𑌌', label: 'ṝ' },
    { letter: '𑌏', label: 'ē' }, { letter: '𑌐', label: 'ai' }, { letter: '𑌓', label: 'ō' }, { letter: '𑌔', label: 'au' }
  ];
  
  const vowelSigns = [
    { sign: '', label: 'a' }, { sign: '𑌾', label: 'ā' }, { sign: '𑌿', label: 'i' }, { sign: '𑍀', label: 'ī' },
    { sign: '𑍁', label: 'u' }, { sign: '𑍂', label: 'ū' }, { sign: '𑍃', label: 'ṛ' }, { sign: '𑍄', label: 'ṝ' },
    { sign: '𑍇', label: 'ē' }, { sign: '𑍈', label: 'ai' }, { sign: '𑍋', label: 'ō' }, { sign: '𑍌', label: 'au' }
  ];
  
  const consonants = [
    { letter: '𑌕', label: 'ka' }, { letter: '𑌖', label: 'kha' }, { letter: '𑌗', label: 'ga' }, { letter: '𑌘', label: 'gha' }, { letter: '𑌙', label: 'ṅa' },
    { letter: '𑌚', label: 'ca' }, { letter: '𑌛', label: 'cha' }, { letter: '𑌜', label: 'ja' }, { letter: '𑌝', label: 'jha' }, { letter: '𑌞', label: 'ña' },
    { letter: '𑌟', label: 'ṭa' }, { letter: '𑌠', label: 'ṭha' }, { letter: '𑌡', label: 'ḍa' }, { letter: '𑌢', label: 'ḍha' }, { letter: '𑌣', label: 'ṇa' },
    { letter: '𑌤', label: 'ta' }, { letter: '𑌥', label: 'tha' }, { letter: '𑌦', label: 'da' }, { letter: '𑌧', label: 'dha' }, { letter: '𑌨', label: 'na' },
    { letter: '𑌪', label: 'pa' }, { letter: '𑌫', label: 'pha' }, { letter: '𑌬', label: 'ba' }, { letter: '𑌭', label: 'bha' }, { letter: '𑌮', label: 'ma' },
    { letter: '𑌯', label: 'ya' }, { letter: '𑌰', label: 'ra' }, { letter: '𑌲', label: 'la' }, { letter: '𑌳', label: 'ḻa' }, { letter: '𑌵', label: 'va' },
    { letter: '𑌶', label: 'śa' }, { letter: '𑌷', label: 'ṣa' }, { letter: '𑌸', label: 'sa' }, { letter: '𑌹', label: 'ha' }
  ];
  
  const generateConsonantBlocks = () => {
    return consonants.map((consonant) => {
      const combinations = vowelSigns.map((vowel) => ({
        letter: consonant.letter + vowel.sign,
        label: consonant.label.replace(/a$/, '') + vowel.label
      }));
  
      combinations.push({ letter: consonant.letter + '𑌂', label: consonant.label + 'ṁ' });
      combinations.push({ letter: consonant.letter + '𑌃', label: consonant.label + 'ḥ' });
  
      return {
        base: consonant,
        combinations
      };
    });
  };
  const consonantBlocks = generateConsonantBlocks();

  export { vowels, vowelSigns, consonants, consonantBlocks };
  