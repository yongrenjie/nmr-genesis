// vim: syntax=bruker:

import NOAHModule from "../moduleSpec.js";

let shortDescription = `; 1H ROESY with 180(x),180(-x) spin lock`;

let preamble = `
"d10     = 3u"                         ; ROESY t1
"in10    = 2*dw"                       ; ROESY increment
"l7      = p15/(p25*2)"                ; ROESY spin lock loop counter
`

let module = `
  ; 1H-1H ROESY

  (p1 ph6):f1
  d10
  4u pl27:f1
7 (p25 ph7):f1
  (p25 ph8):f1
  lo to 7 times l7

  goscnp ph26
`

const mod = new NOAHModule(
    "H",
    "R",
    "noah_roesy States",
    shortDescription,
    preamble,
    module
);
export default mod;
