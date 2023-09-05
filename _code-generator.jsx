const fs = require('fs');

const HEADERS = [
  'Code*', // 0
  'Type [Flat|Percent]*', // 1
  'Value*', // 2
  'Quantity', // 3
  'Available From', // 4
  'Available To', // 5
  'Min. Tickets', // 6
  'Max. Tickets', // 7
  'Show Public Tickets', // 8
  'Show Secret Tickets', // 9
  'Source Code', // 10
  'Disable If Volume Pricing', // 11
  'Block Orders If Not Applicable', // 12
  'Description for Organizer', // 13
  'VIP Networking', // 14
  'General Attendee (Super Early Bird)', // 15
  'General Attendee (Early Bird)', // 16
  'General Attendee', // 17
  'General Attendee + GBA Day (Super Early Bird)', // 18
  'General Attendee + GBA Day (Early Bird)', // 19
  'General Attendee + GBA Day', // 20
  'Greater Bay Area (GBA) Day + Startup Kiosk', // 21
  'Greater Bay Area (GBA) Day', // 22
  'Startup Online (with virtual booth) (Super Early Bird)', // 23
  'Startup Online (with virtual booth) (Early Bird)', // 24
  'Startup Online (with virtual booth)', // 25
  'Startup Kiosk (+2 tickets) (Super Early Bird)', // 26
  'Startup Kiosk (+2 tickets) (Early Bird)', // 27
  'Startup Kiosk (+2 tickets)', // 28
  'Investor (Super Early Bird)', // 29
  'Investor (Early Bird)', // 30
  'Investor', // 31
  'Student (Super Early Bird)', // 32
  'Student (Early Bird)', // 33
  'Student', // 34
  'General Attendee (Online only) (Super Early Bird)', // 35
  'General Attendee (Online only) Early Bird', // 36
  'General Attendee (Online only)', // 37
];



const createAndWriteFile = (fileName, arr) => {
  const data = generateCSVCollection(arr);
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
};

const investor100 = [[13, 'Investors Ticket | 100 off'], [0, { prefix: 'INVESTORVIP-100' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '1'], [31, 'Y'], [5, '9/30/2023']];
const investorB1 = [[13, 'Investors Ticket | Buy 1 get 1 free'], [0, { prefix: 'INVESTORVIP-B1' }], [1, 'Percent'], [2, '50%'], [6, '2'], [7, '2'], [31, 'Y'], [5, '9/30/2023']];
const investor15 = [[13, 'Investors Ticket | 15% off'], [0, { prefix: 'INVESTORVIP-15' }], [1, 'Percent'], [2, '15%'], [7, '10'], [31, 'Y'], [5, '9/30/2023']];
const investor30 = [[13, 'Investors Ticket | 30% off'], [0, { prefix: 'INVESTORVIP-30' }], [1, 'Percent'], [2, '30%'], [7, '10'], [31, 'Y'], [5, '9/30/2023']];
const collection100 = new Array(50).fill(investor100);
const collectionB1 = new Array(50).fill(investorB1);
const collection15 = new Array(50).fill(investor15);
const collection30 = new Array(50).fill(investor30);
const combined = [...collection100, ...collectionB1, ...collection15, ...collection30];
createAndWriteFile('AHub Investors.csv', combined);

const supportingOrganisations = [
  [[13, 'Supporting Organisation | Blockchain at HKU'], [0, { code: 'HKU-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | Blockchain at HKU'], [0, { code: 'HKU-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | Consulate General of Czech Republic'], [0, { code: 'CCCR-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | Consulate General of Czech Republic'], [0, { code: 'CCCR-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | American Chamber in Hong Kong'], [0, { code: 'ACHK-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | American Chamber in Hong Kong'], [0, { code: 'ACHK-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | Italian Chamber of Commerce'], [0, { code: 'ICC-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | Italian Chamber of Commerce'], [0, { code: 'ICC-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | Kuwait Investment Office'], [0, { code: 'KUI-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '1'], [3, '1'], [17, 'Y']],
  [[13, 'Supporting Organisation | Particle X'], [0, { code: 'ParticleX-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | Particle X'], [0, { code: 'ParticleX-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | Private Wealth Management Association'], [0, { code: 'PWMA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | Private Wealth Management Association'], [0, { code: 'PWMA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | MexCham'], [0, { code: 'MexCham-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | MexCham'], [0, { code: 'MexCham-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Organisation | Zefinity'], [0, { code: 'Zefinity-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Organisation | Zefinity'], [0, { code: 'Zefinity-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Society of Registered Financial Planners'], [0, { code: 'SRFR-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Society of Registered Financial Planners'], [0, { code: 'SRFR-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Israel Trade'], [0, { code: 'IsraelTrade-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Israel Trade'], [0, { code: 'IsraelTrade-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Fintech Finance News'], [0, { code: 'FFNews-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Fintech Finance News'], [0, { code: 'FFNews-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Cyberport Startup Alumni Association'], [0, { code: 'CSSAA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Cyberport Startup Alumni Association'], [0, { code: 'CSSAA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Findexable'], [0, { code: 'FX-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Findexable'], [0, { code: 'FX-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | 9up.io'], [0, { code: '9UP-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | 9up.io'], [0, { code: '9UP-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Advic3'], [0, { code: 'Advic3-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Advic3'], [0, { code: 'Advic3-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Hong Kong Digital Asset society'], [0, { code: 'HKDAS-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Hong Kong Digital Asset society'], [0, { code: 'HKDAS-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Startup Grind'], [0, { code: 'STPG-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Startup Grind'], [0, { code: 'STPG-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | HK Investor Relations Associations'], [0, { code: 'HKIRA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | HK Investor Relations Associations'], [0, { code: 'HKIRA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | European Chamber of Commerce'], [0, { code: 'ECC-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | European Chamber of Commerce'], [0, { code: 'ECC-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | AI Lab Limited Hong Kong'], [0, { code: 'AILHK-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | AI Lab Limited Hong Kong'], [0, { code: 'AILHK-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Sri Lanka FinTech'], [0, { code: 'SLFT-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Sri Lanka FinTech'], [0, { code: 'SLFT-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Hong Kong Computer Society'], [0, { code: 'HKCS-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Hong Kong Computer Society'], [0, { code: 'HKCS-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Kickstart Innovation'], [0, { code: 'KSI-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Kickstart Innovation'], [0, { code: 'KSI-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Ambuli International'], [0, { code: 'AmbINT-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Ambuli International'], [0, { code: 'AmbINT-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | GDA Capital'], [0, { code: 'GDAC-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | GDA Capital'], [0, { code: 'GDAC-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Web 3 Women'], [0, { code: 'W3W-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Web 3 Women'], [0, { code: 'W3W-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | The Executive Centre'], [0, { code: 'TEC-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | The Executive Centre'], [0, { code: 'TEC-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | E Financial Careers'], [0, { code: 'EFC-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | E Financial Careers'], [0, { code: 'EFC-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Finnish Chamber of Commerce'], [0, { code: 'FCCHK-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Finnish Chamber of Commerce'], [0, { code: 'FCCHK-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Hong Kong General Chamber of Commerce'], [0, { code: 'HKGCC-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Hong Kong General Chamber of Commerce'], [0, { code: 'HKGCC-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Indonesian Chamber of Commerce'], [0, { code: 'ICCHK-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Indonesian Chamber of Commerce'], [0, { code: 'ICCHK-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Lite Lab Hong Kong University'], [0, { code: 'LLHKU-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Lite Lab Hong Kong University'], [0, { code: 'LLHKU-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Chartered Accountants Australia'], [0, { code: 'CAA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Chartered Accountants Australia'], [0, { code: 'CAA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Asia Crypto Alliance'], [0, { code: 'ACA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Asia Crypto Alliance'], [0, { code: 'ACA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Stash Away'], [0, { code: 'SA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Stash Away'], [0, { code: 'SA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | HK Court of Final Appeal'], [0, { code: 'HKCFA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | HK Court of Final Appeal'], [0, { code: 'HKCFA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Apsa Asia'], [0, { code: 'APSAA-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | Apsa Asia'], [0, { code: 'APSAA-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | CFA Society'], [0, { code: 'CFAS-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | CFA Society'], [0, { code: 'CFAS-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | New Zealand Chamber of Commerce'], [0, { code: 'NZCCHK-DISCOUNT' }], [1, 'Percent'], [2, '15%'], [6, '1'], [7, '2'], [3, '50'], [17, 'Y']],
  [[13, 'Supporting Ogranisation | New Zealand Chamber of Commerce'], [0, { code: 'NZCCHK-ATTENDEE' }], [1, 'Percent'], [2, '100%'], [6, '1'], [7, '2'], [3, '2'], [17, 'Y']],
];
createAndWriteFile('Supporting Organisations.csv', supportingOrganisations);

const GSC = [
  [[13, 'GSC Partner | GSC Partner'], [0, { prefix: 'GSC-partner', suffix: 'virtual' }], [1, 'Percent'], [2, '100%'], [3, '200'], [7, '1'], [37, 'Y']],
  [[13, 'GSC Berlin Partner | German Accelerator '], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC London Venue Partner | Runway East'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Tel Aviv Venue Partner | EBN'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Toronto Venue Partner | GDA Capital'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Paris Venue Partner | AXA'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangalore Venue Partner | ISF'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangalore Venue Partner | ISF'], [0, { prefix: 'GSC-partner', suffix: '15' }], [1, 'Percent'], [2, '15%'], [3, '10'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangkok Venue Partner | Beacon Ventures'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '5'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Dubai Venue Partner | DWTC'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Singapore Venue Partner'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Shenzhen Venue Partner'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC New York Venue Partner'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Hong Kong Venue Partner'], [0, { prefix: 'GSC-partner' }], [1, 'Percent'], [2, '100%'], [3, '2'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Berlin | Mali Baum'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Berlin | Graeme du Plessis'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Berlin | Miguel Encarnacion'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC London | Jeff Tijssen'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC London | Kieran Parker-Moroney'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC London | Alex Medana'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC London | Philia Chim'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Tel Aviv | Lior Oren'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Tel Aviv | Shmuel Ben-Tovim'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Tel Aviv | Meital Raviv '], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Tel Aviv | Danielle Ardon Baratz'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Toronto | Christopher Chen'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Toronto | Jeffery Potvin'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Toronto | Gaurav Bansal'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Toronto | Jonah Mirsky'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Paris | Frank Desvignes'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Paris | Pierre Husson'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Paris | Charlie Perreau'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Paris | Carla Puel'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangalore | Amit Goel'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangalore | Priyank Garg'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangkok | Wanwares Boonkong'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangkok | Korn Chatikavanij'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangkok | Pawoot Pongvitayapanu'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Bangkok | Amarit Charoenphan'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Dubai | Amar Fahmy'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Dubai'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Dubai'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Dubai'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Shenzhen'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Shenzhen'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Shenzhen'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Shenzhen'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC New York'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC New York'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC New York'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC New York'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Singapore'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Singapore'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Singapore'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Singapore'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Hong Kong'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Hong Kong'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Hong Kong'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Hong Kong'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Hong Kong'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Virtual'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Virtual'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Virtual'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Virtual'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Virtual'], [0, { prefix: 'GSC-judge' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [17, 'Y']],
  [[13, 'GSC Berlin Winner | Timeless Investments'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC London Winner | Oxford Risk'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Tel Aviv Winner | HBH'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Toronto Winner | Houdini Swap'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Paris Winner | Libertify'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Bangalore Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Bangkok Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Shenzhen Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC New York Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Dubai Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Singapore Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Hong Kong Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Virtual Winner'], [0, { prefix: 'GSC-winner' }], [1, 'Percent'], [2, '100%'], [3, '1'], [7, '1'], [28, 'Y']],
  [[13, 'GSC Semi-Finalist'], [0, { prefix: 'GSC-semi', suffix: 'startup' }], [1, 'Percent'], [2, '100%'], [3, '100'], [7, '1'], [25, 'Y']],
  [[13, 'GSC Semi-Finalist'], [0, { prefix: 'GSC-semi' }], [1, 'Percent'], [2, '100%'], [3, '100'], [7, '1'], [37, 'Y']],
  [[13, 'GSC Semi-Final Attendee'], [0, { prefix: 'GSC-semi', suffix: 'attendee' }], [1, 'Percent'], [2, '100%'], [3, '600'], [7, '1'], [37, 'Y']],
];
createAndWriteFile('GSC.csv', GSC);
