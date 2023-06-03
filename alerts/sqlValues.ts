/**
 * Formats and composes the VALUES () for the INSERT INTO query for the database. Returns a sting 
 * of formatted values. It will account for single quotation mark and double it to avoid insertion
 *  errors, the values will be wrapped with a single quotation mark for text or $html$ for html content,
 *  values will be separated by commas and enclosed in parentheses for each row of values, a comma
 *  will separate each row of values and will be removed from the last row of values
 * @tutorial example:
 *  "(1,'value2',$html$<p>value3</p>$html$),(2,'value5',$html$<p>value6</p>$html$)"
 * @function
 * @param {any[]} valuesArray Array of arrays of values to be inserted into the database
 * @returns SQL formatted string of values
 * @example
 * // returns "(1,'value2',$html$<p>value3</p>$html$),(2,'value5',$html$<p>value6</p>$html$)"
 * sqlValues([[1,'value2','<p>value3</p>'],[2,'value5','<p>value6</p>']])
 * 
 */

const sqlValues = (valuesArray: any[] = []): string => {
  
  // if valuesArray is empty return empty string
  if (!valuesArray.length) return "";
  
  // if valuesArray is not an array return empty string
  if (!Array.isArray(valuesArray)) return "";
  
  // if valuesArray is an array of arrays of values return formatted string of values
  const values = `${valuesArray
    .map(
      (message: string[], message_idx: number) =>
        "(" +
        message
          .map(
            (item: any, item_idx: number) =>
              `${
                Number.isInteger(item)
                  ? item
                  : /<[^>]*>/.test(item)
                  ? `${/<[^>]*>/.test(item) ? `$html$` : `'`}` + item + `${/<[^>]*>/.test(item) ? `$html$` : `'`}`
                  : item == null || item == "undefined"
                  ? `NULL`
                  : "'" + item.replace(/'/g, "''") + "'"
              }${message.length - 1 === item_idx ? "" : ","}`
          )
          .join("") +
        ")" +
        `${valuesArray.length - 1 === message_idx ? "" : ","}`
    )
    .join("")}`;
  
  
  return values;
};

export default sqlValues;