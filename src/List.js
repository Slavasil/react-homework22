import { useState, useEffect } from 'react';

import Details from './Details.js';

function List() {
  const [list, setList] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [details, setDetails] = useState(null);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json').then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      } else {
        setLoadError(true);
      }
    }, (error) => {
      console.error(error);
      setLoadError(true);
    });
  }, []);
  
  function showUserDetails(id) {
    setDetails(list.find((u) => u.id == id));
  }
  let userList;
  if (list == null) {
    if (loadError) {
      userList = "Error";
    } else {
      userList = "Downloading";
    }
  } else {
    userList = <ul>
      {list.map((user)=>{
        return <li key={user.id} onClick={()=>{showUserDetails(user.id)}}>{user.name}</li>;
      })}
    </ul>;
  }
  return (
    <div className="list">
      {userList}
      {details != null ? <Details info={details}/> : null}
    </div>
  );
}

export default List;