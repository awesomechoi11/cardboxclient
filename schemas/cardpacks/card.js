import { object, string, addMethod, number, date, array, mixed } from "yup";
import { alphaNumId } from "../../components/utils";
import { ContentState } from "draft-js";
import { convertToRaw } from "draft-js";
import { convertFromRaw } from "draft-js";

// addMethod(object, 'contentHasText', function contentHasText(formats, parseStrict) {
//     return this.transform((value, originalValue, ctx) => {
//       if (ctx.isType(value)) return value;

//       value = Moment(originalValue, formats, parseStrict);

//       return value.isValid() ? value.toDate() : new Date('');
//     });
//   });

const cardFieldSchema = object({
    id: string()
        .required()
        .default(() => alphaNumId()),
    image: object({
        type: string().required(),
        value: mixed().required(),
    })
        .default(undefined)
        .nullable(),
    content: object().default(() =>
        convertToRaw(ContentState.createFromText(""))
    ),
}).test(
    "card Field Has At Least Image or Content",
    "All Cards need to have either an Image or Text for each side",
    function (value) {
        return convertFromRaw(value.content).hasText() || value.image;
    }
);

export const cardSchema = object({
    id: string()
        .required()
        .default(() => alphaNumId()),
    term: cardFieldSchema,
    definition: cardFieldSchema,
});

export const generateEmptyCard = (id) => ({
    id: id || alphaNumId(), // since duplicate cards can exist / also for ordering
    term: {
        id: alphaNumId(),
        image: undefined,
        content: ContentState.createFromText(""),
    },
    definition: {
        id: alphaNumId(),
        image: undefined,
        content: ContentState.createFromText(""),
    },
});

export const generateEmptyCardwithRawContent = (id) => ({
    id: id || alphaNumId(), // since duplicate cards can exist / also for ordering
    term: {
        id: alphaNumId(),
        image: undefined,
        content: convertToRaw(ContentState.createFromText("")),
    },
    definition: {
        id: alphaNumId(),
        image: undefined,
        content: convertToRaw(ContentState.createFromText("")),
    },
});

export const generateRandomCard = (id) => ({
    id: id || alphaNumId(), // since duplicate cards can exist / also for ordering
    term: {
        id: alphaNumId(),
        image: {
            value:
                Math.random() < 0.5
                    ? faker.image.animals(85, 76, true)
                    : undefined,
            type: "faker",
        },
        content: ContentState.createFromText(faker.vehicle.vehicle()),
    },
    definition: {
        id: alphaNumId(),
        image: {
            value:
                Math.random() < 0.5
                    ? faker.image.animals(85, 76, true)
                    : undefined,
            type: "faker",
        },
        content: ContentState.createFromText(faker.vehicle.vehicle()),
    },
});
