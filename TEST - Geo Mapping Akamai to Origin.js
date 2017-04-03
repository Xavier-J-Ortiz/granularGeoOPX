var handler = new OpenmixApplication({
	// keys are the Openmix aliases set in the Portal
	providers: {
		//Montreal
		'passthrough-aks2': {
			cname: 's2.cmmast-origin.masters.com'
		},
		//San Jose
		'passthrough-aks3': {
			cname: 's3.cmmast-origin.masters.com'
		},
		//London
		'passthrough-aks4': {
			cname: 's4.cmmast-origin.masters.com'
		},
		//Tokyo
		'passthrough-aks6': {
			cname: 's6.cmmast-origin.masters.com'
		}
	},
	geo_order: ['state_asn', 'region_asn', 'country_asn', 'market_asn', 'asn', 'state', 'region', 'country', 'market'],
	use_radar_availability_threshold: true,
	use_sonar_availability_threshold: true,
		// default_settings is used to have providers and configuration options for all geos that aren't defined in geo_settings map.
	default_settings: {
		providers: {
			'passthrough-aks2': {},
			'passthrough-aks3': {},
			'passthrough-aks4': {},
			'passthrough-aks6': {}
		},
		default_ttl: 20,
		radar_availability_threshold: 80,
		sonar_availability_threshold: 1,
		min_rtt: 1,
		rtt_tp_mix: 0.0 // 0 = pure RTT, 1 = pure TP(kbps)
	},
	geo_settings: {
		market: {
			'NA': {
				providers: {
					'passthrough-aks2': {},
					'passthrough-aks3': {},
					'passthrough-aks4': {},
					'passthrough-aks6': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks2': {},
						'passthrough-aks3': {}
					},
					radar_availability_threshold : 50
				}
			},
			'XX': {
				providers: {
					'passthrough-aks2': {},
					'passthrough-aks3': {},
					'passthrough-aks4': {},
						'passthrough-aks6': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks2': {},
						'passthrough-aks3': {}
					},
					radar_availability_threshold : 50
				}
			},
			'SA': {
				providers: {
					'passthrough-aks2': {},
					'passthrough-aks3': {},
					'passthrough-aks4': {},
					'passthrough-aks6': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks2': {},
						'passthrough-aks3': {}
					},
					radar_availability_threshold : 50
				}
			},
				//Very sparse data in Africa right now, might tweak once we get more measurements
			'AF': {
				providers: {
					'passthrough-aks4': {},
					'passthrough-aks6': {},
					'passthrough-aks2': {},
						'passthrough-aks3': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks4': {},
						'passthrough-aks6': {}
					},
					radar_availability_threshold : 50
				}
			},
			'EU': {
				providers: {
					'passthrough-aks4': {},
					'passthrough-aks2': {},
					'passthrough-aks3': {},
						'passthrough-aks6': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks4': {},
						'passthrough-aks2': {}
					},
					radar_availability_threshold : 50
				}
			},
			'AS': {
				providers: {
					'passthrough-aks6': {},
					'passthrough-aks3': {},
					'passthrough-aks2': {},
						'passthrough-aks4': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks6': {},
						'passthrough-aks3': {}
					},
					radar_availability_threshold : 50
				}
			},
			'OC': {
				providers: {
					'passthrough-aks6': {},
					'passthrough-aks3': {},
					'passthrough-aks2': {},
						'passthrough-aks4': {}
				},
				radar_availability_threshold : 85,
				fallbackBehavior: {
					providers: {
						'passthrough-aks3': {},
						'passthrough-aks6': {}
					},
					radar_availability_threshold : 50
				}
			}
		},
		country: {},
		asn: {},
		country_asn: {},
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
            allCandidates,
            candidatesAvail;

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
        candidates = cloneObject(overrideSettingByGeo());
        allCandidates = cloneObject(candidates);

        if (hypotheticalCandidates !== undefined) {
            hypotheticalCandidates = cloneObject(hypotheticalCandidates);
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
                // Filter sonar, only use sonar available provider, at least all of them are unavailable
                candidates = filterObject(selectedCandidates, filterSonarAvailability);
                candidateAliases = Object.keys(candidates);

                if (candidateAliases.length > 0) {
                    candidates = intersectObjects(candidates, dataAvail, 'avail');
                    if (Object.keys(candidates).length > 0) {
                        decisionProvider = getHighest(candidates, 'avail');
                    } else {
                        decisionProvider = candidateAliases[Math.floor(Math.random() * candidateAliases.length)];
                    }
                } else {
                    // Join the avail scores with the list of viable candidates
                    candidates = intersectObjects(cloneObject(selectedCandidates), dataAvail, 'avail');
                    candidateAliases = Object.keys(candidates);
                    if (candidateAliases.length > 0) {
                        decisionProvider = getHighest(candidates, 'avail');
                    }
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

            candidatesAvail = filterObject(candidates, filterSonarAvailability);
            candidateAliases = Object.keys(candidatesAvail);

            if (candidateAliases.length > 0) {

                candidates = intersectObjects(candidatesAvail, dataAvail, 'avail');
                if (Object.keys(candidates).length > 0) {
                    decisionProvider = getHighest(candidates, 'avail');
                } else {
                    decisionProvider = candidateAliases[Math.floor(Math.random() * candidateAliases.length)];
                }
            } else {
                candidateAliases = Object.keys(candidates);
                decisionProvider = candidateAliases[Math.floor(Math.random() * candidateAliases.length)];
            }
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