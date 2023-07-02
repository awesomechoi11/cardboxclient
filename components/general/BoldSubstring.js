import React from "react";

function BoldSubstring({ mainString, subString }) {
  let subStrings = subString.split(" ").map((word) => word.trim());

  // Escape special characters in each substring
  let escapedSubStrings = subStrings.map(
    (substr) => substr.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&") // $& means the whole matched string
  );

  // Create a combined regular expression from all substrings, case insensitive
  let pattern = new RegExp(`(${escapedSubStrings.join("|")})`, "gi");

  // Replace matched substrings with a special token
  let interimString = mainString.replace(pattern, "##_MATCH_##$1##_MATCH_##");

  // Split the main string by the special token
  let stringParts = interimString.split("##_MATCH_##");

  // Generate final result
  let result = stringParts.map((part, index) =>
    index % 2 === 0 ? (
      <span key={index}>{part}</span>
    ) : (
      <span key={index} className="font-bold">
        {part}
      </span>
    )
  );

  return <>{result}</>;
}

export default BoldSubstring;
