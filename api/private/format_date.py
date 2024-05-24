import time

import time

def epoch_to_datetime(expy_date):
    """
    Converts an epoch time to a formatted date string.

    Args:
        expy_date (int): The epoch time to convert.

    Returns:
        str: A formatted date string in the format "Month day, Year".
    """
    return time.strftime("%B %d, %Y", time.localtime(expy_date))



