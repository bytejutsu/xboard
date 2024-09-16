import React from "react";
import dataJson from "@assets/svg/autodraw.json";
const API_ENDPOINT =
  "https://inputtools.google.com/request?ime=handwriting&app=autodraw&dbg=1&cs=1&oe=UTF-8";

function AutoDrawHandler({ canvas }, ref) {
  const [loading, setLoading] = React.useState(false);
  const [listShape, setListShape] = React.useState([]);

  const handleFetch = async (shapes) => {
    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          input_type: 0,
          requests: [
            {
              language: "autodraw",
              writing_guide: {
                width: 1000,
                height: 1000,
              },
              ink: shapes,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }).then((res) => res.json());

      let results = JSON.parse(
        res[1][0][3].debug_info.match(/SCORESINKS: (.*) Service_Recognize:/)[1]
      ).map((result) => {
        return {
          name: result[0],
          icons: (dataJson[result[0]] || []).map(
            (collection) => collection.src
          ),
        };
      });
      console.log("results", results);
    } catch (err) {
      console.log("FETCH SHAPE ERR", err);
    }
  };
  React.useImperativeHandle(ref, () => ({
    getNewShape: handleFetch,
  }));
  return <div className="shape-sugesstion__container"></div>;
}

export default React.forwardRef(AutoDrawHandler);
