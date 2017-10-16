const VTS = {
  apiList: [
    "PUT-/arm/vts/clients/-vClientID",
    "GET-/arm/vts/panEnrollments/-vPanEnrollmentID",
    "GET-/arm/vts/cps/getContent/-guid",
    "POST-/arm/vts/panEnrollments/-vPanEnrollmentID/provisionedTokens",
    "POST-/arm/vts/provisionedTokens",
    "GET-/arm/vts/provisionedTokens/-vProvisionedTokenID",
    "POST-/arm/vts/provisionedTokens/-vProvisionedTokenID/replenish",
    "POST-/arm/vts/provisionedTokens/-vProvisionedTokenID/replenishODA",
    "GET-/arm/vts/provisionedTokens/-vProvisionedTokenID/stepUpOptions",
    "PUT-/arm/vts/provisionedTokens/-vProvisionedTokenID/stepUpOptions/method",
    "POST-/arm/vts/provisionedTokens/-vProvisionedTokenID/stepUpOptions/validateOTP",
    "POST-/arm/rsrv_vts/vts/provisionedTokens/paymentData",
    "POST-/arm/wallet-services-web/xo/account/ARMGUID/intent",
    "PUT-/arm/wallet-services-web/xo/intent/-intent_id",
    "GET-/arm/wallet-services-web/payment/updatepaymentinfo.gif",
    "POST-/arm/consumer-api/-version/account/ARMGUID",
    "POST-/arm/consumer-api/-version/login",
    "PUT-/cbp-web/vts/clients/-vClientID",
    "GET-/cbp-web/vts/panEnrollments/-vPanEnrollmentID",
    "GET-/cbp-web/vts/cps/getContent/-guid",
    "POST-/cbp-web/vts/panEnrollments/-vPanEnrollmentID/provisionedTokens",
    "POST-/cbp-web/vts/provisionedTokens",
    "GET-/cbp-web/vts/provisionedTokens/-vProvisionedTokenID",
    "POST-/cbp-web/vts/provisionedTokens/-vProvisionedTokenID/replenish",
    "POST-/cbp-web/vts/provisionedTokens/-vProvisionedTokenID/replenishODA",
    "GET-/cbp-web/vts/provisionedTokens/-vProvisionedTokenID/stepUpOptions",
    "PUT-/cbp-web/vts/provisionedTokens/-vProvisionedTokenID/stepUpOptions/method",
    "POST-/cbp-web/vts/provisionedTokens/-vProvisionedTokenID/stepUpOptions/validateOTP",
    "POST-/cbp-web/rsrv_vts/vts/provisionedTokens/paymentData",
    "POST-/cbp-web/wallet-services-web/xo/account/ARMGUID/intent",
    "PUT-/cbp-web/wallet-services-web/xo/intent/-intent_id",
    "GET-/cbp-web/wallet-services-web/payment/updatepaymentinfo.gif",
    "POST-/cbp-web/consumer-api/-version/account/ARMGUID",
    "POST-/cbp-web/consumer-api/-version/login"
  ],
  componentList: [{
    component: 'arm',
    hostListOCC: ["sl55armapp010", "sl55armapp011", "sl55armapp012", "sl55armapp013", "sl55armapp014", "sl55armapp015", "sl55armapp016", "sl55armapp017", "sl55armapp001", "sl55armapp002", "sl55armapp003", "sl55armapp005", "sl55armapp006", "sl55armapp007", "sl55armapp008", "sl55armapp009"],
    hostListOCE: ["sl73armapp001", "sl73armapp002", "sl73armapp003", "sl73armapp004", "sl73armapp005", "sl73armapp006", "sl73armapp007", "sl73armapp008", "sl73armapp009", "sl73armapp010", "sl73armapp011", "sl73armapp012"]
  },
    {
      component: 'cbp-web',
      hostListOCC: ["sl55cbppapp014", "sl55cbppapp015", "sl55cbppapp016", "sl55cbppapp017", "sl55cbppapp018", "sl55cbppapp019", "sl55cbppapp020", "sl55cbppapp021", "sl55cbppapp022", "sl55platfapp001", "sl55platfapp002", "sl55platfapp003", "sl55cbppapp001", "sl55cbppapp003", "sl55cbppapp004", "sl55cbppapp005", "sl55cbppapp006", "sl55cbppapp007", "sl55cbppapp008", "sl55cbppapp009", "sl55cbppapp010", "sl55cbppapp011", "sl55cbppapp012", "sl55cbppapp013"],
      hostListOCE: ["sl73cbpapp007", "sl73cbpapp008", "sl73cbpapp023", "sl73cbpapp024", "sl73cbppapp001", "sl73cbppapp002", "sl73cbppapp003", "sl73cbppapp004", "sl73cbppapp005", "sl73cbppapp006", "sl73cbppapp007", "sl73cbppapp008", "sl73cbppapp009", "sl73cbppapp010", "sl73cbppapp011", "sl73cbppapp012", "sl73cbppapp013", "sl73cbppapp015"]
    },
    {
      component: 'cbp-nc-web',
      hostListOCC: ["sl55ncwebapp011", "sl55ncwebapp012", "sl55ncwebapp013", "sl55ncwebapp014", "sl55ncwebapp015", "sl55ncwebapp016", "sl55ncwebapp017", "sl55ncwebapp004", "sl55ncwebapp005", "sl55ncwebapp006", "sl55ncwebapp007", "sl55ncwebapp008", "sl55ncwebapp009", "sl55ncwebapp010"],
      hostListOCE: []
    },
    {
      component: 'checkout-widget',
      hostListOCC: ["sl55caspaapp004", "sl55caspaapp005", "sl55caspaapp001", "sl55caspaapp002", "sl55caspaapp003"],
      hostListOCE: []
    },
    {
      component: 'consumer-controller',
      hostListOCC: ["sl55commapp006", "sl55commapp004", "sl55commapp005"],
      hostListOCE: []
    },
    {
      component: 'vimcom',
      hostListOCC: ["sl55authsapp003", "sl55authsapp001", "sl55authsapp002"],
      hostListOCE: ["sl73cbpapp005", "sl73cbpapp006", "sl73cbpapp021", "sl73cbpapp022"]
    },
    {
      component: 'dcs-rest',
      hostListOCC: ["sl55cbpapp004", "sl55cbpapp005", "sl55cbpapp006", "sl55cbpapp007", "sl55dcsapp004", "sl55dcsapp005", "sl55dcsapp006", "sl55cbpapp001", "sl55cbpapp002", "sl55cbpapp003", "sl55dcsapp001", "sl55dcsapp002", "sl55dcsapp003"],
      hostListOCE: ["SM730MAGHSMP09", "SM730MAGHSMP10", "SM730MAGHSMP11", "SM730MAGHSMP12", "sl73dcsapp001", "sl73dcsapp002", "sl73dcsapp003", "sl73dcsapp004", "sl73dcsapp005", "sl73dcsapp006"]
    },
    {
      component: 'ddtservices',
      hostListOCC: ["sl55ddtapp007", "sl55ddtapp008", "sl55ddtapp009", "sl55ddtapp010", "sl55ddtapp001", "sl55ddtapp002", "sl55ddtapp003", "sl55ddtapp004", "sl55ddtapp005", "sl55ddtapp006"],
      hostListOCE: ["sl73cbpapp001", "sl73cbpapp002", "sl73cbpapp017", "sl73cbpapp018", "sl73ddtapp001", "sl73ddtapp002"]
  },
    {
      component: 'dfmservices',
      hostListOCC: ["sl55srvsapp007", "sl55srvsapp008", "sl55srvsapp009", "sl55srvsapp010", "sl55srvsapp011", "sl55srvsapp012", "sl55srvsapp001", "sl55srvsapp002", "sl55srvsapp003", "sl55srvsapp004", "sl55srvsapp005", "sl55srvsapp006"],
      hostListOCE: []
    },
    {
      component: 'dfm-admin',
      hostListOCC: ["sl55adminapp004", "sl55adminapp005", "sl55adminapp001", "sl55adminapp002", "sl55adminapp003"],
      hostListOCE: []
    },
    {
      component: 'cardvalidation',
      hostListOCC: ["sl55dfmcvapp004", "sl55dfmcvapp005", "sl55dfmcvapp006", "sl55dfmcvapp001", "sl55dfmcvapp002", "sl55dfmcvapp003"],
      hostListOCE: []
    },
    {
      component: 'issuer-controller',
      hostListOCC: ["sl55issrapp003", "sl55issrapp004", "sl55commapp007", "sl55commapp008", "sl55commapp009"],
      hostListOCE: []
    },
    {
      component: 'logging',
      hostListOCC: ["sl55logapp004", "sl55logapp005", "sl55logapp006", "sl55logapp007", "sl55logapp001", "sl55logapp002", "sl55logapp003"],
      hostListOCE: []
    },
    {
      component: 'credentials-api',
      hostListOCC: ["sl55mcmapp004", "sl55mcmapp005", "sl55mcmapp001", "sl55mcmapp002", "sl55mcmapp003"],
      hostListOCE: []
    },
    {
      component: 'merchant-api',
      hostListOCC: ["sl55apibeapp005", "sl55apibeapp006", "sl55apibeapp007", "sl55apibeapp001", "sl55apibeapp002", "sl55apibeapp003", "sl55apibeapp004"],
      hostListOCE: []
    },
    {
      component: 'merchant-api-internal',
      hostListOCC: ["sl55apimbapp005", "sl55apimbapp006", "sl55apimbapp007", "sl55apimbapp001", "sl55apimbapp002", "sl55apimbapp003", "sl55apimbapp004"],
      hostListOCE: []
    },
    {
      component: 'MetadataServices',
      hostListOCC: ["sl55mtdtapp003", "sl55mtdtapp001", "sl55mtdtapp002"],
      hostListOCE: []
    },
    {
      component: 'notification',
      hostListOCC: ["sl55pltnapp004", "sl55pltnapp005", "sl55pltnapp001", "sl55pltnapp002", "sl55pltnapp003"],
      hostListOCE: []
    },
    {
      component: 'notification-config',
      hostListOCC: ["sl55pltnapp004", "sl55pltnapp005", "sl55pltnapp001", "sl55pltnapp002", "sl55pltnapp003"],
      hostListOCE: []
    },
    {
      component: 'otp-api',
      hostListOCC: ["sl55otpapp003", "sl55otpapp004", "sl55otpapp005", "sl55otpapp001", "sl55otpapp002"],
      hostListOCE: []
    },
    {
      component: 'rls',
      hostListOCC: ["sl55rlsapp007", "sl55rlsapp008", "sl55rlsapp009", "sl55rlsapp010", "sl55rlsapp011", "sl55rlsapp012", "sl55rlsapp001", "sl55rlsapp002", "sl55rlsapp003", "sl55rlsapp004", "sl55rlsapp005", "sl55rlsapp006"],
      hostListOCE: []
    },
    {
      component: 'self-service',
      hostListOCC: ["sl55ssmfeapp004", "sl55ssmfeapp005", "sl55ssmfeapp006", "sl55ssmfeapp007", "sl55ssmfeapp001", "sl55ssmfeapp002", "sl55ssmfeapp003"],
      hostListOCE: []
    },
    {
      component: 'support-tool',
      hostListOCC: ["sl55stmfeapp003", "sl55stmfeapp001", "sl55stmfeapp002"],
      hostListOCE: []
    },
    {
      component: 'vmeservices',
      hostListOCC: ["sl55vmanapp004", "sl55vmanapp005", "sl55vmanapp006", "sl55vmanapp007", "sl55vmanapp008", "sl55vmanapp001", "sl55vmanapp002", "sl55vmanapp003"],
      hostListOCE: []
    },
    {
      component: 'VXOCONSUMER',
      hostListOCC: ["sl55xoconapp001", "sl55xoconapp002", "sl55commapp010", "sl55commapp011", "sl55commapp012"],
      hostListOCE: []
    },
    {
      component: 'wallet-services-web',
      hostListOCC: ["sl55walapp005", "sl55walapp006", "sl55walapp007", "sl55walapp008", "sl55walapp001", "sl55walapp002", "sl55walapp003", "sl55walapp004"],
      hostListOCE: []
    },
    {
      component: 'Batch Admin',
      hostListOCC: [],
      hostListOCE: ["sl73cbpapp003", "sl73cbpapp004", "sl73cbpapp019", "sl73cbpapp020"]
    },
    {
      component: 'Batch Scheduler',
      hostListOCC: [],
      hostListOCE: ["sl73cbpapp003", "sl73cbpapp004", "sl73cbpapp019", "sl73cbpapp020"]
    },
    {
      component: 'CBP webserver',
      hostListOCC: [],
      hostListOCE: ["sl73cbpwbp001", "sl73cbpwbp002", "sl73cbpwbp009", "sl73cbpwbp010", "sl73commwbp033", "sl73commwbp034"]
    },
  ]
}

const VXO = {
  apiList:[
    "POST-/arm/wallet-services-web/pi/account/-accountID/paymentinstrument",
    "PUT-/arm/wallet-services-web/pi/account/-accountID/paymentinstrument/-piID",
    "DELETE-/arm/wallet-services-web/pi/account/-accountID/paymentinstrument/-piID",
    "PUT-/arm/wallet-services-web/payment/info/-infoID",
    "GET-/arm/wallet-services-web/payment/data/-dataID",
    "POST-/wallet-services-web/pi/account/-accountID/paymentinstrument",
    "PUT-/wallet-services-web/pi/account/-accountID/paymentinstrument/-piID",
    "DELETE-/wallet-services-web/pi/account/-accountID/paymentinstrument/-piID",
    "PUT-/wallet-services-web/payment/info/-infoID",
    "GET-/wallet-services-web/payment/data/-dataID"
  ],
  componentList: [{
    component: 'arm',
    hostListOCC: ["sl55armapp010", "sl55armapp011", "sl55armapp012", "sl55armapp013", "sl55armapp014", "sl55armapp015", "sl55armapp016", "sl55armapp017", "sl55armapp001", "sl55armapp002", "sl55armapp003", "sl55armapp005", "sl55armapp006", "sl55armapp007", "sl55armapp008", "sl55armapp009"],
    hostListOCE: ["sl73armapp001", "sl73armapp002", "sl73armapp003", "sl73armapp004", "sl73armapp005", "sl73armapp006", "sl73armapp007", "sl73armapp008", "sl73armapp009", "sl73armapp010", "sl73armapp011", "sl73armapp012", "sl73commapp098", "sl73commapp099", "sl73commapp127", "sl73commapp128",
      "sl73commapp184", "sl73commapp185", "sl73commapp201", "sl73commapp202", "sl73commapp203", "sl73commapp204"]
  },
    {
      component: 'cbp-web',
      hostListOCC: ["sl55cbppapp014", "sl55cbppapp015", "sl55cbppapp016", "sl55cbppapp017", "sl55cbppapp018", "sl55cbppapp019", "sl55cbppapp020", "sl55cbppapp021", "sl55cbppapp022", "sl55platfapp001", "sl55platfapp002", "sl55platfapp003", "sl55cbppapp001", "sl55cbppapp003", "sl55cbppapp004", "sl55cbppapp005", "sl55cbppapp006", "sl55cbppapp007", "sl55cbppapp008", "sl55cbppapp009", "sl55cbppapp010", "sl55cbppapp011", "sl55cbppapp012", "sl55cbppapp013"],
      hostListOCE: ["sl73cbpapp007", "sl73cbpapp008", "sl73cbpapp023", "sl73cbpapp024", "sl73cbppapp001", "sl73cbppapp002", "sl73cbppapp003", "sl73cbppapp004", "sl73cbppapp005", "sl73cbppapp006", "sl73cbppapp007", "sl73cbppapp008", "sl73cbppapp009", "sl73cbppapp010", "sl73cbppapp011", "sl73cbppapp012", "sl73cbppapp013", "sl73cbppapp015"]
    },
    {
      component: 'cbp-nc-web',
      hostListOCC: ["sl55ncwebapp011", "sl55ncwebapp012", "sl55ncwebapp013", "sl55ncwebapp014", "sl55ncwebapp015", "sl55ncwebapp016", "sl55ncwebapp017", "sl55ncwebapp004", "sl55ncwebapp005", "sl55ncwebapp006", "sl55ncwebapp007", "sl55ncwebapp008", "sl55ncwebapp009", "sl55ncwebapp010"],
      hostListOCE: []
    },
    {
      component: 'checkout-widget',
      hostListOCC: ["sl55caspaapp004", "sl55caspaapp005", "sl55caspaapp001", "sl55caspaapp002", "sl55caspaapp003"],
      hostListOCE: ["sl73commapp118", "sl73commapp123", "sl73commapp129", "sl73commapp130", "sl73commapp205", "sl73commapp206", "sl73commapp197", "sl73commapp198", "sl73commapp199", "sl73commapp200"]
    },
    {
      component: 'consumer-controller',
      hostListOCC: ["sl55commapp006", "sl55commapp004", "sl55commapp005"],
      hostListOCE: ["sl73commapp275", "sl73commapp276", "sl73commapp277"]
    },
    {
      component: 'vimcom',
      hostListOCC: ["sl55authsapp003", "sl55authsapp001", "sl55authsapp002"],
      hostListOCE: ["sl73cbpapp005", "sl73cbpapp006", "sl73cbpapp021", "sl73cbpapp022"]
    },
    {
      component: 'dcs-rest',
      hostListOCC: ["sl55cbpapp004", "sl55cbpapp005", "sl55cbpapp006", "sl55cbpapp007", "sl55dcsapp004", "sl55dcsapp005", "sl55dcsapp006", "sl55cbpapp001", "sl55cbpapp002", "sl55cbpapp003", "sl55dcsapp001", "sl55dcsapp002", "sl55dcsapp003"],
      hostListOCE: ["SM730MAGHSMP09", "SM730MAGHSMP10", "SM730MAGHSMP11", "SM730MAGHSMP12", "sl73dcsapp001", "sl73dcsapp002", "sl73dcsapp003", "sl73dcsapp004", "sl73dcsapp005", "sl73dcsapp006"]
    },
    {
      component: 'ddtservices',
      hostListOCC: ["sl55ddtapp007", "sl55ddtapp008", "sl55ddtapp009", "sl55ddtapp010", "sl55ddtapp001", "sl55ddtapp002", "sl55ddtapp003", "sl55ddtapp004", "sl55ddtapp005", "sl55ddtapp006"],
      hostListOCE: ["sl73cbpapp001", "sl73cbpapp002", "sl73cbpapp017", "sl73cbpapp018", "sl73ddtapp001", "sl73ddtapp002"]
    },
    {
      component: 'dfmservices',
      hostListOCC: ["sl55srvsapp007", "sl55srvsapp008", "sl55srvsapp009", "sl55srvsapp010", "sl55srvsapp011", "sl55srvsapp012", "sl55srvsapp001", "sl55srvsapp002", "sl55srvsapp003", "sl55srvsapp004", "sl55srvsapp005", "sl55srvsapp006"],
      hostListOCE: ["sl73commapp124", "sl73commapp125", "sl73commapp131", "sl73commapp132", "sl73commapp186", "sl73commapp187", "sl73commapp188", "sl73commapp189", , "sl73commapp190", "sl73commapp191",
        "sl73commapp174", "sl73commapp175", "sl73commapp207", "sl73commapp208", "sl73commapp209", "sl73commapp211", "sl73commapp212", "sl73commapp213"
        , "sl73commapp214", "sl73commapp215", "sl73commapp208", "sl73commapp156", "sl73commapp165", "sl73commapp236", "sl73commapp237", "sl73commapp238"
        , "sl73commapp239", "sl73commapp240", "sl73commapp254", "sl73commapp241"]
    },
    {
      component: 'dfm-admin',
      hostListOCC: ["sl55adminapp004", "sl55adminapp005", "sl55adminapp001", "sl55adminapp002", "sl55adminapp003"],
      hostListOCE: ["sl73commapp155", "sl73commapp164"]
    },
    {
      component: 'cardvalidation',
      hostListOCC: ["sl55dfmcvapp004", "sl55dfmcvapp005", "sl55dfmcvapp006", "sl55dfmcvapp001", "sl55dfmcvapp002", "sl55dfmcvapp003"],
      hostListOCE: ["sl73dfmcvapp001", "sl73dfmcvapp002", "sl73dfmcvapp003", "sl73dfmcvapp004", "sl73dfmcvapp005", "sl73dfmcvapp006"]
    },
    {
      component: 'issuer-controller',
      hostListOCC: ["sl55issrapp003", "sl55issrapp004", "sl55commapp007", "sl55commapp008", "sl55commapp009"],
      hostListOCE: ["sl73commapp278", "sl73commapp279", "sl73commapp280"]
    },
    {
      component: 'logging',
      hostListOCC: ["sl55logapp004", "sl55logapp005", "sl55logapp006", "sl55logapp007", "sl55logapp001", "sl55logapp002", "sl55logapp003"],
      hostListOCE: ["sl73commapp170", "sl73commapp171", "sl73commapp172", "sl73commapp173"]
    },
    {
      component: 'credentials-api',
      hostListOCC: ["sl55mcmapp004", "sl55mcmapp005", "sl55mcmapp001", "sl55mcmapp002", "sl55mcmapp003"],
      hostListOCE: ["sl73commapp114", "sl73commapp115", "sl73commapp143", "sl73commapp144", "sl73commapp218", "sl73commapp219"]
    },
    {
      component: 'merchant-api',
      hostListOCC: ["sl55apibeapp005", "sl55apibeapp006", "sl55apibeapp007", "sl55apibeapp001", "sl55apibeapp002", "sl55apibeapp003", "sl55apibeapp004"],
      hostListOCE: []
    },
    {
      component: 'merchant-api-internal',
      hostListOCC: ["sl55apimbapp005", "sl55apimbapp006", "sl55apimbapp007", "sl55apimbapp001", "sl55apimbapp002", "sl55apimbapp003", "sl55apimbapp004"],
      hostListOCE: ["sl73commapp149", "sl73commapp147", "sl73commapp148", "sl73commapp150"]
    },
    {
      component: 'metadata-Services',
      hostListOCC: ["sl55mtdtapp003", "sl55mtdtapp001", "sl55mtdtapp002"],
      hostListOCE: ["sl73mtdtapp001", "sl73mtdtapp002", "sl73mtdtapp003"]
    },
    {
      component: 'notification',
      hostListOCC: ["sl55pltnapp004", "sl55pltnapp005", "sl55pltnapp001", "sl55pltnapp002", "sl55pltnapp003"],
      hostListOCE: []
    },
    {
      component: 'notification-config',
      hostListOCC: ["sl55pltnapp004", "sl55pltnapp005", "sl55pltnapp001", "sl55pltnapp002", "sl55pltnapp003"],
      hostListOCE: []
    },
    {
      component: 'otp-api',
      hostListOCC: ["sl55otpapp003", "sl55otpapp004", "sl55otpapp005", "sl55otpapp001", "sl55otpapp002"],
      hostListOCE: ["sl73commapp157", "sl73commapp158", "sl73commapp166", "sl73commapp167"]
    },
    {
      component: 'rls',
      hostListOCC: ["sl55rlsapp007", "sl55rlsapp008", "sl55rlsapp009", "sl55rlsapp010", "sl55rlsapp011", "sl55rlsapp012", "sl55rlsapp001", "sl55rlsapp002", "sl55rlsapp003", "sl55rlsapp004", "sl55rlsapp005", "sl55rlsapp006"],
      hostListOCE: []
    },
    {
      component: 'self-service',
      hostListOCC: ["sl55ssmfeapp004", "sl55ssmfeapp005", "sl55ssmfeapp006", "sl55ssmfeapp007", "sl55ssmfeapp001", "sl55ssmfeapp002", "sl55ssmfeapp003"],
      hostListOCE: ["sl73commapp108", "sl73commapp109", "sl73commapp137", "sl73commapp138"]
    },
    {
      component: 'support-tool',
      hostListOCC: ["sl55stmfeapp003", "sl55stmfeapp001", "sl55stmfeapp002"],
      hostListOCE: ["sl73commapp110", "sl73commapp111", "sl73commapp139", "sl73commapp140"]
    },
    {
      component: 'vmeservices',
      hostListOCC: ["sl55vmanapp004", "sl55vmanapp005", "sl55vmanapp006", "sl55vmanapp007", "sl55vmanapp008", "sl55vmanapp001", "sl55vmanapp002", "sl55vmanapp003"],
      hostListOCE: ["sl73commapp003", "sl73commapp004", "sl73commapp030", "sl73commapp031", "sl73commapp039", "sl73commapp040", "sl73commapp176", "sl73commapp177",
        "sl73commapp178", "sl73commapp179", "sl73commapp180", "sl73commapp181", "sl73commapp182", "sl73commapp183", "sl73commapp220", "sl73commapp221", "sl73commapp222", "sl73commapp223", "sl73commapp224",
        "sl73commapp225", "sl73commapp226", "sl73commapp227"]
    },
    {
      component: 'VXOCONSUMER',
      hostListOCC: ["sl55xoconapp001", "sl55xoconapp002", "sl55commapp010", "sl55commapp011", "sl55commapp012"],
      hostListOCE: []
    },
    {
      component: 'wallet-services-web',
      hostListOCC: ["sl55walapp005", "sl55walapp006", "sl55walapp007", "sl55walapp008", "sl55walapp001", "sl55walapp002", "sl55walapp003", "sl55walapp004"],
      hostListOCE: ["sl73vwsapp001", "sl73vwsapp002", "sl73vwsapp003", "sl73vwsapp004", "sl73vwsapp005", "sl73vwsapp006", "sl73vwsapp007", "sl73vwsapp008", "sl73vwsapp009", "sl73vwsapp010", "sl73vwsapp011",
        "sl73vwsapp012", "sl73vwsapp013", "sl73vwsapp014", "sl73vwsapp015", "sl73vwsapp016", "sl73vwsapp017", "sl73vwsapp018", "sl73vwsapp019", "sl73vwsapp020"]
    },
    {
      component: 'Batch Admin',
      hostListOCC: [],
      hostListOCE: ["sl73cbpapp003", "sl73cbpapp004", "sl73cbpapp019", "sl73cbpapp020"]
    },
    {
      component: 'Batch Scheduler',
      hostListOCC: [],
      hostListOCE: ["sl73cbpapp003", "sl73cbpapp004", "sl73cbpapp019", "sl73cbpapp020"]
    },
    {
      component: 'CBP webserver',
      hostListOCC: [],
      hostListOCE: ["sl73cbpwbp001", "sl73cbpwbp002", "sl73cbpwbp009", "sl73cbpwbp010", "sl73commwbp033", "sl73commwbp034"]
    },
    {
      component: 'dfmbatchservices',
      hostListOCC: [],
      hostListOCE: ["sl73commapp161", "sl73commapp162", "sl73commapp163", "sl73commapp154"]
    },
    {
      component: 'filemanage',
      hostListOCC: [],
      hostListOCE: ["sl73fmgrapp002", "sl73fmgrapp005", "sl73fmgrapp006"]
    },
    {
      component: 'vhistory-web',
      hostListOCC: [],
      hostListOCE: ["sl73dmvhsapp001", "sl73dmvhsapp002", "sl73dmvhsapp003"]
    },

  ]
}

module.exports = {
  VTS,
  VXO
};
