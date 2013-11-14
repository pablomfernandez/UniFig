var threes = [
    /[A-Z],[a-z]/, ['&#9608;','&#9604;', '&#9619;'],
    /[_.e,]{3}/, ['&#9604;','&#9604;','&#9604;'],
    /I\.\//, ['&#9616;','&#9604;','&#9612;'],
    /\.\^\./, ['&#9616;','&#9600;','&#9612;'],
    /\/\.\\/, ['&#9619;','&#9619;','&#9619;'],
    /_\|_/, ['&#9604;','&#9608;','&#9604;'],
    / i /, ['&#9617;','&#9612;','&#9617;'],
    / [,\.] /, ['&#9617;','&#9604;','&#9617;'],
    /8b,/, ['&#9608;', '&#9604;', '&#9604;'],
    /[M8]b /, ['&#9608;', '&#9612;', '&#9617;'],
    /MYM/, [ '&#9600;', '&#9619;', '&#9619;'],
    /[`\xb4\"][8Y]b/, ['&#9600;','&#9608;','&#9604;']
  ],
  twos =  [
    /`\\/, ['&#9616;','&#9608;'], 
    /\/[`\']/, ['&#9608;','&#9600;'], 
    /Yb/, ['&#9600;','&#9604;'],
    /YP/, ['&#9619;','&#9600;'],
    /\.:/, ['&#9604;','&#9612;'],
    /YM/, ['&#9616;','&#9619;'],
    /[P][\'`]/, ['&#9619;','&#9600;'],
    /[A-Z8][\[\.,(\'`]/, ['&#9608;','&#9612;'],
    /:_/, ['&#9616;','&#9604;'],
    /[\]:;][8A-Z]/, ['&#9616;','&#9608;'],
      
    /_\|/, ['&#9604;','&#9612;'],
    /\.d/, ['&#9616;','&#9608;'],
    /[_.e,]{2}/, ['&#9604;','&#9604;'],
    /_[]db]/, ['&#9604;', '&#9619;'], 
    /[<][8A-Z]/, ['&#9604;','&#9619;'],

    /[\.,_][\-]/, ['&#9604;', '&#9600;'], 
    /-[\.,]/,  ['&#9600;','&#9604;'], // curve right
    /-\|/,  ['&#9600;','&#9619;'], // curve right
    /`"/, ['&#9600;','&#9619;'], // curve right up
    /"\'/, ['&#9608;','&#9600;'], // curve right up
    /[,._\-+][\"\xb4\']/, ['&#9604;','&#9600;'], // curve right up
    /[d][\']/, ['&#9619;','&#9600;'], // curve right up
    /[\xb4`\'][\.,]/, ['&#9600;','&#9604;'],

    /[\'`][\'\-]/, ['&#9600;','&#9600;'], 
//    /[\\`][+_]/, ['&#9616;','&#9604;'], // curve left up
    /\|[\-]/, ['&#9616;','&#9600;'], // curve left up
    /\|[\-\']/, ['&#9608;','&#9600;'], // curve left up
//    /[|][_=]/, ['&#9619;','&#9604;'], // curve left up

    /\\\//, ['&#9608;','&#9619;'],
    / [\\)(]/, ['&#9617;','&#9608;'],
    /[\/] /, ['&#9619;','&#9617;'],
    /\|\./, ['&#9619;','&#9604;'], 
    /\.[P\|]/, ['&#9604;','&#9619;'], 
    /=\\/, ['&#9600;','&#9619;'], 
    /\\=/, ['&#9616;','&#9604;'], 
    /[()]{2}/, ['&#9619;','&#9619;'], 
   
    /LL/, ['&#9604;','&#9604;'],
    /[d)][8M]/, ['&#9608;','&#9608;'],
    /db/, ['&#9616;','&#9612;'],
    /bm/, ['&#9619;','&#9604;'],
    /></, ['&#9619;','&#9619;'],
    /\|\//, ['&#9616;','&#9616;'],
    /\'\|/, ['&#9600;','&#9608;'],
    /[\'`]M/, ['&#9618;','&#9619;'],

    /[|<]{2}/, ['&#9619;','&#9608;']
  ],
  ones = [
    /[ \.,]/, '&#9617;',
    /[_qdobpvmgae]/, '&#9604;',
    /[\/A-KM-Z?\\0-79]/, '&#9608;',  
    /[L)><\]]/, '&#9612;', 
    /[:;|(\[!\']/, '&#9619;', 
    /[\.&a-z+%@$]/, '&#9618;',  
    /[8\#]/, '&#9608;',
    /[`\-\xb4=~"^*]/, '&#9600;' // upper
];
function encode(all) {
  var
    iz, iy, ix,
    ret = [],
    len = Math.max.apply(this, $.map(all, function(m) {return m.length})),
    len_ones = ones.length,
    len_twos = twos.length,
    len_threes = threes.length,
    // left margin is the least amount of left whitespace on all lines
    left_margin = Math.min.apply(this, $.map(all, function(m) { return m.search(/[^\s]/) })),
    line_out,
    line_in;
  
  len -= left_margin;

  // make sure that we have equal whitespace to form a nice box.
  all = $.map(all, function(line) {
    line = line.slice(left_margin);
    return line + Array(Math.max(1 + len - line.length, 0)).join(' ');
  });

  for(iz = 0; iz < all.length; iz++) {
    line_out = [];
    line_in = all[iz];

    for(ix = 0; ix < len; ix++) {
      triple = line_in.substr(ix, 3);
      double = line_in.substr(ix, 2);
      single = line_in.substr(ix, 1);

      for(iy = 0; iy < len_threes; iy += 2) {
        if (triple.match(threes[iy])) {
          repl = threes[iy + 1];
          line_out[ix] = repl[0];
          line_out[ix + 1] = repl[1];
          line_out[ix + 2] = repl[2];
          break;
        }
      }

      if(!line_out[ix + 1]) {
        for(iy = 0; iy < len_twos; iy += 2) {
          if (double.match(twos[iy])) {
            repl = twos[iy + 1];
            line_out[ix] = repl[0];
            line_out[ix + 1] = repl[1];
            break;
          }
        }
      }

      if(!line_out[ix]) {
        for(iy = 0; iy < len_ones; iy += 2) {
          if (single.match(ones[iy])) {
            line_out[ix] = ones[iy + 1];
            break;
          }
        }
      }
    }
    ret.push(line_out.join(''));
  }
  return ret.join("&nbsp;\n");
}
