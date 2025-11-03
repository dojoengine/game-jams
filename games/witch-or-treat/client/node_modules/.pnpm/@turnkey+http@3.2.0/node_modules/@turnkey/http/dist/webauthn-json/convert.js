'use strict';

// We export these values in order so that they can be used to deduplicate
// schema definitions in minified JS code.
// TODO: Parcel isn't deduplicating these values.
const copyValue = "copy";
const convertValue = "convert";
function convert(conversionFn, schema, input) {
    if (schema === copyValue) {
        return input;
    }
    if (schema === convertValue) {
        return conversionFn(input);
    }
    if (schema instanceof Array) {
        return input.map((v) => convert(conversionFn, schema[0], v));
    }
    if (schema instanceof Object) {
        const output = {};
        for (const [key, schemaField] of Object.entries(schema)) {
            if (schemaField.derive) {
                const v = schemaField.derive(input);
                if (v !== undefined) {
                    input[key] = v;
                }
            }
            if (!(key in input)) {
                if (schemaField.required) {
                    throw new Error(`Missing key: ${key}`);
                }
                continue;
            }
            // Fields can be null (rather than missing or `undefined`), e.g. the
            // `userHandle` field of the `AuthenticatorAssertionResponse`:
            // https://www.w3.org/TR/webauthn/#iface-authenticatorassertionresponse
            if (input[key] == null) {
                output[key] = null;
                continue;
            }
            output[key] = convert(conversionFn, schemaField.schema, input[key]);
        }
        return output;
    }
}
function derived(schema, derive) {
    return {
        required: true,
        schema,
        derive,
    };
}
function required(schema) {
    return {
        required: true,
        schema,
    };
}
function optional(schema) {
    return {
        required: false,
        schema,
    };
}

exports.convert = convert;
exports.convertValue = convertValue;
exports.copyValue = copyValue;
exports.derived = derived;
exports.optional = optional;
exports.required = required;
//# sourceMappingURL=convert.js.map
