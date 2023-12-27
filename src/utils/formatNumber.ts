import numeral from 'numeral';

// ----------------------------------------------------------------------
if (numeral.locales.id === undefined) {
  numeral.register('locale', 'id', {
    delimiters: {
      thousands: '.',
      decimal: ',',
    },
    abbreviations: {
      thousand: 'RB',
      million: 'JT',
      billion: 'M',
      trillion: 'T',
    },
    ordinal: function (number) {
      return number === 1 ? 'er' : 'ème';
    },
    currency: {
      symbol: 'Rp.',
    },
  });
}

numeral.locale('id');

export function fCurrency(number: string | number) {
  const f = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    compactDisplay: 'short',
    notation: 'standard',
  });

  return f.format(Number(number));
  // return numeral(number).format(Number.isInteger(number) ? '0,0' : '0,0.00');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fPercentChart(number: number, total: number) {
  return (number / 100) * total;
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}
export function fRoman(num: number) {
  var numeralCodes = [
    ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // Ones
    ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // Tens
    ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
  ];
  var numeral = '';
  var digits = num.toString().split('').reverse();
  for (var i = 0; i < digits.length; i++) {
    numeral = numeralCodes[i][parseInt(digits[i])] + numeral;
  }
  return numeral;
}

export function fSizeMulti(l: number, w: number, h: number) {
  const arr = [l, w, h];
  let trueCount = 0;
  arr.forEach((item) => {
    if (item) {
      trueCount++;
    }
  });
  if (trueCount === 3) {
    return `Uk ${l}x${w}x${h}`;
  } else if (trueCount === 2) {
    if (l & w) {
      return `Uk ${l}x${w}`;
    } else if (l & h) {
      return `Uk ${l}x${h}`;
    } else {
      return `Uk ${h}x${w}`;
    }
  } else if (trueCount === 1) {
    if (l) {
      return `Uk ${l}`;
    } else if (h) {
      return `Uk ${h}`;
    } else {
      return `Uk ${l}`;
    }
  }
  return ' ';
}

export function getSatuan(l: string | number, w: string | number, h: string | number) {
  const arr = [l, w, h];
  let trueCount = 0;
  arr.forEach((item) => {
    if (item) {
      trueCount++;
    }
  });

  if (trueCount === 3) {
    return 'm³';
  } else if (trueCount === 2) {
    return 'm²';
  } else if (trueCount === 1) {
    return 'm';
  }
  return 'ls';
}

export function countVolume(l: number, w: number, h: number) {
  const arr = [l, w, h];
  let trueCount = 0;
  arr.forEach((item) => {
    if (item) {
      trueCount++;
    }
  });

  if (trueCount === 3) {
    const vol = ((((l / 1000) * w) / 1000) * h) / 1000;
    return vol;
  } else if (trueCount === 2) {
    if (l > 0 && w > 0) {
      const vol = ((l / 1000) * w) / 1000;
      return vol;
    } else if (l > 0 && h > 0) {
      const vol = ((l / 1000) * h) / 1000;
      return vol;
    } else {
      const vol = ((w / 1000) * h) / 1000;
      return vol;
    }
  } else if (trueCount === 1) {
    if (l > 0) {
      const vol = l / 1000;
      return vol;
    } else if (h > 0) {
      const vol = h / 1000;
      return vol;
    } else {
      const vol = w / 1000;
      return vol;
    }
  }
  return 0;
}
export function fVolume(l: number, w: number, h: number) {
  const arr = [l, w, h];
  let trueCount = 0;
  arr.forEach((item) => {
    if (item) {
      trueCount++;
    }
  });
  if (trueCount === 3) {
    const vol = ((((l / 1000) * w) / 1000) * h) / 1000;
    return vol.toFixed(2);
  } else if (trueCount === 2) {
    if (l & w) {
      const vol = ((l / 1000) * w) / 1000;
      return vol.toFixed(2);
    } else if (l & h) {
      const vol = ((l / 1000) * h) / 1000;
      return vol.toFixed(2);
    } else {
      const vol = ((w / 1000) * h) / 1000;
      return vol.toFixed(2);
    }
  } else if (trueCount === 1) {
    if (l) {
      const vol = l / 1000;
      return vol.toFixed(2);
    } else if (h) {
      const vol = h / 1000;
      return vol.toFixed(2);
    } else {
      const vol = w / 1000;
      return vol.toFixed(2);
    }
  }
  return 0.0;
}
