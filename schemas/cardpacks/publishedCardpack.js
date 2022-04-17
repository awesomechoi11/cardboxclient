import { object, string, number, date, array } from "yup";
import { cardSchema } from "./card";

export const cardpackSchema = object({
    version: object({
        major: number().required(),
        minor: number().required(),
        patch: number().required(),
    }),
    description: string().max(
        254,
        "Length of description has to be less than 254 characters."
    ),
    title: string().required().default("Untitled"),
    visibility: string().required().default("public"),
    tags: array(
        string()
            .min(4, "Each tag has to be greater than 4 characters")
            .max(64, "Each tag has to be less than 64 characters")
            .trim()
    )
        .required()
        .min(1, "At least 1 tag is required")
        .max(8, "At most 8 tags is allowed"),
    cards: array(cardSchema)
        .min(2, "At least 2 cards are required")
        .required()
        .default([]),
    dateCreated: date().default(() => new Date()),
    lastModified: date().default(() => new Date()),
});
