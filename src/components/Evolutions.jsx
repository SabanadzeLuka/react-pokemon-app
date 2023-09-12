import axios from "axios";
import React, { useEffect, useState } from "react";

function Evolutions({ evolutions }) {
  const [parentEvo, setParentEvo] = useState("");
  const [childrenEvo, setChildrenEvo] = useState([]);
  const [grandChildrenEvo, setGrandChildrenEvo] = useState([]);

  useEffect(() => {
    setParentEvo(evolutions.chain.species.name);

    // Map children names
    const childrenListing = evolutions.chain.evolves_to.map(
      (children) => children.species.name
    );
    setChildrenEvo(childrenListing);

    // Map grand-children names
    const grandChildrenListing = evolutions.chain.evolves_to.flatMap(
      (children) =>
        children.evolves_to.map((grandChildren) => grandChildren.species.name)
    );
    setGrandChildrenEvo(grandChildrenListing);
  }, [evolutions.chain.species.name]);

  console.log(parentEvo);
  console.log(childrenEvo);
  console.log(grandChildrenEvo);

  return (
    <div>
      <div>Parent Evolution: {parentEvo}</div>
      <div>Children Evolutions: {childrenEvo.join(", ")}</div>
      <div>Grandchildren Evolutions: {grandChildrenEvo.join(", ")}</div>
    </div>
  );
}

export default Evolutions;
