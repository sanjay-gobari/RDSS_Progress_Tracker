// src/allImports.js

export const MaterialType = [
    "Cable/Conductor",
    "Pole",
    "VCB"
];

export const ActivityListCableConductor = [
    "Replacement of 33 KV Old /Frayed Conductor 33KV Line",
    "Re-conductoring/Augmentation of 11 KV line on Existing Pole",
    "Re-conductoring of bare LT Line with LT AB cable in theft-prone areas",
    "Replacement of old/frayed LT AB cable with new LT AB cable",
    "Replacement of Old /Frayed Conductor 3Ph 4w"
];

export const CableConductorItems = [
    "33 KV line with Covered Dog Conductor",
    "33 KV line with ACSR Dog TO Dog Conductor",
    "11 KV line with Covered Rabbit Conductor",
    "11 KV line with ACSR Rabbit Conductor",
    "AB Cable 3x95 + 1x70 Sqmm",
    "AB Cable 3x25 + 1x25 Sqmm",
    "AB Cable 3x16 + 1x25 Sqmm",
    "3Ph 4w with ACSR Rabbit Conductor",
];

export const ActivityListVCB = [
    "Replacement of Old Aged VCBs (33KV)",
    "Replacement of Old Aged VCBs/OCB (11KV)",
];

export const VCBItems = [
    "33KV Incomer (SCADA Compatible)",
    "33KV Outgoing (SCADA Compatible)",
    "Replacement of 11KV Incomer complete with CTs of ratio 800/400/5A (SCADA Compatible)",
    "Replacement of 11KV Outgoing complete with CTs of ratio 400/200/5A (SCADA Compatible)"
];

export const ActivityListPole = ["Damaged Pole", "New Pole", "Double Pole"];

export const PoleItems = [
    "STP-55",
    "STP-33",
    "STP-23",
    "STP-21",
    "8.5 M PSCC poles",
    "DP - 33KV",
    "DP - 11KV"
];



export const Division = [
    "Pithoragarh",
    "Dharchula",
    "Champawat"
]
export const SubDivision = [
    "Pithoragarh",
    "Gangolihat",
    "Berinag",
    "Dharchula",
    "Didihat",
    "Champawat",
    "Lohaghat"
]
export const Substation = [
    "S/S 132/33/11 KV Pithoragarh",
    "S/S 33/11KV Bin",
    "S/S Kanthgaon",
    "S/S Chandak Bans"
]
export const Feeders = [
    "Towm-1",
    "Towm-2",
    "Towm-3",
    "Towm-4",
    "Ancholi",
    "Colony",
    "Satsiling",
    "Rai",
    "Wadda"
]

// Optional: Export all as default object
const ActivityData = {
    MaterialType,
    ActivityListCableConductor,
    CableConductorItems,
    ActivityListVCB,
    VCBItems,
    ActivityListPole,
    PoleItems,
    Division,
    SubDivision,
    Substation,
    Feeders
};

export default ActivityData;
