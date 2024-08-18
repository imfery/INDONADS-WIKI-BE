/* eslint-disable no-param-reassign */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, and any path that has private: true
 *  - replaces _id with id
 *  - optionally removes or includes specified fields based on options
 */

const deleteAtPath = (obj, path, index) => {
    if (index === path.length - 1) {
        delete obj[path[index]];
        return;
    }
    deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema, options = {}) => {
    const { transformations = [], showHiddenField = {} } = options;

    let existingTransform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        existingTransform = schema.options.toJSON.transform;
    }

    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc, ret, opts) {
            Object.keys(schema.paths).forEach((path) => {
                if (schema.paths[path].options && schema.paths[path].options.private) {
                    deleteAtPath(ret, path.split('.'), 0);
                }
            });

            ret.id = ret._id.toString();

            // Apply transformations
            transformations.forEach(({ fieldKey, transformFn }) => {
                if (fieldKey && transformFn && ret[fieldKey] !== undefined) {
                    ret[fieldKey] = transformFn(ret[fieldKey]);
                }
            });

            // Conditionally include hidden fields
            if (!showHiddenField.createdAt) {
                delete ret.createdAt;
            }
            if (!showHiddenField.updatedAt) {
                delete ret.updatedAt;
            }

            delete ret._id;
            delete ret.__v;

            if (existingTransform) {
                return existingTransform(doc, ret, opts);
            }
            return ret;
        },
    });
};

module.exports = toJSON;
