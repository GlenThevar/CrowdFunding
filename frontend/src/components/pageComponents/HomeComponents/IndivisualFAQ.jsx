import React, { useEffect, useState } from "react";

import Accordian from "./Accordian";

const IndivisualFAQ = ({ campaign }) => {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    if (campaign && campaign.faq) {
      setFaq(campaign.faq);
    } else {
      setFaq([]);
    }
  }, [campaign]);

  return (
    <div>
      {faq.length === 0 ? (
        <div>
          <p className="font-heading text-xs italic text-gray-500">
            Looks like there aren't any frequently asked questions yet. Ask the
            project creator directly.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {faq.map((item, index) => (
            <Accordian
              key={item._id || index}
              question={item.Question}
              answer={item.Answer}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IndivisualFAQ;
