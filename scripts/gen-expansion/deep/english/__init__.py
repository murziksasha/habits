from .tenses import UNITS as TENSES
from .grammar import UNITS as GRAMMAR
from .sentences import UNITS as SENTENCES
from .pronunciation import UNITS as PRONUNCIATION
from .vocabulary import UNITS as VOCABULARY
from .skills import UNITS as SKILLS

def all_units():
    return TENSES + GRAMMAR + SENTENCES + PRONUNCIATION + VOCABULARY + SKILLS
