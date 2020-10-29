// vim: filetype=bruker:

export const C_S = {};

C_S.shortDescription = `; 13C HSQC
;     [use -DEDIT for multiplicity editing]`

C_S.preamble = `
"p2      = p1*2"                       ; 1H hard 180
"p4      = p3*2"                       ; 13C hard 180
"d2      = 0.5s/cnst2"                 ; JCOMP
"d4      = 0.25s/cnst2"                ; 13C INEPT
"d0      = 3u"                         ; 13C HSQC t1
"in0     = inf1/2"                     ; 13C HSQC increment
define delay DC_S1
define delay DC_S2
define delay DC_S3
define delay DC_S4
define delay DC_S5
define delay DC_S6
"DC_S1   = d4-p14/2"
"DC_S2   = d4+p14/2"
"DC_S3   = p16+d16+p2/2+d0-p3*2/PI+4u"
"DC_S4   = d2+p3+p2/2"
"DC_S5   = DC_S3+p3-p2/2"
"DC_S6   = DC_S2-p16-d16-p3-de+p1*2/PI-8u"
`

C_S.module = `
  ; 13C-1H HSQC

  ; INEPT
  (p1 ph1):f1
  DC_S1
  (p14:sp3 ph1):f2
  (p2 ph1):f1
  DC_S2 pl2:f2
  (p1 ph2):f1
  (p3 ph3):f2
  DC_S3

  ; t1 period
#ifdef EDIT
  (p31:sp18 ph1):f2
#else
  (p14:sp3 ph1):f2
#endif /*EDIT*/
  4u
  p16:gp1*EA
  d16
  d0
  (p2 ph4):f1
  d0
  4u
  p16:gp1*EA
  d16

  ; multiplicity editing
#ifdef EDIT
  DC_S4
  (p31:sp18 ph1):f2
  DC_S5
  (p2 ph2):f1
  d2 pl2:f2
#else
  (p14:sp3 ph1):f2
  DC_S3 pl2:f2
#endif

  ; reverse INEPT
  (p3 ph5):f2
  (p1 ph1):f1
  DC_S1
  (p14:sp3 ph1):f2
  (p2 ph2):f1
  4u
  p16:gp2
  d16 pl2:f2
  DC_S6
  (p3 ph1):f2
  4u pl12:f2
  goscnp ph29 cpd2:f2
  50u do:f2
`

C_S.t1_inc = `
  1m id0
  1m ip3*2
  1m ip29*2
`

C_S.phases = `
ph3=0 2                 ; coherence transfer H -> C
ph4=0 0 0 0 2 2 2 2
ph5=0 0 2 2             ; 13C pulses after t1
ph29=0 2 2 0
`

C_S.gradients = `
;gpz1: 80%
;gpz2: 40.2%
`

C_S.wavemaker = `
;sp18:wvm:wu180Jcomp: cawurst-40(280 ppm; Jcomp, L2H)
;sp3:wvm:wu180C13: cawurst-20(60 kHz, 0.5 ms; L2H)
;cpd2:wvm:wudec: cawurst_d-20(220 ppm, 1.4 ms; L2H)
`
