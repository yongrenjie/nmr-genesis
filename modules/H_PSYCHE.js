// vim: filetype=bruker:

const H_PSYCHE = {};
export default H_PSYCHE;

H_PSYCHE.nuclei = `H`;

H_PSYCHE.shortCode = `P`;

H_PSYCHE.shortDescription = `; 1H 1D PSYCHE pure shift spectrum`;

H_PSYCHE.auprog = `noah_psyche`;

H_PSYCHE.preamble = `
define delay DH_PSYCHE_1
define delay DH_PSYCHE_2
"p2      = p1*2"
"d11     = 3u"                         ; PSYCHE t1
"in11    = (1/cnst38)/2"               ; PSYCHE increment
"cnst21  = 10000"                      ; PSYCHE bandwidth
"cnst22  = (cnst20/360)*sqrt((2*cnst21)/(p40/2000000))"       ; PSYCHE RF amplitude
"spw40   = plw1*(cnst22/(250000/p1))*(cnst22/(250000/p1))"    ; PSYCHE power level
"DH_PSYCHE_1  = in11/2-p16-d16-50u"
"DH_PSYCHE_2  = (dw*2*cnst50)+d16+50u"
`

H_PSYCHE.module = `
  ; 1H 1D PSYCHE pure shift spectrum

  (p1 ph0):f1
  d11
  DH_PSYCHE_1
  50u
  p16:gp17
  d16
  (p2 ph0):f1
  50u
  p16:gp17
  d16
  DH_PSYCHE_1
  p16:gp18
  d16
  10u
  DH_PSYCHE_2
  ( center (p40:sp40 ph14):f1 (p40:gp14) )
  d16
  10u pl1:f1
  p16:gp18
  d16
  50u
  d11
  goscnp ph26
`
