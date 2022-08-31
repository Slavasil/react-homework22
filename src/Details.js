import { useEffect, useState } from "react";

function Details(props) {
  const {info} = props;
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`)
      .then(async (response) => {
        if (response.ok) {
          setDetails(await response.json());
        }
      }, (error) => {
        console.error(error);
        setDetails(false);
      });
  }, [info.id]);
  return (
    <div className="details">
      {details != null ?
        details != false ?
          <>
            <img src={details.avatar} alt="avatar picture"/>
            <span><strong>{details.name}</strong></span>
            <div><strong>City:</strong> {details.details.city}</div>
            <div><strong>Company:</strong> {details.details.company}</div>
            <div><strong>Position:</strong> {details.details.position}</div>
          </>
          : "Error"
        : "Loading..."}
    </div>
  );
}

export default Details;