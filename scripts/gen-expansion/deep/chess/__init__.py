def all_units():
    units = []
    try:
        from .foundations import UNITS as A
        units += A
    except ImportError:
        pass
    try:
        from .tactics import UNITS as B
        units += B
    except ImportError:
        pass
    try:
        from .openings import UNITS as C
        units += C
    except ImportError:
        pass
    try:
        from .middlegame import UNITS as D
        units += D
    except ImportError:
        pass
    try:
        from .endgames import UNITS as E
        units += E
    except ImportError:
        pass
    try:
        from .practice import UNITS as F
        units += F
    except ImportError:
        pass
    return units
