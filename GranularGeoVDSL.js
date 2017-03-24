var handler = new OpenmixApplication({
    // keys are the Openmix aliases set in the Portal
    providers: {


        'passthrough-aks2': {
            cname: 'foo'
        },
        'passthrough-aks3': {
            cname: 'bar'
        },
        'passthrough-aks4': {
            cname: 'baz'
        },
        'passthrough-aks6': {
            cname: 'bou'
        }
    },
    geo_order: ['state_asn', 'region_asn', 'country_asn', 'market_asn', 'asn', 'state', 'region', 'country', 'market'],
    // Xavier - Not sure if I should use radar on this one.
    use_radar_availability_threshold: true,
    use_sonar_availability_threshold: true,
    // default_settings is used to have providers and configuration options for all geos that aren't defined in geo_settings map.
    default_settings: {
        providers: {
            'provider_san_jose': {},
            'provider_montreal': {},
            'provider_london': {},
            'provider_tokyo': {},
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'XX': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'SA': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //AF doesn't have a lot of measurement so sending all to TLN1 for perf
            'AF': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'EU': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'AS': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'OC': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Afghanistan
            //Todo: Change anycast cname
            'AF': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Azerbaijan
            //Todo: Change anycast cname
            'AZ': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Jordan
            //Todo: Change anycast cname
            'JO': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Iraq
            //Todo: Change anycast cname
            'IQ':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Kuwait
            //Todo: Change anycast cname
            'KW': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Kazakhstan
            //Todo: Change anycast cname
            'KZ':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Lebanon
            //Todo: Change anycast cname
            'LB':{
                providers: {
                },
                radar_availability_threshold:75,
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Syria
            //Todo: Change anycast cname
            'SY':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Yemen
            //Todo: Change anycast cname
            'YE':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Armenia
            //Todo: Change anycast cname
            'AM':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Iran
            //Todo: Change anycast cname
            'IR':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Israel
            //Todo: Change anycast cname
            'IL':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Kyrkystan
            //Todo: Change anycast cname
            'KG':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Palestine
            //Todo: Change anycast cname
            'PS':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Tajikistan
            //Todo: Change anycast cname
            'TJ':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Turkey
            //Todo: Change anycast cname
            'TR':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Uzbekistan
            //Todo: Change anycast cname
            'UZ':{
                providers: {
                },
                fallbackBehavior: {
                    providers: {
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
                },
                radar_availability_threshold:25
            },
            //Qatar
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? Going all to TMU1 and low meaurements
            //Optimal Pop(s)? TMU1
            //Todo: Change anycast cname
            'QA': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Nepal
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why? GeoDNS faster than APLT. Pinning to TMU1
            //Optimal Pop(s)? ESG3 and TMU1
            /*'NP': {
                providers: {
                    'bazz_pop_tmu1_auto_pilot_publichidden':{}
                },
                fallbackBehavior: {
                    providers: {
                        'provider_montreal':{},
                        'bazz_pop_tmu1_auto_pilot_publichidden':{},
                        'provider_london':{},
                        'provider_san_jose':{}
                    }
                }
            },*/
            //Oman
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? Very low number of measurements. Majority of responses going to ESG3 and TMU1
            //Optimal Pop(s)? ESG3 and TMU1
            //Todo: Change anycast cname
            'OM': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
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
                },
                radar_availability_threshold:50,
                fallbackBehavior: {
                    providers: {
                    },
                    radar_availability_threshold:50,
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
                },
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Thailand
            //Want 2 choices.  With only ESG3, we saw better perf. Adding EHK2 but with a large padding.  This was related to Tom Feb 13th exercise.
            //Todo: Change anycast cname
            'TH': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //India
            //Sticky Routed to LSG1
            //Is v1 faster than v2? yes
            //Why? v1 also using ESG3
            //Optimal Pop(s)? TMU1 and ESG3
            //LVA1 faster than ELA1 in failover: http://lca1-app0694.corp.foobar.com:8000/target_url/d78c4f009fd440694ce0d81f673bcb8ddb16dd91
            'IN': {
                   providers: {
                   },
                   radar_availability_threshold:50,
                   fallbackBehavior: {
                       providers: {
                       },
                       radar_availability_threshold:50,
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
                },
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Nepal
            //Sticky Routed to LSG1
            //Is v1 faster than v2? no
            //Why?  Not enough data
            //Optimal Pop(s)? TMU1
            //Todo: Add more PoPs and PoP stickiness in v3
            //Todo: Add failover. Change anycast cname
            'NP': {//13-Feb
                providers: {
                }
            },
            //China
            //We will not rope China into APLT. However if a stray request comes to CDXS, let's do the right thing.
            //Todo: Change anycast cname
            'CN': {
                providers: {
                },
                radar_availability_threshold:25,
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            //Ecuador
            //Want 2 choices.  With only anycast_na, we saw better perf. Adding ESP2 but with a large padding.  This was related to Tom Feb 13th exercise.
            'EC': {
                providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    },
                    radar_availability_threshold:50
                }
            },

            //////////////////////////////////////////////////////////////////////////////////////////////////Europe

            //Ireland
            //Optimal Pop(s)? idb2
            //This block is to redefine Ireland with no padding
            'IE': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
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
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },

            //Ghana
            //Todo: Add more choices. Change anycast cname. Need talk to Tom to fix this in month of 3/17
            'GH': {//13-Feb
                providers: {
                }
            },
            
            //Kenya
            //Sticky Routed to LOR1
            //Is v1 faster than v2? yes
            //Why? going to TMU1 also
            //Optimal Pop(s)? EU and TMU1
            //Todo: Change anycast cname
            'KE': {
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            }
        },
        asn: {
            '9365':{//Japan asn ITS Communications
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            '2519':{//Japan asn Vecant Ltd
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            '4237':{ //26-Jan India optimization
                providers: {
                    'provider_e':{}
                }
            },
            '17625':{ //26-Jan India optimization
                providers: {
                }
            },
            '15169':{ //26-Jan India optimization
                providers: {
                }
            },
            '4755':{ //26-Jan India optimization
                providers: {
                }
            },
            '3356':{ //26-Jan India optimization
                providers: {
                }
            },
            '36692':{ //26-Jan India optimization
                providers: {
                }
            }
        },
        country_asn: {
            'SG_15169': { //Tom added 2/7
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'SG_36692': { //Tom added 2/7
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'SG_133165': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'SG_36351': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'SG_132406': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                },
                fallbackBehavior: {
                    providers: {
                    }
                }
            },
            'US_25605': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_4983': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_12008': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_14618': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_30337': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_40934': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_125': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_209': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_174': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_10694': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_3614': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                providers: {
                }
            },
            'US_10879': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                }
            },
            'US_36024': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                }
            },
            'US_12257': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                }
            },
            'US_17052': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                }
            },
            'US_4546': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" //13-Feb
                providers: {
                }
            },
            'PH_132199': { //app_id:60 AND reason_code:"r:bazz_pop_esy1_auto_pilot_publichidden"
                providers: {
                }
            },
            'GB_35662': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                    }
                }
            },
            'GB_702': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                    }
                }
            },
            'GB_25605': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {
                    }
                }
            },
            'SG_38028': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {
                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'SG_10026': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'SG_38895': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'SG_7472': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'SG_3758': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'SG_10120': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'JP_2519': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'ID_4795': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden"
                    providers: {

                    }
                }
            },
            'HK_24023': { //app_id:60 AND reason_code:"r:bazz_pop_tmu1_auto_pilot_publichidden" 2/13
                providers: {

                },
                fallbackBehavior: {
                    providers: {

                    }
                }
            },
        },
        state_asn: {},
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
            only_one_provider_san_josevail: 'J',
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
                decisionReasons.push(allReasons.only_one_provider_san_josevail);
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
