// src/types/CovidDataTypes.ts

export interface Summary {
    total: number;
    confirmedCasesIndian: number;
    confirmedCasesForeign: number;
    discharged: number;
    deaths: number;
    confirmedButLocationUnidentified: number;
  }
  
  export interface UnofficialSummary {
    source: string; // Source of the data
    total: number;  // Total cases
    recovered: number; // Total recovered cases
    deaths: number; // Total deaths
    active: number; // Active cases
  }
  
  export interface RegionalData {
    loc: string;  // Location name (state)
    confirmedCasesIndian: number;
    confirmedCasesForeign: number;
    discharged: number;
    deaths: number;
    totalConfirmed: number;
  }
  
  export interface CovidData {
    success: boolean;
    data: {
      summary: Summary;
      "unofficial-summary": UnofficialSummary[]; // Update to match API response
      regional: RegionalData[];
    };
    lastRefreshed: string;
    lastOriginUpdate: string;
  }
  
  