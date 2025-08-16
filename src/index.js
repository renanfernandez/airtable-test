import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";

function App() {
  const layerColors = [
    "#4F46E5",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EF4444",
    "#14B8A6",
    "#F97316",
    "#84CC16",
  ];

  const getDateRange = (items) => {
    const dates = items.flatMap((item) => [item.start, item.end]);
    const range = {
      start: Math.min(...dates.map((stringDate) => Date.parse(stringDate))),
      end: Math.max(...dates.map((stringDate) => Date.parse(stringDate))),
    };

    return range;
  };

  const rangeTimeline = getDateRange(timelineItems);

  const getPosition = (item, range) => {
    const timelineLimit = range.end - range.start;
    const itemStart = Date.parse(item.start) - range.start;
    const itemEnd = Date.parse(item.end) - Date.parse(item.start);
    const itemPosition = {
      left: (itemStart / timelineLimit) * (timelineItems.length * 200),
      width: (itemEnd / timelineLimit) * (timelineItems.length * 200),
    };

    return itemPosition;
  };

  return (
    <div>
      <h2>Good luck with your assignment! {"\u2728"}</h2>
      <h3>{timelineItems.length} timeline items to render</h3>

      <div className="timeline">
       
        <div
          className="timeline-wrapper"
          style={{ width: timelineItems.length * 200 + "px" }}
        >
          {(() => {
            let layer = 0;

            return timelineItems.map((timelineItem, index) => {
              const position = getPosition(timelineItem, rangeTimeline);
              const prevItemEnd = index > 0 ? timelineItems[index - 1].end : 0;

              if (timelineItem.start < prevItemEnd) {
                layer += 1;
              } else {
                layer = Math.max(0, layer - 1);
              }

              return (
                <div
                  className={"timeline-item layer-" + layer}
                  key={timelineItem.id}
                  style={{
                    left: position.left,
                    top: layer * 30 + "px",
                    zIndex: Math.max(timelineItems.length - index, 0),
                    width: position.width + "px",
                  }}
                >
                  <div
                    className="timeline-item__range"
                    style={{ backgroundColor: layerColors[layer] }}
                  ></div>
                  <div
                    className="timeline-item__description"
                  >
                    <p>{timelineItem.name}</p>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
