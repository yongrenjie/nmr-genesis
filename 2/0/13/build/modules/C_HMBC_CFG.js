import { Kupce2017ACIE, Cicero2001JMR } from "../citation.js";
import NOAHModule from "../noahModule.js";
let shortDescription = `; 13C HMBC (using hmbcetgpl3nd gradient scheme)`;
let preamble = `
"p2     = p1*2"                       ; 1H hard 180
"d2     = 0.5s/cnst2"                 ; JCOMP
"d4     = 0.25s/cnst2"                ; 13C INEPT
"d0     = 3u"                         ; 13C t1
"in0    = inf1/2"                     ; 13C increment
define delay D[ID]a
define delay D[ID]b
define delay D[ID]c
define delay D[ID]d
define delay D[ID]e
define delay D[ID]f
define delay D[ID]g
"D[ID]a = d4-p14/2"
"D[ID]b = d4+p14/2"
"D[ID]c = 1s/(2*(cnst6+0.07*(cnst7-cnst6)))-p16-d16"
"D[ID]d = 1s/(cnst7+cnst6)-p16-d16"
"D[ID]e = 1s/(2*(cnst7-0.07*(cnst7-cnst6)))-p16-d16"
"D[ID]f = (0.5s/cnst13)-p16-d16-4u"
"D[ID]g = p2+d0*2"
"cnst47 = (1-sfo2/sfo1)/(1+sfo2/sfo1)"   ; gradient ratio
define list<gradient> EA1 = { 1.000 -cnst47}
define list<gradient> EA2 = { -cnst47 1.000}
`;
let pulprog = `
  ; 13C-1H HMBC

  ; zz-filter
  (p1 ph0):f1
  D[ID]a
  (p14:sp3 ph0):f2
  (p2 ph0):f1
  D[ID]b
  (p1 ph0):f1
  D[ID]a
  (p14:sp3 ph0):f2
  (p2 ph0):f1
  D[ID]b pl2:f2

  ; third-order low-pass J-filter
  (lalign (p1 ph0):f1 (p3 ph7):f2 )
  D[ID]c
  p16:gp10*2.8
  d16
  (p3 ph7):f2
  D[ID]d
  p16:gp10*-1.6
  d16
  (p3 ph7):f2
  D[ID]e
  p16:gp10*-0.8
  d16
  (p3 ph7):f2
  4u
  p16:gp10*-0.4
  d16
  D[ID]f

  ; coherence transfer to 13C and t1
  (p3 ph7):f2
  d0
  (p2 ph11):f1
  d0
  p16:gp1*EA1
  d16
  (p24:sp7 ph0):f2
  D[ID]g
  p16:gp1*EA2
  d16 pl2:f2
  (p3 ph5):f2
  4u
  goscnp ph31
`;
const mod = new NOAHModule("hmbc", "Bg", [Kupce2017ACIE, Cicero2001JMR], "noah_hmbc", shortDescription, preamble, pulprog);
export default mod;
// vim: syntax=bruker: