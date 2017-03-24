//1-Dec, Entries/Corrections for RU, VN, RO, TW
//19-Dec, Formatting and removing old comments that aren't useful
//17-Jan, Sending AF and RU to tln1, Adding all PoPs to TMU1 with padding
//18-Jan Removed TMU1 padding but kept all PoPs
//18-Jan AR to ESP2, HK to EHK2, VE to any-na, LK to TMU1 and ESG3, AZ (Azerbaijan) move out of Asia in to EU (tln1), NP to TMU1, BH to multiple PoPs, lowering availability to 65 
//19-Jan added ESP2 and ESY1 to IN, adding all PoPs to Market NA, added TMU1 to SG
//20-Jan set NA back to only any-na
//26-Jan Adding ASN overrides for resolvers not in India that send traffic to TMU1 in v1.
//27-Jan Removing TMU1 from SG
//7-Feb Adding new reason codes and Tom added two netMap Overrides
//9-Feb Replacing EHK2 primary with all 3 failover options as Primary for KR, adding many country_asn corrective overrides, adding ESG3 to UAE, adding tln1 to QA, adding ESG3 to AS3356, added ESY1 to PH_132199
//10-Feb Added IDB2 to lone TLN1 overrides and set IDB2 padding to rtt_padding: 25. Also added an override for Ireland. Probably should do it for Ireland-like geos too.
//13-Feb Adding UK, JP, ID, HK, SG overrides to TMU1. Should consider taking SG out since that's double tracking.  Also made country overrides for 'CN, EC, GH, ID, MY, NP, TW, TH, VE' for Tom. And more US ones.
//17-Feb Move CN to it's own, removed country overrides for Tom added on 13-Feb except for GH, MY, NP. Also corrected MY and pointed to ESG3. Update IN platforms to only TMU1 and ESG3.
//23-Feb adding radar_availability_threshold:25 to RU and CN, commented out HK_24023 to improve HK Perf, radar_availability_threshold:50 for PK, reduced EC to just two primaries, added additional failover choices to various countries, added failover to IN, added PK&CN radar_availability_threshold to failover, added 'cname:glb-na*' options to market level.
//27-Feb adding EHK2 to India primary, uncommented HK_24023, Adding TMU1 to Kenya (KE)
//28-Feb comment clean-up, failover clean-up, cname clean-up
//13-Mar readability: removing comments and re-ordering overrides. Increasing TTL to 300. Dropping availability in India to 50.
//16-Mar platform names updated to point to image platforms
//17-Mar replacing perf.linkedin.com cnames with -alpha.www.linkedin.com, moving all idb2 'rtt_padding: 25' to default_settings, setting idb2 to 'rtt_padding: 0' for IE, moving radar_availability_threshold:50 to Asia and Africa market levels and removing from India and Pakistan, Adding TMU1 to Mauritius (MU), Removing Ghana hardcode to TLN1, Added more choices to Nepal, added state_asn override for AU-S-NSW_16509 based on Tom's TMU1 vs APLT v1 resolver analysis, Added TMU1 to SG failover, added 2nd choice with padding to CO, VE.
//20-Mar set global availability threshold to 50%, replaced glb-na.www.linkedin.com with na-rr.www.linkedin.com, added na-rr.www.linkedin.com in a lot of places, 
//21-Mar set global availability back to 65% DSO-5321, moved Kenya overrides to country_asn for Jamil and Safaricom, 

var handler = new OpenmixApplication({
    // `providers` contains a list of the providers to be load-balanced (all the providers that can be used)
    // keys are the Openmix aliases set in the Portal
    providers: {
        'lnkd_anycast_na_auto_pilot_publichidden_img': {
            cname: 'any-na.www.linkedin.com'
        },
        'lnkd_pop_ehk2_auto_pilot_publichidden_img': {
            cname: 'pop-ehk2.www.linkedin.com'
        },
        'lnkd_pop_esg3_auto_pilot_publichidden_img': {
            cname: 'pop-esg3-alpha.www.linkedin.com'
        },
        'lnkd_pop_esp2_auto_pilot_publichidden_img': {
            cname: 'pop-esp2-alpha.www.linkedin.com'
        },
        'lnkd_pop_esy1_auto_pilot_publichidden_img': {
            cname: 'pop-esy1-alpha.www.linkedin.com'
        },
        'lnkd_pop_idb2_auto_pilot_publichidden_img': {
            cname: 'pop-idb2-alpha.www.linkedin.com'
        },
        'lnkd_pop_tln1_auto_pilot_publichidden_img': {
            cname: 'pop-tln1-alpha.www.linkedin.com'
        },
        'lnkd_pop_tmu1_auto_pilot_publichidden_img': {
            cname: 'pop-tmu1-alpha.www.linkedin.com'
        }
    },
    geo_order: ['state_asn', 'region_asn', 'country_asn', 'market_asn', 'asn', 'state', 'region', 'country', 'market'],
    use_radar_availability_threshold: true,
    use_sonar_availability_threshold: true,
    // default_settings is used to have providers and configuration options for all geos that aren't defined in geo_settings map.
    default_settings: {
        providers: {
            'lnkd_anycast_na_auto_pilot_publichidden_img': {},
            'lnkd_pop_ehk2_auto_pilot_publichidden_img': {},
            'lnkd_pop_esg3_auto_pilot_publichidden_img': {},
            'lnkd_pop_esp2_auto_pilot_publichidden_img': {},
            'lnkd_pop_esy1_auto_pilot_publichidden_img': {},
            'lnkd_pop_idb2_auto_pilot_publichidden_img': {rtt_padding: 25},
            'lnkd_pop_tln1_auto_pilot_publichidden_img': {},
            'lnkd_pop_tmu1_auto_pilot_publichidden_img': {}
        },
        default_ttl: 300,
        radar_availability_threshold: 65,
        sonar_availability_threshold: 2,
        min_rtt: 1,
        rtt_tp_mix: 0.0 // 0 = pure RTT, 1 = pure TP(kbps)
    },
    geo_settings: {
        market: {
            'NA': {
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{} 
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            'XX': {
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{} 
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            'SA': {
                providers: {
                    'lnkd_pop_esp2_auto_pilot_publichidden_img':{},
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{} 
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_esp2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'glb-nas.www.linkedin.com'} //Sending to glb-nas is how GeoDNS configs behave
                    }
                }
            },
            //AF doesn't have a lot of measurement so sending all to TLN1 for perf
            'AF': {
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{} //Not adding IDB2 due to low beacon count
                },
                radar_availability_threshold:50,
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    },
                    radar_availability_threshold:50
                }
            },
            'EU': {
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            'AS': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{}
                },
                radar_availability_threshold:50,
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'glb-naw.www.linkedin.com'} //Sending to glb-naw is how GeoDNS configs behave
                    },
                    radar_availability_threshold:50
                }
            },
            'OC': {
                providers: {
                    'lnkd_pop_esy1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_esy1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'glb-naw.www.linkedin.com'}
                    }
                }
            }
        },
        country: {

            //////////////////////////////////////////////////////////////////////////////////////////////////West Asia
            
            //Saudi Arabia
            //Sticky Routed to LOR1
            //Is v1 faster than v2? no
            //Why? Bleed traffic going to IDB2 due to availability
            //Optimal Pop(s)? TLN1
            //Todo: Change anycast cname
            'SA': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{}
                    }
                }
            },
            //Bahrain
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? low number of measurements 
            //Optimal Pop(s)? tln1, esg3, idb2, tmu1
            //Todo: Change anycast cname
            'BH': {
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Afghanistan
            //Todo: Change anycast cname
            'AF': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Azerbaijan
            //Todo: Change anycast cname
            'AZ': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Jordan
            //Todo: Change anycast cname
            'JO': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Iraq
            //Todo: Change anycast cname
            'IQ':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Kuwait
            //Todo: Change anycast cname
            'KW': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Kazakhstan
            //Todo: Change anycast cname
            'KZ':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Lebanon
            //Todo: Change anycast cname
            'LB':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //United Arab Emirates
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? going to IDB2 and TLN1
            //Optimal Pop(s)? EU and TMU1
            //Todo: Change anycast cname
            'AE': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Syria
            //Todo: Change anycast cname
            'SY':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Yemen
            //Todo: Change anycast cname
            'YE':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Armenia
            //Todo: Change anycast cname
            'AM':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Iran
            //Todo: Change anycast cname
            'IR':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Israel
            //Todo: Change anycast cname
            'IL':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Kyrkystan
            //Todo: Change anycast cname
            'KG':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Palestine
            //Todo: Change anycast cname
            'PS':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Tajikistan
            //Todo: Change anycast cname
            'TJ':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Turkey
            //Todo: Change anycast cname
            'TR':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Uzbekistan
            //Todo: Change anycast cname
            'UZ':{
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Russia
            //Sticky Routed to LTX1
            //Is v1 faster than v2? no
            //Why? Censorship affecting steering. Basically send everything to tln1.  We tried letting the app decide between all PoPs but availabilty way too low. 
            //Optimal Pop(s)? tln1
            //Todo: Change anycast cname
            //We will not ramp RU to APLT due to censorship 
            'RU': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{rtt_padding: 50}
                },
                radar_availability_threshold:5
            },
            //Qatar
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? Going all to TMU1 and low meaurements
            //Optimal Pop(s)? TMU1
            //Todo: Change anycast cname
            'QA': {
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Oman
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? Very low number of measurements. Majority of responses going to ESG3 and TMU1
            //Optimal Pop(s)? ESG3 and TMU1
            //Todo: Change anycast cname
            'OM': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },

            //////////////////////////////////////////////////////////////////////////////////////////////////Central Asia

            //Pakistan
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? Using EU and TMU1 and ESG3 PoPs (not EHK2)
            //Optimal Pop(s)? TLN1 and IDB2
            //Todo: Change anycast cname
            'PK': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    },
                }
            },
            //Sri Lanka
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? v1 going to ESG3 and TMU1 and ESY1
            //Optimal Pop(s)? ESG3 and TMU1
            //Todo: Change anycast cname
            'LK': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Bangladesh
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why? Going to EU
            //Optimal Pop(s)? ESG3 and TMU1
            //Todo: Change anycast cname
            'BD': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Thailand
            //Want 2 choices.  With only ESG3, we saw better perf. Adding EHK2 but with a large padding.  This was related to Tom Feb 13th exercise.
            //Todo: Change anycast cname
            'TH': {
                providers: {
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{rtt_padding: 100},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //India
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? v1 also using ESG3
            //Optimal Pop(s)? TMU1 and ESG3
            //LVA1 faster than ELA1 in failover: http://lca1-app0694.corp.linkedin.com:8000/target_url/d78c4f009fd440694ce0d81f673bcb8ddb16dd91 
            'IN': {
                   providers: {
                       'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                       'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                       'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                   },
                   fallbackBehavior: {
                       providers: {
                           'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                           'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                           'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                           'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                       },
                   }
               },

            //////////////////////////////////////////////////////////////////////////////////////////////////East Asia

            //Philippines
            //Sticky Routed to LSG1
            //Is v1 faster than v2?  yes
            //Why? some ASNs are faster to NA
            //Optimal Pop(s)? Because pinned to ESG3, should be sent to EHK2 and ESG3.  Because NA is so fast, will make an exception.
            'PH': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                }
            },
            //Singapore
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why?  Being sent to EHK2 and TLN1. Need to follow-up why. When pinned to ESG3 we see performance.  Singapore is a tiny country and has got GeoIP mostly figured out? For now making exception and only providing once choice.
            //Optimal Pop(s)? ESG3
            //Todo: Add more PoPs and PoP stickiness in v3
            //Todo: Add TMU1? Change anycast cname
            'SG': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Malaysia
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why?  v1 sends most decisions to ESG3, and 3% to EHK2.  Due to LSG1 pinning, making excecutive decision to pin to ESG3 due to proximity to SG.
            //Optimal Pop(s)? ESG3
            //Todo: Add more PoPs and PoP stickiness in v3
            //Todo: Add more choices. Change anycast cname
            'MY': {
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Nepal
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why? Not enough data. Pinning to TMU1
            //Optimal Pop(s)? ESG3 and TMU1
            //Todo: Add more choices. Change anycast cname
            'NP': {
                providers: {
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //China
            //We will not rope China into APLT. However if a stray request comes to CDXS, let's do the right thing.
            //Todo: Change anycast cname
            'CN': {
                providers: {
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{}
                },
                radar_availability_threshold:25,
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    },
                    radar_availability_threshold:25,
                },
            },
            //Korea
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why? Bleed traffic going to NA due to availability
            //Optimal Pop(s)? ESG3
            //Todo: Change anycast cname
            'KR': {
                providers: {
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                },
            },
            //Hong Kong
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why? It's actually very close.  11ms vs. 10ms at 50th, 192 vs. 190ms at 90th.  Completely within margin of error.  Due to PoP vs. DC and pinning, making executive decision to pin to EHK2.
            //Optimal Pop(s)? EHK2
            //Todo: Add more PoPs and PoP stickiness in v3
            //Todo: Change anycast cname
            'HK': {
                providers: {
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },


            //////////////////////////////////////////////////////////////////////////////////////////////////South America

            //Brazil
            //Sticky Routed to LTX1
            //Is v1 faster than v2? no
            //Why? Some traffic going to NA
            //Optimal Pop(s)? ESP2
            //Todo: Add more PoPs and PoP stickiness in v3
            'BR': {
                providers: {
                    'lnkd_pop_esp2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esp2_auto_pilot_publichidden_img':{}
                    }
                }
            },
            //Ecuador
            //Want 2 choices.  With only anycast_na, we saw better perf. Adding ESP2 but with a large padding.  This was related to Tom Feb 13th exercise.
            'EC': {
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esp2_auto_pilot_publichidden_img':{rtt_padding: 100}
                }
            },

            //Colombia
            //Sticky Routed to LTX1
            //Is v1 faster than v2? same
            //Why? v1 send to NA
            //Optimal Pop(s)? NA
            //Todo: Add more PoPs and PoP stickiness in v3
            'CO': {
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esp2_auto_pilot_publichidden_img':{rtt_padding: 100}
                }
            },
            //Venezuala
            //Sticky Routed to LTX1
            //Is v1 faster than v2? no
            //Why? v1 sending to many PoPs due to low data
            //Optimal Pop(s)? NA
            //Todo: Add more PoPs and PoP stickiness in v3
            'VE': {
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esp2_auto_pilot_publichidden_img':{rtt_padding: 100}
                }
            },
            //Paraguay
            //Sticky Routed to LTX1
            //Is v1 faster than v2? no
            //Why? not enough data
            //Optimal Pop(s)? ESP2
            //Todo: Add more PoPs and PoP stickiness in v3
            'PY': {
                providers: {
                    'lnkd_pop_esp2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_esp2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    },
                    radar_availability_threshold:50
                }
            },

            //////////////////////////////////////////////////////////////////////////////////////////////////Europe

            //Ireland
            //Optimal Pop(s)? idb2
            //This block is to redefine Ireland with no padding
            //Todo: Change anycast cname
            'IE': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{rtt_padding: 0},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'},
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{rtt_padding: 0},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                    }
                }
            },
            
            //////////////////////////////////////////////////////////////////////////////////////////////////Africa


            //Mauritius
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? v1 goes to EU
            //Optimal Pop(s)? tln1
            //Todo: Change anycast cname
            'MU': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                    }
                }
            }
        },
        asn: { //For overrides smaller then countries, we don't override the cnames and padding
            '9365':{//Japan asn ITS Communications
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            '2519':{//Japan asn Vecant Ltd
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            '4237':{ //26-Jan India optimization
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                }
            },
            '17625':{ //26-Jan India optimization
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            '15169':{ //26-Jan India optimization
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                }
            },
            '4755':{ //26-Jan India optimization
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            '3356':{ //26-Jan India optimization
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                }
            },
            '36692':{ //26-Jan India optimization
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{}
                }
            }
        },
        country_asn: { //For overrides smaller then countries, we don't override the cnames and padding
            'SG_15169': { //Tom added 2/7
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_36692': { //Tom added 2/7
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_133165': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_36351': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_132406': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'US_25605': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_4983': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_12008': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_14618': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_30337': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_40934': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_125': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_209': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_174': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_10694': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_3614': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_10879': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_36024': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_12257': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_17052': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'US_4546': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
            'PH_132199': { //app_id:60 AND reason_code:"r:lnkd_pop_esy1_auto_pilot_publichidden"
                providers: {
                    'lnkd_pop_esy1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                }
            },
            'GB_35662': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'GB_702': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'GB_25605': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_38028': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_10026': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_38895': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_7472': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_3758': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'SG_10120': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'JP_2519': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'ID_4795': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            'HK_24023': { //app_id:60 AND reason_code:"r:lnkd_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                    'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                    'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_ehk2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_esg3_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{}
                    }
                }
            },
            //Kenya - Jamil Telecom
            //Sticky Routed to LOR1
            //Is v1 faster than v2? yes
            //Why? going to TMU1 also
            //Optimal Pop(s)? EU and TMU1
            //Todo: Change anycast cname
            'KE_36866': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            },
            //Kenya - Safaricom
            //Sticky Routed to LOR1
            //Is v1 faster than v2? yes
            //Why? going to TMU1 also
            //Optimal Pop(s)? EU and TMU1
            //Todo: Change anycast cname
            'KE_37061': {
                providers: {
                    'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                },
                fallbackBehavior: {
                    providers: {
                        'lnkd_pop_idb2_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tln1_auto_pilot_publichidden_img':{},
                        'lnkd_pop_tmu1_auto_pilot_publichidden_img':{},
                        'lnkd_anycast_na_auto_pilot_publichidden_img':{cname:'na-rr.www.linkedin.com'}
                    }
                }
            }
        },
        state_asn: {
            'AU-S-NSW_16509': { //Tom's TMU1 vs APLT v1 resolver analysis //For overrides smaller then countries, we don't override the cnames and padding
                providers: {
                    'lnkd_anycast_na_auto_pilot_publichidden_img':{},
                    'lnkd_pop_esy1_auto_pilot_publichidden_img':{},
                    'lnkd_pop_tmu1_auto_pilot_publichidden_img':{}
                }
            },
        },
        region_asn: {},
        market_asn: {},
        state: {},
        region: {}
    }
});

function init(config) {
    'use strict';
    handler.do_init(config);
}

function onRequest(request, response) {
    'use strict';
    handler.handle_request(request, response);
}

/** @constructor */
function OpenmixApplication(settings) {
    'use strict';

    var aliases = settings.providers === undefined ? [] : Object.keys(settings.providers);

    /**
     * @param {OpenmixConfiguration} config
     */
    this.do_init = function(config) {
        var i = aliases.length,
            alias;

        while (i --) {
            alias = aliases[i];

            config.requireProvider(alias);
        }
    };

    /**
     * @param {OpenmixRequest} request
     * @param {OpenmixResponse} response
     */
    this.handle_request = function(request, response) {
        var dataAvail = request.getProbe('avail'),
            dataRtt = request.getProbe('http_rtt'),
            dataKbps = request.getProbe('http_kbps'),
            /** @type { !Object.<string, { health_score: { value:string }, availability_override:string}> } */
            dataFusion = parseFusionData(request.getData('fusion')),
            candidates,
            candidateAliases,
            allReasons,
            decisionProvider,
            decisionReasons = [],
            decisionTtl = settings.default_settings.default_ttl,
            radarAvailabilityThreshold,
            sonarAvailabilityThreshold,
            minRtt,
            rttTpMix,
            totalRtt = 0,
            totalKbps = 0,
            selectedCandidates,
            cname,
            fallbackBehavior,
            hypotheticalCandidates,
            hypotheticalBestProvider,
            unavailBestProvider,
            allCandidates;

        allReasons = {
            optimum_server_chosen: 'A',
            geo_override_on_state: 'B',
            geo_override_on_region: 'C',
            geo_override_on_country: 'D',
            geo_override_on_market: 'E',
            geo_override_on_asn: 'F',
            all_providers_eliminated_radar: 'G',
            all_providers_eliminated_sonar: 'H',
            geo_default: 'I',
            only_one_provider_avail: 'J',
            data_problem: 'K',
            sonar_data_problem: 'L',
            geo_fallback_behavior: 'M',
            geo_override_on_state_asn: 'N',
            geo_override_on_region_asn: 'O',
            geo_override_on_country_asn: 'P',
            geo_override_on_market_asn: 'Q',
            hypothetical_best_provider: 'R',
            best_provider_unavailable: 'S'
        };

        function calculateScore(candidates) {
            var keys = Object.keys(candidates),
                i = keys.length,
                key,
                rttW,
                tpW;

            while (i --) {
                key = keys[i];
                // Normalized
                candidates[key].http_rtt = candidates[key].http_rtt / (totalRtt / candidates[key].http_rtt);
                if (candidates[key].http_kbps !== 0 && totalKbps !== 0) {
                    candidates[key].http_kbps = candidates[key].http_kbps / (totalKbps / candidates[key].http_kbps);
                }
                // Adding weighted values for RTT and TP
                rttW = (rttTpMix-1) * candidates[key].http_rtt;
                tpW = rttTpMix * candidates[key].http_kbps;
                candidates[key].score = rttW + tpW;
            }
            return candidates;
        }

        /**
         * This also update the totalRtt and totalKbps value
         * @param {!Object.<string,{ http_rtt: number, http_kbps: number, rtt_padding: number, kbps_padding: number }>} candidates
         */
        function addPadding(candidates) {
            var keys = Object.keys(candidates),
                i = keys.length,
                key,
                rtt_padding,
                kbps_padding,
                kbpsDataLength = Object.keys(dataKbps).length;

            while (i --) {
                key = keys[i];
                rtt_padding = candidates[key].rtt_padding || 0;
                kbps_padding = candidates[key].kbps_padding || 0;
                candidates[key].http_rtt *= 1 + rtt_padding / 100;
                candidates[key].http_kbps = (kbpsDataLength > 0 && candidates[key].http_kbps) ? candidates[key].http_kbps * (1 - kbps_padding / 100) : 0;

                // Update the totals
                totalRtt += candidates[key].http_rtt;
                totalKbps += candidates[key].http_kbps;
            }
            return candidates;
        }

        /**
         * @param {Object} candidate
         */
        function filterInvalidRttScores(candidate) {
            return candidate.http_rtt >= minRtt;
        }

        /**
         * @param candidate
         * @param alias
         * @returns {boolean}
         */
        function filterRadarAvailability(candidate, alias) {
            return dataAvail[alias] !== undefined && dataAvail[alias].avail >= radarAvailabilityThreshold;
        }

        /**
         * @param candidate
         * @param alias
         * @returns {boolean}
         */
        function filterSonarAvailability(candidate, alias) {
            return dataFusion[alias] !== undefined && dataFusion[alias].health_score !== undefined
                && dataFusion[alias].health_score.value > sonarAvailabilityThreshold;
        }

        // Override the settings if geo mapping is defined, if not use the default geo settings
        function overrideSettingByGeo() {
            var geotype, geo, i,
                geoCombined,
                candidates,
                geoSettings;

            for (i = 0; i < settings.geo_order.length; i ++) {
                geotype = settings.geo_order[i];

                if (geotype.indexOf('_') !== -1) {
                    // Combined geo
                    geoCombined = geotype.split('_');
                    geo = request[geoCombined[0]] + '_' + request[geoCombined[1]];
                } else {
                    geo = request[geotype];
                }

                if (settings.geo_settings[geotype] !== undefined && settings.geo_settings[geotype][geo] !== undefined) {

                    geoSettings = settings.geo_settings[geotype][geo];

                    // Override the settings by the Geo or the default if it isn't defined
                    if (geoSettings.providers !== undefined) {
                        candidates = geoSettings.providers;

                        // To determine the "hypothetical" decision with the same criteria, only when the candidates are override by geo
                        hypotheticalCandidates = settings.default_settings.providers;
                    } else {
                        candidates = settings.default_settings.providers;
                    }
                    decisionTtl = geoSettings.default_ttl !== undefined ? geoSettings.default_ttl : settings.default_settings.default_ttl;
                    radarAvailabilityThreshold = geoSettings.radar_availability_threshold !== undefined ? geoSettings.radar_availability_threshold : settings.default_settings.radar_availability_threshold;
                    sonarAvailabilityThreshold = geoSettings.sonar_availability_threshold !== undefined ? geoSettings.sonar_availability_threshold : settings.default_settings.sonar_availability_threshold;
                    minRtt = geoSettings.min_rtt !== undefined ? geoSettings.min_rtt : settings.default_settings.min_rtt;
                    rttTpMix = geoSettings.rtt_tp_mix !== undefined ? geoSettings.rtt_tp_mix : settings.default_settings.rtt_tp_mix;
                    fallbackBehavior = geoSettings.fallbackBehavior;

                    decisionReasons.push(allReasons['geo_override_on_' + geotype]);
                    return candidates;
                }
            }

            // Use default geo
            candidates = settings.default_settings.providers;
            decisionTtl = settings.default_settings.default_ttl;
            radarAvailabilityThreshold = settings.default_settings.radar_availability_threshold;
            sonarAvailabilityThreshold = settings.default_settings.sonar_availability_threshold;
            minRtt = settings.default_settings.min_rtt;
            rttTpMix = settings.default_settings.rtt_tp_mix;

            decisionReasons.push(allReasons.geo_default);
            return candidates;
        }

        function overrideFallbackSettingsByGeo() {
            // Override the fallback behavior by the Geo or use the default if it isn't defined
            candidates = fallbackBehavior.providers || candidates;
            decisionTtl = fallbackBehavior.default_ttl || decisionTtl;
            radarAvailabilityThreshold = fallbackBehavior.radar_availability_threshold || radarAvailabilityThreshold;
            sonarAvailabilityThreshold = fallbackBehavior.sonar_availability_threshold || sonarAvailabilityThreshold;
            minRtt = fallbackBehavior.min_rtt || minRtt;
            rttTpMix = fallbackBehavior.rtt_tp_mix || rttTpMix;

            decisionReasons.push(allReasons.geo_fallback_behavior);
        }

        function filterAvailRadarSonar(candidates, filterRadarAvailability, filterSonarAvailability) {
            if (settings.use_radar_availability_threshold) {
                candidates = filterObject(candidates, filterRadarAvailability);
                candidateAliases = Object.keys(candidates);
                if (candidateAliases.length === 0) {
                    decisionReasons.push(allReasons.all_providers_eliminated_radar);
                }
            }

            if (Object.keys(candidates).length > 0 && settings.use_sonar_availability_threshold) {
                if (dataFusion[Object.keys(dataFusion)[0]].availability_override === undefined) {
                    candidates = filterObject(candidates, filterSonarAvailability);
                    candidateAliases = Object.keys(candidates);
                    if (candidateAliases.length === 0) {
                        decisionReasons.push(allReasons.all_providers_eliminated_sonar);
                    }
                } else {
                    decisionReasons.push(allReasons.sonar_data_problem);
                }
            }

            return candidates;
        }

        function checkBestUnavailProvider() {
            candidates = intersectObjects(allCandidates, dataRtt, 'http_rtt');
            if (rttTpMix !== 1) {
                candidates = filterObject(candidates, filterInvalidRttScores);
            }
            if (Object.keys(dataKbps).length > 0) {
                candidates = intersectObjects(candidates, dataKbps, 'http_kbps');
            }
            candidateAliases = Object.keys(candidates);
            if (candidateAliases.length > 0) {
                candidates = addPadding(candidates);
                candidates = calculateScore(candidates);
                unavailBestProvider = getHighest(candidates, 'score');
                if (unavailBestProvider !== decisionProvider
                    && (settings.use_radar_availability_threshold && (!filterRadarAvailability('', unavailBestProvider))
                        || (settings.use_sonar_availability_threshold && !filterSonarAvailability('', unavailBestProvider)))) {
                    decisionReasons.push(allReasons.best_provider_unavailable + ':' + unavailBestProvider);
                }
            }
        }

        function getHypotheticalCandidate(candidates) {
            selectedCandidates = cloneObject(candidates);
            candidates = filterAvailRadarSonar(candidates, filterRadarAvailability, filterSonarAvailability); //filter by radar and sonar avail
            candidateAliases = Object.keys(candidates);

            if (candidateAliases.length === 0) {
                candidates = intersectObjects(cloneObject(selectedCandidates), dataAvail, 'avail');
                candidateAliases = Object.keys(candidates);
                if (candidateAliases.length > 0) {
                    return getHighest(candidates, 'avail');
                }
            } else if (candidateAliases.length === 1) {
                return candidateAliases[0];
            } else {
                candidates = intersectObjects(candidates, dataRtt, 'http_rtt');

                if (rttTpMix !== 1) {
                    candidates = filterObject(candidates, filterInvalidRttScores);
                }

                if (Object.keys(dataKbps).length > 0) {
                    candidates = intersectObjects(candidates, dataKbps, 'http_kbps');
                }

                candidateAliases = Object.keys(candidates);
                if (candidateAliases.length > 0) {
                    candidates = addPadding(candidates);
                    candidates = calculateScore(candidates);
                    return getHighest(candidates, 'score');
                }
            }
        }

        // Provider eligibility check - filtering per Global_Settings or Geo_Settings
        candidates = overrideSettingByGeo();
        allCandidates = cloneObject(candidates);

        if (hypotheticalCandidates !== undefined) {
            hypotheticalBestProvider = getHypotheticalCandidate(hypotheticalCandidates);
        }

        selectedCandidates = cloneObject(candidates);
        candidateAliases = Object.keys(selectedCandidates);

        if (((settings.use_sonar_availability_threshold === true && Object.keys(dataFusion).length > 0) || settings.use_sonar_availability_threshold === false)
            && ((settings.use_radar_availability_threshold === true && Object.keys(dataAvail).length > 0) || settings.use_radar_availability_threshold === false)
            && Object.keys(dataRtt).length > 0) {

            candidates = filterAvailRadarSonar(candidates, filterRadarAvailability, filterSonarAvailability); //filter by radar and sonar avail
            candidateAliases = Object.keys(candidates);

            if (candidateAliases.length === 0 && fallbackBehavior !== undefined &&
                fallbackBehavior.providers !== undefined && Object.keys(fallbackBehavior.providers).length > 0 ) {
                overrideFallbackSettingsByGeo(); //override fallback behavior settings
                selectedCandidates = cloneObject(candidates);
                candidates = filterAvailRadarSonar(candidates, filterRadarAvailability, filterSonarAvailability);
                candidateAliases = Object.keys(candidates);
            }

            if (candidateAliases.length === 0) {
                // Join the avail scores with the list of viable candidates
                candidates = intersectObjects(cloneObject(selectedCandidates), dataAvail, 'avail');
                candidateAliases = Object.keys(candidates);
                if (candidateAliases.length > 0) {
                    decisionProvider = getHighest(candidates, 'avail');
                }
            } else if (candidateAliases.length === 1) {
                decisionProvider = candidateAliases[0];
                decisionReasons.push(allReasons.only_one_provider_avail);
            } else {
                // Join the rtt scores with the list of viable candidates
                candidates = intersectObjects(candidates, dataRtt, 'http_rtt');

                if (rttTpMix !== 1) {
                    candidates = filterObject(candidates, filterInvalidRttScores);
                }

                if (Object.keys(dataKbps).length > 0) {
                    // Join the kbps scores with the list of viable candidates
                    candidates = intersectObjects(candidates, dataKbps, 'http_kbps');
                }

                candidateAliases = Object.keys(candidates);
                if (candidateAliases.length > 0) {

                    // Add kbps and rtt padding
                    candidates = addPadding(candidates);

                    // mean-normalized RTT and TP and calculate scores
                    candidates = calculateScore(candidates);

                    decisionProvider = getHighest(candidates, 'score');
                    decisionReasons.push(allReasons.optimum_server_chosen);
                }
            }

            // Check best provider for all, without filter avail
            if (decisionProvider !== undefined) {
                checkBestUnavailProvider();
            }
        }

        if (decisionProvider === undefined) {
            candidates = fallbackBehavior && fallbackBehavior.providers && Object.keys(fallbackBehavior.providers).length > 0 ? fallbackBehavior.providers : settings.default_settings.providers;
            candidateAliases = Object.keys(candidates);
            decisionProvider = candidateAliases[Math.floor(Math.random() * candidateAliases.length)];
            decisionReasons.push(allReasons.data_problem);
        }

        if (hypotheticalBestProvider && decisionProvider !== hypotheticalBestProvider) {
            decisionReasons.push(allReasons.hypothetical_best_provider + ':' + hypotheticalBestProvider);
        }

        cname = selectedCandidates
            && selectedCandidates[decisionProvider]
            && selectedCandidates[decisionProvider].cname
            ? selectedCandidates[decisionProvider].cname
            : settings.providers[decisionProvider].cname;

        response.respond(decisionProvider, cname);
        response.setTTL(decisionTtl);
        response.setReasonCode(decisionReasons.join(','));
    };

    /**
     * @param {!Object} object
     * @param {Function} filter
     */
    function filterObject(object, filter) {
        var keys = Object.keys(object),
            i = keys.length,
            data = {},
            key;
        while (i --) {
            key = keys[i];
            if (filter(object[key], key)) {
                data[key] = object[key];
            }
        }
        return data;
    }

    /**
     * @param object
     */
    function cloneObject(object) {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     * @param {!Object} source
     * @param {string} property
     */
    function getHighest(source, property) {
        var keys = Object.keys(source),
            i = keys.length,
            key,
            candidate,
            max = -Infinity,
            value;

        while (i --) {
            key = keys[i];
            value = source[key][property];
            if (value > max) {
                candidate = key;
                max = value;
            }
        }
        return candidate;
    }

    /**
     * @param {!Object} target
     * @param {Object} source
     * @param {string} property
     */
    function intersectObjects(target, source, property) {
        var keys = Object.keys(target),
            i = keys.length,
            key;

        while (i --) {
            key = keys[i];

            if (source[key] !== undefined && source[key][property] !== undefined) {
                target[key][property] = source[key][property];
            }
            else {
                delete target[key];
            }
        }

        return target;
    }

    /**
     * @param {!Object} data
     */
    function parseFusionData(data) {
        var keys = Object.keys(data),
            i = keys.length,
            key;
        while (i --) {
            key = keys[i];
            try {
                data[key] = JSON.parse(data[key]);
            }
            catch (e) {
                delete data[key];
            }
        }
        return data;
    }
}