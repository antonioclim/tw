import React, { useEffect, useState } from 'https://esm.sh/react@18.3.1';
import { Link } from 'https://esm.sh/react-router-dom@6.26.2';

export default function Courses(){
  const [data,setData] = useState([]);
  const [q,setQ] = useState('');
  useEffect(()=>{
    // mock
    setData([{id:1,title:'JS Basics'},{id:2,title:'HTTP & REST'}]);
  },[]);
  const list = data.filter(x => (x.title).toLowerCase().includes(q.toLowerCase()));
  return React.createElement('div',{className:'card'},
    React.createElement('h2', null, 'Cursuri'),
    React.createElement('input',{placeholder:'Caută...',value:q,onChange:e=>setQ(e.target.value)}),
    React.createElement('ul', null, list.map(c=> React.createElement('li',{key:c.id},
      React.createElement(Link,{to:`/lesson/${c.id}`}, c.title)
    )))
  );
}