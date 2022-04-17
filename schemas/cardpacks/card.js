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
    content: object()
        .test(
            "cardFieldContentHasText",
            "All Cards need to have text",
            function (value) {
                return convertFromRaw(value).hasText();
            }
        )
        .default(() => convertToRaw(ContentState.createFromText("")))
        .required(),
});

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
