import csvToJson from "convert-csv-to-json";

export function toJson(csvFile) {
  return csvToJson
    .fieldDelimiter(",")
    .formatValueByType()
    .getJsonFromCsv(csvFile);
}

const moduleExports = { toJson };

export default moduleExports;
