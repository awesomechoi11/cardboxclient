// drafts cardpack default
export const cardpackDraftsDefault = (data) => ({
    // shared fields
    version: {
        major: 0,
        minor: 0,
        patch: 0,
    },
    _id: data.cardpackId,
    author: data.userId,
    description: "",
    title: "",
    visibility: "public",
    tags: [],
    cards: [],
    dateCreated: new Date(),
    lastModified: new Date(),
    // draft only fields
    published: false,
    autosave: true,
});

// shared fields that gets overwritten when draft is published

export const CardpackSharedFields = [
    "version",
    // "_id", // these fields cant be "updated"
    // "author", // they are set with upsert
    "image",
    "description",
    "title",
    "visibility",
    "tags",
    "cards",
    "dateCreated",
    "lastModified",
];

// published only cardpack fields
export const CardpacksOnlyFields = {
    // published Only fields
    comments: [],
    requiresAuthentication: false,
    permanentlyRemoved: false,
    views: 0,
    saves: 0,
    shares: 0,
    duplicates: 0,
    likes: 0,
    funny: 0,
    helpful: 0,
    interesting: 0,
};

/**
     version: {
        major: 0,
        minor: 0,
        patch: 0,
    },
    _id: data.cardpackId,
    author: data.userId,
    published: false,
    autosave: true,
    requiresAuthentication: false,
    permanentlyRemoved: false,
    description: "",
    title: "",
    views: 0,
    saves: 0,
    shares: 0,
    duplicates: 0,
    likes: 0,
    funny: 0,
    helpful: 0,
    interesting: 0,
    visibility: "public",
    tags: [],
    comments: [],
    cards: [],
    dateCreated: new Date(),
    lastModified: new Date(),
 */
