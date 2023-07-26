enum Tokens {
    T_VAR, T_END, T_SCOPE, T_UPSCOPE,
    T_COMMENT, T_DATE, T_DUMPALL, T_DUMPOFF, T_DUMPON,
    T_DUMPVARS, T_ENDDEFINITIONS,
    T_DUMPPORTS, T_DUMPPORTSOFF, T_DUMPPORTSON, T_DUMPPORTSALL,
    T_TIMESCALE, T_VERSION, T_VCDCLOSE, T_TIMEZERO,
    T_EOF, T_STRING, T_UNKNOWN_KEY
}

const TokenKeywords = [
    "var", "end", "scope", "upscope",
    "comment", "date", "dumpall", "dumpoff", "dumpon",
    "dumpvars", "enddefinitions",
    "dumpports", "dumpportsoff", "dumpportson", "dumpportsall",
    "timescale", "version", "vcdclose", "timezero",
    "", "", ""
]


class VCDSymbol {
    name: string;
    id: string;
    value: string;

    constructor(name: string, id:string, value:string) {
        this.name = name;
        this.id = id;
        this.value = value;
    }
}

class VCDFile {

}

export default VCDFile
