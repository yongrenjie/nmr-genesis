// vim: filetype=bruker:

export const N_Spv2 = {};

N_Spv2.shortDescription = "; 15N sensitivity-enhanced HSQC (version 2)"

N_Spv2.preamble = `
"p2      = p1*2"                       ; 1H hard 180
"p22     = p21*2"                      ; 15N hard 180
"d24     = 0.25s/cnst4"                ; 15N INEPT
"d20     = 3u"                         ; 15N HSQC t1/2
"in20    = 1000000/(2*cnst40*sfo3)"    ; 15N HSQC increment: cnst40 = SW(15N)
"p17     = p16*cnst16"                 ; Longer gradients for 15N seHSQC v2
define delay DN_SpB1
define delay DN_SpB2
define delay DN_SpB3
define delay DN_SpB4
define delay DN_SpB5
define delay DN_SpB6
define delay DN_SpB7
"DN_SpB1 = d24-p22/2"                       ; zz-filter
"DN_SpB2 = d24+p22/2"                       ; zz-filter
"DN_SpB3 = d24-larger(p2,p22)/2"            ; INEPT
"DN_SpB4 = p17+d16+p2+d20*2-4u"             ; 15N post-t1, if no editing
"DN_SpB5 = d26-larger(p2,p22)/2-p19-d16"    ; first spin echo after t1
"DN_SpB6 = d24-larger(p2,p22)/2-p16-d16"    ; second spin echo after t1
"DN_SpB7 = p17+d16-p1*0.78+de+8u"           ; final spin echo for refocusing gradient
`

N_Spv2.module = `
  ; 15N-1H seHSQC, version 2

  ; reverse zz-filter
  (p1 ph1):f1
  DN_SpB1
  (p22 ph1):f3
  (p2 ph1):f1
  DN_SpB2
  (p1 ph1):f1
  DN_SpB1
  (p22 ph1):f3
  (p2 ph1):f1
  DN_SpB2            ; 15N-1H: y,  X-1H: z

  ; forward INEPT
  (p1 ph24):f1
  DN_SpB3
  4u
  (center (p2 ph1):f1 (p22 ph1):f3 )
  4u
  DN_SpB3
  4u
  (p1 ph2):f1
  (p21 ph20):f3

  ; t1 evolution
  d20
  (p2 ph22):f1
  d20
  p17:gp21*EA
  d16
  (p22 ph1):f3
  4u
  DN_SpB4

  ; reverse INEPT for first component
  (center (p1 ph1):f1 (p21 ph22):f3 )
  p19:gp23
  d16
  DN_SpB5
  (center (p2 ph1):f1 (p22 ph1):f3 )
  DN_SpB5
  p19:gp23
  d16
  (center (p1 ph2):f1 (p21 ph23):f3 )

  ; reverse INEPT for second component
  p16:gp24
  d16
  DN_SpB6
  (center (p2 ph1):f1 (p22 ph1):f3 )
  DN_SpB6
  p16:gp24
  d16
  (p1 ph1):f1

  ; spin echo for refocusing gradient
  DN_SpB7
  (p2 ph1):f1
  4u
  p17:gp22
  d16 pl16:f3
  4u
  goscnp ph28 cpd3:f3
  50u do:f3
`

N_Spv2.ea_inc = `
  1m ip23*2
`

N_Spv2.nt1_inc = `
  1m id20
  1m ip20*2
  1m ip28*2
`

N_Spv2.phases = `
ph20=0 2                ; coherence transfer H -> N
ph22=0 0 2 2
ph23=1 1 3 3            ; sensitivity enhancement 90
ph24=3
ph28=0 2 2 0
`

N_Spv2.gradients = `
;gpz21: 80%
;gpz22: 8.1%
;gpz23: 11%
;gpz24: -5%
`
