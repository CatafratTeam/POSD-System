import { gql } from '@apollo/client';


export const QUERY_CWE_TO_ARTICOLOGDPR = gql`
  query Articolo_CWE($value: String!) {
  cwes(filters: { Descrizione: { eq: $value } }) {
    data {
      attributes {
        patterns {
          data {
            id
            attributes {
              articoli_gdprs {
                data {
                  attributes {
                    Articolo
                    numeroArticolo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const QUERY_STRATEGIA_TO_ARTICOLOGDPR = gql`
  query Articolo_Strategia($value: String!) {
  strategies(filters: { Name: { eq: $value } }) {
    data {
      attributes {
        patterns {
          data {
            id
            attributes {
              articoli_gdprs {
                data {
                  attributes {
                    Articolo
                    numeroArticolo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
export const QUERY_OWASP_TO_ARTICOLOGDPR = gql`
  query Articolo_OWASP($value: String!) {
  owasps(filters: { owasp: { eq: $value } }) {
    data {
      attributes {
        patterns {
          data {
            id
            attributes {
              articoli_gdprs {
                data {
                  attributes {
                    Articolo
                    numeroArticolo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const QUERY_PATTERNNAME_TO_ARTICOLOGDPR = gql`
  query Articolo_PatternName($value: String!) {
  patterns(filters: { Name: { eq: $value } }) {
    data {
      attributes {
        articoli_gdprs {
          data {
            attributes {
              Articolo
              numeroArticolo
            }
          }
        }
      }
    }
  }
}
`;
export const QUERY_PATTERNCONTEXT_TO_ARTICOLOGDPR = gql`
  query Articolo_PatternContext($value: String!) {
  patterns(filters: { Context: { eq: $value } }) {
    data {
      attributes {
        articoli_gdprs {
          data {
            attributes {
              Articolo
              numeroArticolo
            }
          }
        }
      }
    }
  }
}

`;
export const QUERY_PATTERNDESCRIPTION_TO_ARTICOLOGDPR = gql`
  query Articolo_PatternDescription($value: String!) {
  patterns(filters: { Description: { eq: $value } }) {
    data {
      attributes {
        articoli_gdprs {
          data {
            attributes {
              Articolo
              numeroArticolo
            }
          }
        }
      }
    }
  }
}

`;

export const QUERY_MVC_TO_ARTICOLOGDPR = gql`
  query Articolo_MVC($value: String!) {
  mvcs(filters: { MVC: { eq: $value } }) {
    data {
      attributes {
        patterns {
          data {
            id
            attributes {
              articoli_gdprs {
                data {
                  attributes {
                    Articolo
                    numeroArticolo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const QUERY_ISO_TO_ARTICOLOGDPR = gql`
  query Articolo_ISO($value: String!) {
  isos(filters: { Iso: { eq: $value } }) {
    data {
      attributes {
        patterns {
          data {
            id
            attributes {
              articoli_gdprs {
                data {
                  attributes {
                    Articolo
                    numeroArticolo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const QUERY_PBD_TO_ARTICOLOGDPR = gql`
  query Articolo_PBD($value: String!) {
  pbds(filters: { PBD: { eq: $value } }) {
    data {
      attributes {
        patterns {
          data {
            id
            attributes {
              articoli_gdprs {
                data {
                  attributes {
                    Articolo
                    numeroArticolo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const QUERY_ARTICOLO_TO_ISO = gql`
  query getCweFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                isos {
                  data {
                    attributes {
                      Iso
                      numero
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_OWASP_TO_ISO = gql`
  query getCweFromArticolo($value: String!) {
    owasps(filters: { owasp: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                isos {
                  data {
                    attributes {
                      Iso
                      numero
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_CWE_DESCRIPTION_TO_ISO = gql`
  query getIsoFromCweDescription($value: String!) {
    cwes(filters: { Descrizione: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                isos {
                  data {
                    attributes {
                      Iso
                      numero
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_STRATEGIA_NAME_TO_ISO = gql`
  query getIsoFromStrategyName($value: String!) {
    strategies(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                isos {
                  data {
                    attributes {
                      Iso
                      numero
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_NAME_TO_ISO = gql`
  query getIsoFromPatternName($value: String!) {
    patterns(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          isos {
            data {
              attributes {
                Iso
                numero
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_DESCRIPTION_TO_ISO = gql`
  query getIsoFromPatternDescription($value: String!) {
    patterns(filters: { Description: { eq: $value } }) {
      data {
        attributes {
          isos {
            data {
              attributes {
                Iso
                numero
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_CONTEXT_TO_ISO = gql`
  query getIsoFromPatternContext($value: String!) {
    patterns(filters: { Context: { eq: $value } }) {
      data {
        attributes {
          isos {
            data {
              attributes {
                Iso
                numero
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PBD_TO_ISO = gql`
  query getIsoFromPbd($value: String!) {
    pbds(filters: { PBD: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                isos {
                  data {
                    attributes {
                      Iso
                      numero
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_MVC_TO_ISO = gql`
  query getIsoFromMvc($value: String!) {
    mvcs(filters: { MVC: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                isos {
                  data {
                    attributes {
                      Iso
                      numero
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const QUERY_ISO_TO_CWE = gql`
  query getCweFromIso($value: String!) {
    isos(filters: { Iso: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                cwes {
                  data {
                    attributes {
                      Codice
                      Descrizione
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_OWASP_TO_CWE = gql`
  query getCweFromOwasp($value: String!) {
    owasps(filters: { owasp: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                cwes {
                  data {
                    attributes {
                      Codice
                      Descrizione
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_STRATEGY_NAME_TO_CWE = gql`
  query getCweFromStrategyName($value: String!) {
    strategies(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                cwes {
                  data {
                    attributes {
                      Codice
                      Descrizione
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_NAME_TO_CWE = gql`
  query getCweFromPatternName($value: String!) {
    patterns(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          cwes {
            data {
              attributes {
                Codice
                Descrizione
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_DESCRIPTION_TO_CWE = gql`
  query getCweFromPatternDescription($value: String!) {
    patterns(filters: { Description: { eq: $value } }) {
      data {
        attributes {
          cwes {
            data {
              attributes {
                Codice
                Descrizione
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_CONTEXT_TO_CWE = gql`
  query getCweFromPatternContext($value: String!) {
    patterns(filters: { Context: { eq: $value } }) {
      data {
        attributes {
          cwes {
            data {
              attributes {
                Codice
                Descrizione
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PBD_TO_CWE = gql`
  query getCweFromPbd($value: String!) {
    pbds(filters: { PBD: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                cwes {
                  data {
                    attributes {
                      Codice
                      Descrizione
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_MVC_TO_CWE = gql`
  query getCweFromMvc($value: String!) {
    mvcs(filters: { MVC: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                cwes {
                  data {
                    attributes {
                      Codice
                      Descrizione
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ARTICOLO_TO_CWE = gql`
  query getCweFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                cwes {
                  data {
                    attributes {
                      Codice
                      Descrizione
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ISO_TO_MVC = gql`
  query getMvcFromIso($value: String!) {
    isos(filters: { Iso: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                mvcs {
                  data {
                    attributes {
                      MVC
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_OWASP_TO_MVC = gql`
  query getMvcFromOwasp($value: String!) {
    owasps(filters: { owasp: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                mvcs {
                  data {
                    attributes {
                      MVC
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_STRATEGY_NAME_TO_MVC = gql`
  query getMvcFromStrategyName($value: String!) {
    strategies(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                mvcs {
                  data {
                    attributes {
                      MVC
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_NAME_TO_MVC = gql`
  query getMvcFromPatternName($value: String!) {
    patterns(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          mvcs {
            data {
              attributes {
                MVC
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_DESCRIPTION_TO_MVC = gql`
  query getMvcFromPatternDescription($value: String!) {
    patterns(filters: { Description: { eq: $value } }) {
      data {
        attributes {
          mvcs {
            data {
              attributes {
                MVC
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_CONTEXT_TO_MVC = gql`
  query getMvcFromPatternContext($value: String!) {
    patterns(filters: { Context: { eq: $value } }) {
      data {
        attributes {
          mvcs {
            data {
              attributes {
                MVC
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PBD_TO_MVC = gql`
  query getMvcFromPbd($value: String!) {
    pbds(filters: { PBD: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                mvcs {
                  data {
                    attributes {
                      MVC
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ARTICOLO_TO_MVC = gql`
  query getMvcFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                mvcs {
                  data {
                    attributes {
                      MVC
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_CWE_DESCRIPTION_TO_MVC = gql`
  query getMvcFromCweDescription($value: String!) {
    cwes(filters: { Descrizione: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                mvcs {
                  data {
                    attributes {
                      MVC
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ISO_TO_OWASP = gql`
  query getOwaspFromIso($value: String!) {
    isos(filters: { Iso: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                owasps {
                  data {
                    attributes {
                      owasp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_MVC_TO_OWASP = gql`
  query getOwaspFromMvc($value: String!) {
    mvcs(filters: { MVC: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                owasps {
                  data {
                    attributes {
                      owasp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_STRATEGY_NAME_TO_OWASP = gql`
  query getOwaspFromStrategyName($value: String!) {
    strategies(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                owasps {
                  data {
                    attributes {
                      owasp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_NAME_TO_OWASP = gql`
  query getOwaspFromPatternName($value: String!) {
    patterns(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          owasps {
            data {
              attributes {
                owasp
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_DESCRIPTION_TO_OWASP = gql`
  query getOwaspFromPatternDescription($value: String!) {
    patterns(filters: { Description: { eq: $value } }) {
      data {
        attributes {
          owasps {
            data {
              attributes {
                owasp
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_CONTEXT_TO_OWASP = gql`
  query getOwaspFromPatternContext($value: String!) {
    patterns(filters: { Context: { eq: $value } }) {
      data {
        attributes {
          owasps {
            data {
              attributes {
                owasp
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PBD_TO_OWASP = gql`
  query getOwaspFromPbd($value: String!) {
    pbds(filters: { PBD: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                owasps {
                  data {
                    attributes {
                      owasp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ARTICOLO_TO_OWASP = gql`
  query getOwaspFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                owasps {
                  data {
                    attributes {
                      owasp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_CWE_DESCRIPTION_TO_OWASP = gql`
  query getOwaspFromCweDescription($value: String!) {
    cwes(filters: { Descrizione: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                owasps {
                  data {
                    attributes {
                      owasp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ISO_TO_PATTERN = gql`
  query getPatternFromIso($value: String!) {
    isos(filters: { Iso: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_OWASP_TO_PATTERN = gql`
  query getPatternFromOwasp($value: String!) {
    owasps(filters: { owasp: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_STRATEGY_NAME_TO_PATTERN = gql`
  query getPatternFromStrategyName($value: String!) {
    strategies(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_CWE_TO_PATTERN = gql`
  query getPatternFromCwe($value: String!) {
    cwes(filters: { Descrizione: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PBD_TO_PATTERN = gql`
  query getPatternFromPbd($value: String!) {
    pbds(filters: { PBD: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_MVC_TO_PATTERN = gql`
  query getPatternFromMvc($value: String!) {
    mvcs(filters: { MVC: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ARTICOLO_TO_PATTERN = gql`
  query getPatternFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                Name
                Description
                Context
                Example
              }
            }
          }
        }
      }
    }
  }
`;


export const QUERY_ISO_TO_PBD = gql`
  query getPbdFromIso($value: String!) {
    isos(filters: { Iso: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                pbds {
                  data {
                    attributes {
                      PBD
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_OWASP_TO_PBD = gql`
  query getPbdFromOwasp($value: String!) {
    owasps(filters: { owasp: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                pbds {
                  data {
                    attributes {
                      PBD
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_STRATEGY_NAME_TO_PBD = gql`
  query getPbdFromStrategyName($value: String!) {
    strategies(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                pbds {
                  data {
                    attributes {
                      PBD
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_NAME_TO_PBD = gql`
  query getPbdFromPatternName($value: String!) {
    patterns(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          pbds {
            data {
              attributes {
                PBD
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_DESCRIPTION_TO_PBD = gql`
  query getPbdFromPatternDescription($value: String!) {
    patterns(filters: { Description: { eq: $value } }) {
      data {
        attributes {
          pbds {
            data {
              attributes {
                PBD
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_CONTEXT_TO_PBD = gql`
  query getPbdFromPatternContext($value: String!) {
    patterns(filters: { Context: { eq: $value } }) {
      data {
        attributes {
          pbds {
            data {
              attributes {
                PBD
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_MVC_TO_PBD = gql`
  query getPbdFromMvc($value: String!) {
    mvcs(filters: { MVC: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                pbds {
                  data {
                    attributes {
                      PBD
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ARTICOLO_TO_PBD = gql`
  query getPbdFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                pbds {
                  data {
                    attributes {
                      PBD
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


export const QUERY_CWE_TO_PBD = gql`
  query getPbdFromCwe($value: String!) {
    cwes(filters: { Descrizione: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                pbds {
                  data {
                    attributes {
                      PBD
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ISO_TO_STRATEGY = gql`
  query getStrategyFromIso($value: String!) {
    isos(filters: { Iso: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                strategies {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_OWASP_TO_STRATEGY = gql`
  query getStrategyFromOwasp($value: String!) {
    owasps(filters: { owasp: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                strategies {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_NAME_TO_STRATEGY = gql`
  query getStrategyFromPatternName($value: String!) {
    patterns(filters: { Name: { eq: $value } }) {
      data {
        attributes {
          strategies {
            data {
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_DESCRIPTION_TO_STRATEGY = gql`
  query getStrategyFromPatternDescription($value: String!) {
    patterns(filters: { Description: { eq: $value } }) {
      data {
        attributes {
          strategies {
            data {
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PATTERN_CONTEXT_TO_STRATEGY = gql`
  query getStrategyFromPatternContext($value: String!) {
    patterns(filters: { Context: { eq: $value } }) {
      data {
        attributes {
          strategies {
            data {
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PBD_TO_STRATEGY = gql`
  query getStrategyFromPbd($value: String!) {
    pbds(filters: { PBD: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                strategies {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_MVC_TO_STRATEGY = gql`
  query getStrategyFromMvc($value: String!) {
    mvcs(filters: { MVC: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                strategies {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_ARTICOLO_TO_STRATEGY = gql`
  query getStrategyFromArticolo($value: String!) {
    articoliGdprs(filters: { Articolo: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                strategies {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_CWE_TO_STRATEGY = gql`
  query getStrategyFromCwe($value: String!) {
    cwes(filters: { Descrizione: { eq: $value } }) {
      data {
        attributes {
          patterns {
            data {
              attributes {
                strategies {
                  data {
                    attributes {
                      Name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_GET_ARTICOLO = gql`
query getArticolo($value: String!) {
  articoliGdprs(filters: { Articolo: { eq: $value } }) {
    data {
      attributes {
        Articolo
        numeroArticolo
      }
    }
  }
}
`;

export const QUERY_GET_ISO = gql`
query getArticolo($value: String!) {
  isos(filters: { Iso: { eq: $value } }) {
    data {
      attributes {
        Iso
        numero
      }
    }
  }
}
`;

export const QUERY_GET_CWE = gql`
query getArticolo($value: String!) {
  cwes(filters: { Descrizione: { eq: $value } }) {
    data {
      attributes {
        Descrizione
        Codice
      }
    }
  }
}
`;

export const QUERY_GET_MVC = gql`
query getArticolo($value: String!) {
  mvcs(filters: { MVC: { eq: $value } }) {
    data {
      attributes {
        MVC
      }
    }
  }
}
`;

export const QUERY_GET_OWASP = gql`
query getArticolo($value: String!) {
  owasps(filters: { owasp: { eq: $value } }) {
    data {
      attributes {
        owasp
        numero
      }
    }
  }
}
`;

export const QUERY_GET_PATTERN_NAME = gql`
query getArticolo($value: String!) {
  patterns(filters: { Name: { eq: $value } }) {
    data {
      attributes {
        Name
        Description
        Context
        Example
      }
    }
  }
}
`;

export const QUERY_GET_PATTERN_CONTEXT = gql`
query getArticolo($value: String!) {
  patterns(filters: { Context: { eq: $value } }) {
    data {
      attributes {
        Name
        Description
        Context
        Example
      }
    }
  }
}
`;

export const QUERY_GET_PATTERN_DESCRIPTION = gql`
query getArticolo($value: String!) {
  patterns(filters: { Description: { eq: $value } }) {
    data {
      attributes {
        Name
        Description
        Context
        Example
      }
    }
  }
}
`;

export const QUERY_GET_PBD = gql`
query getArticolo($value: String!) {
  pbds(filters: { PBD: { eq: $value } }) {
    data {
      attributes {
        PBD
      }
    }
  }
}
`;

export const QUERY_GET_STRATEGY = gql`
query getArticolo($value: String!) {
  strategies(filters: { Name: { eq: $value } }) {
    data {
      attributes {
        Name
      }
    }
  }
}
`;

export const QUERY_GET_ALL_ARTICOLO = gql`
query {
  articoliGdprs{
    data {
      attributes {
        Articolo
        numeroArticolo
      }
    }
  }
}
`;

export const QUERY_GET_ALL_ISO = gql`
query{
  isos{
    data {
      attributes {
        Iso
        numero
      }
    }
  }
}
`;

export const QUERY_GET_ALL_CWE = gql`
query{
  cwes{
    data {
      attributes {
        Descrizione
        Codice
      }
    }
  }
}
`;

export const QUERY_GET_ALL_MVC = gql`
query{
  mvcs{
    data {
      attributes {
        MVC
      }
    }
  }
}
`;

export const QUERY_GET_ALL_OWASP = gql`
query{
  owasps{
    data {
      attributes {
        owasp
        numero
      }
    }
  }
}
`;

export const QUERY_GET_ALL_PATTERN= gql`
query{
  patterns{
    data {
      attributes {
        Name
        Description
        Context
        Example
      }
    }
  }
}
`;

export const QUERY_GET_ALL_PBD = gql`
query{
  pbds{
    data {
      attributes {
        PBD
      }
    }
  }
}
`;

export const QUERY_GET_ALL_STRATEGY = gql`
query{
  strategies{
    data {
      attributes {
        Name
      }
    }
  }
}
`;