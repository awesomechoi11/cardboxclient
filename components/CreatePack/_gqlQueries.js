import { gql } from "@apollo/client";

export const GET_CARDPACK_WITH_USERID_CARDPACKID = gql`
    query MyCardpack($cardPackId: String, $userId: String) {
        cardpack(query: { _id: $cardPackId, author: $userId }) {
            _id
            author
            autosave
            commentsSummary {
                reviewCount
            }
            description
            lastModified
            link
            tags
            permanentlyRemoved
            published
            requiresAuthentication
            title
            visibility
            __typename
        }
    }
`;
