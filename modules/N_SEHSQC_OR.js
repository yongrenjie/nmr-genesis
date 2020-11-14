// vim: filetype=bruker:

const N_SEHSQC_OR = {};
export default N_SEHSQC_OR;

N_SEHSQC_OR.shortDescription = `; 15N sensitivity-enhanced HSQC
;     [set SW(ppm) as cnst40; optional k-scaling with cnst39]`;

N_SEHSQC_OR.shortCode = `Spn`;
N_SEHSQC_OR.nuclei = `NH`;
N_SEHSQC_OR.auprog = `noah_nhsqc`;

N_SEHSQC_OR.preamble = `
"p2      = p1*2"                       ; 1H hard 180
"p22     = p21*2"                      ; 15N hard 180
"d24     = 0.25s/cnst4"                ; 15N INEPT
"d20     = 3u"                         ; 15N HSQC t1/2
"in20    = 1000000/(2*cnst40*sfo3)"    ; 15N HSQC increment: cnst40 = SW(15N)
"p17     = p16*cnst16"                 ; Longer gradients for 15N seHSQC v2
define delay DN_SEHSQC_OR1
define delay DN_SEHSQC_OR2
define delay DN_SEHSQC_OR3
define delay DN_SEHSQC_OR4
define delay DN_SEHSQC_OR5
define delay DN_SEHSQC_OR6
define delay DN_SEHSQC_OR7
"DN_SEHSQC_OR1 = d24-p22/2"                    ; zz-filter
"DN_SEHSQC_OR2 = d24+p22/2"                    ; zz-filter
"DN_SEHSQC_OR3 = d24-larger(p2,p22)/2"         ; INEPT
"DN_SEHSQC_OR4 = p17+d16+p2+d20*2-4u"          ; 15N post-t1, if no editing
"DN_SEHSQC_OR5 = d26-larger(p2,p22)/2-p19-d16" ; first spin echo after t1
"DN_SEHSQC_OR6 = d24-larger(p2,p22)/2-p16-d16" ; second spin echo after t1
"DN_SEHSQC_OR7 = p17+d16-p1*0.78+de+8u"        ; final spin echo for refocusing gradient
"cnst46  = sfo3/sfo1"                ; gradient ratio
define list<gradient> GN_SEHSQC_OR={cnst46}
`

N_SEHSQC_OR.module = `
  ; 15N-1H seHSQC

  ; forward INEPT
  (p1 ph3):f1
  DN_SEHSQC_OR3
  4u
  (center (p2 ph0):f1 (p22 ph0):f3 )
  4u
  DN_SEHSQC_OR3
  4u
  (p1 ph1):f1
  (p21 ph4):f3

  ; t1 evolution
  d20
  (p2 ph7):f1
  d20
  p17:gp2*EA
  d16
  (p22 ph0):f3
  4u
  DN_SEHSQC_OR4

  ; reverse INEPT for first component
  (center (p1 ph0):f1 (p21 ph7):f3 )
  p19:gp8
  d16
  DN_SEHSQC_OR5
  (center (p2 ph0):f1 (p22 ph0):f3 )
  DN_SEHSQC_OR5
  p19:gp8
  d16
  (center (p1 ph1):f1 (p21 ph9):f3 )

  ; reverse INEPT for second component
  p16:gp9
  d16
  DN_SEHSQC_OR6
  (center (p2 ph0):f1 (p22 ph0):f3 )
  DN_SEHSQC_OR6
  p16:gp9
  d16
  (p1 ph0):f1

  ; spin echo for refocusing gradient
  DN_SEHSQC_OR7
  (p2 ph0):f1
  4u
  p17:gp2*GN_SEHSQC_OR
  d16 pl16:f3
  4u
  goscnp ph29 cpd3:f3
  50u do:f3
`
