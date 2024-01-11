interface ConstituentText {
    molecularWeight?: string;
    concentration?: string;
    proportion?: string;
}

interface Constituent {
    molecularWeight: number;
    concentration: number;
    proportion: number;
    volume: number;
}

interface LipidText {
    concentration?: string;
    volume?: string;
}

interface Lipid {
    concentration: number;
    volume: number;
}
