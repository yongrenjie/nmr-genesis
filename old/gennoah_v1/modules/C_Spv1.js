// vim: filetype=bruker:

export const C_Spv1 = {};

C_Spv1.shortDescription = `; 13C sensitivity-enhanced HSQC (version 1)
;     [use -DEDIT for multiplicity editing]`

C_Spv1.preamble = `
"p2      = p1*2"                       ; 1H hard 180
"p4      = p3*2"                       ; 13C hard 180
"d2      = 0.5s/cnst2"                 ; JCOMP
"d4      = 0.25s/cnst2"                ; 13C INEPT
"d0      = 3u"                         ; 13C HSQC t1
"in0     = inf1/2"                     ; 13C HSQC increment
define delay DC_SpA1
define delay DC_SpA2
define delay DC_SpA3
define delay DC_SpA4
define delay DC_SpA5
define delay DC_SpA6
define delay DC_SpA7
define delay DC_SpA8
define delay DC_SpA9
"DC_SpA1 = d4-p14/2"
"DC_SpA2 = d4+p14/2"
"DC_SpA3 = p16+d16+p2/2+4u+d0-p3*2/PI"
"DC_SpA4 = DC_SpA3-p2"
"DC_SpA5 = d2-p1"
"DC_SpA6 = d6-cnst17*p24/2-p16-d16"
"DC_SpA7 = d4-larger(p2,p14)/2-p16-d16"
"DC_SpA8 = d4-larger(p2,p14)/2-p1*0.78"
"DC_SpA9 = d4-p16-d16-de-larger(p2,p14)/2"
`

C_Spv1.module = `
  ; 13C-1H seHSQC version 1

  ; INEPT
  (p1 ph1):f1
  DC_SpA1
  (p14:sp3 ph1):f2
  (p2 ph1):f1
  DC_SpA2 pl2:f2
  (p1 ph2):f1
  (p3 ph3):f2
  DC_SpA3

  ; t1 and optional multiplicity editing
#ifdef EDIT
  (p31:sp18 ph1):f2
  4u
  p16:gp1
  d16
  d0
  (p2 ph1):f1
  d0
  4u
  p16:gp1
  d16
  d2
  (p31:sp18 ph1):f2
  DC_SpA4
  (p2 ph1):f1
  DC_SpA5 pl2:f2
#else
  (p14:sp3 ph1):f2
  4u
  p16:gp1
  d16
  d0
  (p2 ph2):f1
  d0
  4u
  p16:gp1
  d16
  (p14:sp3 ph1):f2
  DC_SpA3 pl2:f2
#endif

  ( center
    (p3 ph5):f2
    (p1 ph1 p1 ph2):f1
  )

  ; first spin echo
  DC_SpA6
  p19:gp3
  d16
  (center (p2 ph2):f1 (p24:sp7 ph5):f2 )
  DC_SpA6 pl2:f2
  p19:gp3
  d16
  ; second spin echo
  (center (p1 ph8):f1 (p3 ph6):f2 )
  p16:gp4
  d16
  DC_SpA7
  (center (p2 ph2):f1 (p14:sp3 ph5):f2 )
  DC_SpA7
  p16:gp4
  d16
  ; third spin echo
  (p1 ph2):f1
  DC_SpA8
  (center (p2 ph1):f1 (p14:sp3 ph5):f2 )
  p16:gp2*EA
  d16
  DC_SpA9 pl12:f2
  goscnp ph29 cpd2:f2
  50u do:f2
`

C_Spv1.ea_inc = `
  1m ip6*2
`

C_Spv1.t1_inc = `
  1m id0
  1m ip3*2
  1m ip29*2
`

C_Spv1.phases = `
ph3=0 2                 ; coherence transfer H -> C
ph5=0 0 2 2             ; 13C pulses after t1
ph6=1 1 3 3             ; sensitivity enhancement 90
ph8=2
ph29=1 3 3 1
`

C_Spv1.gradients = `
;gpz1: 80%
;gpz2: 40.2%
;gpz3: 11%
;gpz4: -5%
`

C_Spv1.wavemaker = `
;sp18:wvm:wu180Jcomp: cawurst-40(280 ppm; Jcomp, L2H)
;sp3:wvm:wu180C13: cawurst-20(60 kHz, 0.5 ms; L2H)
;cpd2:wvm:wudec: cawurst_d-20(220 ppm, 1.4 ms; L2H)
`
