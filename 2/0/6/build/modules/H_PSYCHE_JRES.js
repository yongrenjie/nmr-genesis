// vim: syntax=bruker:
import NOAHModule from "../noahModule.js";
let shortDescription = `; 1H phase-sensitive PSYCHE 2D J spectrum
;     [set TD1 and SW(Hz) as cnst37 and cnst38 respectively]`;
let preamble = `
"p2      = p1*2"
"d10     = 3u"                         ; PSYCHE-JRES t1
"in10    = (1/cnst38)/2"               ; PSYCHE-JRES increment
"cnst21  = 10000"                      ; PSYCHE bandwidth
"cnst22  = (cnst20/360)*sqrt((2*cnst21)/(p40/2000000))"       ; PSYCHE RF amplitude
"spw40   = plw1*(cnst22/(250000/p1))*(cnst22/(250000/p1))"    ; PSYCHE power level
"cnst23  = sqrt((p41/1000000)*cnst21*5/(2*PI))/(p41/1000000)" ; PSYCHE ZQS chirp RF amplitude
"spw41   = plw1*(cnst23/(250000/p1))*(cnst23/(250000/p1))"    ; PSYCHE ZQS chirp RF amplitude
"spw42   = spw41"                      ; PSYCHE ZQS chirp power
`;
let pulprog = `
  ; PSYCHE 2D J spectrum (phase-sensitive)
if "l2 % 2 == 0"
{
  (p1 ph0):f1
  50u
  p16:gp16
  d16
  d16
  ( center (p41:sp41 ph7):f1 (p41:gp15) )
  d16
  p16:gp16
  d16
  50u
  50u
  p16:gp17
  d16
  d16
  ( center (p40:sp40 ph15):f1 (p40:gp14) )
  d16
  p16:gp17
  d16
  50u
  d10
  50u
  p16:gp18
  d16
  d16
  ( center (p41:sp42 ph0):f1 (p41:gp15) )
  d16
  p16:gp18
  d16
  50u
  d10 pl1:f1
}
else
{
  (p1 ph0):f1
  d10
  50u
  p16:gp18
  d16
  d16
  ( center (p41:sp42 ph0):f1 (p41:gp15) )
  d16
  p16:gp18
  d16
  50u
  d10
  50u
  p16:gp17
  d16
  d16
  ( center (p40:sp40 ph15):f1 (p40:gp14) )
  d16
  p16:gp17
  d16
  50u
  50u
  p16:gp16
  d16
  d16
  ( center (p41:sp41 ph7):f1 (p41:gp15) )
  d16
  p16:gp16
  d16
  50u pl1:f1
}
  goscnp ph26
`;
const mod = new NOAHModule("h1", "J", "noah_jresph", shortDescription, preamble, pulprog);
export default mod;